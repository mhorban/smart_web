// Copyright (C) Marian Horban - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Marian Horban <m.horban@gmail.com>

function Model(controller) {
    this.controller = controller;
    this.rooms = new Rooms();
    this.sensors = new Sensors();
    this.devices = new Devices();
    this.rules = new Rules();
}

Model.prototype.Init = function() {
    this.rooms.InitList();
    this.sensors.InitList();
    this.devices.InitList();
    this.rules.InitList();
};

function BaseModel() {
    this.array = [];
    this.controller = null;
}

BaseModel.prototype.InitList = function() {
    var self = this;
    $.ajax({
        url: this.url_base
    })
    .done(function(list_data) {
        //console.log("Sample of data:", self, self._test);
        //self.InitListCb(data);
        for(var data in list_data) {
            self.array.push(new self.array_class(list_data[data]));
        }
        self.ModelChangedCb();
    })
    .fail(function() {
        console.log("Error:", this);
        alert( "error" );
    });
};

BaseModel.prototype.AddNew = function(data) {
    var self = this;
    $.ajax({
        url: this.url_base + "new/",
        type: "POST",
        data: data
    })
    .done(function(resp_data) {
        //console.log("Sample of data:", self, self._test);
        self.array.push(new self.array_class(resp_data));
        self.ModelChangedCb();
    })
    .fail(function() {
        console.log("Error:", this);
        alert( "error" );
    });
};

BaseModel.prototype.Edit = function(name, data) {
    var self = this;
    $.ajax({
        url: this.url_base + name,
        type: "POST",
        data: data
    })
    .done(function(resp_data) {
        //console.log("Sample of data:", self, self._test);
        self.array = $.grep(self.array, function(value) {
            return value.name != name;
        });
        self.array.push(new self.array_class(resp_data));
        self.ModelChangedCb();
    })
    .fail(function() {
        console.log("Error:", this);
        alert( "error" );
    });
};

BaseModel.prototype.Remove = function(name) {
    var self = this;
    $.ajax({
        url: this.url_base + name,
        type: 'DELETE'
    })
    .done(function(data) {
        //console.log("Sample of data:", self, self._test);
        self.array = $.grep(self.array, function(value) {
            return value.name != name;
        });
        self.ModelChangedCb();
    })
    .fail(function() {
        console.log("Error:", this);
        alert( "error" );
    });
};

function Rooms(controller) {
    BaseModel.apply(this, arguments);
    this.url_base = "api/room/";
    this.array_class = Room;
    this.controller = controller;
}

Rooms.prototype = Object.create(BaseModel.prototype);
Rooms.prototype.constructor = Rooms;

Rooms.prototype.ModelChangedCb = function() {
    this.controller.RedrawRooms();
};

function Room(room_data) {
    this.name = room_data.name;
}

function Sensors(controller) {
    BaseModel.apply(this, arguments);
    this.url_base = "api/sensor/";
    this.array_class = Sensor;
    this.controller = controller;
}

Sensors.prototype = Object.create(BaseModel.prototype);
Sensors.prototype.constructor = Sensors;

Sensors.prototype.ModelChangedCb = function() {
    this.controller.RedrawSensors();
};

function Sensor(sensor_data) {
    this.name = sensor_data.name;
    this.description = sensor_data.description;
    this.room = sensor_data.room;
    this.value = sensor_data.value;
}

function Devices(controller) {
    BaseModel.apply(this, arguments);
    this.url_base = "api/device/";
    this.array_class = Device;
    this.controller = controller;
}

Devices.prototype = Object.create(BaseModel.prototype);
Devices.prototype.constructor = Devices;

Devices.prototype.ModelChangedCb = function() {
    this.controller.RedrawDevices();
};

function Device(device_data) {
    this.name = device_data.name;
    this.description = device_data.description;
    this.room = device_data.room;
    this.state = device_data.state;
    this.operations = [];
    for(var op in device_data.operations) {
        this.operations.push(new Operation(device_data.operations[op]))
    }
}

function Operation(operation_data) {
    this.url = operation_data.url;
    this.name = operation_data.name;
}

function Rules(controller) {
    BaseModel.apply(this, arguments);
    this.url_base = "api/rule/";
    this.array_class = Rule;
    this.controller = controller;
}

Rules.prototype = Object.create(BaseModel.prototype);
Rules.prototype.constructor = Rules;

Rules.prototype.ModelChangedCb = function() {
    this.controller.RedrawRules();
};

function Rule(rule_data) {
    this.name = rule_data.name;
    this.description = rule_data.description;
    this.formula = rule_data.formula;
    this.handlers = [];
    for(var handler in rule_data.handlers) {
        this.handlers.push(new Handler(rule_data.handlers[handler]))
    }
}

function Handler(handler_data) {
    this.device = handler_data.device;
    this.operation = handler_data.operation;
}