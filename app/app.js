'use strict';

// Declare app level module which depends on views, and components
var model = {
    user: "Aleksey",
    items: [
        {action: "Buy Flowers", done: false},
        {action: "Clean Room", done: false},
        {action: "Collect Tickets", done: false},
        {action: "Call Ann", done: false}
    ]
};

var todoApp = angular.module("todoApp", []);

todoApp.controller("ToDoController", function ($scope) {
    $scope.todo = model;

    $scope.incompleteCount = function () {
        var count = 0;
        angular.forEach($scope.todo.items, function (item) {
            if(!item.done) count++
        });
        return count;
    }

    $scope.warningLevel = function () {
        return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
    }
})