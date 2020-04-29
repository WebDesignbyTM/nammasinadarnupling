from app import app, db
from flask_login import logout_user, login_required, current_user, login_user
from app.models import User, Stop, Leg, Route, Trip, Company, Car, Reservation
from flask import jsonify, request, json, make_response
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

@app.route('/is_user_logged/')
def is_user_logged():
	res={"logged":current_user.is_authenticated}
	return res

@app.route('/get_user_data/')
def get_user_data():
	res={
	"name":current_user.username,
	"email":current_user.email,
	"fullname":current_user.fullname,
	"usertype":current_user.user_type
	}
	return res

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
	stop = []
	[stop.append(Stop.query.filter_by(name=x).first()) for x in data]

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
	data = request.args.get('id')
	print(data)
	try:
		new_reservation = Reservation(user_id=current_user.id, trip_id=data)
		db.session.add(new_reservation)
		db.session.commit()
	except:
		print('coae nu')
		db.session.rollback()
		return make_response('fut-o', 500)
	return make_response('xd', 200)