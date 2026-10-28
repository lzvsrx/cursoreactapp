import { test } from 'node:test';
import assert from 'node:assert/strict';
import { editorReducer, initialEditor, HISTORY_LIMIT, MAX_LENGTH } from '../src/state/editor.ts';

test('escrever mantém o estado anterior imutável', () => {
  const state = Object.freeze({ text: 'Antes', history: Object.freeze(['']) });
  assert.deepEqual(editorReducer(state, { type: 'write', text: 'Depois' }), { text: 'Depois', history: ['', 'Antes'] });
  assert.equal(state.text, 'Antes');
});
test('limpar permite desfazer e restaurar o texto', () => {
  const written = editorReducer(initialEditor, { type: 'write', text: 'Felipe' });
  const cleared = editorReducer(written, { type: 'clear' });
  assert.equal(cleared.text, '');
  assert.equal(editorReducer(cleared, { type: 'undo' }).text, 'Felipe');
});
test('ações sem alteração não criam histórico', () => {
  assert.equal(editorReducer(initialEditor, { type: 'clear' }), initialEditor);
  assert.equal(editorReducer(initialEditor, { type: 'undo' }), initialEditor);
  assert.equal(editorReducer(initialEditor, { type: 'write', text: '' }), initialEditor);
});
test('texto e histórico têm limites inclusive em ações programáticas', () => {
  assert.equal(editorReducer(initialEditor, { type: 'write', text: 'a'.repeat(200) }).text.length, MAX_LENGTH);
  let state = initialEditor;
  for (let i = 0; i < 50; i++) state = editorReducer(state, { type: 'write', text: String(i) });
  assert.equal(state.history.length, HISTORY_LIMIT);
  for (let i = 0; i < HISTORY_LIMIT; i++) state = editorReducer(state, { type: 'undo' });
  assert.equal(state.text, '19');
  assert.equal(editorReducer(state, { type: 'undo' }), state);
});
