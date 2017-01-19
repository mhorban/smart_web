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
    for(var obj in list) {
        this.AddSubTab(tab_name, list[obj]);
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

    //var subtab_form =
    this.AddSubtabForm(parent_id, sub_tab_id, item);
    // $("#" + parent_id).append(
    //     "<div id='" + sub_tab_id + "' name='" + item_name + "'>" + subtab_form + "</div>"
    // );
};

View.prototype.AddSubTabNew = function(parent_id) {
    var sub_tab_id = "tab_" + parent_id + "_add_new";
    $("#" + parent_id + " ul").append(
        "<li><a id='" + "li_" + parent_id + "_add_new' href='#" + sub_tab_id + "'>Add New</a></li>"
    );
    //var add_new_form =
    this.AddNewForm(parent_id);
    // $("#" + parent_id).append(
    //     "<div id='" + sub_tab_id + "'>" + add_new_form + "</div>"
    // );
    this.AddOnSaveClickHandler(parent_id);
};

View.prototype.AddNewForm = function(parent_id) {
    switch (parent_id) {
        case 'rooms':
            return this.AddNewRoomForm();
        case 'sensors':
            return this.AddNewSensorForm();
        case 'devices':
            return this.AddNewDeviceForm();
        case 'rules':
            return this.AddNewRuleForm();
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

View.prototype.AddNewRoomForm = function() {
    var add_new_form = (
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
    $("#rooms").append(
        "<div id='tab_rooms_add_new'>" + add_new_form + "</div>"
    );
};

View.prototype.AddRoomForm = function(sub_tab_id, item) {
    var subtab_form = (
        "<table>" +
            "<tr>" +
                "<td>Name</td>" +
                "<td><div>" + item.name + "</div></td>" +
            "</tr>" +
        "</table>");
    $("#rooms").append(
        "<div id='" + sub_tab_id + "' name='" + item.name + "'>" + subtab_form + "</div>"
    );
};

View.prototype.AddNewSensorForm = function() {
    var add_new_form = (
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
    $("#sensors").append(
        "<div id='tab_sensors_add_new'>" + add_new_form + "</div>"
    );
};

View.prototype.AddSensorForm = function(sub_tab_id, item) {
    var subtab_form = (
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
    $("#sensors").append(
        "<div id='" + sub_tab_id + "' name='" + item.name + "'>" + subtab_form + "</div>"
    );
};

View.prototype.AddNewDeviceForm = function() {
    var add_new_form = (
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
    $("#devices").append(
        "<div id='tab_devices_add_new'>" + add_new_form + "</div>"
    );
};

View.prototype.AddDeviceForm = function(sub_tab_id, item) {
    var subtab_form = (
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
    $("#devices").append(
        "<div id='" + sub_tab_id + "' name='" + item.name + "'>" + subtab_form + "</div>"
    );
};

View.prototype.AddNewRuleForm = function() {
    var add_new_form = (
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
                "<td>" +
                    "<div id='add-new-formula-builder'></div>" +
                    '<div class="btn-group">' +
                        '<button class="btn btn-warning reset" data-target="basic">Reset</button>' +
                        '<button class="btn btn-success set-json" data-target="basic">Set rules</button>' +
                        '<button class="btn btn-primary parse-json" data-target="basic">Get rules</button>' +
                    "</div>" +
                "</td>" +
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
    $("#rules").append(
        "<div id='tab_rules_add_new'>" + add_new_form + "</div>"
    );
    this.AddFormulaBuilder("add-new-formula-builder");
};

View.prototype.AddRuleForm = function(sub_tab_id, item) {
    var subtab_form = (
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
    $("#rules").append(
        "<div id='" + sub_tab_id + "' name='" + item.name + "'>" + subtab_form + "</div>"
    );
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

View.prototype.AddSubtabForm = function(parent_id, sub_tab_id, item) {
    switch (parent_id) {
        case 'rooms':
            return this.AddRoomForm(sub_tab_id, item);
        case 'sensors':
            return this.AddSensorForm(sub_tab_id, item);
        case 'devices':
            return this.AddDeviceForm(sub_tab_id, item);
        case 'rules':
            return this.AddRuleForm(sub_tab_id, item);
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

View.prototype.GetSensorFilters = function () {
    var filters = [];
    var sensor_list = this.controller.model.sensors.array;
    for (var sensor in sensor_list) {
        filters.push({
            id: sensor_list[sensor].name,
            label: sensor_list[sensor].name,
            type: 'integer'
        });
    }
    return filters;
};

View.prototype.AddFormulaBuilder = function(parent_id) {
    //demo http://querybuilder.js.org/assets/demo-basic.js

    $('#' + parent_id).queryBuilder({
        plugins: ['bt-tooltip-errors'],
        filters: this.GetSensorFilters()
  //       [{
  //   id: 'sensor',
  //   label: 'Sensor',
  //   type: 'integer'
  // }, {
  //   id: 'name',
  //   label: 'Name',
  //   type: 'string'
  // }, {
  //   id: 'category',
  //   label: 'Category',
  //   type: 'integer',
  //   input: 'select',
  //   values: {
  //     1: 'Books',
  //     2: 'Movies',
  //     3: 'Music',
  //     4: 'Tools',
  //     5: 'Goodies',
  //     6: 'Clothes'
  //   },
  //   operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null']
  // }, {
  //   id: 'in_stock',
  //   label: 'In stock',
  //   type: 'integer',
  //   input: 'radio',
  //   values: {
  //     1: 'Yes',
  //     0: 'No'
  //   },
  //   operators: ['equal']
  // }, {
  //   id: 'price',
  //   label: 'Price',
  //   type: 'double',
  //   validation: {
  //     min: 0,
  //     step: 0.01
  //   }
  // }, {
  //   id: 'id',
  //   label: 'Identifier',
  //   type: 'string',
  //   placeholder: '____-____-____',
  //   operators: ['equal', 'not_equal'],
  //   validation: {
  //     format: /^.{4}-.{4}-.{4}$/
  //   }
  // }]

  //rules: rules_basic
    });

    $('#btn-reset').on('click', function() {
        $('#builder-basic').queryBuilder('reset');
    });

    $('#btn-set').on('click', function() {
        //$('#builder-basic').queryBuilder('setRules', rules_basic);
    });

    $('#btn-get').on('click', function() {
      var result = $('#builder-basic').queryBuilder('getRules');

      if (!$.isEmptyObject(result)) {
        alert(JSON.stringify(result, null, 2));
      }
    });
};