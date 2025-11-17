function applyDiscount(cart,code){
  let discount=0;
  if(code==='SAVE10') discount=0.1;
  cart.forEach(item=>item.price=Math.round(item.price*(1-discount)));
  localStorage.setItem('catlamp_cart',JSON.stringify(cart));
  alert('折扣已套用');
}
