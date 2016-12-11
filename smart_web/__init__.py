# Copyright (C) Marian Horban - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Marian Horban <m.horban@gmail.com>

from flask import Flask
from flask_restful import Api
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object('smart_web.default_settings')
api = Api(app)

login_manager = LoginManager() # Used by @login_required
login_manager.init_app(app)
login_manager.login_view  = '/login'

import smart_web.views
