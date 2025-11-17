let products = [];
fetch('data/products.json')
  .then(res => res.json())
  .then(data => { products = data; displayProducts(); })
  .catch(err => console.error(err));

function displayProducts(filter="全部商品") {
  const list = document.getElementById('productList');
  list.innerHTML = "";
  let filtered = filter==="全部商品"?products:products.filter(p=>p.category===filter);
  filtered.forEach(p=>{
    const card=document.createElement('div');
    card.className='product-card';
    card.innerHTML=`<h3>${p.name}</h3><p>$${p.price}</p><button onclick="addToCart(${p.id})">加入購物車</button>`;
    card.onclick=()=>window.location.href=`product-detail.html?id=${p.id}`;
    list.appendChild(card);
  });
}
