;
(function () {

  'use strict';

  biaoPage.boot({
    selector: '.footer',
    amount: 100,
    limit: 10,
    currentPage: 1,
    onChange(page, state) {
      console.log(page);
    },
  })

  biaoPage.boot({
    selector: '.a',
    amount: 150,
    limit: 12,
    currentPage: 2,
    onChange(page, state) {
      console.log(page);
    },
  })

  biaoPage.boot({
    selector: '.b',
    amount: 200,
    limit: 14,
    currentPage: 3,
    onChange(page, state) {
      console.log(page);
    },
  })

  // biaoPage.render();

})();