const myToDos = [];

export class ToDo {
    constructor(title, description, dateDue, priority, completed) {
        this.title = title;
        this.description = description;
        this.dateDue = dateDue;
        this.priority = priority;
        this.completed = completed;
    }
    ToggleCompleted() {
        this.completed = !this.completed;
    }

    save() {
        myToDos.push(this);
    }
}

export function createToDo(title, description, dateDue, priority, completed) {
    const newToDo = new ToDo(title, description, dateDue, priority, completed);
    newToDo.save();
    return newToDo;
}
