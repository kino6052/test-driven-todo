import uniqueId from "lodash.uniqueid";
import { Todo } from "./todo-service";

describe("Display Todo", () => {
  it("should display todo name", () => {
    const todo: Todo = {
      id: uniqueId(),
      text: "first",
      checked: false
    };
    const wrapper = mount(<TodoComponent todo={todo} />);
    expect(hasText("first", wrapper)).toBe(true);
  });
});