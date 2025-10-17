import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'System',
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: 'System',
      fontWeight: 'bold' as const,
    },
  },
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700' as const,
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal' as const,
    },
    bold: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold' as const,
    },
  },
};

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'rgb(59, 130, 246)',          // blue-500
    primaryContainer: 'rgb(219, 234, 254)', // blue-100
    secondary: 'rgb(147, 197, 253)',       // blue-300
    tertiary: 'rgb(124, 58, 237)',         // violet-600
    error: 'rgb(239, 68, 68)',             // red-500
    errorContainer: 'rgb(254, 226, 226)',  // red-100
    background: 'rgb(249, 250, 251)',      // gray-50
    surface: 'rgb(255, 255, 255)',         // white
    surfaceVariant: 'rgb(243, 244, 246)',  // gray-100
    onPrimary: 'rgb(255, 255, 255)',
    onSecondary: 'rgb(31, 41, 55)',        // gray-800
    onBackground: 'rgb(17, 24, 39)',       // gray-900
    onSurface: 'rgb(31, 41, 55)',          // gray-800
    onError: 'rgb(255, 255, 255)',
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 8,
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: 'rgb(147, 197, 253)',         // blue-300
    primaryContainer: 'rgb(30, 58, 138)',  // blue-900
    secondary: 'rgb(59, 130, 246)',        // blue-500
    tertiary: 'rgb(167, 139, 250)',        // violet-400
    error: 'rgb(248, 113, 113)',           // red-400
    errorContainer: 'rgb(127, 29, 29)',    // red-900
    background: 'rgb(17, 24, 39)',         // gray-900
    surface: 'rgb(31, 41, 55)',            // gray-800
    surfaceVariant: 'rgb(55, 65, 81)',     // gray-700
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 8,
};

export type AppTheme = typeof lightTheme;
