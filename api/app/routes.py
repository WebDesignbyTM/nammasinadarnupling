from app import app, db
from flask_login import logout_user, login_required, current_user, login_user
from app.models import User
from flask import jsonify, request, json, make_response
from sqlalchemy.exc import IntegrityError

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
	except IntegrityError:
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
