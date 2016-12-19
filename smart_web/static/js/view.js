// Copyright (C) Marian Horban - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Marian Horban <m.horban@gmail.com>

function View() {
}

View.prototype.Init = function() {
    $("#tabs").tabs();
};

View.prototype.RedrawList = function(tab_name, list) {
    this.CleanSubTabs(tab_name);
    for(var room in list) {
        this.AddSubTab(tab_name, list[room]);
    }
    this.ShowSubTabs(tab_name);
};

View.prototype.CleanSubTabs = function(parent_id) {
    $("#" + parent_id).empty().append("<ul></ul>");
};

View.prototype.AddSubTab = function(parent_id, item) {
    var item_name = item.name;
    var sub_tab_id = "tab_" + item_name.replace(/^[^a-z]+|[^\w:.-]+/gi, "");
    $("#" + parent_id + " ul").append(
        "<li><a id='" + "li_" + sub_tab_id + "' href='#" + sub_tab_id + "' name='" + item_name + "'>" + item_name + "</a></li>"
    );
    //$("#li_" + sub_tab_id).click(function() {
    //    alert("Show page for " + item_name);
    //});
    $("#" + parent_id).append(
        "<div id='" + sub_tab_id + "' name='" + item_name + "'>JUST TEXT</div>"
    );
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

