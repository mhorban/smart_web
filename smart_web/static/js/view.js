function View() {
}

View.prototype.Init = function() {
    $("#tabs").tabs();
};

View.prototype.InitRooms = function() {
    $("div#tabs").tabs();

    $("button#add-tab").click(function() {

        var num_tabs = $("div#tabs ul li").length + 1;

        $("div#tabs ul").append(
            "<li><a href='#tab" + num_tabs + "'>#" + num_tabs + "</a></li>"
        );
        $("div#tabs").append(
            "<div id='tab" + num_tabs + "'>#" + num_tabs + "</div>"
        );
        $("div#tabs").tabs("refresh");
    });
}

View.prototype.RedrawRooms = function() {

}

View.prototype.RedrawSensors = function() {

}

View.prototype.RedrawDevices = function() {

}

View.prototype.RedrawRules = function() {

}

View.prototype.AddSubTabs = function(parent_id, obj_type, item) {
    var itme_name = item.name;
    var sub_tab_id = "tab_" + obj_type + "_" + itme_name;
    $("div#" + parent_id + " ul").append(
        "<li><a href='" + sub_tab_id + "'>#" + itme_name + "</a></li>"
    );
    $("div#" + parent_id).append(
        "<div id='" + sub_tab_id + "'>#" + OnClickWillWriteHere + "</div>"
    );
    $("div#" + parent_id).tabs("refresh");
}