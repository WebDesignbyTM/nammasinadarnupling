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
  # trip = db.relationship
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

  def __repr__(self):
    return '<Reservation id {}>'.format(self.id)