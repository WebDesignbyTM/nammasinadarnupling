from app import app, db
from flask_login import logout_user, login_required, current_user, login_user
from app.models import User, Stop, Leg, Route, Trip
from flask import jsonify, request, json
from sqlalchemy import *

@app.route('/login/', methods=['POST'])
def user_login():
	data = request.get_json()
	user = User.query.filter_by(username=data['username']).first()
	if user.check_password(data['password']):
		login_user(user);
		return 'User '+user.username+' logged in';
	return 'User login failed'


@login_required
@app.route('/logout/', methods=['POST'])
def logout():
    logout_user()
    return 'User logged out'

@app.route('/register/', methods=['POST'])
def register():
	data = request.get_json()
	user = User(username=data['username'], email=data['email'], fullname=data['fullname'])
	user.set_password(data['password'])
	db.session.add(user)
	db.session.commit()
	return 'User successfully registered'

@app.route('/is_user_logged/')
def is_user_logged():
	res={"logged":current_user.is_authenticated}
	return res

@app.route('/get_user_data/')
def get_user_name():
	res={
	"name":current_user.username,
	"email":current_user.email,
	"fullname":current_user.fullname
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
	data = request.args.getlist('stop')
	print(data)
	stop = []
	for x in data:
		stop.append(Stop.query.filter_by(name=x).first())
	if len(stop) == 0:
		return 'nigga what'

	legs = Leg.query.filter_by(stop_id=stop[0].id).all()
	routes = set()
	found_routes = []
	for x in legs:
		routes.add(x.route_id)

	for x in routes:
		prev_leg = Leg.query.filter(Leg.route_id == x, Leg.stop_id == stop[0].id).order_by(Leg.leg_no).first()
		for y in stop[1:]:
			new_leg = Leg.query.filter(Leg.route_id == x, Leg.stop_id == y.id, Leg.leg_no > prev_leg.leg_no).order_by(Leg.leg_no).first()
			prev_leg = new_leg
			if prev_leg == None:
				break
		if prev_leg != None:
			found_routes.append(x)

	res = []
	for x in found_routes:
		aux = Trip.query.filter(Trip.route_id == x).all()
		for y in aux:
			res.append({
				'trip': y.id,
				'company': y.company_id,
				'route': y.route_id
				})
				
	return jsonify(res)
		
