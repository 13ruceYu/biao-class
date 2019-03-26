import session from "../lib/session";
import store from "../lib/store";
import {
  obj2Arr
} from "../lib/helper";
import api from "../lib/api";

let localCart = {}; // 内存中的购物车数据
const callbackPool = []; // 当内存中数据发生改变所要调用的函数（Observer）

const output = {
  // 往oberser里推函数
  onChange(fn) {
    if (callbackPool.find(it => it === fn))
      return;
    callbackPool.push(fn);
    // 初始回调，保证可以收到初始数据
    this.callPool();
  },
  /**
   * 更改购物车中某个产品的记录
   * @param {num} product_id 产品id
   * @param {num} count 数量
   * @param {obj} product_snapshot 对应产品数据
   */
  change(product_id, count, product_snapshot, prop, user_id) {
    if (!user_id)
      user_id = session.user('id');
    if (!localCart[product_id])
      localCart[product_id] = {
        product_id,
        count: 0,
        product_snapshot,
        prop,
        user_id
      };
    let finalCount = localCart[product_id].count += count;

    if (finalCount <= 0)
      this.remove(product_id);

    this.callPool();
    this.sync();
  },
  // 执行observer
  callPool() {
    callbackPool.forEach(fn => fn({
      ...localCart
    }));
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
  get() {
    return {
      ...localCart
    };
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
    this.getCloud().then(r => {
        let data = r.data || [];

        // 收集所有记录的id
        data.forEach(row => {
          idList.push(row.idList);
        })

        // 先清空在同步
        this.clearCloud(idList);
        this.overwriteCloud();
      })
      // api('cart/read', {
      //   where: {
      //     and: {
      //       user_id: session.user('idList')
      //     }
      //   }
      // }).then(r => {
      //   let data = r.data || [];
      //   data.forEach(row => {
      //     idList.push(row.idList);
      //   })

    // })
    // api('cart/create', localCart);
  },
  restoreCloud() {
    this.getCloud({
      key_by: 'product_id'
    }).then(r => {
      localCart = r.data;
      this.callPool();
      this.syncLocal();
    })
  },
  overwriteCloud() {
    api('cart/create_many', {
      data: obj2Arr(localCart),
    })
  },
  getCloud(param = {}) {
    return api('cart/read', {
      ...param,
      where: {
        and: {
          user_id: session.user('id')
        }
      }
    })
  },
  clearCloud(idList) {
    if (!idList.length)
      return;
    return api('cart/delete_many', { in: idList
    });
  },
  syncLocal() {
    store.set('cart', localCart)
  },
  productCount() {
    return Object.keys(localCart).length;
  },
  isEmpty() {
    return !this.productCount();
  }
};

init();

function init() {
  if (session.isAdmin())
    return;
  output.restore();
  if (output.isEmpty() && session.loggedIn())
    output.restoreCloud();
}

export default output;