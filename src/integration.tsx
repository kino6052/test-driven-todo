import { TodoService, Todo } from "./todo-service";
import { BehaviorSubject } from "rxjs";


export class TodoIntegration {
  static TodoSubject = new BehaviorSubject<Todo[]>([]);
  static onCheckboxClick = (id: string, subject: BehaviorSubject<Todo[]>) => {
    const state = subject.getValue();
    const todo = state.find(td => td.id === id);
    if (todo)
      subject.next(
        TodoService.update(TodoService.toggleCompleteTodo(todo), state)
      );
  };

  static getCheckedArray = () => TodoIntegration.TodoSubject.getValue().map(td => td.checked);

  static onAddNewTodoSubmit = (text: string, subject: BehaviorSubject<Todo[]>) => {
    const state = subject.getValue();
    subject.next(TodoService.addTodo(text, state));
  };

  static getTextArray = () => TodoIntegration.TodoSubject.getValue().map(td => td.text);

  static getTodos = async (dependencies: {
    todoEndpoint: () => Promise<Todo[]>;
  }) => {
    try {
      return await dependencies.todoEndpoint();
    } catch (e) {
      return [];
    }
  };
}
