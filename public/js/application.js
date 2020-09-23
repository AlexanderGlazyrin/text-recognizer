const form = document.querySelector('#send-image')
const readBtn = document.querySelector('#read-btn')
const stopBtn = document.querySelector('#cancel-read')
const textContainer = document.querySelector('#text-container')
const synth = window.speechSynthesis
const progress = document.querySelector('.progress')
const bottomBtns = document.querySelector('.btn-bottom')
const selFile = document.querySelector('#file')
const startBtn = document.querySelector('#start')
let text = ''

function speak(text) {
  const message = new SpeechSynthesisUtterance()
  message.lang = 'ru-RU'
  message.text = text
  synth.speak(message)
}

// selFile.addEventListener('change', () => {
//   startBtn.classList.add('show')
//   startBtn.classList.remove('hide')
// })

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  textContainer.innerHTML = ''
  const file = document.getElementById('file').files[0]
  if (!file) return

  const { method, action } = form

  const data = new FormData()
  data.append('file', file)

  progress.classList.add('show')
  progress.classList.remove('hide')

  const response = await fetch(action, {
    method,
    body: data,
  })

  const answer = await response.json()
  progress.classList.add('hide')
  progress.classList.remove('show')
  bottomBtns.classList.remove('hide')
  bottomBtns.classList.add('show')

  text = answer.text.split('\n')
  text.forEach((el) => {
    textContainer.innerHTML += `${el}<br>`
  })
  form.reset()
})

readBtn.addEventListener('click', () => {
  speak(text)
})

stopBtn.addEventListener('click', () => {
  synth.cancel()
})
