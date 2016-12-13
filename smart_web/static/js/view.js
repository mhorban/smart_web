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

