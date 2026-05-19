import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Edit2, Save, X, FileText } from 'lucide-react';
import { Note } from '../types/notes';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NotesViewProps {
  notes: Note[];
  onBack: () => void;
  onAddNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateNote: (noteId: string, updates: Partial<Note>) => void;
  onDeleteNote: (noteId: string) => void;
}

export default function NotesView({
  notes,
  onBack,
  onAddNote,
  onUpdateNote,
  onDeleteNote
}: NotesViewProps) {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleCreateNote = () => {
    setIsCreating(true);
    setEditTitle('');
    setEditContent('');
    setSelectedNote(null);
  };

  const handleSaveNew = () => {
    if (editTitle.trim() || editContent.trim()) {
      onAddNote({
        title: editTitle.trim() || 'Sem título',
        content: editContent.trim()
      });
      setIsCreating(false);
      setEditTitle('');
      setEditContent('');
    }
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(true);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (selectedNote) {
      onUpdateNote(selectedNote.id, {
        title: editTitle.trim() || 'Sem título',
        content: editContent.trim()
      });
      setIsEditing(false);
      const updatedNote = { ...selectedNote, title: editTitle, content: editContent };
      setSelectedNote(updatedNote);
    }
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleDeleteNote = (noteId: string) => {
    onDeleteNote(noteId);
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Anotações</h1>
          <button
            onClick={handleCreateNote}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Nova anotação</span>
          </button>
        </div>

        <div className="flex" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="w-80 border-r overflow-y-auto bg-gray-50">
            {notes.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p>Nenhuma anotação ainda</p>
                <p className="text-sm mt-2">Clique em "Nova anotação" para começar</p>
              </div>
            ) : (
              <div className="divide-y">
                {notes.map(note => (
                  <div
                    key={note.id}
                    className={`p-4 cursor-pointer transition-colors group relative ${
                      selectedNote?.id === note.id ? 'bg-purple-50' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSelectNote(note)}
                  >
                    <div className="pr-8">
                      <h3 className="font-medium text-gray-800 truncate mb-1">
                        {note.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {note.content || 'Sem conteúdo'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(note.updatedAt)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 p-1"
                      aria-label="Deletar anotação"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {isCreating ? (
              <div className="p-6">
                <div className="mb-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Título da anotação"
                    className="w-full text-2xl font-semibold border-none outline-none focus:ring-0 placeholder-gray-400"
                    autoFocus
                  />
                </div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Comece a escrever..."
                  className="w-full h-96 border-none outline-none focus:ring-0 resize-none placeholder-gray-400"
                />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSaveNew}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setEditTitle('');
                      setEditContent('');
                    }}
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </button>
                </div>
              </div>
            ) : selectedNote ? (
              <div className="p-6">
                {isEditing ? (
                  <>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full text-2xl font-semibold border-none outline-none focus:ring-0"
                        autoFocus
                      />
                    </div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full h-96 border-none outline-none focus:ring-0 resize-none"
                    />
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={handleSaveEdit}
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Salvar alterações
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-gray-800">
                        {selectedNote.title}
                      </h2>
                      <button
                        onClick={() => handleEditNote(selectedNote)}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                      Última edição: {formatDate(selectedNote.updatedAt)}
                    </p>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-wrap text-gray-700">
                        {selectedNote.content || 'Sem conteúdo'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Selecione uma anotação para visualizar</p>
                  <p className="text-sm mt-2">ou crie uma nova anotação</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
