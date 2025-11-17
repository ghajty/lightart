const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
fetch('data/products.json')
  .then(res=>res.json())
  .then(products=>{
    const product=products.find(p=>p.id===productId);
    if(!product){ document.getElementById('productDetail').innerHTML='<p>商品不存在</p>'; return; }

    const container=document.getElementById('productDetail');
    container.innerHTML=`
      <h2>${product.name}</h2>
      <div class="carousel">
        <img id="mainImg" src="${product.imgs[0]}" style="width:300px;">
        <div id="thumbnails"></div>
      </div>
      <p>${product.desc}</p>
      <p>價格: $${product.price}</p>
      <button onclick="addToCart(${product.id})">加入購物車</button>
      <div id="reviews"></div>
    `;
    const thumbnails=document.getElementById('thumbnails');
    product.imgs.forEach((img,i)=>{
      const t=document.createElement('img');
      t.src=img;
      t.style.width='50px';
      t.onclick=()=>document.getElementById('mainImg').src=img;
      thumbnails.appendChild(t);
    });
  });
