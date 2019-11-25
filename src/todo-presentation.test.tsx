import React from 'react';
import uniqueId from "lodash.uniqueid";
import { Todo } from "./todo-service";
import Enzyme, { mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const TodoComponent: React.SFC<{ todo: Todo }> = props => (
  <div>{props.todo.text}</div>
);

const hasText = (text: string, wrapper: Enzyme.ReactWrapper) => {
  return wrapper.findWhere(w => w.text() === text).first().exists();
};

describe("Display Todo", () => {
  it("should display todo name", () => {
    const todo: Todo = {
      id: uniqueId(),
      text: "first",
      checked: false
    };
    const wrapper = mount(<TodoComponent todo={todo} />);
    expect(hasText(todo.text, wrapper)).toBe(true);
  });
});