// load-products.js
(() => {
  let products = [];
  const categories = new Set(["全部商品"]);

  // 載入商品資料，若 localStorage 有資料就用 localStorage
  const storedProducts = JSON.parse(localStorage.getItem('catlamp_products') || 'null');
  if (storedProducts) {
    products = storedProducts;
    products.forEach(p => categories.add(p.category));
  } else {
    fetch('products.json')
      .then(res => {
        if (!res.ok) throw new Error('找不到 products.json');
        return res.json();
      })
      .then(data => {
        products = data;
        products.forEach(p => categories.add(p.category));
        localStorage.setItem('catlamp_products', JSON.stringify(products));
        if (typeof renderCategories === 'function') renderCategories();
        if (typeof displayProducts === 'function') displayProducts();
      })
      .catch(err => {
        console.error(err);
        const list = document.getElementById('productList');
        if(list) list.innerHTML = '<p style="color:red;">載入產品失敗</p>';
      });
  }

  window.products = products;
  window.categories = categories;

  // 前台分類渲染
  window.renderCategories = function() {
    const list = document.getElementById("categoryList");
    if (!list) return;
    list.innerHTML = "";
    Array.from(categories).sort().forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.onclick = () => {
        displayProducts(cat);
        list.querySelectorAll("button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      };
      if (cat === "全部商品") btn.classList.add("active");
      list.appendChild(btn);
    });
  };

  // 前台商品顯示
  window.displayProducts = function(filter = "全部商品") {
    const list = document.getElementById("productList");
    if (!list) return;
    list.innerHTML = "";
    const filtered = filter === "全部商品" ? products : products.filter(p => p.category === filter);
    if(filtered.length === 0){
      list.innerHTML = '<p style="text-align:center;color:#999;">此分類無商品</p>';
      return;
    }
    filtered.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.style.cursor = "pointer";
      card.innerHTML = `
        <img src='${p.imgs[0]}' alt='${p.name}'>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p class="price">$${p.price}</p>
        <button class="add-btn" data-id="${p.id}">加入購物車</button>
      `;
      card.onclick = (e) => {
        if (e.target.classList.contains('add-btn')) return;
        window.location.href = `product-detail.html?id=${p.id}`;
      };
      card.querySelector('.add-btn').onclick = (e) => {
        e.stopPropagation();
        addToCart(p.id);
      };
      list.appendChild(card);
    });
  };

  // 購物車相關
  window.cart = JSON.parse(localStorage.getItem('catlamp_cart') || '[]');

  window.addToCart = function(id){
    const p = products.find(x => x.id === id);
    if(!p) return;
    const exist = cart.find(x => x.id === id);
    if(exist) exist.qty++; else cart.push({...p, qty:1});
    saveCart(); updateCartButton(); openCart();
  }

  window.saveCart = function(){
    localStorage.setItem('catlamp_cart', JSON.stringify(cart));
  }

  window.updateCartButton = function(){
    const countEl = document.getElementById('cartCount');
    if(!countEl) return;
    const count = cart.reduce((sum,i)=>sum+i.qty,0);
    countEl.textContent = count;
    countEl.style.display = count>0 ? 'flex':'none';
  }

  window.renderCart = function(){
    const itemsEl = document.getElementById('cartItems');
    if(!itemsEl) return;
    itemsEl.innerHTML = "";
    let total = 0;
    cart.forEach(item=>{
      total += item.price*item.qty;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <span>${item.name} x ${item.qty}</span>
        <span>$${item.price*item.qty}</span>
      `;
      itemsEl.appendChild(div);
    });
    const totalEl = document.getElementById('cartTotal');
    if(totalEl) totalEl.textContent = `$${total}`;
  }

  window.openCart = function(){
    const sidebar = document.getElementById('cartSidebar');
    if(sidebar) sidebar.classList.add('open');
    renderCart();
    updateCartButton();
  }

})();
