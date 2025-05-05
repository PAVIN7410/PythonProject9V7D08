from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/quote')
def get_quote():
    try:
        response = requests.get('https://zenquotes.io/api/random')
        response.raise_for_status()
        data = response.json()
        if data:
            # Возвращаем только нужные поля
            quote = {
                'q': data[0]['q'],
                'a': data[0]['a']
            }
            return jsonify(quote)
        else:
            return jsonify({'q': 'Ошибка загрузки цитаты', 'a': ''}), 500
    except requests.RequestException:
        return jsonify({'q': 'Ошибка при обращении к API', 'a': ''}), 500

if __name__ == '__main__':
    app.run(debug=True)