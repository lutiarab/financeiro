const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

/*............................................................................................................................................................ */


 
 // Função para exibir o modal de login
function mostrarModal() {
  document.getElementById('login-modal').style.display = 'block';
}

// Função para fechar o modal de login
function fecharModal() {
  document.getElementById('login-modal').style.display = 'none';
}

// Fecha o modal ao clicar fora do conteúdo
window.onclick = function(event) {
  const modal = document.getElementById('login-modal');
  if (event.target === modal) {
      fecharModal();
  }
};