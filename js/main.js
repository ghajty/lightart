// ------------------ 全局資料 ------------------
let currentUser = JSON.parse(localStorage.getItem('catlamp_user')||'null');
let productsFiltered = [];

function saveCart(){localStorage.setItem('catlamp_cart',JSON.stringify(cart));}
function saveUser(){localStorage.setItem('catlamp_user',JSON.stringify(currentUser));}

// ------------------ 顯示 Banner ------------------
function renderBanner(){
  const container=document.getElementById('bannerContainer');
  if(!container)return;
  container.innerHTML='';
  banners.forEach(b=>{
    const img=document.createElement('img');
    img.src=b.img;
    img.style.width='100%';
    container.appendChild(img);
  });
}

// ------------------ 商品列表 ------------------
function renderProducts(filter='全部',sortBy=''){
  const list=document.getElementById('productList');
  if(!list)return;
  let filtered = filter==='全部'?products:products.filter(p=>p.category===filter);
  if(sortBy==='price-asc') filtered.sort((a,b)=>a.price-b.price);
  if(sortBy==='price-desc') filtered.sort((a,b)=>b.price-a.price);
  if(sortBy==='newest') filtered.sort((a,b)=>b.id-b.id);
  productsFiltered = filtered;
  list.innerHTML='';
  filtered.forEach(p=>{
    const card=document.createElement('div');
    card.className='product-card';
    card.innerHTML=`
      <img src="${p.imgs[0]}" alt="${p.name}" style="width:100%">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button class="add-btn" data-id="${p.id}">加入購物車</button>
      <button class="like-btn" data-id="${p.id}">❤ ${p.likes||0}</button>
    `;
    card.onclick=(e)=>{
      if(e.target.classList.contains('add-btn')||e.target.classList.contains('like-btn'))return;
      window.location.href=`product-detail.html?id=${p.id}`;
    };
    card.querySelector('.add-btn').onclick=(e)=>{
      e.stopPropagation(); addToCart(p.id);
    };
    card.querySelector('.like-btn').onclick=(e)=>{
      e.stopPropagation(); toggleLike(p.id, e.target);
    };
    list.appendChild(card);
  });
}

// ------------------ 收藏/喜歡 ------------------
function toggleLike(id, btn){
  if(!currentUser){alert('請先登入'); return;}
  const p = products.find(x=>x.id===id);
  if(!p) return;
  p.likes = (p.likes||0)+1;
  btn.textContent = `❤ ${p.likes}`;
}

// ------------------ 購物車 ------------------
function addToCart(id){
  const p = products.find(x=>x.id===id);
  if(!p||p.stock<1){alert('庫存不足');return;}
  const exist = cart.find(x=>x.id===id);
  if(exist) exist.qty++; else cart.push({...p, qty:1});
  saveCart(); updateCart();
}

function updateCart(){
  const count=document.getElementById('cartCount');
  if(count) count.textContent=cart.reduce((a,b)=>a+b.qty,0);
  const sidebar=document.getElementById('cartSidebar');
  if(!sidebar) return;
  const items=document.getElementById('cartItems'); items.innerHTML='';
  let total=0;
  cart.forEach(it=>{
    total+=it.price*it.qty;
    const div=document.createElement('div');
    div.className='cart-item';
    div.innerHTML=`${it.name} x${it.qty} - $${it.price*it.qty}`;
    items.appendChild(div);
  });
  document.getElementById('cartTotal').textContent=`$${total}`;
}

document.getElementById('cartIcon')?.addEventListener('click',()=>document.getElementById('cartSidebar').style.display='flex');
document.getElementById('closeCart')?.addEventListener('click',()=>document.getElementById('cartSidebar').style.display='none');
document.getElementById('checkoutBtn')?.addEventListener('click',()=>{
  if(!currentUser){alert('請先登入');return;}
  if(cart.length===0){alert('購物車為空');return;}
  alert('結帳成功！'); cart=[]; saveCart(); updateCart();
});

// ------------------ 篩選與排序 ------------------
function renderCategories(){
  const container=document.getElementById('categoryList');
  if(!container) return;
  const cats=new Set(products.map(p=>p.category)); cats.add('全部');
  container.innerHTML='';
  Array.from(cats).sort().forEach(c=>{
    const btn=document.createElement('button');
    btn.textContent=c;
    btn.onclick=()=>renderProducts(c);
    container.appendChild(btn);
  });
}

// ------------------ 初始化 ------------------
document.addEventListener('DOMContentLoaded',()=>{
  renderBanner();
  renderCategories();
  renderProducts();
  updateCart();
});
