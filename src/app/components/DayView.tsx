import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Clock } from 'lucide-react';
import { formatDisplayDate, formatDate } from '../utils/dateHelpers';
import { Task } from '../types/calendar';

interface DayViewProps {
  selectedDate: Date;
  tasks: Task[];
  onBack: () => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function DayView({
  selectedDate,
  tasks,
  onBack,
  onAddTask,
  onDeleteTask
}: DayViewProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskTime, setTaskTime] = useState('');

  const dateStr = formatDate(selectedDate);
  const dayTasks = tasks.filter(task => task.date === dateStr);

  const sortedTasks = [...dayTasks].sort((a, b) => {
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask({
        title: taskTitle.trim(),
        time: taskTime || undefined,
        date: dateStr
      });
      setTaskTitle('');
      setTaskTime('');
      setIsAdding(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao calendário</span>
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            {formatDisplayDate(selectedDate)}
          </h2>
          <p className="text-gray-600">
            {sortedTasks.length} {sortedTasks.length === 1 ? 'tarefa' : 'tarefas'}
          </p>
        </div>

        <div className="space-y-4">
          {sortedTasks.map(task => (
            <div
              key={task.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              {task.time && (
                <div className="flex items-center gap-1 text-blue-600 min-w-[80px]">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{task.time}</span>
                </div>
              )}
              <div className="flex-1">
                <p className="text-gray-900">{task.title}</p>
              </div>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 p-2"
                aria-label="Deletar tarefa"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          {sortedTasks.length === 0 && !isAdding && (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">Nenhuma tarefa para este dia</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          {isAdding ? (
            <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-blue-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título da tarefa *
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Digite o título da tarefa"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário (opcional)
                </label>
                <input
                  type="time"
                  value={taskTime}
                  onChange={(e) => setTaskTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setTaskTitle('');
                    setTaskTime('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar tarefa</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
