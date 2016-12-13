// Copyright (C) Marian Horban - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Marian Horban <m.horban@gmail.com>

var g_world = new World();
var g_view = new View();

$(document).ready(function() {
    g_world.Init();
    g_view.Init();

    //view.init();
    //driverManager.getLogLoop();
});