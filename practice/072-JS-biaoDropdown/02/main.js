;
(function () {

  'use strict';

  let list = [{
      id: 1,
      username: '王花花',
    },
    {
      id: 2,
      username: '李拴蛋',
    },
    {
      id: 3,
      username: '赵可爽',
    },
    {
      id: 4,
      username: '牛花花',
    },
  ]

  biaoDrop.boot('main', list, {
    display: 'username',
    onSelect(it) {
      console.log(it);
    },
  });

})();