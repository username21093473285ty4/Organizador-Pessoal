export interface Task {
  id: string;
  title: string;
  time?: string;
  date: string;
}

export interface CalendarSettings {
  highlightColor: HighlightColor;
}

export type ColorShade = 'light' | 'dark';

export type ColorName = 'yellow' | 'red' | 'blue' | 'orange' | 'green' | 'purple' | 'pink' | 'black' | 'gray';

export interface HighlightColor {
  name: ColorName;
  shade: ColorShade;
}

export const COLOR_OPTIONS: Record<ColorName, Record<ColorShade, string>> = {
  yellow: {
    light: 'bg-yellow-200 hover:bg-yellow-300',
    dark: 'bg-yellow-600 hover:bg-yellow-700'
  },
  red: {
    light: 'bg-red-200 hover:bg-red-300',
    dark: 'bg-red-600 hover:bg-red-700'
  },
  blue: {
    light: 'bg-blue-200 hover:bg-blue-300',
    dark: 'bg-blue-600 hover:bg-blue-700'
  },
  orange: {
    light: 'bg-orange-200 hover:bg-orange-300',
    dark: 'bg-orange-600 hover:bg-orange-700'
  },
  green: {
    light: 'bg-green-200 hover:bg-green-300',
    dark: 'bg-green-600 hover:bg-green-700'
  },
  purple: {
    light: 'bg-purple-200 hover:bg-purple-300',
    dark: 'bg-purple-600 hover:bg-purple-700'
  },
  pink: {
    light: 'bg-pink-200 hover:bg-pink-300',
    dark: 'bg-pink-600 hover:bg-pink-700'
  },
  black: {
    light: 'bg-gray-300 hover:bg-gray-400',
    dark: 'bg-gray-800 hover:bg-gray-900'
  },
  gray: {
    light: 'bg-gray-200 hover:bg-gray-300',
    dark: 'bg-gray-500 hover:bg-gray-600'
  }
};
