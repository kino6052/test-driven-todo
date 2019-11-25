import { TodoService, Todo } from "./todo-service";
import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject<Todo[]>([]);

describe("On Click", () => {
  it("should change state on click", () => {
    const state = TodoService.addTodo("2", TodoService.addTodo("1", []));
    subject.next(state);
    onCheckboxClick(state[0].id, subject);
    expect(getCheckedArray()).toEqual([true, false]);
  });
});

describe("Add New Todo", () => {
  it("should add new todo to state on submit", () => {
    const state = TodoService.addTodo("2", TodoService.addTodo("1", []));
    subject.next(state);
    onAddNewTodoSubmit("3", subject);
    expect(getTextArray()).toEqual(["1", "2", "3"]);
  });
});

it("Call Todo Endpoint", async done => {
  const todos = await getTodos({ todoEndpoint: async () => [] });
  expect(todos).toBeTruthy();
  done();
});
