export const myToDos = [];
const STORAGE_KEY = "myToDos";

export class ToDo {
    constructor(title, description, dateDue, priority, completed, expanded = false) {
        this.title = title;
        this.description = description;
        this.dateDue = dateDue;
        this.priority = priority;
        this.completed = completed;
        this.expanded = expanded;
    }
    ToggleCompleted() {
        this.completed = !this.completed;
    }
    
    save() {
        myToDos.push(this);
    }
}

export function createToDo(title, description, dateDue, priority, completed, expanded = false) {
    const newToDo = new ToDo(title, description, dateDue, priority, completed, expanded);
    newToDo.save();
    return newToDo;
}

export function saveToDos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(myToDos));
}           

export function loadToDos() {
    const storedToDos = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!Array.isArray(storedToDos)) {
        return;
    }

    myToDos.length = 0;

    storedToDos.forEach((storedToDo) => {
        myToDos.push(
            new ToDo(
                storedToDo.title,
                storedToDo.description,
                storedToDo.dateDue,
                storedToDo.priority,
                storedToDo.completed,
                storedToDo.expanded
            )
        );
    });
}
