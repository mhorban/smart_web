// Copyright (C) Marian Horban - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Marian Horban <m.horban@gmail.com>

function View(controller) {
    this.controller = controller;
}

View.prototype.Init = function() {
    $("#tabs").tabs();
};

View.prototype.RedrawList = function(tab_name, list) {
    this.CleanSubTabs(tab_name);
    for(var room in list) {
        this.AddSubTab(tab_name, list[room]);
    }
    this.AddSubTabNew(tab_name);
    this.ShowSubTabs(tab_name);
};

View.prototype.CleanSubTabs = function(parent_id) {
    $("#" + parent_id).empty().append("<ul></ul>");
};

View.prototype.AddSubTab = function(parent_id, item) {
    var self = this;
    var item_name = item.name;
    var sub_tab_id = "tab_"+ parent_id + "_" + item_name.replace(/^[^a-z]+|[^\w:.-]+/gi, "");
    var remove_image = '<img name="' + item_name + '" class="remove_sub_tab" src="/static/image/remove-button-md.png"/>';
    $("#" + parent_id + " ul").append(
        "<li><a id='" + "li_" + sub_tab_id + "' href='#" + sub_tab_id + "' name='" + item_name + "'>"
              + item_name +
            "</a>" + "    " +
            "<a href='#' class='remove_sub_tab'>" + remove_image + "</a>" +
        "</li>"
    );
    $("img.remove_sub_tab[name='" + item_name + "']").click(function() {
        var obj_type = $(this).closest('.main_tab').attr('id');
        var obj_name = $(this).attr('name');
        self.controller.RemoveObject(obj_type, obj_name);
    });

    var subtab_form = this.GetSubtabForm(parent_id, item);
    $("#" + parent_id).append(
        "<div id='" + sub_tab_id + "' name='" + item_name + "'>" + subtab_form + "</div>"
    );
};

View.prototype.AddSubTabNew = function(parent_id) {
    var sub_tab_id = "tab_" + parent_id + "_add_new";
    $("#" + parent_id + " ul").append(
        "<li><a id='" + "li_" + parent_id + "_add_new' href='#" + sub_tab_id + "'>Add New</a></li>"
    );
    var add_new_form = this.GetAddNewForm(parent_id);
    $("#" + parent_id).append(
        "<div id='" + sub_tab_id + "'>" + add_new_form + "</div>"
    );
    this.AddOnSaveClickHandler(parent_id);
};

View.prototype.GetAddNewForm = function(parent_id) {
    switch (parent_id) {
        case 'rooms':
            return this.GetAddNewRoomForm();
        case 'sensors':
            return this.GetAddNewSensorForm();
        case 'devices':
            return this.GetAddNewDeviceForm();
        case 'rules':
            return this.GetAddNewRuleForm();
    }
};

View.prototype.AddOnSaveClickHandler = function(parent_id) {
    switch (parent_id) {
        case 'rooms':
            return this.AddOnSaveRoomClickHandler();
        case 'sensors':
            return this.AddOnSaveSensorClickHandler();
        case 'devices':
            return this.AddOnSaveDeviceClickHandler();
        case 'rules':
            return this.AddOnSaveRuleClickHandler();
    }
};

View.prototype.GetAddNewRoomForm = function() {
    return (
        "<table>" +
            "<tr>" +
                "<td>Name</td>" +
                "<td><input id='add_new_room_name' type='text'></td>" +
            "</tr>" +
            "<tr>" +
                "<td></td>" +
                "<td><button id='save_new_room' type='button'>Save</button></td>" +
            "</tr>" +
        "</table>");
};

View.prototype.GetRoomForm = function(item) {
    return (
        "<table>" +
            "<tr>" +
                "<td>Name</td>" +
                "<td><div>" + item.name + "</div></td>" +
            "</tr>" +
        "</table>");
};

View.prototype.GetAddNewSensorForm = function() {
    return (
        "<table>" +
            "<tr>" +
                "<td>Name</td>" +
                "<td><input id='add_new_sensor_name' type='text'></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Description</td>" +
                "<td><input id='add_new_sensor_descr' type='text'></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Room</td>" +
                "<td><input id='add_new_sensor_room' type='text'></td>" +
            "</tr>" +
            "<tr>" +
                "<td></td>" +
                "<td><button id='save_new_sensor' type='button'>Save</button></td>" +
            "</tr>" +
        "</table>");
};

View.prototype.GetSensorForm = function(item) {
    return (
        "<table>" +
            "<tr>" +
                "<td>Name</td>" +
                "<td><div>" + item.name + "</div></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Description</td>" +
                "<td><div>" + item.description + "</div></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Room</td>" +
                "<td><div>" + item.room + "</div></td>" +
            "</tr>" +
        "</table>");
};

View.prototype.GetAddNewDeviceForm = function() {
    return (
        "<table>" +
            "<tr>" +
                "<td>Name</td>" +
                "<td><input id='add_new_device_name' type='text'></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Description</td>" +
                "<td><input id='add_new_device_descr' type='text'></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Room</td>" +
                "<td><input id='add_new_device_room' type='text'></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Operations</td>" +
                "<td>" +
                    "<input id='add_new_device_operation' type='text'>" +
                    "<button id='add_new_field_device_operation' type='button'>Add Operation</button>" +
                 "</td>" +
            "</tr>" +
            "<tr>" +
                "<td></td>" +
                "<td><button id='save_new_device' type='button'>Save</button></td>" +
            "</tr>" +
        "</table>");
};

View.prototype.GetDeviceForm = function(item) {
    return (
        "<table>" +
            "<tr>" +
                "<td>Name</td>" +
                "<td><div>" + item.name + "</div></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Description</td>" +
                "<td><div>" + item.description + "</div></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Room</td>" +
                "<td><div>" + item.room + "</div></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Operations</td>" +
                "<td>" +
                    "<div>" + item.operations + "</div>" +
                "</td>" +
            "</tr>" +
        "</table>");
};

View.prototype.GetAddNewRuleForm = function() {
    return (
        "<table>" +
            "<tr>" +
                "<td>Name</td>" +
                "<td><input id='add_new_rule_name' type='text'></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Description</td>" +
                "<td><input id='add_new_rule_descr' type='text'></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Formula</td>" +
                "<td><input id='add_new_rule_formula' type='text'></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Handlers</td>" +
                "<td>" +
                    "<input id='add_new_rule_handlers' type='text'>" +
                    "<button id='add_new_field_rule_handlers' type='button'>Add Handler</button>" +
                 "</td>" +
            "</tr>" +
            "<tr>" +
                "<td></td>" +
                "<td><button id='save_new_rule' type='button'>Save</button></td>" +
            "</tr>" +
        "</table>");
};

View.prototype.GetRuleForm = function(item) {
    return (
        "<table>" +
            "<tr>" +
                "<td>Name</td>" +
                "<td><div>" + item.name + "</div></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Description</td>" +
                "<td><div>" + item.description + "</div></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Formula</td>" +
                "<td><div>BIG TODO HERE</div></td>" +
            "</tr>" +
            "<tr>" +
                "<td>Handlers</td>" +
                "<td>" +
                    "<div>" + item.handlers + "</div>" +
                 "</td>" +
            "</tr>" +
        "</table>");
};

View.prototype.AddOnSaveRoomClickHandler = function() {
    var self = this;
    $('#save_new_room').click(function() {
        self.controller.AddNewRoom({
            name: $('#add_new_room_name').text()
        });
    });
};

View.prototype.AddOnSaveSensorClickHandler = function() {
    var self = this;
    $('#save_new_sensor').click(function() {
        self.controller.AddNewSensor({
            name: $('#add_new_sensor_name').text(),
            description: $('#add_new_sensor_descr').text(),
            room: $('#add_new_sensor_room').text()
        });
    });
};

View.prototype.AddOnSaveDeviceClickHandler = function() {
    var self = this;
    $('#save_new_device').click(function() {
        self.controller.AddNewDevice({
            name: $('#add_new_device_name').text(),
            description: $('#add_new_device_descr').text(),
            room: $('#add_new_device_room').text(),
            operation: $('#add_new_device_operation').text()
        });
    });
};

View.prototype.AddOnSaveRuleClickHandler = function() {
    var self = this;
    $('#save_new_rule').click(function() {
        self.controller.AddNewRule({
            name: $('#add_new_rule_name').text(),
            description: $('#add_new_rule_descr').text(),
            formula: $('#add_new_rule_formula').text(),
            handlers: $('#add_new_rule_handlers').text()
        });
    });
};

View.prototype.GetSubtabForm = function(parent_id, item) {
    switch (parent_id) {
        case 'rooms':
            return this.GetRoomForm(item);
        case 'sensors':
            return this.GetSensorForm(item);
        case 'devices':
            return this.GetDeviceForm(item);
        case 'rules':
            return this.GetRuleForm(item);
    }
};

View.prototype.ShowSubTabs = function(parent_id) {
    $("#" + parent_id).tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
};

View.prototype.RedrawRooms = function(rooms) {
    this.RedrawList('rooms', rooms);
};

View.prototype.RedrawSensors = function(sensors) {
    this.RedrawList('sensors', sensors);
};

View.prototype.RedrawDevices = function(devices) {
    this.RedrawList('devices', devices);
};

View.prototype.RedrawRules = function(rules) {
    this.RedrawList('rules', rules);
};

