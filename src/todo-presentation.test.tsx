import React, { Fragment } from 'react';
import uniqueId from "lodash.uniqueid";
import { Todo, TodoService } from "./todo-service";
import Enzyme, { mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const TodoComponent: React.SFC<{ todo: Todo }> = props => (
  <Fragment>
    <div>{props.todo.text}</div>
    <Checkbox checked={props.todo.checked}/>
  </Fragment>
);

const hasText = (text: string, wrapper: Enzyme.ReactWrapper) => {
  return wrapper.findWhere(w => w.text() === text).first().exists();
};

const contains = function <T>(Component: React.SFC<T>, wrapper: Enzyme.ReactWrapper) {
  return wrapper.find(Component).first().exists();
};

const Checkbox: React.SFC<{ checked: boolean }> = props => (
  <div className={props.checked ? "checked" : ""}></div>
);

const isChecked = (wrapper: Enzyme.ReactWrapper) => (
  wrapper
    .findWhere(w => w.hasClass("checked"))
    .first()
    .exists()
);

const TodoList: React.SFC<{ todos: Todo[] }> = props => (
  <Fragment>
    {props.todos.map(td => (
      <TodoComponent todo={td} />
    ))}
  </Fragment>
);

const howMany = function<T>(
  Component: React.SFC<T>,
  wrapper: Enzyme.ReactWrapper
) {
  return wrapper
    .find(Component)
    .length
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
  it("should display checkbox with completion status", () => {
    const todo: Todo = {
      id: uniqueId(),
      text: "first",
      checked: false
    };
    const wrapper = mount(<TodoComponent todo={todo} />);
    expect(contains(Checkbox, wrapper)).toBe(true);
  });
  it("should have a checbox checked if todo completion is true", () => {
    const todo: Todo = {
      id: uniqueId(),
      text: "first",
      checked: true
    };
    const wrapper = mount(<TodoComponent todo={todo} />);
    expect(isChecked(wrapper)).toBe(true);
  });
  it("should have a checkbox unchecked if todo completion is false", () => {
    const todo: Todo = {
      id: uniqueId(),
      text: "first",
      checked: false
    };
    const wrapper = mount(<TodoComponent todo={todo} />);
    expect(isChecked(wrapper)).toBe(false);
  });
  it("should display a list of todos", () => {
    const todos: Todo[] = TodoService.addTodo(
      "three",
      TodoService.addTodo("two", TodoService.addTodo("one", []))
    );
    const wrapper = mount(<TodoList todos={todos} />);
    expect(howMany(TodoComponent, wrapper)).toBe(3);
  });
});