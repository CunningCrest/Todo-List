var tempIndex;
angular.module("taskListApp", [])
  .controller("taskListController", ["$scope", "todoItemService", function($scope, todoItemService) {
    this.list = todoItemService.initializeFunc();
    this.text = "";
    this.edit = function(newText, editIndex, newList) {
      this.text = todoItemService.edit(newText, editIndex, newList);
    }
    this.addItem = function(newText, newList) {
      todoItemService.addItem(newText, newList);
    }
    this.saveChanges = function(newText, newList) {
      todoItemService.saveChanges(newText, newList);
    }
    this.removeItem = function(newList, deleteIndex) {
      todoItemService.removeItem(newList, deleteIndex);
    }
  }])
  .service('todoItemService', function() {
    this.initializeFunc = function() {
      var model = JSON.parse(localStorage.getItem("key"));
      if (model) {
        return model;
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
        return model;
      }
    }
    this.addItem = function(newText, newList) {
      if (newText != "") {
        newList.items.push({
          description: newText,
        });
        model = newList;
        localStorage.setItem("key", JSON.stringify(model));
      }
    };
    this.saveChanges = function(newText, newList) {
      newList.items[tempIndex].description = newText;
      model = newList;
      localStorage.setItem("key", JSON.stringify(model));
      newText = "";
    };
    this.removeItem = function(newList, deleteIndex) {
      newList.items.splice(deleteIndex, 1);
      model = newList;
      localStorage.setItem("key", JSON.stringify(model));
    };
    this.edit = function(newText, editIndex, newList) {
      newText = newList.items[editIndex].description;
      tempIndex = editIndex;
      return newText;
    };
  })
  .component('item', {
    bindings: {
      description: '=',
      edit: '&',
      delete: '&',
      list: '=',
      text: '=',
      index: '='
    },
    controller: function() {},
    template: `
      <td>{{$ctrl.description}}</td>
      <td><p ng-click="$ctrl.edit({newText:$ctrl.text, editIndex:$ctrl.index, newList:$ctrl.list})">Edit</p></td>
      <td><p ng-click="$ctrl.delete({newList:$ctrl.list, deleteIndex:$ctrl.index})" style="cursor:pointer;">×</p></td>
    `
  })
  .component('list', {
    bindings: {
      list: '=',
      edit: '&',
      removeItem: '&',
      index: '=',
      text: '=',
      index: '='
    },
    controller: function() {},
    template: `
    <div class="items-list">
    <h3></h3>
    <ul class="items">
      <li ng-repeat="currentItem in $ctrl.list.items track by $index">
        <item description="currentItem.description" list="$ctrl.list" index="$index" text="$ctrl.text" delete="$ctrl.removeItem({newList: newList, deleteIndex: deleteIndex})" edit="$ctrl.edit({newText: newText, editIndex: editIndex, newList: newList})"></item>
      </li>
    </ul>
    </div>
    `
  })
  .component('addItem', {
    bindings: {
      text: '=',
      add: '&',
      save: '&',
      list: '='
    },
    controller: function() {},
    template: `
    <div class="form-inline">
      <div class="form-group">
        <div class="col-md-6">
          <input class="form-control"  ng-model="$ctrl.text" placeholder="Информация о заметке" />
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-8">
          <button class="btn btn-default" ng-click="$ctrl.add({newText:$ctrl.text, newList:$ctrl.list})">Добавить</button>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-8">
          <button class="btn btn-default" ng-click="$ctrl.save({newText:$ctrl.text, newList:$ctrl.list})">Редактировать</button>
        </div>
      </div>
    </div>
    <div>
      <hr/>
    </div>
    `
  });
