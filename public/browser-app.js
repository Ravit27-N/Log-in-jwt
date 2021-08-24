const formDOM = document.querySelector('.form')
const usernameInputDOM = document.querySelector('#user_email')
const passwordInputDOM = document.querySelector('#user_password')

formDOM.addEventListener('submit', async (e) => {
  
  e.preventDefault()
  const email = usernameInputDOM.value
  const password = passwordInputDOM.value

    const { data } = await axios.post('/login', { email, password })

    formAlertDOM.classList.add('text-success')
    usernameInputDOM.value = ''
    passwordInputDOM.value = ''

    localStorage.setItem('token', data.token)
})

