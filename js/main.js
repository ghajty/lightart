// 範例 Banner
const banners=[{img:'https://via.placeholder.com/800x200?text=Banner1'},{img:'https://via.placeholder.com/800x200?text=Banner2'}];
// 範例商品
let products=[
{id:1,name:'吊燈A',category:'吊燈',price:2500,imgs:['https://via.placeholder.com/300x300/FF6B6B?text=吊燈A'],desc:'適合客廳',stock:10,likes:0,reviews:[]},
{id:2,name:'壁燈B',category:'壁燈',price:1200,imgs:['https://via.placeholder.com/300x300/45B7D1?text=壁燈B'],desc:'適合走廊',stock:5,likes:0,reviews:[]},
{id:3,name:'吊燈C',category:'吊燈',price:3000,imgs:['https://via.placeholder.com/300x300/FFD93D?text=吊燈C'],desc:'適合餐廳',stock:8,likes:0,reviews:[]}
];
let cart=JSON.parse(localStorage.getItem('catlamp_cart')||'[]');
let currentUser=JSON.parse(localStorage.getItem('catlamp_user')||'null');

// ------------------ Banner ------------------
function renderBanner(){
  const container=document.getElementById('bannerContainer'); container.innerHTML='';
  banners.forEach(b=>{const img=document.createElement('img');img.src=b.img;img.style.width='100%';container.appendChild(img);});
}

// ------------------ 彈窗 ------------------
document.getElementById('aboutBtn').onclick=()=>document.getElementById('aboutModal').style.display='block';
document.getElementById('closeAbout').onclick=()=>document.getElementById('aboutModal').style.display='none';
document.getElementById('contactBtn').onclick=()=>document.getElementById('contactModal').style.display='block';
document.getElementById('closeContact').onclick=()=>document.getElementById('contactModal').style.display='none';
document.getElementById('contactForm').onsubmit=(e)=>{
  e.preventDefault(); alert('訊息已送出！'); document.getElementById('contactModal').style.display='none';
};

// ------------------ 初始化 ------------------
document.addEventListener('DOMContentLoaded',()=>{
  renderBanner(); renderCategories(); renderProducts(); updateCart();
  document.getElementById('sortSelect').onchange=()=>renderProducts('全部',document.getElementById('sortSelect').value);
});
