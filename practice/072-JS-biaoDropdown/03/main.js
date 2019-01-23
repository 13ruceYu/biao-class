;
(function () {

  'use strict';

  let list = [{
      id: 1,
      name: '王花花',
    },
    {
      id: 2,
      name: '李拴蛋',
    },
    {
      id: 3,
      name: '赵可爽',
    },
    {
      id: 4,
      name: '牛花花',
    },
  ]

  biaoDrop.boot('main', list, {
    dropKey: 'name',
    onSelect(it) {
      console.log(it);
    },
  });

})();