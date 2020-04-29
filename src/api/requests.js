import axios from 'axios'


//USER

export const userRegister = payload => {
	return axios
	.post('/register/', {
		"username": payload.username,
		"password": payload.password,
		"email": payload.email,
		"fullname":payload.fullname,
		"usertype":payload.userType
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

export const userLogged = async payload => {
	const res = await axios
		.get('/is_user_logged/', {})
	return res.data
}

export const userData = async payload => {
	const res = await axios
		.get('/get_user_data/', {})
	return res.data
}

export const userEditData = payload => {
	return axios
	.put('/edit_user_data/',{
		"username": payload.username,
		"password": payload.password,
		"email": payload.email,
		"fullname":payload.fullname
	})
}

export const getReqSubtrips = async payload => {
	const res = await axios
		.get('/get_req_subtrips/', {
			params: { stop: payload.stops }
		})
	return res.data
}

export const getCompanies = async payload => {
	const res = await axios
		.get('/get_companies/', {
			params: { name: payload.name }
		})
	return res.data
}

export const registerCompany = async payload => {
	const res = await axios
	.post('/register_company/', {
		"name":payload.name,
		"cui":payload.cui,
		"phone":payload.phone,
		"email":payload.email,
		"address":payload.address
	})
	return res
}
export const makeReservation = async payload => {
	const res = await axios
		.post('/make_reservation/', {
			params: { trip_id: payload.trip_id }
		})
	return res.data
}
