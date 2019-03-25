import api from "../lib/api";

api('MODEL/ATTACH_MOCK', {
  key: 'product',
  mock: {
    price: {
      mocker: 'numberBetween',
      params: [5, 1000],
    },
    shipping_fee: {
      mocker: 'numberBetween',
      params: [5, 12],
    },
    total: {
      mocker: 'numberBetween',
      params: [5, 500],
    },
    cat_id: {
      mocker: 'numberBetween',
      params: [1, 5],
    },
    brand_id: {
      mocker: 'numberBetween',
      params: [1, 5],
    },
    title: {
      mocker: 'randomElement',
      params: [
        [
          '德国进口牛奶 德亚全脂牛奶纯牛奶1L*12盒整箱装',
          '亿滋 奥利奥巧轻脆薄片夹心饼干95g*4盒 四种口味',
          '百事可乐碳酸汽水饮料整箱330ml*24百事出品',
          '卫龙辣条大面筋礼包340g辣味零食网红小吃大辣片办公室分享小零食',
          '费列罗榛果巧克力送女友情人节礼物零食礼盒48粒3*16条 香浓美味',
          '乐事薯片春季限定款元气白桃味65克休闲食品膨化食品办公室零食'
        ]
      ],
    }
  },
});