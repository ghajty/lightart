let cart = JSON.parse(localStorage.getItem('cart')||'[]');
let user = JSON.parse(localStorage.getItem('user')||'null');

function displayProducts(filter="全部商品", sort="default"){
  fetch('data/products.json').then(res=>res.json()).then(products=>{
    let list=document.getElementById('productList');
    list.innerHTML='';

    if(filter!=="全部商品") products=products.filter(p=>p.category===filter);

    if(sort==="priceAsc") products.sort((a,b)=>a.price-b.price);
    else if(sort==="priceDesc") products.sort((a,b)=>b.price-a.price);
    else if(sort==="newest") products.sort((a,b)=>b.id-b.id);

    products.forEach(p=>{
      let card=document.createElement('div');
      card.className='product-card';
      card.innerHTML=`
        <img src="${p.imgs[0]}">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p>$${p.price}</p>
        <button class="add-cart" data-id="${p.id}">加入購物車</button>
        <button class="like-btn" data-id="${p.id}">❤</button>
      `;
      list.appendChild(card);
    });

    document.querySelectorAll('.add-cart').forEach(btn=>btn.onclick=e=>{
      const id=parseInt(e.target.dataset.id);
      addToCart(id);
    });

    document.querySelectorAll('.like-btn').forEach(btn=>btn.onclick=e=>{
      const id=parseInt(e.target.dataset.id);
      toggleLike(id);
    });
  });
}

function addToCart(id){
  fetch('data/products.json').then(res=>res.json()).then(products=>{
    const item=products.find(p=>p.id===id);
    const exist=cart.find(c=>c.id===id);
    if(exist) exist.qty++;
    else cart.push({...item, qty:1});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    alert('已加入購物車');
  });
}

function updateCartUI(){
  document.getElementById('cartCount').textContent=cart.reduce((a,b)=>a+b.qty,0);
}

function toggleLike(id){
  if(!user){ alert('請先登入'); return; }
  user.likes=user.likes||[];
  if(user.likes.includes(id)) user.likes=user.likes.filter(x=>x!==id);
  else user.likes.push(id);
  localStorage.setItem('user', JSON.stringify(user));
  alert('已更新收藏');
}

displayProducts();
updateCartUI();
