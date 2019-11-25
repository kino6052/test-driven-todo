import { uniqueId } from "lodash";
import { Utils } from "./utils";

export interface Todo {
  id: string,
  text: string,
  checked: boolean,
};

export class TodoService {
  static addTodo = (text: string, todos: Todo[]) => {
    const newTodos = todos.map(td => td);
    return [...newTodos, { id: uniqueId(), text, checked: false }];
  };
  static toggleCompleteTodo = (todo: Todo) => {
    const copy = Utils.copy(todo);
    copy.checked = !copy.checked;
    return copy;
  };
  static update = (todo: Todo, todos: Todo[]) => {
    const copyTodo = Utils.copy(todo);
    return todos.map(td => {
      if (td.id === copyTodo.id) return copyTodo;
      return td;
    });
  };
}
