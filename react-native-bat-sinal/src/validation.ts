export type SignalForm = { name: string; phone: string; location: string; notes: string };
export type FormErrors = Partial<Record<keyof SignalForm, string>>;
export const emptyForm: SignalForm = { name: '', phone: '', location: '', notes: '' };

export function validateForm(form: SignalForm): FormErrors {
  const errors: FormErrors = {};
  if (form.name.trim().length < 2) errors.name = 'Informe seu nome com pelo menos 2 caracteres.';
  const digits = form.phone.replace(/\D/g, '');
  if (!/^\+?[\d\s().-]+$/.test(form.phone.trim()) || digits.length < 10 || digits.length > 15)
    errors.phone = 'Informe um telefone válido com DDD (10 a 15 dígitos).';
  if (form.location.trim().length < 5) errors.location = 'Informe um endereço ou ponto de referência (mínimo 5 caracteres).';
  return errors;
}
