import React from "react";

function TODOHero({ todos_completed, total_todos }) {
  return (
    <section className="todohero_section">
      <div>
        <p>Task Done</p>
        <p>Keep it up</p>
      </div>
      <div>
        <div className="circle">
          {todos_completed}/{total_todos}
        </div>
      </div>
    </section>
  );
}

export default TODOHero;
