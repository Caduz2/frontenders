function showPage() {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1000);
}

function changeCards(card) {
  let login = document.getElementById('login');
  let lostpassword = document.getElementById('lost-card');

  if (card === 'recuperar') {
    lostpassword.classList.toggle('active');
    return login.classList.toggle('active');
  }

  login.classList.toggle('active');
  return lostpassword.classList.toggle('active');

}

//Adicionando as animações na list de necessidades
function startListAnimation(entries, observer) {
  entries.forEach(entry => {
    var listItems = document.querySelectorAll('.list-item');
    if (entry.isIntersecting) {
      return listItems.forEach((item, index) => setTimeout(() => item.classList.add('showElement'), index * 600));
    }

    return listItems.forEach((item, index) => setTimeout(() => item.classList.remove('showElement')));
  })
}

//observer options
var options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
}

function init() {
  let observer = new IntersectionObserver(startListAnimation, options);
  let need = document.getElementById('need-section');
  if (need) observer.observe(need);

  //remove the jump when opening the modal
  //var btnModal = document.getElementsByClassName('no-jump');

  //for (btn of btnModal)
  //btn.addEventListener('click', (evt) => { evt.preventDefault(); console.log("Event") });
}



//Validação de formulario para login e recuperação de senha

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

function resetInputs(...inputs) {
  inputs.forEach(input => input.value = '');
}

function loginSubmit(evt) {
  evt.preventDefault();

  const emailLogin = document.getElementById('emailLogin');
  const senhaLogin = document.getElementById('password');
  const message = document.getElementById('messageErrorLogin');

  if (emailLogin === null || senhaLogin === null) return console.log('Campos não encontrados!');

  //remove display none da mesagem
  message.classList.toggle('d-none');

  //adiciona a classe com a animação de entrada
  setTimeout(() => message.classList.toggle('active'), 100);

  if (validatorEmail(emailLogin.value) && validatorPassword(senhaLogin.value)) {
    //exibe a caixa de mensagem
    resetInputs(emailLogin, senhaLogin);
    message.innerText = "Login realizado com sucesso!";

    return setTimeout(() => {
      message.classList.toggle('active');
      window.location.reload();
    }, 2000);
  } else {
    message.classList.toggle('alert-success');
    message.classList.toggle('alert-danger');
    message.innerText = 'Erro ao verificar as informações digitadas';

    //timer to remove the message
    return setTimeout(() => {
      message.classList.toggle('alert-danger');
      message.classList.toggle('alert-success');
      message.classList.toggle('active');

      setTimeout(() => message.classList.toggle('d-none'), 1000);
    }, 3000)
  }
}


function recuperacaoSubmit(evt) {
  const emailRecuperacao = document.getElementById('emailRecuperacao');
  const message = document.getElementById('messageErrorRecuperacao');

  if (emailRecuperacao === null) return console.log('Campo não encontrado!');

  message.classList.toggle('active');

  if (validatorEmail(emailRecuperacao.value)) {
    message.innerText = 'Email de recuperação enviado com sucesso!';
  } else {
    message.innerText = 'Email inválido, verifique as informações digitadas';
  }
}

document.getElementById('loginForm').addEventListener('submit', loginSubmit);
document.getElementById('recuperacaoForm').addEventListener('submit', recuperacaoSubmit);
init();
