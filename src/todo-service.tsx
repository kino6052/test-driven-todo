import { uniqueId } from "lodash";

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
}
