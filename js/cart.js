let cart = JSON.parse(localStorage.getItem('catlamp_cart')||'[]');
function addToCart(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  const exist = cart.find(x=>x.id===id);
  if(exist) exist.qty++; else cart.push({...p,qty:1});
  localStorage.setItem('catlamp_cart',JSON.stringify(cart));
  updateCartButton();
  alert('已加入購物車！');
}
function updateCartButton(){
  document.getElementById('cartCount').textContent=cart.reduce((sum,i)=>sum+i.qty,0);
}
document.getElementById('cartIcon').onclick=()=>document.getElementById('cartSidebar').classList.toggle('open');
document.getElementById('closeCart').onclick=()=>document.getElementById('cartSidebar').classList.remove('open');
document.getElementById('checkoutBtn').onclick=()=>{ alert('模擬結帳成功！'); cart=[]; localStorage.setItem('catlamp_cart','[]'); updateCartButton(); };
updateCartButton();
