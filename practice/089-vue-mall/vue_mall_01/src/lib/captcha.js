import api from "./api";

/**
 * 发送验证码
 * @param {string} sendBy (phone|mail)
 * @param {string} reciever 手机或邮箱
 * @return {Promise}
 */
export function send(sendBy, reciever, onSend) {
  let action;

  if (sendBy == "phone") {
    action = "sms";
  } else {
    action = "mail";
  }

  return api(`captcha/${action}`, {
    [sendBy]: reciever
  }).then(r => {
    if (r.success) {
      let code = atob(r.data.result);
      if (onSend) {
        onSend(code);
      }
      return code;
    }
  });
}