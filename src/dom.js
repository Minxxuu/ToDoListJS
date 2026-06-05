import {createToDo, loadToDos, myToDos, saveToDos} from "./todo.js";
const app = document.getElementById("app");
const wrapper = document.getElementById("wrapper");
const newBtn = document.createElement("button");
newBtn.textContent = "+";   
newBtn.className = "w-10 h-10 bg-green-800 text-white text-2xl rounded-full flex justify-center items-center hover:bg-green-600 position absolute bottom-5 right-5";
newBtn.id = "add-todo-btn";
newBtn.addEventListener("click", () => {
    createToDoForm.classList.toggle("hidden");
});

function createCompletedButton(index) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Toggle Complete";
    button.className = "mt-2 rounded-lg bg-white px-3 py-1 text-sm text-black hover:bg-gray-200 completed-btn";
    button.dataset.index = index;
    return button;
}

const createToDoForm = document.createElement("form");
createToDoForm.innerHTML = `
    <label for="todo-input">Name</label>
    <input type="text" id="todo-input" class = "border-2 border-gray-400 bg-blue-50 h-10 w-50 rounded-lg" placeholder="Enter a new to-do item" required />
    <label for = Description> Description </label>
    <textarea id="description-input" class = "h-50 border-2 border-gray-400 bg-blue-50 rounded-lg" placeholder="Enter a description for the to-do item" required></textarea>
    <label for = DateDue> Date Due </label>
    <input type="date" id="date-due-input" class = "border-2 border-gray-400 bg-blue-50 rounded-lg" required />
    <label for = Priority> Priority </label>
    <select id="priority-input" class = "border-2 border-gray-400 bg-blue-50 rounded-lg" required>
        <option value="">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
    </select>
    <button type="submit" class ="flex justify-center items-center ml-3 w-50 bg-green-300 hover:bg-green-600">Add To-Do</button>
`;
createToDoForm.className = "flex flex-col items-start gap-4 ml-5 hidden mt-5 bg-emerald-200 p-5 rounded-lg h-full";

wrapper.className = "flex flex-row items-center";

const toDoDisplay = document.createElement("div");
toDoDisplay.id = "todo-display";
toDoDisplay.className = "mt-10 bg-emerald-600 p-5 rounded-lg w-full h-full flex flex-row gap-4 mr-4 ml-4 flex-wrap justify-center";

function renderToDos() {
    toDoDisplay.innerHTML = "";
    myToDos.forEach((toDo) => {
        const toDoItem = document.createElement("div");
        toDoItem.innerHTML = `<h2>${toDo.title}</h2>
        <p>${toDo.description}</p>
        <p> Due: ${toDo.dateDue}</p>
        <p> Priority: ${toDo.priority}</p>`;
        toDoItem.className = "bg-emerald-500 rounded-lg p-4 w-80 flex flex-col gap-2 justify-center items-center text-white hover:bg-emerald-400 shadow-lg shadow-emerald-700";

        if (toDo.completed) {
            toDoItem.style.textDecoration = "line-through";
            toDoItem.style.opacity = "0.5";
        } else {
            toDoItem.style.textDecoration = "none";
            toDoItem.style.opacity = "1";
        }
        
        switch(toDo.priority) {
            case "low":
                toDoItem.classList.add("border-2", "border-green-300");
                break;
            case "medium":
                toDoItem.classList.add("border-2", "border-yellow-300");
                break;
            case "high":
                toDoItem.classList.add("border-2", "border-red-300");
                break;
        }
        const completedButton = createCompletedButton(myToDos.indexOf(toDo));
        completedButton.addEventListener("click", () => {
            toDo.ToggleCompleted();
            if (toDo.completed) {
                toDoItem.classList.add("line-through", "opacity-50");
            } else {
                toDoItem.classList.remove("line-through", "opacity-50");
            }
            saveToDos();
            renderToDos();
        });
        toDoItem.appendChild(completedButton);
        toDoDisplay.appendChild(toDoItem);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("todo-input").value;
    const description = document.getElementById("description-input").value;
    const dateDue = document.getElementById("date-due-input").value;
    const priority = document.getElementById("priority-input").value;
    createToDo(title, description, dateDue, priority, false);
    saveToDos();
    renderToDos();
    createToDoForm.reset();
}

createToDoForm.addEventListener("submit", handleFormSubmit);

app.appendChild(newBtn);
wrapper.appendChild(createToDoForm);
wrapper.appendChild(toDoDisplay);
loadToDos();
renderToDos();