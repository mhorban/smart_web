# Copyright (C) Marian Horban - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Marian Horban <m.horban@gmail.com>

import xmlrpclib
import json
import flask
import flask_restful
import flask_login
from flask_restful import reqparse

from smart_web import app
from smart_web import api


xmlrpc_server = xmlrpclib.ServerProxy(app.config['XMLRPC_SERVER_ADDR'])


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


BASE_URL = "/api"


class ObjectListApi(flask_restful.Resource):
    #@flask_login.login_required
    def get(self):
        return getattr(xmlrpc_server, self.xmlrpc_method_prefix + '_list')()

    #@flask_login.login_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, location='json')
        args = parser.parse_args(strict=True)
        return getattr(xmlrpc_server, self.xmlrpc_method_prefix + '_add')(args.name, {})


class ObjectApi(flask_restful.Resource):
    #@flask_login.login_required
    def get(self, name):
        return getattr(xmlrpc_server, self.xmlrpc_method_prefix + '_get')(name)

    #@flask_login.login_required
    def put(self, name):
        return getattr(xmlrpc_server, self.xmlrpc_method_prefix + '_edit')(name, flask.request.data)

    #@flask_login.login_required
    def delete(self, name):
        return getattr(xmlrpc_server, self.xmlrpc_method_prefix + '_delete')(name)


class RoomListApi(ObjectListApi):
    xmlrpc_method_prefix = 'room'

    #STUB METHOD - REMOVE ME
    # def get(self):
    #     return [
    #         {'name': 'Aula'},
    #         {'name': 'Small Room'},
    #         {'name': 'Kitchen'},
    #         {'name': 'Bath'},
    #         {'name': 'Living room'},
    #         {'name': 'Toilet'}
    #     ]


class RoomApi(ObjectApi):
    xmlrpc_method_prefix = 'room'


class SensorListApi(ObjectListApi):
    xmlrpc_method_prefix = 'sensor'

    def get(self):
        return [
            {
                'name': 'temp1',
                'description': 'Temperature sensor',
                'room': 'Aula',
                'value': 18.0
            }, {
                'name': 'hum_1_aula',
                'description': 'Humidity sensor',
                'room': 'Aula',
                'value': 55.0
            }, {
                'name': 'temp2',
                'description': 'Temperature sensor',
                'room': 'Living room',
                'value': 20.0
            }, {
                'name': 'hum2',
                'description': 'Humidity sensor',
                'room': 'Living room',
                'value': 70.0
            }
        ]


class SensorApi(ObjectApi):
    xmlrpc_method_prefix = 'sensor'


class DeviceListApi(ObjectListApi):
    xmlrpc_method_prefix = 'device'

    def get(self):
        return [
            {
                'name': 'dev_damper_1',
                'description': 'Electric Damper',
                'room': 'Aula',
                'state': 'Turn On',
                'operations': [{
                    'name': 'Turn On',
                    'url': '/generated_url/<operation_name>'
                }, {
                    'name': 'Turn Off',
                    'url': '/generated_url/<operation_name>'
                }]
            }, {
                'name': 'dev_heater1',
                'description': 'Electric Heater',
                'room': 'Aula',
                'state': 'Turn On',
                'operations': [{
                    'name': 'Turn On',
                    'url': '/generated_url/<operation_name>'
                }, {
                    'name': 'Turn Off',
                    'url': '/generated_url/<operation_name>'
                }]
            }, {
                'name': 'dev_damper_2',
                'description': 'Electric Damper',
                'room': 'Living room',
                'state': 'Turn Off',
                'operations': [{
                    'name': 'Turn On',
                    'url': '/generated_url/<operation_name>'
                }, {
                    'name': 'Turn Off',
                    'url': '/generated_url/<operation_name>'
                }]
            }, {
                'name': 'dev_heater2',
                'description': 'Electric Heater',
                'room': 'Living room',
                'state': 'Turn Off',
                'operations': [{
                    'name': 'Turn On',
                    'url': '/generated_url/<operation_name>'
                }, {
                    'name': 'Turn Off',
                    'url': '/generated_url/<operation_name>'
                }]
            }
        ]


class DeviceApi(ObjectApi):
    xmlrpc_method_prefix = 'device'


class RuleListApi(ObjectListApi):
    xmlrpc_method_prefix = 'rule'

    def get(self):
        return [
            {
                'name': 'manage_humidity_Aula',
                'description': 'Manage Humidity in Aula',
                'formula': 'sensor:hum_1_aula < 60',
                'handlers': [{
                    'device': 'dev_damper_1',
                    'operation': 'Turn On',
                }]
            }, {
                'name': 'manage_temp_Aula',
                'description': 'Manage Temperature in Aula',
                'formula': 'sensor:temp1 < 18',
                'handlers': [{
                    'device': 'dev_heater2',
                    'operation': 'Turn On',
                }]
            }
        ]


class RuleApi(ObjectApi):
    xmlrpc_method_prefix = 'rule'


api.add_resource(RoomListApi, '{0}/room/'.format(BASE_URL), endpoint='room_list')
api.add_resource(RoomApi, '{0}/room/<string:name>'.format(BASE_URL), endpoint='room')

api.add_resource(SensorListApi, '{0}/sensor/'.format(BASE_URL), endpoint='sensor_list')
api.add_resource(SensorApi, '{0}/sensor/<string:name>'.format(BASE_URL), endpoint='sensor')

api.add_resource(DeviceListApi, '{0}/device/'.format(BASE_URL), endpoint='device_list')
api.add_resource(DeviceApi, '{0}/device/<string:name>'.format(BASE_URL), endpoint='device')

api.add_resource(RuleListApi, '{0}/rule/'.format(BASE_URL), endpoint='rule_list')
api.add_resource(RuleApi, '{0}/rule/<string:name>'.format(BASE_URL), endpoint='rule')
