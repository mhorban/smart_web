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
    thsi.model.Init();
    this.view.Init();
    //driverManager.getLogLoop();
}

Controller.prototype.RedrawRooms = function() {

}

Controller.prototype.RedrawSensors = function() {

}

Controller.prototype.RedrawDevices = function() {

}

Controller.prototype.RedrawRules = function() {

}

