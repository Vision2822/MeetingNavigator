from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Backend for Meeting Navigator is running!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)