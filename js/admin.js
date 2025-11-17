let adminUser = JSON.parse(localStorage.getItem('catlamp_user')||'null');
if(!adminUser||adminUser.role!=='admin'){alert('請先以管理員登入');window.location.href='login.html';}

function renderAdminProducts(){
  const list=document.getElementById('adminProductList'); list.innerHTML='';
  products.forEach(p=>{
    const div=document.createElement('div');
    div.innerHTML=`
      ${p.name} | $${p.price} | 庫存:${p.stock}
      <button onclick="editProduct(${p.id})">編輯</button>
      <button onclick="deleteProduct(${p.id})">刪除</button>
    `;
    list.appendChild(div);
  });
}

function addProduct(){
  const name=prompt('商品名稱'); if(!name)return;
  const price=parseInt(prompt('價格')); if(!price)return;
  const category=prompt('分類'); if(!category)return;
  const stock=parseInt(prompt('庫存')); if(!stock)return;
  const id=Math.max(...products.map(p=>p.id))+1;
  products.push({id,name,price,category,stock,imgs:[],desc:'',likes:0,reviews:[]});
  alert('新增成功'); renderAdminProducts();
}

function editProduct(id){
  const p=products.find(x=>x.id===id);
  const price=parseInt(prompt('價格',p.price)); if(!price)return;
  p.price=price;
  alert('修改成功'); renderAdminProducts();
}

function deleteProduct(id){
  if(!confirm('確認刪除?')) return;
  products=products.filter(x=>x.id!==id); renderAdminProducts();
}

document.addEventListener('DOMContentLoaded',()=>renderAdminProducts());
