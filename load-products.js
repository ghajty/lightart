(() => {
  let products = [];
  const categories = new Set(["全部商品"]);

  // 先嘗試從 localStorage 讀取商品
  const stored = localStorage.getItem('catlamp_products');
  if (stored) {
    try {
      products = JSON.parse(stored);
      products.forEach(p => categories.add(p.category));
      renderCategories();
      displayProducts();
    } catch (e) {
      console.error('localStorage 資料錯誤', e);
    }
  } else {
    // 如果 localStorage 沒資料就載入 JSON
    fetch('products.json')
      .then(res => {
        if (!res.ok) throw new Error('找不到 products.json');
        return res.json();
      })
      .then(data => {
        products = data;
        products.forEach(p => categories.add(p.category));
        localStorage.setItem('catlamp_products', JSON.stringify(products)); // 同步到 localStorage
        renderCategories();
        displayProducts();
      })
      .catch(err => {
        console.error(err);
        document.getElementById('productList').innerHTML = '<p style="color:red;">載入產品失敗</p>';
      });
  }

  // ------------------ 渲染分類 ------------------
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

  // ------------------ 顯示商品 ------------------
  window.displayProducts = function(filter = "全部商品") {
    const list = document.getElementById("productList");
    if (!list) return;
    list.innerHTML = "";
    const filtered = filter === "全部商品" ? products : products.filter(p => p.category === filter);
    filtered.forEach(p => {
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
      // 點商品進入詳情
      card.onclick = (e) => {
        if (e.target.classList.contains('add-btn')) return;
        window.location.href = `product-detail.html?id=${p.id}`;
      };
      // 加入購物車
      card.querySelector('.add-btn').onclick = (e) => {
        e.stopPropagation();
        addToCart(p.id);
      };
      list.appendChild(card);
    });
  };

  // ------------------ 購物車功能 ------------------
  let cart = JSON.parse(localStorage.getItem('catlamp_cart') || '[]');

  window.addToCart = function(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const exist = cart.find(x => x.id === id);
    if (exist) exist.qty++;
    else cart.push({...p, qty:1});
    localStorage.setItem('catlamp_cart', JSON.stringify(cart));
    updateCartButton();
    openCart();
  };

  function updateCartButton() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCount = document.getElementById('cartCount');
    if(cartCount) cartCount.textContent = count;
  }

  function openCart() {
    const sidebar = document.getElementById('cartSidebar');
    if(sidebar) sidebar.classList.add('open');
  }

  updateCartButton();
})();
