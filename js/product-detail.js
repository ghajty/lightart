const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
let product;

fetch('data/products.json').then(r=>r.json()).then(data=>{
  product=data.find(p=>p.id===productId);
  if(!product){document.body.innerHTML='<p>商品不存在</p>';return;}
  document.getElementById('detailName').textContent=product.name;
  document.getElementById('detailCategory').textContent=product.category;
  document.getElementById('detailPrice').textContent=`$${product.price}`;
  document.getElementById('detailDesc').textContent=product.desc;

  const mainImg=document.getElementById('mainImg');
  const thumbnails=document.getElementById('thumbnails');
  let idx=0;

  function showImg(i){
    mainImg.src=product.imgs[i];
    thumbnails.querySelectorAll('img').forEach((t,j)=>t.classList.toggle('active',i===j));
  }

  product.imgs.forEach((img,i)=>{
    const t=document.createElement('img'); t.src=img;
    if(i===0) t.classList.add('active');
    t.onclick=()=>{ idx=i; showImg(i); };
    thumbnails.appendChild(t);
  });
  showImg(0);

  document.querySelector('.prev-btn').onclick=()=>{ idx=(idx-1+product.imgs.length)%product.imgs.length; showImg(idx); };
  document.querySelector('.next-btn').onclick=()=>{ idx=(idx+1)%product.imgs.length; showImg(idx); };

  document.getElementById('addToCartBtn').onclick=()=>{
    let cart = JSON.parse(localStorage.getItem('catlamp_cart')||'[]');
    const exist=cart.find(x=>x.id===product.id);
    if(exist) exist.qty++; else cart.push({...product, qty:1});
    localStorage.setItem('catlamp_cart',JSON.stringify(cart));
    alert('已加入購物車');
  };
});
