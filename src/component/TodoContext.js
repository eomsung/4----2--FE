import React, { createContext, useContext, useState, useEffect } from "react";
import { getTodoList } from "../api/studyService";
import { useParams } from "react-router-dom";

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const handleTodoList = async () => {
      const todolist = await getTodoList(id);
      setTodos(todolist);
    };

    handleTodoList();
  }, [id]);

  const addTodo = (text) => {
    const newTodo = { text };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
