from app import app, db
from app.models import *

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Reservation': Reservation, 'Trip':Trip, 'Route':Route, 'Company':Company, 'Car':Car}