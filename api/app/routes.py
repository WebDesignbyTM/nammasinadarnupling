from app import app, db
from flask_login import logout_user, login_required, current_user, login_user
from app.models import User, Stop, Leg, Route, Trip, Company, Car, Reservation, Pattern
from flask import jsonify, request, json, make_response
from datetime import datetime, date, timedelta
from sqlalchemy import *
import sqlalchemy

@app.route('/login/', methods=['POST'])
def user_login():
	data = request.get_json()
	user = User.query.filter_by(username=data['username']).first()
	if user and user.check_password(data['password']):
		login_user(user);
		return make_response("User "+user.username+" logged in", 200);
	return make_response("Username/password incorrect", 269)


@login_required
@app.route('/logout/', methods=['POST'])
def logout():
    logout_user()
    return 'User logged out'

@app.route('/register/', methods=['POST'])
def register():
	data = request.get_json()
	print(data)
	try:
		user = User(username=data['username'], email=data['email'], fullname=data['fullname'], user_type=data['usertype'])
		user.set_password(data['password'])
		db.session.add(user)
		db.session.commit()
		return make_response('User successfully registered', 200)
	except sqlalchemy.exc.IntegrityError:
		db.session.rollback()
		return make_response('User data not correct', 269)

@app.route('/register_company/', methods=['POST'])
def register_company():
	data=request.get_json()
	print(current_user.is_authenticated)
	if current_user.is_authenticated != True:
		return make_response('No owner for company', 269)

	try:
		company=Company(company_name=data['name'], company_cui=data['cui'], company_phone=data['phone'],
			company_email=data['email'], company_address=data['address'], user_id=current_user.id)
		db.session.add(company)
		db.session.commit()
		return make_response('Company successfully registered', 200)
	except sqlalchemy.exc.IntegrityError:
		db.session.rollback()
		return make_response('Company data not correct', 269)

@app.route('/is_user_logged/')
def is_user_logged():
	res={"logged":current_user.is_authenticated}
	return res

@app.route('/get_user_data/')
def get_user_data():
	try:
		res={
		"name":current_user.username,
		"email":current_user.email,
		"fullname":current_user.fullname,
		"usertype":current_user.user_type
		}
		return res
	except AttributeError:
		return make_response('Login required for operation', 440)

@app.route('/edit_user_data/', methods=['PUT'])
def edit_user_data():
	data=request.get_json()
	password=data['password']
	data.pop('password', None)
	user=User.query.filter_by(id=current_user.id)
	user.update(data, synchronize_session=False)
	user.first().set_password(password)
	db.session.commit();
	return 'User data updated'

@app.route('/get_req_subtrips/', methods=['GET'])
def get_req_subtrips():
	data = request.args.getlist('stop[]')
	try:
		data = list(map(eval, data))
		stop = []
		[stop.append(Stop.query.filter_by(id=x['id']).first()) for x in data]
	except NameError:
		return make_response('Input is corrupted', 400)
	except Exception as ex:
		print(ex)
		return make_response('An error ocurred', 500)

	try:
		legs = Leg.query.filter_by(stop_id=stop[0].id).all()
	except AttributeError:
		return make_response('There is no route that starts with ' + data[0], 404)
	except IndexError:
		return make_response('Please input valid stops', 400)

	routes = set()
	found_routes = []
	[routes.add(x.route_id) for x in legs]

	for x in routes:
		prev_leg = Leg.query.filter(Leg.route_id == x, Leg.stop_id == stop[0].id).order_by(Leg.leg_no).first()
		for y in stop[1:]:
			try:
				prev_leg = Leg.query.filter(Leg.route_id == x, Leg.stop_id == y.id, Leg.leg_no > prev_leg.leg_no).order_by(Leg.leg_no).first()
			except AttributeError:
				prev_leg = None

			if prev_leg == None:
				break
		if prev_leg != None:
			found_routes.append(x)

	res = []
	for x in found_routes:
		[res.append({'trip': y.id, 'company': y.company_id, 'route': y.route_id }) for y in Trip.query.filter(Trip.route_id == x).all()]
	response = make_response(jsonify(res), 200)
	return response

@app.route('/get_companies/', methods=['GET'])
def get_companies():
	data = request.args.get('name')
	try:
		found_comp = Company.query.filter(Company.company_name.contains(data)).all()
	except sqlalchemy.exc.ArgumentError:
		return make_response('Please input values', 400)
	res = []
	for x in found_comp:
		cars = Car.query.filter(Car.company_id == x.id).all()
		trips = []
		[ trips.append(y.id) for y in Trip.query.filter(Trip.company_id == x.id).all() ]
		res.append({
			'id': x.id,
			'company_name': x.company_name,
			'company_cui': x.company_cui,
			'company_phone':x.company_phone,
			'company_email':x.company_email,
			'company_address':x.company_address,
			'cars': cars,
			'trips': trips
		})
	return make_response(jsonify(res), 200)

@login_required
@app.route('/make_reservation/', methods=['POST'])
def makeReservation():
	data = request.get_json()['trip_id']
	try:
		pattern = Pattern.query.filter(Pattern.trip_id==data).first()
		new_reservation = Reservation(user_id=current_user.id, trip_id=data)
		if pattern != None:
			new_reservation.date = pattern.date_time
		db.session.add(new_reservation)
		db.session.commit()
	except Exception as ex:
		print(ex)
		db.session.rollback()
		return make_response('An error ocurred', 500)
	return make_response('Reservation successful', 200)

@login_required
@app.route('/get_user_companies/', methods=['GET'])
def getUserCompanies():
	try:
		companies = Company.query.filter(Company.user_id == current_user.id)
		res = []
		for x in companies:
			cars = Car.query.filter(Car.company_id == x.id).all()
			trips = []
			[ trips.append(y.id) for y in Trip.query.filter(Trip.company_id == x.id).all() ]
			res.append({
				'id': x.id,
				'company_name': x.company_name,
				'company_cui': x.company_cui,
				'company_phone':x.company_phone,
				'company_email':x.company_email,
				'company_address':x.company_address,
				'cars': cars,
				'trips': trips
			})
		return make_response(jsonify(res), 200)
	except:
		return make_response('An error ocurred', 500)

@app.route('/create_stop/', methods=['POST'])
def createStop():
	data = request.get_json()['name']
	try:
		newStop = Stop(name=data)
		db.session.add(newStop)
		db.session.commit()
		return make_response('Stop created successfully', 200)
	except Exception as ex:
		print(ex)
		db.session.rollback()
		return make_response('An error ocurred', 500)

@login_required
@app.route('/get_user_reservations/', methods=['GET'])
def getUserReservations():
	try:
		reservations = Reservation.query.filter(Reservation.user_id == current_user.id).all()
		res = []
		for x in reservations:
			res.append({
				"id": x.id,
				"date": x.date,
				"trip_id": x.trip_id
			})
		return make_response(jsonify(res), 200)
	except:
		print('Something went wrong...')
		return make_response('An error ocurred', 500)

@app.route('/delete_reservation/', methods=['DELETE'])
def deleteReservation():
	data = request.get_json()['id']
	try:
		reservation = Reservation.query.filter(Reservation.id == data).first()
		db.session.delete(reservation)
		db.session.commit()
		return make_response('Reservation deleted successfully', 200)
	except Exception as ex:
		print(ex)
		db.session.rollback()
		return make_response('An error ocurred', 500)
	return make_response('Reservation successful', 200)

@app.route('/get_stops/', methods=['GET'])
def get_stops():
	res=[]
	for stop in Stop.query.all():
		res.append({'name':stop.name, 'id':stop.id})
	return make_response(jsonify(res), 200)

@app.route('/create_pattern/', methods=['POST'])
def create_pattern():
	data=request.get_json()
	newPattern=Pattern(trip_id=data['trip_id'],
	recurring_type=data['recurring_type'])
	if data['recurring_type']=='none' :
		newPattern.date_time=datetime(data['date_time']['year'],
		data['date_time']['month'],
		data['date_time']['day'],
		data['date_time']['hour'],
		data['date_time']['minute'])
	else:
		newPattern.separation_count=data['separation_count']
		newPattern.minute_of_day=data['time_of_day']['hour']*60+data['time_of_day']['minute']
		if data['recurring_type']=='weekly':
			newPattern.day_of_week=data['day_of_week']
	try:
		db.session.add(newPattern)
		db.session.commit()
	except Exception as ex:
		print(ex)
		db.session.rollback()
		return make_response('An error ocurred', 500)
	return make_response('Pattern added', 200)

@app.route('/get_following_trip_dates/', methods=['GET'])
def get_following_trip_dates():
	data=request.get_json()
	trip=data['trip_id']
	duration=data['duration']
	res=[]
	for p in Pattern.query.filter(Pattern.trip_id==trip).all():
		if p.recurring_type == 'none':
			t=abs(p.date_time-datetime.today())
			if t <= timedelta(duration):
				res.append({"year":p.date_time.year,
				"month":p.date_time.month,
				"day":p.date_time.day,
				"hour":p.date_time.hour,
				"minute":p.date_time.minute})

	return make_response(jsonify(res), 200)

@app.route('/create_route/', methods=['POST'])
def create_route():
	r=Route()
	db.session.add(r)
	db.session.commit()
	data=request.get_json()
	stops=data['stops']
	for i in range(len(stops)):
		l=Leg(route_id=r.id, stop_id=stops[i], leg_no=i+1)
		try:
			db.session.add(l)
			db.session.commit()
		except Exception as ex:
			print(ex)
			db.session.rollback()
			return make_response('An error ocurred while processing route stops', 500)
	res={"routeid":r.id}
	return make_response(jsonify(res), 200)

@app.route('/create_trip/', methods=['POST'])
def create_trip():
	data=request.get_json()
	print(data)
	try:
		assert Company.query.filter(Company.id==data['company_id']).first().user_id==current_user.id
		t=Trip(company_id=data['company_id'], route_id=data['route_id'])
		db.session.add(t)
		db.session.commit()
		res={"tripid":t.id,"routeid":t.route_id}
		return make_response(jsonify(res), 200)
	except AssertionError:
		return make_response('Nu aveti permisiunile necesare', 403)
