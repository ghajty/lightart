let users = JSON.parse(localStorage.getItem('catlamp_users')||'[]');
const loginModal=document.getElementById('loginModal');
document.getElementById('loginBtn').onclick=()=>loginModal.style.display='block';
document.getElementById('closeLogin').onclick=()=>loginModal.style.display='none';

document.getElementById('loginSubmit').onclick=()=>{
  const u=document.getElementById('username').value;
  const p=document.getElementById('password').value;
  const user=users.find(x=>x.username===u && x.password===p);
  if(user){ alert('登入成功'); loginModal.style.display='none'; } 
  else alert('帳號或密碼錯誤');
};

document.getElementById('registerSubmit').onclick=()=>{
  const u=document.getElementById('username').value;
  const p=document.getElementById('password').value;
  if(users.find(x=>x.username===u)){ alert('帳號已存在'); return; }
  users.push({username:u,password:p});
  localStorage.setItem('catlamp_users',JSON.stringify(users));
  alert('註冊成功');
};
