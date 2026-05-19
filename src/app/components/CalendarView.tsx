import { ChevronLeft, ChevronRight, Settings, Home } from 'lucide-react';
import {
  generateCalendarDays,
  formatDate,
  formatMonthYear,
  isToday,
  isSameMonthCheck,
  nextMonth,
  previousMonth
} from '../utils/dateHelpers';
import { Task, HighlightColor, COLOR_OPTIONS } from '../types/calendar';

interface CalendarViewProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  onDayClick: (date: Date) => void;
  tasks: Task[];
  highlightColor: HighlightColor;
  onSettingsClick: () => void;
  onBackToHome?: () => void;
}

export default function CalendarView({
  currentMonth,
  onMonthChange,
  onDayClick,
  tasks,
  highlightColor,
  onSettingsClick,
  onBackToHome
}: CalendarViewProps) {
  const days = generateCalendarDays(currentMonth);
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getTasksForDay = (date: Date): number => {
    const dateStr = formatDate(date);
    return tasks.filter(task => task.date === dateStr).length;
  };

  const getHighlightClass = (): string => {
    return COLOR_OPTIONS[highlightColor.name][highlightColor.shade];
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {onBackToHome && (
          <div className="mb-4">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Voltar à tela inicial</span>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onMonthChange(previousMonth(currentMonth))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <h2 className="text-3xl font-semibold text-gray-800 capitalize">
            {formatMonthYear(currentMonth)}
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={onSettingsClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Configurações"
            >
              <Settings className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={() => onMonthChange(nextMonth(currentMonth))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Próximo mês"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map(day => (
            <div
              key={day}
              className="text-center font-medium text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const taskCount = getTasksForDay(day);
            const hasTasks = taskCount > 0;
            const isCurrentMonth = isSameMonthCheck(day, currentMonth);
            const isTodayDate = isToday(day);

            return (
              <button
                key={index}
                onClick={() => onDayClick(day)}
                className={`
                  relative aspect-square p-2 rounded-lg transition-all
                  ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                  ${isTodayDate ? 'ring-2 ring-blue-500' : ''}
                  ${hasTasks ? getHighlightClass() : 'hover:bg-gray-100'}
                  ${!hasTasks && isCurrentMonth ? 'hover:bg-gray-50' : ''}
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className={`text-lg ${isTodayDate ? 'font-bold' : ''}`}>
                    {day.getDate()}
                  </span>
                  {hasTasks && (
                    <span className="text-xs mt-1 opacity-70">
                      {taskCount} {taskCount === 1 ? 'tarefa' : 'tarefas'}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded ring-2 ring-blue-500"></div>
            <span>Hoje</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${getHighlightClass()}`}></div>
            <span>Com tarefas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
