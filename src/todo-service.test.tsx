import { Todo, TodoService } from "./todo-service";
import uniqueId from "lodash.uniqueid";

describe('Todo Service', () => {
  describe('Add Todo', () => {
    it('should add todo to an empty list', () => {
      const todos: Todo[] = [];
      const result = TodoService.addTodo('test', todos);
      expect(result.map(td => td.text)).toEqual(['test']);
    });
    it('should add todo to an non-empty list', () => {
      const todos: Todo[] = TodoService.addTodo('1', []);
      const result = TodoService.addTodo('2', todos);
      expect(result.map(td => td.text)).toEqual(['1', '2']);
    });
  });

  const toggleCompleteTodo = (todo: Todo) => ({});

  describe('Toggle Complete Todo', () => {
    it('should toggle complete for a todo', () => {
      const todo: Todo = { id: uniqueId(), text: '1', checked: false };
      expect(toggleCompleteTodo(todo).checked).toBe(true);
      expect(toggleCompleteTodo(toggleCompleteTodo(todo)).checked).toBe(true);
    });
  });

  const update = (todo: Todo, todos: Todo[]) => todos;

  describe("Update Todo", () => {
    it("should update todo", () => {
      const todos: Todo[] = TodoService.addTodo(
        "TWO-TODO",
        TodoService.addTodo("todo-two", TodoService.addTodo("todo-one", []))
      );
      const todo = toggleCompleteTodo(todos[0]);
      const result = update(todo, todos);
      expect(result.map(td => td.completion)).toEqual([true, false, false]);
    });
  });
});
