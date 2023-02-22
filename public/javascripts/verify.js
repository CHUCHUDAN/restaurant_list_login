const form = document.querySelector('.edit-form')
const submitButton = document.querySelector('.submit-btn')

submitButton.addEventListener('click', () => {
  form.classList.add('was-validated');
})

form.addEventListener('submit', (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
})