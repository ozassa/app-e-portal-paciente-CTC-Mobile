import React from 'react';
import { WebViewScreen } from '@/components/WebViewScreen';
import ENV from '@/config/environment';

export const ExamResultsScreen = () => {
  return (
    <WebViewScreen
      url={ENV.WEBVIEW_URLS.EXAM_RESULTS}
      title="Resultados de Exames"
    />
  );
};
