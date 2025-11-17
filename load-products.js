// load-products.js
(() => {
  window.products=[];
  const categories = new Set(["全部商品"]);

  fetch('products.json')
    .then(res=>res.json())
    .then(data=>{
      window.products=data;
      data.forEach(p=>categories.add(p.category));
      renderCategories();
      displayProducts();
    })
    .catch(err=>{
      console.error(err);
      document.getElementById('productList').innerHTML='<p style="color:red;">載入產品失敗</p>';
    });

  window.renderCategories = function(){
    const list = document.getElementById('categoryList');
    list.innerHTML='';
    Array.from(categories).sort().forEach(cat=>{
      const btn=document.createElement('button');
      btn.textContent=cat;
      btn.onclick=()=>{displayProducts(cat); list.querySelectorAll('button').forEach(b=>b.classList.remove('active')); btn.classList.add('active');};
      if(cat==='全部商品') btn.classList.add('active');
      list.appendChild(btn);
    });
  };

  window.displayProducts=function(filter='全部商品'){
    const list = document.getElementById('productList');
    list.innerHTML='';
    const filtered = filter==='全部商品'?window.products:window.products.filter(p=>p.category===filter);
    if(filtered.length===0){ list.innerHTML='<p style="color:#999; text-align:center;">此分類無商品</p>'; return; }
    filtered.forEach(p=>{
      const card=document.createElement('div');
      card.className='product-card';
      card.innerHTML=`
        <img src='${p.imgs[0]}' alt='${p.name}'>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p class="price">$${p.price}</p>
        <button class="add-btn" data-id='${p.id}'>加入購物車</button>
      `;
      card.onclick=(e)=>{
        if(e.target.classList.contains('add-btn')) return;
        window.location.href=`product-detail.html?id=${p.id}`;
      };
      card.querySelector('.add-btn').onclick=(e)=>{
        e.stopPropagation();
        addToCart(p.id);
      };
      list.appendChild(card);
    });
  };
})();
