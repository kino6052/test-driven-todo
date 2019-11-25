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

  describe('Toggle Complete Todo', () => {
    it('should toggle complete for a todo', () => {
      const todo: Todo = { id: uniqueId(), text: '1', checked: false };
      expect(TodoService.toggleCompleteTodo(todo).checked).toBe(true);
      expect(
        TodoService.toggleCompleteTodo(TodoService.toggleCompleteTodo(todo))
          .checked
      ).toBe(false);
    });
  });

  describe("Update Todo", () => {
    it("should update todo", () => {
      const todos: Todo[] = TodoService.addTodo(
        "TWO-TODO",
        TodoService.addTodo("todo-two", TodoService.addTodo("todo-one", []))
      );
      const todo = TodoService.toggleCompleteTodo(todos[0]);
      const result = TodoService.update(todo, todos);
      expect(result.map(td => td.checked)).toEqual([true, false, false]);
    });
  });
});
