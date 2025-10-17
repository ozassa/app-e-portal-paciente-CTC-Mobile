const ENV = {
  API_URL: __DEV__
    ? 'http://localhost:3001/api'
    : 'https://api.ctc.com.br/api',
  API_TIMEOUT: 30000,
  ENABLE_LOGGING: __DEV__,
};

export default ENV;
