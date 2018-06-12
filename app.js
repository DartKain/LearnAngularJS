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
app.controller('mainCtrl', function(){
  var sort = this;
  sort.orders = data;
  sort.order = undefined;
  sort.key = undefined;
  sort.enter = function (event) {

      sort.key = event.keyCode;
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



})

app.component('forma', {
  templateUrl: 'form.html',
  bindings: {
    order: '=',
    addbtn: '='
  },
  controller: function () {
    var sort = this;
    sort.orders = data;

    let number = document.getElementById("test-form-Number");
    let customer = document.getElementById("test-form-Customer");
    let manager = document.getElementById("test-form-Manager");
    let status = document.getElementById("test-form-Status");
    let summ = document.getElementById("test-form-Price");

    //Кнопка отмены
    sort.cancel = function () {
      sort.order = undefined;
    };

    //Добавление новой строки в таблицу
    sort.saveEdited = function () {
      let order = {};
      order.number = number.value;
      order.customer = customer.value;
      order.manager = manager.value;
      order.status = status.value;
      order.summ = summ.value;
      console.log(order);
      sort.orders.push(order);
    };


    //Сохранение изменений в строке
    sort.edit = function () {
      sort.orders[sort.order.id - 1].number = number.value;
      sort.orders[sort.order.id - 1].customer = customer.value;
      sort.orders[sort.order.id - 1].manager = manager.value;
      sort.orders[sort.order.id - 1].status = status.value;
      sort.orders[sort.order.id - 1].summ = summ.value;

    };
  },
  controllerAs: 'vm'

});
app.component('tablica', {
  templateUrl: 'testTable.html',
  bindings: {
    order: '=',
    addbtn: '=',
    openorder: '&',
    key: '='
  },
  controller: function ($filter) {
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


    // Функция клика по Изменить
    sort.edit = function (order) {
      let index = order.id - 1;
      sort.orders[index].number = number.value;
      sort.orders[index].customer = customer.value;
      sort.orders[index].manager = manager.value;
      sort.orders[index].status = status.value;
      sort.orders[index].summ = summ.value;
      console.log(sort.orders[index].number);
    };

      //Клик по Edit
    sort.openOrder = function (order) {
      sort.order = order;
      sort.addbtn = false;
      console.log(sort.order);
      let number = document.getElementById("test-form-Number");
      number.value = sort.order.number;
      let customer = document.getElementById("test-form-Customer");
      customer.value = sort.order.customer;
      let manager = document.getElementById("test-form-Manager");
      manager.value = sort.order.manager;
      let status = document.getElementById("test-form-Status");
      status.value = sort.order.status;
      let summ = document.getElementById(id = "test-form-Price");
      summ.value = sort.order.summ;
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


    //Кнопка добавить в форме
    sort.saveEdited = function () {
      let order = {};
      order.number = sort.order.number;
      order.customer = sort.order.customer;
      order.manager = sort.order.manager;
      order.status = sort.order.status;
      order.summ = sort.order.summ;
      console.log(order);
      sort.orders.push(order);

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
    sort.enter = function (event) {
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

    };


  },
  controllerAs: 'vm'
});
