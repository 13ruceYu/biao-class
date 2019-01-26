biaoPage.boot({
  selector: '.footer',
  amount: 51,
  limit: 10,
  currentPage: 2,
  onChange(page, state) {
    console.log(page,);
  },
})

biaoPage.boot({
  selector: '.a',
  amount: 81,
  limit: 10,
  currentPage: 8,
  onChange(page, state) {
    console.log(page);
  },
})

biaoPage.boot({
  selector: '.b',
  amount: 100,
  limit: 10,
  currentPage: 5,
  onChange(page, state) {
    console.log(page);
  },
})

// biaoPage.render();