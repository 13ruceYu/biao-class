export function fileUrl(fileData) {
  return 'https://' + fileData._base_url + '/' + fileData._key;
}

export function orderSum(detail) {
  let sum = 0;
  detail.forEach(product => {
    sum += product.product_snapshot.price * product.count
  });

  return sum;
}

export function url(part) {
  return location.origin + part;
}