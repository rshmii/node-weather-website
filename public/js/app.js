

//API to fetch data

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo  = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...' //to change the content
    messageTwo.textContent = ''

    //fetch('http://localhost:3000/weather?address=' + location).then((response) => {  //for local 
    fetch('/weather?address=' + location).then((response) => {  //for heroku
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })  
})