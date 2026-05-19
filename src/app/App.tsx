import { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import CalendarView from './components/CalendarView';
import DayView from './components/DayView';
import ColorPicker from './components/ColorPicker';
import NotesView from './components/NotesView';
import { taskStorage } from './utils/taskStorage';
import { notesStorage } from './utils/notesStorage';
import { Task, HighlightColor } from './types/calendar';
import { Note } from './types/notes';

type MainView = 'home' | 'calendar' | 'notes';
type CalendarView = 'month' | 'day';

export default function App() {
  const [mainView, setMainView] = useState<MainView>('home');
  const [calendarView, setCalendarView] = useState<CalendarView>('month');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [highlightColor, setHighlightColor] = useState<HighlightColor>({ name: 'blue', shade: 'light' });
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    const loadedTasks = taskStorage.getTasks();
    setTasks(loadedTasks);

    const loadedNotes = notesStorage.getNotes();
    setNotes(loadedNotes);

    const settings = taskStorage.getSettings();
    setHighlightColor(settings.highlightColor);
  }, []);

  const handleNavigateFromHome = (view: 'calendar' | 'notes') => {
    setMainView(view);
    if (view === 'calendar') {
      setCalendarView('month');
    }
  };

  const handleBackToHome = () => {
    setMainView('home');
    setCalendarView('month');
    setSelectedDate(null);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setCalendarView('day');
  };

  const handleBackToCalendar = () => {
    setCalendarView('month');
    setSelectedDate(null);
  };

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    taskStorage.addTask(newTask);
    setTasks(taskStorage.getTasks());
  };

  const handleDeleteTask = (taskId: string) => {
    taskStorage.deleteTask(taskId);
    setTasks(taskStorage.getTasks());
  };

  const handleColorChange = (color: HighlightColor) => {
    setHighlightColor(color);
    taskStorage.updateHighlightColor(color);
  };

  const handleAddNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now
    };
    notesStorage.addNote(newNote);
    setNotes(notesStorage.getNotes());
  };

  const handleUpdateNote = (noteId: string, updates: Partial<Note>) => {
    notesStorage.updateNote(noteId, updates);
    setNotes(notesStorage.getNotes());
  };

  const handleDeleteNote = (noteId: string) => {
    notesStorage.deleteNote(noteId);
    setNotes(notesStorage.getNotes());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      {mainView === 'home' && (
        <HomeScreen onNavigate={handleNavigateFromHome} />
      )}

      {mainView === 'calendar' && calendarView === 'month' && (
        <CalendarView
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          onDayClick={handleDayClick}
          tasks={tasks}
          highlightColor={highlightColor}
          onSettingsClick={() => setShowColorPicker(true)}
          onBackToHome={handleBackToHome}
        />
      )}

      {mainView === 'calendar' && calendarView === 'day' && selectedDate && (
        <DayView
          selectedDate={selectedDate}
          tasks={tasks}
          onBack={handleBackToCalendar}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
        />
      )}

      {mainView === 'notes' && (
        <NotesView
          notes={notes}
          onBack={handleBackToHome}
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
        />
      )}

      {showColorPicker && (
        <ColorPicker
          currentColor={highlightColor}
          onColorChange={handleColorChange}
          onClose={() => setShowColorPicker(false)}
        />
      )}
    </div>
  );
}