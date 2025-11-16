// load-products.js - 外部載入產品資料
(() => {
  let products = [];
  const categories = new Set(["全部商品"]);

  // 載入 JSON
  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      products = data;
      products.forEach(p => categories.add(p.category));
      renderCategories();
      displayProducts();
    })
    .catch(err => {
      console.error('載入 products.json 失敗', err);
      document.getElementById('productList').innerHTML = '<p style="color:red;">載入產品失敗，請檢查 products.json</p>';
    });

  // 覆寫原有的 renderCategories 和 displayProducts
  window.renderCategories = function() {
    const categoryList = document.getElementById("categoryList");
    if (!categoryList) return;
    categoryList.innerHTML = "";
    Array.from(categories).sort().forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.onclick = () => {
        displayProducts(cat);
        categoryList.querySelectorAll("button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      };
      if (cat === "全部商品") btn.classList.add("active");
      categoryList.appendChild(btn);
    });
  };

  window.displayProducts = function(filter = "全部商品") {
    const productList = document.getElementById("productList");
    if (!productList) return;
    productList.innerHTML = "";
    const filtered = filter === "全部商品" ? products : products.filter(p => p.category === filter);
    filtered.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src='${p.img}' alt='${p.name}'>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p>價格: $${p.price}</p>
        <button onclick='addToCart(${p.id})'>加入購物車</button>
      `;
      productList.appendChild(div);
    });
  };

  // 覆寫 addToCart 使用外部 products
  window.addToCart = function(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const exist = cart.find(x => x.id === id);
    if (exist) exist.qty++; else cart.push({...p, qty:1});
    saveCart(); updateCartButton(); openCart();
  };
})();
