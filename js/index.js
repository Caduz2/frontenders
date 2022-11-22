function showPage() {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1000);
}

function changeCards(card) {
  let login = document.getElementById('login');
  let lostpassword = document.getElementById('lost-card');

  if (card === 'recuperar') {
    lostpassword.classList.toggle('hide-card');
    return login.classList.toggle('hide-card');
  }

  login.classList.toggle('hide-card');
  return lostpassword.classList.toggle('hide-card');

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
  var btnModal = document.getElementsByClassName('no-jump');

  for (btn of btnModal)
    btn.addEventListener('click', (evt) => { evt.preventDefault(); console.log("Event") });
}

init();
