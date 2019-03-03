export default {
  pad(num) {
    num = '0' + num;
    return num.slice(-2);
  },
  format(dateObj) {
    let year = dateObj.getFullYear();
    let month = this.pad(dateObj.getMonth() + 1);
    let date = this.pad(dateObj.getDate());
    let hour = this.pad(dateObj.getHours());
    let minute = this.pad(dateObj.getMinutes());
    let second = this.pad(dateObj.getSeconds());

    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  }
}