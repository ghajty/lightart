let cart = JSON.parse(localStorage.getItem('catlamp_cart')||'[]');

function updateCartButton(){
  document.getElementById('cartCount').textContent = cart.reduce((a,b)=>a+b.qty,0);
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  let total=0;
  cart.forEach(item=>{
    total+=item.price*item.qty;
    const div = document.createElement('div');
    div.className='cart-item';
    div.innerHTML=`<span>${item.name} x${item.qty}</span><span>$${item.price*item.qty}</span>`;
    cartItems.appendChild(div);
  });
  document.getElementById('cartTotal').textContent=`$${total}`;
}
updateCartButton();

// 側欄
document.getElementById('cartIcon').onclick=()=>document.getElementById('cartSidebar').classList.add('open');
document.getElementById('closeCart').onclick=()=>document.getElementById('cartSidebar').classList.remove('open');
document.getElementById('checkoutBtn').onclick=()=>alert('結帳功能尚未實作');
