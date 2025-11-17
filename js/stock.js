fetch('data/products.json')
  .then(res=>res.json())
  .then(products=>{
    products.forEach(p=>{
      if(p.stock<=0){
        const btn=document.querySelector(`button[onclick='addToCart(${p.id})']`);
        if(btn){ btn.disabled=true; btn.textContent='缺貨'; }
      }
    });
  });
