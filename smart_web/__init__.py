from flask import Flask

app = Flask(__name__)
app.config.from_object('smart_web.default_settings')

import smart_web.views
