import session from "../lib/session";
import store from "../lib/store";

let localCart = {}; // 内存中的购物车数据
const callbackPool = []; // 当内存中数据发生改变所要调用的函数（Observer）

const output = {
  // 往oberser里推函数
  onChange(fn) {
    if (callbackPool.find(it => it === fn))
      return;
    callbackPool.push(fn);
  },
  /**
   * 更改购物车中某个产品的记录
   * @param {num} productId 产品id
   * @param {num} count 数量
   * @param {obj} product_snapshot 对应产品数据
   */
  change(productId, count, product_snapshot, prop) {
    if (!localCart[productId])
      localCart[productId] = {
        productId,
        count: 0,
        product_snapshot,
        prop
      };
    let finalCount = localCart[productId].count += count;

    if (finalCount <= 0)
      this.remove(productId);

    this.callPool();
    this.sync();
  },
  // 执行observer
  callPool() {
    callbackPool.forEach(fn => fn({...localCart }));
  },
  remove(productId) {
    delete localCart[productId];
    this.callPool();
  },
  clear() {
    localCart = {};
    this.callPool();
    this.sync();
  },
  get() {
    return {...localCart };
  },
  restore() {
    this.restoreLocal();
    this.callPool();
  },
  restoreLocal() {
    localCart = store.get('cart') || {};
  },
  sync() {
    if (session.loggedIn())
      this.syncCloud();
    this.syncLocal();
  },
  syncCloud() {
    // api('cart/create', localCart);
  },
  syncLocal() {
    store.set('cart', localCart)
  }
};

init();

function init() {
  output.restore();
}

export default output;