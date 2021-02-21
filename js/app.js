let modal = null;
const focusableSelector = 'button, a, input, textarea';
let focusables = [];

const openModal = function(e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'));
    focusables = Array.from(modal.querySelector(focusableSelector));
    focusables[0].focus();
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const closeModal = function(e) {
    if(modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    target.setAttribute('aria-hidden','true');
    target.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
}

const stopPropagation = function(e) {
    e.stopPropagation();
}

const focusInModal = function(e) {
    e.preventDefault();
    //récupérer l'élément qui est focus actuellement
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
    //si la touche du clavier shift est appuyé
    if(e.shiftKey === true) {
        index--;
    } else {
        index++;
    }
    if(index >= focusables.length) {
        index = 0;
    }
    if(index < 0) {
        index = focusables.length -1;
    }
    focusables[index].focus();
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
}); 

//appuyer sur echap pour fermer la modal
window.addEventListener('keydown', function(e) {
    if(e.key ==="Escape" || e.key === "Esc"){
        closeModal(e);
    }

    //Mettre le focus que dans la modal quand on tabule
    if(e.key === 'Tab' && modal !== null) {
        focusInModal(e);
    }
});