'use strict';

// Declare app level module which depends on views, and components
var model = {
    user: "Aleksey"
};

var todoApp = angular.module("todoApp", []);

todoApp.run(function ($http) {
    $http.get("assets/todo.json").success(function (data) {
        model.items = data;
    });
});

todoApp.filter("checkedItems", function () {
    return function (items, showComplete) {
        var resultArr = [];
        angular.forEach(items, function (item) {
            if(item.done == false || showComplete == true) resultArr.push(item)
        });
        return resultArr;
    }
})

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

    $scope.addNewItem = function (actionText) {
        $scope.todo.items.push({ action: actionText, done: false });
    }
    
    $scope.removeItem = function (item_) {
        var index = $scope.todo.items.indexOf(item_);
        $scope.todo.items.splice(index, 1);
    }
})