import axios from 'axios'


//USER

export const userRegister = payload => {
	return axios
	.post('/register/', {
		"username": payload.username,
		"password": payload.password,
		"email": payload.email,
		"fullname":payload.fullname
	})
}

export const userLogin = payload => {
	return axios
	.post('/login/', {
		"username": payload.username,
		"password": payload.password,
		"remember": payload.remember
	})
}
export const userLogout = payload => {
	return axios
	.post('/logout/', {

	})
}

export const userLogged = payload => {
	return axios
	.get('/is_user_logged/',{

	}).then(res=>{
		return res.data;
	})
}

export const userData = payload => {
	return axios
	.get('/get_user_data/',{

	}).then(res=>{
		return res.data;
	})
}
