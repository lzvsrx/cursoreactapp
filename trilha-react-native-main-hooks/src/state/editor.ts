export type EditorState = { text: string; history: readonly string[] };
export type EditorAction =
  | { type: 'write'; text: string }
  | { type: 'clear' }
  | { type: 'undo' };
export const initialEditor: EditorState = { text: '', history: [] };
export const MAX_LENGTH = 160;
export const HISTORY_LIMIT = 30;

export function editorReducer(state: EditorState, action: EditorAction): EditorState {
  if (action.type === 'undo') {
    if (!state.history.length) return state;
    return { text: state.history[state.history.length - 1], history: state.history.slice(0, -1) };
  }
  const text = action.type === 'clear' ? '' : action.text.slice(0, MAX_LENGTH);
  if (text === state.text) return state;
  return { text, history: [...state.history, state.text].slice(-HISTORY_LIMIT) };
}
