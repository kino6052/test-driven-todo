import { TodoService, Todo } from "./todo-service";
import { BehaviorSubject } from "rxjs";
import { TodoIntegration } from "./integration";

describe("On Click", () => {
  it("should change state on click", () => {
    const state = TodoService.addTodo("2", TodoService.addTodo("1", []));
    TodoIntegration.TodoSubject.next(state);
    TodoIntegration.onCheckboxClick(state[0].id, TodoIntegration.TodoSubject);
    expect(TodoIntegration.getCheckedArray()).toEqual([true, false]);
  });
});

describe("Add New Todo", () => {
  it("should add new todo to state on submit", () => {
    const state = TodoService.addTodo("2", TodoService.addTodo("1", []));
    TodoIntegration.TodoSubject.next(state);
    TodoIntegration.onAddNewTodoSubmit(
      "3",
      TodoIntegration.TodoSubject
    );
    expect(TodoIntegration.getTextArray()).toEqual(["1", "2", "3"]);
  });
});

it("Call Todo Endpoint", async done => {
  const todos = await TodoIntegration.getTodos({
    todoEndpoint: async () => []
  });
  expect(todos).toBeTruthy();
  done();
});
