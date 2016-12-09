import flask

from smart_web import app


@app.route('/')
@app.route('/index')
def index():
    return flask.render_template('index.html', entries=[
        {'title': 'Title1', 'text': 'Text1'},
        {'title': 'Title2', 'text': 'Text2'},
    ])


def valid_login(username, password):
    return True


@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    if flask.request.method == 'POST':
        if valid_login(flask.request.form['username'],
                       flask.request.form['password']):
            flask.session['username'] = flask.request.form.get('username')
            return flask.redirect(flask.url_for('index'))
            #return log_the_user_in(request.form['username'])
        else:
            error = 'Invalid username/password'
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return flask.render_template('login.html', error=error)