// Copyright (C) Marian Horban - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Marian Horban <m.horban@gmail.com>

$(document).ready(function() {
    var controller = new Controller();
    var model = new Model(controller);
    var view = new View(controller);
    controller.Init(model, view);
});