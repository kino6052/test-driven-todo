import { Todo, TodoService } from "./todo-service";

describe('Todo Service', () => {
  it('should add todo to an empty list', () => {
    const todos: Todo[] = [];
    const result = TodoService.addTodo('test', todos);
    expect(result.map(td => td.text)).toEqual(['test']);
  });
});
