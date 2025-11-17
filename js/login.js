let usersList=[]; fetch('data/users.json').then(r=>r.json()).then(d=>usersList=d);

function login(){
  const username=document.getElementById('username').value;
  const password=document.getElementById('password').value;
  const u=usersList.find(x=>x.username===username && x.password===password);
  if(!u){alert('帳號或密碼錯誤');return;}
  localStorage.setItem('catlamp_user',JSON.stringify(u));
  alert('登入成功'); window.location.href='index.html';
}

function register(){
  const username=document.getElementById('username').value;
  const password=document.getElementById('password').value;
  if(usersList.some(x=>x.username===username)){alert('帳號已存在');return;}
  const id=Math.max(...usersList.map(x=>x.id))+1;
  const newUser={id,username,password,role:'user'};
  usersList.push(newUser);
  localStorage.setItem('catlamp_user',JSON.stringify(newUser));
  alert('註冊成功'); window.location.href='index.html';
}
