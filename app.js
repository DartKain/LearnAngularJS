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
app.controller('sortController', function ($filter) {
  var sort = this;

  sort.orders = data;
  sort.order = undefined;

  sort.colType = type;

  sort.sortOrder = false;
  sort.addbtn = false;
  // Функция сортировки таблицы
  sort.sortTable = function (type, sortOrder) {
    switch (type) {
      case 'number':
        sort.orders = $filter('orderBy')(sort.orders, 'number', sortOrder);
        break;
      case 'customer':
        sort.orders = $filter('orderBy')(sort.orders, 'customer', sortOrder);
        break;
      case 'manager':
        sort.orders = $filter('orderBy')(sort.orders, 'manager', sortOrder);
        break;
      case 'status':
        sort.orders = $filter('orderBy')(sort.orders, 'status', sortOrder);
        break;
      case 'summ':
        sort.orders = $filter('orderBy')(sort.orders, 'summ', sortOrder);
        break;
    }
  };

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

    sort.edit = function () {

      let index = order.id - 1;
      sort.orders[index].number = number.value;
      sort.orders[index].customer = customer.value;
      sort.orders[index].manager = manager.value;
      sort.orders[index].status = status.value;
      sort.orders[index].summ = summ.value;
      console.log(sort.orders[index].number);
    };

  };


  //Кнопка отмены
  sort.cancel = function () {
    sort.order = undefined;
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


  //Кнопка добавить/Изменить
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

});
