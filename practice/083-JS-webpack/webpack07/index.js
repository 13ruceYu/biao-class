import a1 from './img/a1.jpg';
import a2 from './img/a2.jpg';
import b1 from './img/b1.jpg';
import b2 from './img/b2.jpg';
import c1 from './img/c1.jpg';
import c2 from './img/c2.jpg';
import l1 from './img/love.jpg';
import l2 from './img/love.gif';

let container = document.querySelector('.container');
let body = document.body;

function append(src, parent) {
  let img = document.createElement('img');
  img.src = src;
  parent.appendChild(img);
}

append(a1, container);
append(a2, container);
append(b1, container);
append(b2, container);
append(c1, container);
append(c2, container);
append(l1, body);
append(l2, body);