let email = document.getElementById("email");
let password = document.getElementById("password");
let nome = document.getElementById("name");
let cep = document.getElementById("cep");
let form = document.querySelector("form");
let textName = document.getElementById("textName")
let textCep = document.getElementById("textCep")
let textForm = document.getElementById("textForm");
let textEmail = document.getElementById("textEmail");
let textPassword = document.getElementById("textPassword");

//Condições de cadastro
form.addEventListener("submit", (e) => {
  if (email.value == "" && password.value == "" && cep.value == "" && 
  nome.value == "") {
    textForm.textContent = "Você precisa preencher todos os campos!";
  } else if (
    validatorEmail(email.value) === true &&
    validatorPassword(password.value) === true &&
    validatorCep(cep.value) === true
  ) {
    alert('Cadastro efetuado com sucesso.')
    console.log(email.value);
    console.log(password.value);
    console.log(nome.value);
    console.log(cep.value);
    textForm.textContent = "";
    textEmail.textContent = "";
    textPassword.textContent = "";
  } else {
    alert("Requisição não atendida");
  }

  e.preventDefault();
});
//Verifica o formato do email a cada tecla digitada 
email.addEventListener("keyup", () => {
  if (validatorEmail(email.value) !== true) {
    textEmail.textContent = "Formato inválido.";
  } else {
    textEmail.textContent = "";
  }
});

//Verifica o formato da senha a cada tecla digitada 
password.addEventListener("keyup", () => {
  if (validatorPassword(password.value) !== true) {
    textPassword.textContent =
      "Formato inválido.";
  } else {
    textPassword.textContent = "";
  }
});

//função de validação com expressões regulares
function validatorEmail(email) {
  let emailPattern =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailPattern.test(email);
}

function validatorPassword(password) {
  let passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return passwordPattern.test(password);
}
//funções para coletar e tratar o cep
const limparFormulario = (endereco) =>{
  document.getElementById('endereco').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}


const preencherFormulario = (endereco) =>{
  document.getElementById('endereco').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
  limparFormulario();
  
  const cep = document.getElementById('cep').value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)){
      const dados = await fetch(url);
      const endereco = await dados.json();
      if (endereco.hasOwnProperty('erro')){
          document.getElementById('endereco').value = 'CEP não encontrado!';
      }else {
          preencherFormulario(endereco);
      }
  }else{
      document.getElementById('endereco').value = 'CEP incorreto!';
  }
}
cep.addEventListener('focusout',pesquisarCep);