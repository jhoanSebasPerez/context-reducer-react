import React, { useContext, useRef } from "react";
import { AppContext } from "./App";
import { ActionTypes } from "./App";
import { FilterOptions } from "./App";

export const TaskList = () => {
  const {
    state: { tasks, filter: filterActive },
    dispatch,
  } = useContext(AppContext);

  const isFilterActive = (filter) => filterActive === filter;

  const taskList = () => {
    switch (filterActive) {
      case FilterOptions.COMPLETED:
        return tasks.filter((task) => task.completed);
      case FilterOptions.PENDING:
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <>
      <ul>
        {taskList().map((task) => (
          <Task key={task.id} task={task} dispatch={dispatch} />
        ))}
      </ul>
      <FormTask dispatch={dispatch} />
      {Object.keys(FilterOptions).map((filter, index) => (
        <Filter
          key={index}
          dispatch={dispatch}
          active={isFilterActive(FilterOptions[filter])}
          filter={FilterOptions[filter]}
        >
          {FilterOptions[filter]}
        </Filter>
      ))}
    </>
  );
};

const Task = ({ task, dispatch }) => {
  const handleDelete = () => {
    dispatch({ type: ActionTypes.DELETE_TASK, payload: task.id });
  };

  const handleToggle = (e) => {
    e.preventDefault();
    dispatch({ type: ActionTypes.TOGGLE_TASK, payload: task.id });
  };

  return (
    <li style={{ color: task.completed ? "green" : "white" }}>
      {task.id} - {task.text}
      <button onClick={handleToggle}>Toggle</button>
      <button onClick={handleDelete}>X</button>
    </li>
  );
};

let nextId = 1;
const FormTask = ({ dispatch }) => {
  const input = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ActionTypes.CREATE_TASK,
      payload: { id: nextId++, text: input.current.value, completed: false },
    });
    input.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Your task" ref={input} />
      <button type="submit">Add new task</button>
    </form>
  );
};

const Filter = ({ dispatch, active, filter, children }) => {
  const handleClick = () => {
    dispatch({ type: ActionTypes.FILTER_TASK, payload: filter });
  };

  if (active) {
    return <span>{children}</span>;
  }

  return <button onClick={handleClick}>{children}</button>;
};

export default Task;
