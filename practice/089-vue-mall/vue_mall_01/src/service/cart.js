import session from '../lib/session';
import store from '../lib/store';
import { obj2Arr } from '../lib/helper';
import api from '../lib/api';

let localCart = {};
const callbackPool = [];

const output = {
  onChange(fn) {
    if (callbackPool.find(it => it === fn))
      return;

    callbackPool.push(fn);

    // 保证可以收到初始数据
    this.callPool();
  },
  /**
   * 更改购物车中的某个产品的记录
   * @param {number} product_id 产品id
   * @param {number} count 数量
   * @param {Object} product 对应产品数据
   */
  change(product_id, count, product_snapshot, prop, user_id) {
    if (!user_id)
      user_id = session.user('id');

    if (!localCart[product_id])
      localCart[product_id] = { product_id, count: 0, product_snapshot, prop, user_id };

    let finalCount = localCart[product_id].count += count;

    if (finalCount <= 0)
      this.remove(product_id);

    this.callPool();
    this.sync();
  },
  callPool() {
    callbackPool.forEach(fn => fn({...localCart }));
  },
  get() {
    return {...localCart };
  },
  remove(product_id) {
    delete localCart[product_id];
    this.callPool();
  },
  clear() {
    localCart = {};
    this.callPool();
    this.sync();
  },
  restore() {
    this.restoreLocal();
    this.callPool();
  },
  restoreLocal() {
    localCart = store.get('cart') || {};
  },
  sync() {
    this.syncCloud();
    this.syncLocal();
  },
  syncCloud() {
    if (!session.loggedIn())
      return;

    let idList = [];
    this
      .getCloud()
      .then(r => {
        let data = r.data || [];

        // 收集所有记录的id: [1, 2, 3]
        data.forEach(row => {
          idList.push(row.id);
        });

        // 清空当前用户的云端购物车数据
        this.clearCloud(idList);
        this.overwriteCloud();
      });
  },
  restoreCloud() {
    this.getCloud({ key_by: 'product_id' })
      .then(r => {
        localCart = r.data;
        this.syncLocal();
        this.callPool();
      });
  },
  overwriteCloud() {
    api('cart/create_many', {
      data: obj2Arr(localCart),
    });
  },
  getCloud(param = {}) {
    return api('cart/read', {...param, where: { and: { user_id: session.user('id') } } });
  },
  clearCloud(idList) {
    if (!idList.length)
      return;

    return api('cart/delete_many', { in: idList });
  },
  syncLocal() {
    store.set('cart', localCart || {});
  },
  productCount() {
    localCart = localCart || {}
    return Object.keys(localCart).length;
  },
  isEmpty() {
    return !this.productCount();
  },
};

init();

function init() {
  if (session.isAdmin())
    return;

  output.restore();
  if (session.loggedIn())
    output.restoreCloud();
}

export default output;