import { Calendar, FileText } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (view: 'calendar' | 'notes') => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Organizador Pessoal
        </h1>
        <p className="text-xl text-gray-600">
          Gerencie suas tarefas e anotações em um só lugar
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => onNavigate('calendar')}
          className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:scale-105 duration-300"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-blue-100 p-6 rounded-full group-hover:bg-blue-200 transition-colors">
              <Calendar className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Calendário</h2>
            <p className="text-gray-600 text-center">
              Visualize e organize suas tarefas por dia, semana e mês
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('notes')}
          className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:scale-105 duration-300"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-purple-100 p-6 rounded-full group-hover:bg-purple-200 transition-colors">
              <FileText className="w-16 h-16 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Anotações</h2>
            <p className="text-gray-600 text-center">
              Crie e organize suas notas e lembretes importantes
            </p>
          </div>
        </button>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white/50 rounded-xl p-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">📅</div>
          <h3 className="font-semibold text-gray-800 mb-1">Organize-se</h3>
          <p className="text-sm text-gray-600">Planeje suas tarefas diárias</p>
        </div>
        <div className="bg-white/50 rounded-xl p-6">
          <div className="text-3xl font-bold text-purple-600 mb-2">✍️</div>
          <h3 className="font-semibold text-gray-800 mb-1">Anote tudo</h3>
          <p className="text-sm text-gray-600">Suas ideias sempre à mão</p>
        </div>
        <div className="bg-white/50 rounded-xl p-6">
          <div className="text-3xl font-bold text-green-600 mb-2">💾</div>
          <h3 className="font-semibold text-gray-800 mb-1">Salvo automático</h3>
          <p className="text-sm text-gray-600">Nunca perca seus dados</p>
        </div>
      </div>
    </div>
  );
}
