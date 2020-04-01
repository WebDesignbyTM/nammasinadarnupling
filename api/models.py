from datetime import datetime
from app import db

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(64), index=True, unique=True)
  email = db.Column(db.String(128), index=True, unique=True)
  fullname = db.Column(db.String(128), index=True, unique=True)
  password_hash = db.Column(db.String(128))
  reservations = db.relationship('Reservation', backref='client', lazy='dynamic')

  def __repr__(self):
    return '<User {}>'.format(self.username)

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
  route_hash = db.Column(db.String(256), unique=True)
  trips = db.relationship('Trip', backref='route', lazy='dynamic')

  def __repr__(self):
    return '<Trip id {}>'.format(self.id)

class Company(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  company_name = db.Column(db.String(64), index=True, unique=True)
  company_cui = db.Column(db.String(128), unique=True)
  cars = db.relationship('Car', backref='company', lazy='dynamic')
  trips = db.relationship('Trip', backref='company', lazy='dynamic')

  def __repr__(self):
    return 'Company {}'.format(self.company_name)

class Car(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  brand = db.Column(db.String(64), index=True)
  features_hash = db.Column(db.String(256))
  company_id = db.Column(db.Integer, db.ForeignKey('company.id'))

  def __repr__(self):
    return '<Car id {}>'.format(self.id)