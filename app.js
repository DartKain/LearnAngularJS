let data = [{
  id: 1,
  number: 1,
  customer: 'Иванова Ирина',
  manager: 'Петрова Полина',
  status: 'Выполнен',
  summ: 1500
      }, {
  id: 2,
  number: 2,
  customer: 'Сидорова Алла',
  manager: 'Петрова Полина',
  status: 'В обработке',
  summ: 11000
      }, {
  id: 3,
  number: 3,
  customer: 'Лукьянова Прасковья',
  manager: 'Смирнов Андрей',
  status: 'Отказ',
  summ: 15020
      }, {
  id: 4,
  number: 4,
  customer: 'Гришин Сидор',
  manager: 'Смирнов Андрей',
  status: 'Выполнен',
  summ: 4500
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
app.controller('sortController', function () {
  var sort = this;

  sort.orders = data;
  sort.order = undefined;

  sort.colType = type;

  sort.sortType = 'number';

  sort.sortOrder = false;
  sort.addbtn = false;

  sort.openOrder = function (order) {
    sort.order = order;
    sort.addbtn = false;
    console.log (sort.addbtn);

  };
  //Кнопка отмены
  sort.cancel = function () {
    sort.order = undefined;
  };
  //Кнопка Добавить
  sort.add = function () {
    let neworder = {id:-1};
    sort.order = neworder;
    sort.addbtn = true;
    console.log(neworder);
    console.log (sort.addbtn);


  };
  //Кнопка удалить
  sort.remove = function (order) {
    let index = sort.orders.indexOf(order);
    if (index > -1) {
      sort.orders.splice(index, 1);
    }
    console.log(order);
  };

  //Появление Input панели в Сумме
  sort.summInputHide = false;
  sort.summInput = function () {
    console.log("123");
    sort.summInputHide = true;
  };
  //Появление Input панели в Номере
  sort.numberInputHide = false;
  sort.numberInput = function () {
    sort.numberInputHide = true;

  };
  //Появление Input панели в Клиенте
  sort.customerInputHide = false;
  sort.customerInput = function () {
    sort.customerInputHide = true;
  };
  //Появление Input панели в Менеджере
  sort.managerInputHide = false;
  sort.managerInput = function () {
    sort.managerInputHide = true;
  };
  // Появление Select панели в статусе
  sort.statusInputHide = false;
  sort.statusInput = function () {
  sort.statusInputHide = true;
  };
  //Кнопка добавить/Изменить
  sort.saveEdited = function () {
    let order = {};
    order.number = sort.order.number;
    order.customer = sort.order.customer;
    order.manager = sort.order.manager;
    order.status = sort.order.status;
    order.summ = sort.order.summ;
    console.log (order);
   sort.orders.push(order);

 };


    });
