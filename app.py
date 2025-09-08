from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

API_KEY = "101f9808c4ab98fbc21cf405da67bc0f"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if data.get("cod") != 200:
        return jsonify({"error": data.get("message", "Error fetching weather")}), 400

    weather_info = {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "description": data["weather"][0]["description"],
        "icon": data["weather"][0]["icon"]
    }
    return jsonify(weather_info)

if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, request, jsonify, render_template