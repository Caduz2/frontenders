function showPage() {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1000);
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
  btnModal[0].addEventListener('click', (evt) => { evt.preventDefault(); console.log("Event") })
}

init();
