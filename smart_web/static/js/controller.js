// Copyright (C) Marian Horban - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Marian Horban <m.horban@gmail.com>

function Controller() {
    this.model = null;
    this.view = null;
}

Controller.prototype.Init = function(model, view) {
    this.model = model;
    this.view = view;
    this.model.Init();
    this.view.Init();
    //driverManager.getLogLoop();
};

Controller.prototype.RedrawRooms = function(rooms) {
    this.view.RedrawRooms(rooms);
};

Controller.prototype.RedrawSensors = function(sensors) {
    this.view.RedrawSensors(sensors);
};

Controller.prototype.RedrawDevices = function(devices) {
    this.view.RedrawDevices(devices);
};

Controller.prototype.RedrawRules = function(rules) {
    this.view.RedrawRules(rules);
};

Controller.prototype.RemoveObject = function(obj_type, name) {
    switch (obj_type) {
        case 'rooms':
            this.model.rooms.Remove(name);
            break;
        case 'sensors':
            this.model.sensors.Remove(name);
            break;
        case 'devices':
            this.model.devices.Remove(name);
            break;
        case 'rules':
            this.model.rules.Remove(name);
            break;
    }
};

Controller.prototype.AddNewRoom = function(obj) {

};

Controller.prototype.AddNewSensor = function(obj) {

};

Controller.prototype.AddNewDevice = function(obj) {

};

Controller.prototype.AddNewRule = function(obj) {

};
