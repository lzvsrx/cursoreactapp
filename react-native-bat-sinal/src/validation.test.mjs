import assert from 'node:assert/strict';
import { test } from 'node:test';
import { emptyForm, validateForm } from './validation.ts';

const valid = { name: 'Bruce Wayne', phone: '(11) 99999-9999', location: 'Avenida Gotham, 100', notes: '' };

test('exige nome, telefone e localização, mantendo observações opcionais', () => {
  assert.deepEqual(Object.keys(validateForm(emptyForm)), ['name', 'phone', 'location']);
  assert.deepEqual(validateForm(valid), {});
});
test('aceita telefone formatado e internacional; rejeita letras e comprimentos inválidos', () => {
  assert.deepEqual(validateForm({ ...valid, phone: '+55 (11) 99999-9999' }), {});
  for (const phone of ['abc11999999999', '123', '+1234567890123456']) {
    assert.ok(validateForm({ ...valid, phone }).phone);
  }
});
test('não aceita nome ou localização compostos somente por espaços', () => {
  assert.ok(validateForm({ ...valid, name: '  ' }).name);
  assert.ok(validateForm({ ...valid, location: '  ' }).location);
});
