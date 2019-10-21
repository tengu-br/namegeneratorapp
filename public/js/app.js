const nameForm = document.querySelector('form')
const messageOne = document.querySelector('#paragraphOne')
const messageTwo = document.querySelector('#paragraphTwo')

nameForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = ''
    messageTwo.textContent = ''
    flair = 1

    if(document.querySelector('input[name=flair]:checked')){
        flair = document.querySelector('input[name=flair]:checked').value;
    }
    console.log(flair)

    fetch('/generate?flair=' + flair).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = ''
                const msg = data.name
                messageTwo.textContent = msg
            }
        })
    })
})