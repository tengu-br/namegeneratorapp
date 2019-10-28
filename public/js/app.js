const nameForm = document.querySelector('form')
const messageOne = document.querySelector('#paragraphOne')
const messageTwo = document.querySelector('#paragraphTwo')

nameForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // messageOne.textContent = ''
    // messageTwo.textContent = ''

    flair = 0

    if (document.querySelector('input[name=flair]:checked')) {
        flair = document.querySelector('input[name=flair]:checked').value;
    }

    fetch('/generate?flair=' + flair).then((response) => {
        response.json().then(({ error, name, info}) => {
            if (error) {
                messageOne.textContent = error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = info
                messageTwo.textContent = name
            }
        })
    })
})

// nameForm.addEventListener('click', (e) => {


//     // messageOne.textContent = ''
//     // messageTwo.textContent = ''

//     flair = 0

//     if (document.querySelector('input[name=flair]:checked')) {
//         flair = document.querySelector('input[name=flair]:checked').value;
//     }

//     fetch('/info?flair=' + flair).then((response) => {
//         response.json().then(({ error, info }) => {
//             if (error) {
//                 messageOne.textContent = error
//                 messageTwo.textContent = ''
//             } else {
//                 messageOne.textContent = info
//                 messageTwo.textContent = ''
//             }
//         })
//     })
// })