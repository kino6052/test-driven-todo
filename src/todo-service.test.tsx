import uniqueId from "lodash.uniqueid";

interface Todo {
  id: string,
  text: string,
  checked: boolean,
};

const addTodo = (text: string, todos: Todo[]) => {
  const newTodos = todos.map(td => td);
  return [...newTodos, { id: uniqueId(), text, checked: false }];
};

describe('Todo Service', () => {
  it('should add todo to an empty list', () => {
    const todos: Todo[] = [];
    const result = addTodo('test', todos);
    expect(result.map(td => td.text)).toEqual(['test']);
  });
});
