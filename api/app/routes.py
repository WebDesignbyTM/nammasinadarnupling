from app import app, db
from flask_login import logout_user, login_required, current_user, login_user
from app.models import User
from flask import jsonify, request, json

@app.route('/login/', methods=['POST'])
def user_login():
	data = request.get_json()
	user = User.query.filter_by(username=data['username']).first()
	if user.check_password(data['password']):
		login_user(user);
		return 'User '+user.username+' logged in';
	return 'User login failed'


@login_required
@app.route('/logout/')
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