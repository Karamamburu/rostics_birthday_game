const onButtonClick = (event) => {
  if (event.target.classList.contains('normal-button')) {
    console.log('1');
  }
}

const modal = document.querySelector('.modalBackground');
modal.classList.add('hidden');