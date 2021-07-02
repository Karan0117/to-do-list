import React from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function TodoForm(props) {
  return (
    <form
      onSubmit={(event) => props.createTodo(event)}
      className="create-todo-form"
    >
      <h2 id="create-todo">Create a New Todo</h2>
      <input
        name="todo-name"
        id="todoName"
        type="text"
        placeholder="Enter todo description"
        autoComplete="off"
      />
      <button className="submit-btn" type="submit">
        Create Todo
      </button>
    </form>
  );
}

function TodoListItem(props) {
  const { name, id } = props.selectedTodo;

  return (
    <div
      className="todo-list__item"
      data-status={props.selectedTodo.isCompleted}
      onClick={() => {
        props.toggleTodo(id);
      }}
    >
      <span>{name}</span>
      <button
        onClick={(event) => {
          props.deleteTodo(id, event);
        }}
      >
        X
      </button>
    </div>
  );
}

function TodoList(props) {
  let selectedTodos = [];
  if (props.title === "To-do") {
    selectedTodos = props.todos.filter((todo) => !todo.isCompleted);
  } else {
    selectedTodos = props.todos.filter((todo) => todo.isCompleted);
  }
  return (
    <div className="todo-list">
      <h2>{props.title}:</h2>
      {selectedTodos.map((selectedTodo) => (
        <TodoListItem
          deleteTodo={props.deleteTodo}
          toggleTodo={props.toggleTodo}
          selectedTodo={selectedTodo}
          key={uuidv4()}
        />
      ))}
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          id: "asdfv",
          name: "Practice Guitar",
          isCompleted: false,
        },
        {
          id: "gsdfw",
          name: "Take out Recycling",
          isCompleted: false,
        },
        {
          id: "23gsd",
          name: "Exercise",
          isCompleted: false,
        },
        {
          id: "6ghsd",
          name: "Buy Groceries",
          isCompleted: false,
        },
        {
          id: "dfg83",
          name: "Send Birthday Cards",
          isCompleted: true,
        },
        {
          id: "y84cd",
          name: "Sweep Porch",
          isCompleted: true,
        },
      ],
    };
  }

  createTodo(event) {
    event.preventDefault();
    let todoName = event.target.children[1].value;
    let todos = this.state.todos;
    let newTodo = { id: uuidv4(), name: todoName, isCompleted: false };

    todos.push(newTodo);

    this.setState((state) => {
      return state.todos;
    });

    event.target.elements.todoName.value = "";
  }

  deleteTodo(id, event) {
    event.stopPropagation();

    let todos = this.state.todos;
    let i = 0;
    let deletedTodo = [];

    deletedTodo = this.state.todos.filter((todo) => todo.id === id);
    todos.forEach((todo, index) => {
      if (todo.id === id) {
        i = index;
      }
    });
    todos.splice(i, 1);

    this.setState((state) => {
      return state.todos;
    });
  }

  toggleTodo(id) {
    let todos = this.state.todos;
    let i = 0;
    let changedTodo = [];

    changedTodo = this.state.todos.filter((todo) => todo.id === id);
    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });

    this.setState((state) => {
      return state.todos;
    });
  }

  render() {
    return (
      <div className="content">
        <h1 className="title">To-Do App</h1>
        <TodoForm createTodo={this.createTodo.bind(this)} />
        <div className="lists-wrapper">
          <TodoList
            deleteTodo={this.deleteTodo.bind(this)}
            toggleTodo={this.toggleTodo.bind(this)}
            todos={this.state.todos}
            title="Todo"
          />
          <TodoList
            deleteTodo={this.deleteTodo.bind(this)}
            toggleTodo={this.toggleTodo.bind(this)}
            todos={this.state.todos}
            title="Completed"
            id="complete"
          />
        </div>
      </div>
    );
  }
}
export default App;
