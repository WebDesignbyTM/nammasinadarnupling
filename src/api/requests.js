import axios from 'axios'


//USER

export const userRegister = newUser => {
	return axios
	.post('/register/', {
		"username": newUser.username,
		"password": newUser.password,
		"email": newUser.email,
		"fullname":newUser.fullname
	})
	.then(res => {
		console.log(res);
	})
}
