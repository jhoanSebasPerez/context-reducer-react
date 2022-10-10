import React, { useReducer } from "react";
import "./App.css";
import { TaskList } from "./TaskList";

export const FilterOptions = {
  SHOW_ALL: "Show all",
  PENDING: "Pendind",
  COMPLETED: "Completed",
};

export const ActionTypes = {
  CREATE_TASK: "CREATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  TOGGLE_TASK: "TOGGLE_TASK",
  FILTER_TASK: "FILTER_TASK",
};

const initialState = { tasks: [], filter: FilterOptions.SHOW_ALL };

const taskReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case ActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case ActionTypes.TOGGLE_TASK:
      const newState = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return { ...state, tasks: newState };
    case ActionTypes.FILTER_TASK:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export const AppContext = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <TaskList />
      </div>
    </AppContext.Provider>
  );
}

export default App;
