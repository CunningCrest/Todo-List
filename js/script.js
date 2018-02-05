if (localStorage.length != 0) {
  var model = JSON.parse(localStorage.getItem("key"));
} else {
  var model = {
    items: [{
        description: "Купить хлеб",
      },
      {
        description: "Заплатить кредит",
      },
      {
        description: "Посетить врача",
      },
      {
        description: "Съездить к другу",
      }
    ]
  };
  localStorage.setItem("key", JSON.stringify(model));
}
angular.module("taskListApp", [])
  .controller("taskListController", function($scope) {
    var tempIndex;
    $scope.list = model;
    $scope.addItem = function(text) {
      if (text != "") {
        $scope.list.items.push({
          description: text,
        });
        model = $scope.list;
        localStorage.setItem("key", JSON.stringify(model));
      }
    }
    $scope.removeItem = function(deleteIndex) {
      $scope.list.items.splice(deleteIndex, 1);
      model = $scope.list;
      localStorage.setItem("key", JSON.stringify(model));
    }
    $scope.editItem = function(editIndex) {
      $scope.text = $scope.list.items[editIndex].description;
      tempIndex = editIndex;
    }
    $scope.saveChanges = function(text) {
      $scope.list.items[tempIndex].description = text;
      model = $scope.list;
      localStorage.setItem("key", JSON.stringify(model));
      $scope.text = "";
    }
  });
