export default function(row) {
  return row.$user && (row.$user.username || row.$user.name);
}