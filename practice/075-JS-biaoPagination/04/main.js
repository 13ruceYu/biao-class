;(function () {

'use strict';

biaoPage.boot({
  selector: '.footer',
  itemAmount: 101,
  perPage: 12,
  defaultPage: 4,
  onChange(page, state) {
    console.log(page, state);
  },
})

biaoPage.boot({
  selector: '.a',
  itemAmount: 120,
  perPage: 10,
  defaultPage: 2,
  onChange(page, state) {
    console.log(page, state);
  },
})

biaoPage.boot({
  selector: '.b',
  itemAmount: 130,
  perPage: 12,
  defaultPage: 8,
  onChange(page, state) {
    console.log(page, state);
  },
})

})();