interface Todo {
  id: string,
  text: string,
  checked: boolean,
};

const addTodo = () => {
  // TODO: Implement
};

describe('Todo Service', () => {
  it('should add todo to an empty list', () => {
    const todos: Todo[] = [];
    const result = addTodo('test', todos);
    expect(result.map(td => td.text)).toEqual(['test']);
  });
});
