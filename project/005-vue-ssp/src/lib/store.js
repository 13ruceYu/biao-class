function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
  let json = localStorage.getItem(key);
  if (!json)
  return null;

  return JSON.parse(json);
}

export default {get , set};