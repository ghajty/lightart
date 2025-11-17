let reviews=JSON.parse(localStorage.getItem('catlamp_reviews')||'{}');
function addReview(productId,user,star,comment){
  if(!reviews[productId]) reviews[productId]=[];
  reviews[productId].push({user,star,comment,date:new Date().toISOString()});
  localStorage.setItem('catlamp_reviews',JSON.stringify(reviews));
  renderReviews(productId);
}
function renderReviews(productId){
  const container=document.getElementById('reviews');
  if(!container) return;
  container.innerHTML='';
  const list=reviews[productId]||[];
  list.forEach(r=>{
    const div=document.createElement('div');
    div.innerHTML=`<b>${r.user}</b> ★${r.star} <p>${r.comment}</p>`;
    container.appendChild(div);
  });
}
