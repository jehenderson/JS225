var $ol = document.querySelector("ol");

function outputResult(message) {
  var $li = document.createElement("li");
  $li.innerText = message;
  $ol.appendChild($li);
  return $li;
}

function test(message, assertion) {
  var $msg = outputResult(message),
      passed = false;

  try {
    passed = assertion();
  }
  catch (e) {
    passed = false;
  }
  $msg.setAttribute("class", passed ? "pass" : "fail");
}

test("todoList is defined", function() {
  return typeof todoList !== "undefined";
});

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
  test("todoList initializes the todos with n number of todo objects", function() {
    todoList.empty();
    let before = todoList.list();
    todoList.init(todoSet);
    let after = todoList.list();

    return before.length === 0 && after.length === todoSet.length;
  });

  test("todoList maintains a collection of todos", function() {
    return todoList.list().every(todo => {
      return Todo.isPrototypeOf(todo);
    })
  });

  test("todoList maintains collection integrity by returning only a copy of the collection", function() {
    return todoList.list() !== todoSet;
  });

  test("todoList does not allowing users/others objects to manipulate the values of todo objects directly", function() {
    let title = todoList.list()[0].title;
    todoList.list()[0].title = 'mutate';
    todoList.list()[0].newProp = 'new prop';
    return todoList.list()[0].title === title && !todoList.list()[0].hasOwnProperty('newProp');
  });

  var todo, addedId, beforeList, afterList;
  test("todoList can add todos to todo collection", function() {
    beforeList = todoList.list();
    todoList.add({title: 'Do project', month: '7', year: '2020', description: 'Get good job'});
    afterList = todoList.list();
    addedId = afterList[afterList.length - 1].id;
    return beforeList.length === afterList.length - 1 && Todo.isPrototypeOf(afterList[afterList.length - 1]);
  });

  test("todoList can return a todo based on its id", function() {
    todo = todoList.getById(addedId);
    return Todo.isPrototypeOf(todo);
  });

  test("todoList can update todo by id", function() {
    let updates = {title: 'Test project', month: '8'};
    todoList.update(addedId, updates);
    return todo.title === 'Test project' && todo.month === '8' && todo.year === '2020';
  });

  test("todoList can delete todos from todo collection", function() {
    todoList.delete(addedId);
    afterList = todoList.list();
    return beforeList.length === afterList.length;
  });

  todoList.empty();
})();

test("todoManager is defined", function() {
  return typeof todoManager !== "undefined";
});

(function() {
  var todoData1 = {
    title: 'Buy Milk',
    month: '1',
    year: '2017',
    description: 'Milk for baby',
  };
  var todoData2 = {
    title: 'Buy Apples',
    month: '1',
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
  var todoData5 = {
    title: 'Do project',
    month: '7',
    year: '2020',
    description: 'Get good job',
    completed: 'true',
  };
  var todoData6 = {
    title: 'Learn to code',
    month: '',
    year: '',
    description: 'Hello world',
    completed: 'true',
  };
  var todoSet = [todoData1, todoData2, todoData3, todoData4, todoData5, todoData6];
  todoList.init(todoSet);
  test("todoManager can return all todo objects from todoList", function() {
    return todoManager.all().length === 6;
  });

  test("todoManager can return all completed todos from todoList", function() {
    return todoManager.completed().length === 2;
  });

  test("todoManager can return all todos within a given month-year combo", function() {
    return todoManager.allIn('1', '2017').length === 2;
  });

  test("todoManager can return all completed todos within a given month-year combo", function() {
    return todoManager.allCompletedIn('7', '2020').length === 1;
  });
})();
