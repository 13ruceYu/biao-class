import api from "../lib/api";

export function createOrder(detail, user_id) {
  let order = {
    detail
  };

  order.sum = orderSum(order.detail);
  order.user_id = user_id;

  return api("order/create", order).then(r => r);
}

export function orderSum(detail) {
  let sum = 0;
  detail.forEach(product => {
    sum += product.product_snapshot.price * product.count
  });

  return sum;
}