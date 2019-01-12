;
(function () {
  biaoPage.boot({
    selector: '.footer',
    amount: 100,
    limit: 10,
    currentPage: 2,
    onChange(page, state) {
      console.log(state);
    },
  })

  biaoPage.boot({
    selector: '.a',
    amount: 150,
    limit: 20,
    currentPage: 1,
    onChange(page, state) {
      console.log(state);
    },
  })

  biaoPage.boot({
    selector: '.b',
    amount: 200,
    limit: 15,
    currentPage: 6,
    onChange(page, state) {
      console.log(state);
    },
  })

})();