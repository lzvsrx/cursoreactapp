import assert from 'node:assert/strict';
import { test } from 'node:test';
import { filterTasks, tasksReducer } from '../src/state/tasks.ts';

test('adiciona uma tarefa normalizada sem alterar o estado anterior', () => {
  const before = Object.freeze([]);
  const after = tasksReducer(before, { type: 'add', id: 1, title: '  Estudar Hooks  ' });
  assert.deepEqual(after, [{ id: 1, title: 'Estudar Hooks', done: false }]);
  assert.deepEqual(before, []);
});
test('rejeita título vazio e ID duplicado', () => {
  const tasks = [{ id: 1, title: 'Estudar', done: false }];
  assert.equal(tasksReducer(tasks, { type: 'add', id: 2, title: '  ' }), tasks);
  assert.equal(tasksReducer(tasks, { type: 'add', id: 1, title: 'Outra' }), tasks);
});
test('alterna a tarefa correta sem modificar os objetos anteriores', () => {
  const first = Object.freeze({ id: 1, title: 'Primeira', done: false });
  const second = Object.freeze({ id: 2, title: 'Segunda', done: false });
  const after = tasksReducer([first, second], { type: 'toggle', id: 2 });
  assert.equal(after[0], first);
  assert.equal(after[1].done, true);
  assert.equal(second.done, false);
  assert.equal(tasksReducer(after, { type: 'toggle', id: 2 })[1].done, false);
});
test('remove apenas o ID solicitado e ignora um ID inexistente', () => {
  const tasks = [{ id: 1, title: 'Uma', done: false }, { id: 2, title: 'Duas', done: true }];
  assert.deepEqual(tasksReducer(tasks, { type: 'remove', id: 1 }), [tasks[1]]);
  assert.deepEqual(tasksReducer(tasks, { type: 'remove', id: 99 }), tasks);
});
test('limpa concluídas ou toda a lista sem adicionar tarefas', () => {
  const tasks = [{ id: 1, title: 'Uma', done: false }, { id: 2, title: 'Duas', done: true }];
  assert.deepEqual(tasksReducer(tasks, { type: 'clear-completed' }), [tasks[0]]);
  assert.deepEqual(tasksReducer(tasks, { type: 'clear' }), []);
  assert.equal(tasks.length, 2);
});
test('filtra todas, pendentes e concluídas', () => {
  const tasks = [{ id: 1, title: 'Uma', done: false }, { id: 2, title: 'Duas', done: true }];
  assert.deepEqual(filterTasks(tasks, 'all'), tasks);
  assert.deepEqual(filterTasks(tasks, 'pending'), [tasks[0]]);
  assert.deepEqual(filterTasks(tasks, 'done'), [tasks[1]]);
});
