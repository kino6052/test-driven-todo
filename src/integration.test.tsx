import { TodoService, Todo } from "./todo-service";
import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject<Todo[]>([]);

const onCheckboxClick = (id: string, subject: BehaviorSubject<Todo[]>) => {
  const state = subject.getValue();
  const todo = state.find(td => td.id === id);
  if (todo) subject.next(TodoService.update(TodoService.toggleCompleteTodo(todo), state));
};

const getCheckedArray = () => subject.getValue().map(td => td.checked);

const onAddNewTodoSubmit = (text: string, subject: BehaviorSubject<Todo[]>) => {
  const state = subject.getValue();
  subject.next(TodoService.addTodo(text, state));
};

const getTextArray = () => subject.getValue().map(td => td.text);

const getTodos = async (dependencies: { todoEndpoint: () => Promise<Todo[]> }) => {
  try {
    return await dependencies.todoEndpoint();
  } catch (e) {
    return [];
  }
};

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
