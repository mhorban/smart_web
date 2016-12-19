// Copyright (C) Marian Horban - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Marian Horban <m.horban@gmail.com>

function View() {
}

View.prototype.Init = function() {
    $("#tabs").tabs();
};

// View.prototype.InitRooms = function(rooms) {
//     $("div#tabs").tabs();
//
//     $("button#add-tab").click(function() {
//
//         var num_tabs = $("div#tabs ul li").length + 1;
//
//         $("div#tabs ul").append(
//             "<li><a href='#tab" + num_tabs + "'>#" + num_tabs + "</a></li>"
//         );
//         $("div#tabs").append(
//             "<div id='tab" + num_tabs + "'>#" + num_tabs + "</div>"
//         );
//         $("div#tabs").tabs("refresh");
//     });
// }

View.prototype.RedrawRooms = function(rooms) {
    this.CleanSubTabs('rooms');
    for(var room in rooms) {
        this.AddSubTab('rooms', rooms[room]);
    }
    this.ShowSubTabs('rooms');
};

View.prototype.RedrawSensors = function(sensors) {

};

View.prototype.RedrawDevices = function(devices) {

};

View.prototype.RedrawRules = function(rules) {

};

View.prototype.CleanSubTabs = function(parent_id) {
    $("#" + parent_id).empty().append("<ul></ul>");
};

View.prototype.AddSubTab = function(parent_id, item) {
    var item_name = item.name;
    var sub_tab_id = "tab_" + item_name;
    $("#" + parent_id + " ul").append(
        "<li><a href='" + sub_tab_id + "'>#" + item_name + "</a></li>"
    );
    $("#" + parent_id).append(
        "<div id='" + sub_tab_id + "'></div>"
    );
};

View.prototype.ShowSubTabs = function(parent_id) {
    $("#" + parent_id).tabs("refresh");
};