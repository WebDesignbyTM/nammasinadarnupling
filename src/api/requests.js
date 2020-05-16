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
	console.log(payload);
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
			"trip_id": payload.trip_id
		})
	return res.data
}

export const getUserCompanies = async () => {
	const res = await axios
		.get('/get_user_companies/')
	return res.data
}

export const createStop = async (payload) => {
	const res = await axios
		.post('/create_stop/', {
			"name": payload.name
		});
		return res.data;
}

export const getUserReservations = async () => {
	const res = await axios
		.get('/get_user_reservations/')
	return res.data;
}

export const deleteReservation = async payload => {
	const res = await axios
		.delete('/delete_reservation/', {
			data: { "id": payload.id }
		});
	return res;
}
export const getStops = async payload => {
	const res = await axios
	.get('/get_stops/')
	return res;
}
export const createRoute = async payload => {
	const res = await axios
	.post('/create_route/', {"stops":payload.stops})
	return res;
}
export const createTrip = async payload => {
	const res = await axios
	.post('/create_trip/', {"company_id":payload.company_id,"route_id":payload.route_id})
	return res;
}

export const createPattern = async payload => {
	console.log(payload)
		let aux={"trip_id":payload.trip_id,
		"recurring_type":"none",
		"date_time":{
			"year":payload.year,
			"month":payload.month,
			"day":payload.day,
			"hour":payload.hour,
			"minute":payload.minute
		}};
	const res = await axios
	.post('/create_pattern/', aux)
	return res;
}
