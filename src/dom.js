import {createToDo} from "./todo.js";

const app = document.getElementById("app");
const createToDoForm = document.createElement("form");

createToDoForm.innerHTML = `
    <label for="todo-input">Name</label>
  <input type="text" id="todo-input" placeholder="Enter a new to-do item" required />
`;

app.appendChild(createToDoForm);

