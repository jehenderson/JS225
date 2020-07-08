'use strict';
(function() {
  var todoData1 = {
    title: 'Buy Milk',
    month: '1',
    year: '2017',
    description: 'Milk for baby',
  };
  var todoData2 = {
    title: 'Buy Apples',
    month: '',
    year: '2017',
    description: 'An apple a day keeps the doctor away',
  };
  var todoData3 = {
    title: 'Buy chocolate',
    month: '1',
    year: '',
    description: 'For the cheat day',
  };
  var todoData4 = {
    title: 'Buy Veggies',
    month: '',
    year: '',
    description: 'For the daily fiber needs',
  };
  var todoSet = [todoData1, todoData2, todoData3, todoData4];

  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  var Todo = {
    isWithinMonthYear(month, year) {
      return month === this.month && year === this.year;
    },
    init(obj) {
      this.id = obj.id;
      this.title = obj.title;
      this.month = obj.month;
      this.year = obj.year;
      this.description = obj.description;
      this.completed = obj.completed || 'false';
      return this;
    },
  };

  var todoList = (function() {
      let todos = [];
      let getIndex = function(todoId) {
        for (var i = 0; i < todos.length; i++) {
          if (todos[i].id === todoId) { return i; }
        }

        return -1;
      };

      return {
        list() {
          return todos.map(todo => Object.create(Todo).init(todo));
        },
        add(todo) {
          todo.id = generateId();
          todos.push(Object.create(Todo).init(todo));
        },
        delete(todoId) {
          todos.splice(getIndex(todoId), 1);
        },
        update(todoId, updates) {
          let todo = todos[getIndex(todoId)];
          Object.keys(updates).forEach(prop => {
            todo[prop] = updates[prop];
          });
          return todo;
        },
        getById(todoId) {
          return todos[getIndex(todoId)];
        },
        empty() {
          todos = [];
        },
        init(todoSet) {
          todoSet.forEach(todo => {
            todo.id = generateId();
            todos.push(Object.create(Todo).init(todo));
          });
        },
      };
  })();

  var todoManager = (function() {
    return {
      all() {
        return todoList.list();
      },
      completed() {
        return todoList.list().filter(todo => todo.completed === 'true');
      },
      allIn(month, year) {
        return todoList.list().filter(todo => todo.isWithinMonthYear(month, year));
      },
      allCompletedIn(month, year) {
        return todoList.list().filter(todo => {
          return todo.completed === 'true' && todo.isWithinMonthYear(month, year);
        });
      },
    };
  })();

  window.Todo = Todo;
  window.todoList = todoList;
  window.todoManager = todoManager;
}());
