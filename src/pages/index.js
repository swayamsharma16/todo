import React, { useState } from "react";
import Header from "@/components/Header";
import Form from "@/components/Form";
import TODOHero from "@/components/TODOHero";
import TODOList from "@/components/TODOList";

function App() {
  const [todos, setTodos] = useState([]);

  const todosCompleted = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;

  return (
    <div className="wrapper">
      <Header />
      <TODOHero todos_completed={todosCompleted} total_todos={totalTodos} />
      <Form setTodos={setTodos} />
      <TODOList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
