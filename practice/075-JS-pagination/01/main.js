;
(function () {
  biaoPage.boot({
    selector: '.footer',
    amount: 1001,
    limit: 10,
    currentPage: 2,
    onChange(page, state){
      console.log(state);
    },
  })

})();