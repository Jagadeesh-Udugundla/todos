import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './todo.css';

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('todoData');
  const parsedCartList = JSON.parse(stringifiedCartList);
  if (parsedCartList === null) {
    return [];
  }
  return parsedCartList;
};

const SimpleTodos = () => {
  const [todosList, setTodosList] = useState(getCartListFromLocalStorage());
  const [todoName, setTodoName] = useState('');
  const [todoStatus, setTodoStatus] = useState('Pending');

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todosList));
  }, [todosList]);

  const deleteTodo = (id) => {
    const updatedTodosList = todosList.filter((eachTodo) => eachTodo.id !== id);
    setTodosList(updatedTodosList);
  };

  const changeTodoStatus = (id, statusTodo) => {
    const updatedTodosList = todosList.map((eachTodo) => {
      if (eachTodo.id === id) {
        return { ...eachTodo, status: statusTodo };
      }
      return { ...eachTodo };
    });
    setTodosList(updatedTodosList);
  };

  const onChangeInput = (event) => {
    setTodoName(event.target.value);
  };

  const onChangeStatus = (event) => {
    setTodoStatus(event.target.value);
  };

  const addTodo = () => {
    const newTodo = {
      id: uuidv4(),
      title: todoName,
      status: todoStatus,
    };
    setTodosList((prevTodosList) => [...prevTodosList, newTodo]);
    setTodoName('');
    setTodoStatus('Pending');
  };

  return (
    <div className="main-container">
      <div className="todos-container">
        <h1 className="heading">Todos</h1>
        <div className="contain">
          <input
            type="text"
            onChange={onChangeInput}
            placeholder="Create a Task"
            value={todoName}
            className="inpu"
          />
          <select value={todoStatus} onChange={onChangeStatus} className="status">
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Done">Done</option>
            <option value="In progress">In Progress</option>
          </select>
          <button type="button" className="add-button" onClick={addTodo}>
            Add a Todo
          </button>
        </div>
        {todosList.length === 0 ? (
          <p className="no-todo">No Todos added</p>
        ) : (
          
            <ol className="todos-list">
              {todosList.map((eachTodo) => (
                <li className="todo-item" key={eachTodo.id}>
                  <p className="title">{eachTodo.title}</p>
                  <select
                    value={eachTodo.status}
                    onChange={(event) => changeTodoStatus(eachTodo.id, event.target.value)}
                    className="status1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Done">Done</option>
                    <option value="In progress">In Progress</option>
                  </select>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteTodo(eachTodo.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ol>
          
        )}
      </div>
    </div>
   
  );
};

export default SimpleTodos;
