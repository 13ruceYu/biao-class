<template>
  <div class="setting">
    <h1>账号设置</h1>
    <div class="toolbar">
      <button @click="editMode = !editMode">
        <span v-if="editMode">取消</span>
        <span v-else>编辑</span>
      </button>
    </div>
    <form @submit.prevent="update">
      <fieldset :disabled="updatePending">
        <dl class="pair">
          <dt>昵称:</dt>
          <dd>
            <span v-if="editMode">
              <input class="field" type="text" v-model="me.nickname" :readonly="!editMode">
            </span>
            <span v-else>
              <span>{{me.nickname || '-'}}</span>
            </span>
          </dd>
        </dl>
        <dl class="pair">
          <dt>手机号:</dt>
          <dd>
            <span v-if="editMode">
              <input class="field" type="text" v-model="me.phone" :readonly="!editMode">
              <span v-if="me.phone != meCopy.phone && validMe">
                <input type="text" v-model="tmp.captchaInput">
                <Captcha @send="storeCaptcha" send-by="phone" :receiver="me.phone"/>
              </span>
            </span>
            <span v-else>
              <span>{{me.phone || '-'}}</span>
            </span>
          </dd>
        </dl>
        <dl class="pair">
          <dt>邮箱:</dt>
          <dd>
            <span v-if="editMode">
              <input class="field" type="text" v-model="me.mail" :readonly="!editMode">
              <span v-if="me.mail != meCopy.mail && validMe">
                <input type="text" v-model="tmp.captchaInput">
                <Captcha @send="storeCaptcha" send-by="mail" :receiver="me.mail"/>
              </span>
            </span>
            <span v-else>
              <span>{{me.mail || '-'}}</span>
            </span>
          </dd>
        </dl>
        <div class="error-list">
          <div v-for="e in errorMsg" class="error" :key="e.id">{{e}}</div>
          <div v-if="invalidCaptcha" class="error">验证码有误</div>
        </div>
        <div v-if="editMode">
          <button class="el-button--primary" type="submit">完成</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import session from '../lib/session';
  import Captcha from '../components/Captcha';
  import { is }  from '../lib/valee';
  import api from "../lib/api";

  export default {
    components : { Captcha },
    data () {
      return {
        invalidCaptcha : false,
        tmp            : {},
        me             : {}, // 当前用户的数据
        meCopy         : {},
        editMode       : false, // 是否为编辑模式
        updatePending  : false,
        errorMsg       : [],
      };
    },
    computed   : {
      validMe () {
        return !this.errorMsg.length;
      },
    },
    mounted () {
      this.findMe();
    },
    methods    : {
      validate () {
        this.errorMsg = [];

        let me = this.me;
        if (!is.phone(me.phone))
          this.errorMsg.push('手机号不合法');

        if (!is.mail(me.mail))
          this.errorMsg.push('邮箱不合法');

        if (this.changed('phone'))
          if (!this.verifyCaptcha())
            this.invalidCaptcha = true;

        if (this.changed('mail'))
          if (!this.verifyCaptcha())
            this.invalidCaptcha = true;

        return !this.errorMsg.length && !this.invalidCaptcha;
      },
      findMe () {
        api('user/find', { id : session.user('id') })
          .then(r => {
            this.me = r.data;
            this.copyMe();
          });
      },
      copyMe () {
        this.meCopy = { ...this.me };
      },
      storeCaptcha (code) {
        this.tmp.captchaAnswer = code;
      },
      verifyCaptcha () {
        // console.log(this.tmp);
        return this.tmp.captchaAnswer == this.tmp.captchaInput;
      },
      changed (prop) {
        return this.me[ prop ] !== this.meCopy[ prop ];
      },
      update () {
        if (!this.validate())
          return;

        this.updatePending = true;

        api('user/update', this.me)
          .then(r => {
            let me             = this.me = r.data;
            this.editMode      = false;
            this.updatePending = false;
            this.copyMe();
            session.login(me.id, me, () => {location.reload();});
          });
      },
    },
    watch      : {
      me : {
        deep : true,
        handler () {
          if (this.editMode)
            this.validate();
        },
      },
    },
  };
</script>

<style scoped>

fieldset {
  border: none;
  padding: 0;
}

dl {
  margin: 5px 0;
}

dd {
  margin-left: 20px;
}
</style>

