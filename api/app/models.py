from datetime import datetime
from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(UserMixin, db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(64), index=True, unique=True)
  email = db.Column(db.String(128), index=True, unique=True)
  fullname = db.Column(db.String(128), index=True, unique=True)
  password_hash = db.Column(db.String(128))
  reservations = db.relationship('Reservation', backref='client', lazy='dynamic')
  user_type = db.Column(db.String(64))
  company = db.relationship('Company', backref='user', lazy='dynamic')

  def __repr__(self):
    return '<User {}>'.format(self.username)

  def set_password(self, password):
    self.password_hash = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password_hash, password)

@login.user_loader
def load_user(id):
  return User.query.get(int(id))



class Reservation(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  date = db.Column(db.DateTime, index=True, default=datetime.utcnow)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  trip_id = db.Column(db.Integer, db.ForeignKey('trip.id'))

  def __repr__(self):
    return '<Reservation id {}>'.format(self.id)

class Trip(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  time = db.Column(db.DateTime, index=True, default=datetime.utcnow)
  reservations = db.relationship('Reservation', backref='trip', lazy='dynamic')
  route_id = db.Column(db.Integer, db.ForeignKey('route.id'))
  company_id = db.Column(db.Integer, db.ForeignKey('company.id'))

  def __repr__(self):
    return '<Trip id {}>'.format(self.id)

class Route(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  trips = db.relationship('Trip', backref='route', lazy='dynamic')
  legs = db.relationship('Leg', backref='route', lazy='dynamic')

  def __repr__(self):
    return '<Route id {}>'.format(self.id)

class Leg(db.Model):
  leg_no = db.Column(db.Integer, primary_key=True)
  route_id = db.Column(db.Integer, db.ForeignKey('route.id'), primary_key=True)
  stop_id = db.Column(db.Integer, db.ForeignKey('stop.id'))

  def __repr__(self):
    return '<Leg no. {} for route id {}>'.format(self.leg_no, self.route_id)

class Stop(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(64), index=True, unique=True)

  def __repr__(self):
    return '<Stop {}>'.format(self.name)


class Company(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  company_name = db.Column(db.String(64), index=True, unique=True)
  company_cui = db.Column(db.String(128), unique=True)
  company_phone = db.Column(db.String(64))
  company_email = db.Column(db.String(64))
  company_address = db.Column(db.String(128))
  cars = db.relationship('Car', backref='company', lazy='dynamic')
  trips = db.relationship('Trip', backref='company', lazy='dynamic')
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

  def __repr__(self):
    return 'Company {}'.format(self.company_name)

class Car(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  brand = db.Column(db.String(64), index=True)
  features_hash = db.Column(db.String(256))
  company_id = db.Column(db.Integer, db.ForeignKey('company.id'))

  def __repr__(self):
    return '<Car id {}>'.format(self.id)