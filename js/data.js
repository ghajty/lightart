let products = [];
let users = [];
let banners = [];
let cart = JSON.parse(localStorage.getItem('catlamp_cart')||'[]');

Promise.all([
  fetch('data/products.json').then(r=>r.json()),
  fetch('data/users.json').then(r=>r.json()),
  fetch('data/banners.json').then(r=>r.json())
]).then(([p,u,b])=>{
  products=p; users=u; banners=b;
});
