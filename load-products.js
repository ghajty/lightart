// load-products.js
(() => {
  let products = [];
  const categories = new Set(["全部商品"]);

  fetch('products.json')
    .then(res => {
      if (!res.ok) throw new Error('找不到 products.json');
      return res.json();
    })
    .then(data => {
      products = data;
      products.forEach(p => categories.add(p.category));
      if (typeof renderCategories === 'function') renderCategories();
      if (typeof displayProducts === 'function') displayProducts();
    })
    .catch(err => {
      console.error(err);
      document.getElementById('productList').innerHTML = '<p style="color:red;">載入產品失敗</p>';
    });

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

  window.displayProducts = function(filter = "全部商品") {
    const list = document.getElementById("productList");
    if (!list) return;
    list.innerHTML = "";
    const filtered = filter === "全部商品" ? products : products.filter(p => p.category === filter);
    filtered.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `<img src='${p.img}' alt='${p.name}'><h3>${p.name}</h3><p>${p.desc}</p><p>價格: $${p.price}</p><button onclick='addToCart(${p.id})'>加入購物車</button>`;
      list.appendChild(div);
    });
  };

  window.addToCart = function(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const exist = cart.find(x => x.id === id);
    if (exist) exist.qty++; else cart.push({...p, qty:1});
    saveCart();
    updateCartButton();
    openCart(); // 直接開啟並刷新
  };
})();
