import axios from 'axios'

async function registerUser (userData) {
  // 요청할 URL
  const url = 'http://localhost:3000/user/signup'
  return axios.post(url, userData)
}

async function getUserData () {
  axios.get('/user/admin')
    .then(res => {
      console.log(`email: ${res.email}`)
      console.log(`name: ${res.name}`)
      console.log(`regDate: ${res.createdAt}`)
    })
}

export { registerUser, getUserData }
