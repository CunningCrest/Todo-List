var tempIndex;
angular.module("taskListApp", [])
  .controller("taskListController", function($scope, initialService) {
    this.list = initialService.initializeFunc();
    this.text = "";
  })
  .service('initialService', function() {
    this.initializeFunc = function() {
      if (localStorage.length != 0) {
        var model = JSON.parse(localStorage.getItem("key"));
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
  })
  .component('listComponent', {
    bindings: {
      list: '=',
      text: '='
    },
    controller: function() {
      this.editItem = function(editIndex) {
        this.text = this.list.items[editIndex].description;
        tempIndex = editIndex;
      }

      this.removeItem = function(deleteIndex) {
        this.list.items.splice(deleteIndex, 1);
        model = this.list;
        localStorage.setItem("key", JSON.stringify(model));
      }
    },
    template: `
      <table class="table table-striped">
        <tbody>
          <tr ng-repeat="item in $ctrl.list.items track by $index">
            <td>
              {{item.description}}
            </td>
            <td>
              <p ng-click="$ctrl.editItem($index)">Edit</p>
            </td>
            <td>
              <p ng-click="$ctrl.removeItem($index)" style="cursor:pointer;">×</p>
            </td>
          </tr>
        </tbody>
      </table>
    `
  })
  .component('addItem', {
    bindings: {
      list: '=',
      text: '='
    },
    controller: function() {
      this.addItem = function() {
        if (this.text != "") {
          this.list.items.push({
            description: this.text,
          });
          model = this.list;
          localStorage.setItem("key", JSON.stringify(model));
        }
      }

      this.saveChanges = function() {
        this.list.items[tempIndex].description = this.text;
        model = this.list;
        localStorage.setItem("key", JSON.stringify(model));
        this.text = "";
      }
    },
    template: `
    <div class="form-inline">
      <div class="form-group">
        <div class="col-md-6">
          <input class="form-control" id="inputElement" ng-model="$ctrl.text" placeholder="Информация о заметке" />
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-8">
          <button class="btn btn-default" ng-click="$ctrl.addItem()">Добавить</button>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-8">
          <button class="btn btn-default" ng-click="$ctrl.saveChanges()">Редактировать</button>
        </div>
      </div>
    </div>
    <div>
      <hr/>
    </div>
    `
  });
