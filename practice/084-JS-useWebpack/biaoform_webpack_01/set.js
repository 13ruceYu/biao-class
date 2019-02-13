import biaoForm from '../biaoForm_node/biaoForm';

let bf = biaoForm('#main-form');
bf.setData({
  name: '王花花',
  age: 18,
  email: 'biaoyansu@gmail.com',
  birthday: '1998-01-01',
  gender: 'female',
  orientation: ['car', 'male'],
  balance: 10,
});