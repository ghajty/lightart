let adminUsers=[{username:'admin',password:'admin'}];
function loginAdmin(username,password){
  const user=adminUsers.find(x=>x.username===username && x.password===password);
  if(user) { alert('管理員登入成功'); showAdminPanel(); } 
  else alert('帳號或密碼錯誤');
}
function showAdminPanel(){
  const content=document.getElementById('adminContent');
  content.innerHTML=`
    <h2>商品管理</h2>
    <button onclick="addProduct()">新增商品</button>
    <div id="productListAdmin"></div>
  `;
  renderAdminProducts();
}
function renderAdminProducts(){
  fetch('data/products.json').then(res=>res.json()).then(products=>{
    const list=document.getElementById('productListAdmin');
    list.innerHTML='';
    products.forEach(p=>{
      const div=document.createElement('div');
      div.innerHTML=`${p.name} - $${p.price} 
      <button onclick="editProduct(${p.id})">編輯</button>
      <button onclick="deleteProduct(${p.id})">刪除</button>`;
      list.appendChild(div);
    });
  });
}
function addProduct(){ alert('模擬新增商品'); }
function editProduct(id){ alert('模擬編輯商品 '+id); }
function deleteProduct(id){ alert('模擬刪除商品 '+id); }
