let favorites=JSON.parse(localStorage.getItem('catlamp_favorites')||'[]');
function toggleFavorite(id){
  const idx=favorites.indexOf(id);
  if(idx>=0){ favorites.splice(idx,1); } else { favorites.push(id); }
  localStorage.setItem('catlamp_favorites',JSON.stringify(favorites));
  alert(idx>=0?'已移除收藏':'已加入收藏');
}
function isFavorite(id){ return favorites.includes(id); }
