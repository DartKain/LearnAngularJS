let data = [{
  id: 1,
  number: 1,
  customer: 'Иванова Ирина',
  manager: 'Петрова Полина',
  status: 'Выполнен',
  summ: 1500,
  show: false,
  class: 'normal',
  selected: false
      }, {
  id: 2,
  number: 2,
  customer: 'Сидорова Алла',
  manager: 'Петрова Полина',
  status: 'В обработке',
  summ: 11000,
  show: false,
  class: 'normal',
  selected: false
      }, {
  id: 3,
  number: 3,
  customer: 'Лукьянова Прасковья',
  manager: 'Смирнов Андрей',
  status: 'Отказ',
  summ: 15020,
  show: false,
  class: 'normal',
  selected: false
      }, {
  id: 4,
  number: 4,
  customer: 'Гришин Сидор',
  manager: 'Смирнов Андрей',
  status: 'Выполнен',
  summ: 4500,
  show: false,
  class: 'normal',
  selected: false
    }];

let type = [{
  sortCol: 'number'
                 }, {
  sortCol: 'customer'
                 }, {
  sortCol: 'manager'
                 }, {
  sortCol: 'status'
                 }, {
  sortCol: 'summ'
                 }]

var app = angular.module('sortApp', [])
app.controller('mainCtrl', function () {
  var sort = this;

  sort.orders = data;
  sort.order = undefined;
  sort.formorder = undefined;
  sort.event = undefined;
  sort.enter = function (event) {

    sort.event = event;
  };

  //Кнопка Добавить
  sort.add = function () {
    let neworder = {
      id: -1
    };
    sort.order = neworder;
    sort.addbtn = true;
    console.log(neworder);
    console.log(sort.addbtn);
  };

  sort.colType = type;

  sort.sortOrder = false;
  sort.addbtn = false;



});

app.component('modalForm', {
  template: `
      <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
        <forma order = 'vm.order'  addbtn = 'vm.addbtn' formorder = 'vm.formorder' orders = 'vm.orders'></forma>
      </div>
  </div>
</div>
`,
  bindings: {
    order: '=',
    addbtn: '=',
    formorder: '=',
    orders: '='
  },
  controller: function () {

  },
  controllerAs: 'vm'
});

app.component('forma', {
  templateUrl: 'form.html',
  bindings: {
    order: '=',
    addbtn: '=',
    formorder: '=',
    orders: '='
  },
  controller: function () {
    var sort = this;
    sort.number = undefined;

    //Кнопка отмены
    sort.cancel = function () {
      sort.formorder = undefined;
    };

    //Добавление новой строки в таблицу
    sort.saveEdited = function () {
      let order = {};
      order.number = sort.formorder.number;
      order.customer = sort.formorder.customer;
      order.manager = sort.formorder.manager;
      order.status = sort.formorder.status;
      order.summ = sort.formorder.summ;
      console.log(order);
      console.log(sort.orders);
      sort.orders.push(order);
    };


    //Сохранение изменений в строке
    sort.edit = function (order) {
      console.log(order);
      if (sort.formorder.number != undefined) {
        sort.order.number = sort.formorder.number;
      };
      if (sort.formorder.customer != undefined) {
        sort.order.customer = sort.formorder.customer;
      };
      if (sort.formorder.manager != undefined) {
        sort.order.manager = sort.formorder.manager;
      };
      if (sort.formorder.status != undefined) {
        sort.order.status = sort.formorder.status;
      };
      if (sort.formorder.summ != undefined) {
        sort.order.summ = sort.formorder.summ;
      };
    };
  },
  controllerAs: 'formCtrl'

});
app.component('tablica', {
  templateUrl: 'testTable.html',
  bindings: {
    order: '=',
    formorder: '=',
    addbtn: '=',
    openorder: '&',
    event: '=',
    orders: '='
  },
  controller: function ($filter, $scope) {
    var sort = this;
    sort.orders = data;
    sort.colType = type;
    sort.sortOrder = false;


    // Функция сортировки таблицы
    sort.sortTable = function (type, sortOrder) {
      switch (type) {
        case 'number':
          sort.orders = $filter('orderBy')(sort.orders, 'number', sortOrder);
          sort.sortType = 'number';
          break;
        case 'customer':
          sort.orders = $filter('orderBy')(sort.orders, 'customer', sortOrder);
          sort.sortType = 'customer';
          break;
        case 'manager':
          sort.orders = $filter('orderBy')(sort.orders, 'manager', sortOrder);
          sort.sortType = 'manager';
          break;
        case 'status':
          sort.orders = $filter('orderBy')(sort.orders, 'status', sortOrder);
          sort.sortType = 'status';
          break;

        case 'summ':
          sort.orders = $filter('orderBy')(sort.orders, 'summ', sortOrder);
          sort.sortType = 'summ';
          break;
      }
    };

    //Клик по Edit
    sort.openOrder = function (order) {
      sort.order = order;
      sort.addbtn = false;
      console.log(sort.order);
    };


    //Кнопка отмены
    sort.cancel = function () {
      sort.order = undefined;
    };

    //Кнопка удалить
    sort.remove = function (order) {
      let index = sort.orders.indexOf(order);
      if (index > -1) {
        sort.orders.splice(index, 1);
      }
      console.log(order);
    };


    //Появление Input при клике по строке
    sort.inputShow = function (order) {
      let index = sort.orders.indexOf(order);
      if (index > -1) {
        sort.orders[index].show = true;
      }
    };


    // Навигация по стрелкам
    let position = -1;
    sort.arrowDown = function () {
      if (position < sort.orders.length - 1) {
        position++;
      }

      console.log(sort.orders.length);
      if (position > 0) {
        sort.orders[position].class = 'arrow-selected';
        sort.orders[position - 1].class = 'normal';
      } else {
        sort.orders[position].class = 'arrow-selected';
      }
      console.log(position);
      return position;
    };
    sort.arrowUp = function () {
      if (position > 0) {
        position--;
      }

      if (position >= 0) {
        sort.orders[position].class = 'arrow-selected';
        sort.orders[position + 1].class = 'normal';
      }
      console.log(position);
      return position;
    };

    $scope.$watch('vm.event', function(event){
      let key = event.keyCode;
            let order = sort.orders[position];
           switch (key) {
        case 38:
          sort.arrowUp();

          break;
        case 40:
          sort.arrowDown();

          break;
        case 13:

          sort.openOrder(order);
          console.log(key);
          break;
        case 46:
          sort.remove(order);
          break;
        case 27:
          sort.cancel();
          break;
      }
    });

    sort.enter = function (key) {


      switch (key) {
        case 38:
          sort.arrowUp();

          break;
        case 40:
          sort.arrowDown();

          break;
        case 13:

          sort.openOrder(order);
          console.log(key);
          break;
        case 46:
          sort.remove(order);
          break;
        case 27:
          sort.cancel();
          break;
      }

    };
  },
  controllerAs: 'vm'
});
