from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///temperature_data.db'
db = SQLAlchemy(app)


class TemperatureData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    temperature = db.Column(db.Float)
    humidity = db.Column(db.Float)


@app.route("/")
def client():
    return ""


@app.route('/api/temperatures', methods=['GET'])
def get_all_temperature():
    data = TemperatureData.query.all()

    temperature_list = []
    for entry in data:
        temperature_list.append({
            'id': entry.id,
            'date': entry.date.strftime('%Y-%m-%d'),
            'time': entry.time.strftime('%H:%M:%S'),
            'temperature': entry.temperature,
            'humidity': entry.humidity
        })

    return jsonify({'data': temperature_list})


@app.route('/api/temperature', methods=['POST'])
def add_temperature():
    data = request.get_json()

    try:
        date_object = datetime.strptime(data['date'], '%Y-%m-%d').date()
        time_object = datetime.strptime(data['time'], '%H:%M:%S').time()
    except ValueError:
        return jsonify({'error': 'Invalid date or time format'}), 400

    new_data = TemperatureData(
        date=date_object,
        time=time_object,
        temperature=data['temperature'],
        humidity=data['humidity']
    )

    db.session.add(new_data)
    db.session.commit()

    return jsonify({'message': 'Temperature data added successfully'}), 201


@app.route('/api/temperatures/<date>', methods=['GET'])
def get_temperature_by_date(date):
    try:
        date_object = datetime.strptime(date, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400

    data = TemperatureData.query.filter_by(date=date_object).all()

    temperature_list = []
    for entry in data:
        temperature_list.append({
            'id': entry.id,
            'date': entry.date.strftime('%Y-%m-%d'),
            'time': entry.time.strftime('%H:%M:%S'),
            'temperature': entry.temperature,
            'humidity': entry.humidity
        })

    return jsonify({'data': temperature_list})


if __name__ == "__main__":
    with app.app_context():
        print(f"Database URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
        db.create_all()
        app.run(debug=True)

with app.app_context():
    db.create_all()
