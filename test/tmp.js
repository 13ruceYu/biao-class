class Alert {

  // 不指定依然存在，为空，每实例化一次对象均会执行
  constructor(title, type) {
    console.log(1);
    this.title = title;
    this.type = type;
  }

  // 方法，对象下的函数
  open() {
    console.log('biu');
  }

  close() {
    console.log('close');
  }

}

// new 实例化对象
let msg = new Alert('余额不足', 'warn');
console.log(msg.open());