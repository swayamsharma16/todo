import React, { useState, useRef, useEffect } from "react";

function Item({ item, setTodos }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const completeTodo = () => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const deleteTodo = () => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== item.id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const handleInputChange = (event) => {
    const newTitle = event.target.value;
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: newTitle } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    setEditing(false);
  };

  const handleInputBlur = () => {
    setEditing(false);
  };

  return (
    <li
      id={item?.id}
      className={`todo_item ${item.completed ? "completed" : ""}`}
    >
      {editing ? (
        <form className="edit-form" onSubmit={handleInputSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <span
            className={`todo_title ${item.completed ? "strikethrough" : ""}`}
          >
            {item.title}
          </span>
          <div className="todo_items_right">
            <button onClick={completeTodo}>
              {item.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={deleteTodo}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

function TODOList({ todos, setTodos }) {
  // Load todos from localStorage on initial load
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, [setTodos]);

  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => (
          <Item key={index} item={item} setTodos={setTodos} />
        ))
      ) : (
        <p>Seems lonely in here, what are you up to?</p>
      )}
    </ol>
  );
}

export default TODOList;
