export type Task = { id: number; title: string; done: boolean };
export type TaskFilter = 'all' | 'pending' | 'done';
export type TaskAction =
  | { type: 'add'; id: number; title: string }
  | { type: 'toggle'; id: number }
  | { type: 'remove'; id: number }
  | { type: 'clear-completed' }
  | { type: 'clear' };

export function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'add': {
      const title = action.title.trim();
      if (!title || state.some(task => task.id === action.id)) return state;
      return [...state, { id: action.id, title, done: false }];
    }
    case 'toggle': return state.map(task => task.id === action.id ? { ...task, done: !task.done } : task);
    case 'remove': return state.filter(task => task.id !== action.id);
    case 'clear-completed': return state.filter(task => !task.done);
    case 'clear': return [];
  }
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  return tasks.filter(task => filter === 'all' || (filter === 'done' ? task.done : !task.done));
}
