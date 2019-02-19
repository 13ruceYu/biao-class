let app = new Vue({
  el: '#app',
  data: {
    url: 'http://google.com',
    img:'https://dummyimage.com/400x400/ffff03/2f3ad4',
    klass: 'btn btn-default',
    isActive: true,
  },
  methods: {
    onClick(){
      console.log('yo');
    },
    onEnter() {
      console.log('Enter');
    },
    onLeave() {
      console.log('out');
    },
    onSubmit(e){
      e.preventDefault();
      console.log('submited');
    },
    onKeyup() {
      console.log('keypressed');
    },
    onEnter() {
      console.log('enter');
    }

  }
})