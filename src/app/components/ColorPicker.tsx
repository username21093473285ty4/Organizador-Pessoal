import { X } from 'lucide-react';
import { HighlightColor, ColorName, ColorShade, COLOR_OPTIONS } from '../types/calendar';

interface ColorPickerProps {
  currentColor: HighlightColor;
  onColorChange: (color: HighlightColor) => void;
  onClose: () => void;
}

const colorNames: { name: ColorName; label: string }[] = [
  { name: 'yellow', label: 'Amarelo' },
  { name: 'red', label: 'Vermelho' },
  { name: 'blue', label: 'Azul' },
  { name: 'orange', label: 'Laranja' },
  { name: 'green', label: 'Verde' },
  { name: 'purple', label: 'Roxo' },
  { name: 'pink', label: 'Rosa' },
  { name: 'black', label: 'Preto' },
  { name: 'gray', label: 'Cinza' }
];

export default function ColorPicker({
  currentColor,
  onColorChange,
  onClose
}: ColorPickerProps) {
  const handleColorClick = (name: ColorName, shade: ColorShade) => {
    onColorChange({ name, shade });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Cor de destaque das tarefas
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Escolha a cor que será usada para destacar os dias com tarefas no calendário.
        </p>

        <div className="space-y-6">
          {colorNames.map(({ name, label }) => (
            <div key={name} className="space-y-2">
              <h3 className="font-medium text-gray-700">{label}</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => handleColorClick(name, 'light')}
                  className={`
                    flex-1 h-16 rounded-lg transition-all
                    ${COLOR_OPTIONS[name].light}
                    ${currentColor.name === name && currentColor.shade === 'light'
                      ? 'ring-4 ring-gray-900 ring-offset-2'
                      : 'hover:scale-105'
                    }
                  `}
                  aria-label={`${label} claro`}
                >
                  <span className="text-sm font-medium text-gray-700">Claro</span>
                </button>
                <button
                  onClick={() => handleColorClick(name, 'dark')}
                  className={`
                    flex-1 h-16 rounded-lg transition-all
                    ${COLOR_OPTIONS[name].dark}
                    ${currentColor.name === name && currentColor.shade === 'dark'
                      ? 'ring-4 ring-gray-900 ring-offset-2'
                      : 'hover:scale-105'
                    }
                  `}
                  aria-label={`${label} escuro`}
                >
                  <span className={`text-sm font-medium ${
                    name === 'yellow' || name === 'orange' ? 'text-gray-700' : 'text-white'
                  }`}>
                    Escuro
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
