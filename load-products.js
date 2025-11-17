(() => {
  let products = [];
  const categories = new Set(["全部商品"]);

  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      products = data;
      products.forEach(p=>categories.add(p.category));
      renderCategories();
      displayProducts();
    })
    .catch(err=>{
      console.error(err);
      document.getElementById('productList').innerHTML='<p style="color:red;">載入產品失敗</p>';
    });

  window.renderCategories = function(){
    const list = document.getElementById("categoryList");
    if(!list) return;
    list.innerHTML='';
    Array.from(categories).sort().forEach(cat=>{
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.onclick = ()=>{
        displayProducts(cat);
        list.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
      };
      if(cat==="全部商品") btn.classList.add("active");
      list.appendChild(btn);
    });
  };

  window.displayProducts = function(filter="全部商品"){
    const list = document.getElementById("productList");
    if(!list) return;
    list.innerHTML='';
    const filtered = filter==="全部商品"?products:products.filter(p=>p.category===filter);
    if(filtered.length===0){list.innerHTML='<p style="text-align:center;color:#999;">此分類暫無商品</p>';return;}
    filtered.forEach(p=>{
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.imgs[0]}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p class="price">$${p.price}</p>
        <button class="add-btn">加入購物車</button>
      `;
      card.querySelector(".add-btn").onclick = e=>{
        e.stopPropagation();
        addToCart(p.id);
      };
      card.onclick = ()=>window.location.href=`product-detail.html?id=${p.id}`;
      list.appendChild(card);
    });
  };

  window.addToCart = function(id){
    const p = products.find(x=>x.id===id);
    if(!p) return;
    const exist = cart.find(x=>x.id===id);
    if(exist) exist.qty++; else cart.push({...p, qty:1});
    localStorage.setItem("catlamp_cart", JSON.stringify(cart));
    updateCartButton();
    document.getElementById("cartSidebar").classList.add("open");
  };
})();
