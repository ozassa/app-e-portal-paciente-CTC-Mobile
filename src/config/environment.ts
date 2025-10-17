const ENV = {
  API_URL: __DEV__
    ? 'http://10.0.2.2:3001/api'
    : 'https://api.ctc.com.br/api',
  API_TIMEOUT: 30000,
  ENABLE_LOGGING: __DEV__,
  WEBVIEW_URLS: {
    SCHEDULE_APPOINTMENT: __DEV__
      ? 'http://10.0.2.2:5173/agendamento'
      : 'https://portal.ctc.com.br/agendamento',
    EXAM_RESULTS: __DEV__
      ? 'http://10.0.2.2:5173/resultados'
      : 'https://portal.ctc.com.br/resultados',
  },
};

export default ENV;
