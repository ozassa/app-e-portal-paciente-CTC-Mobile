import React from 'react';
import { WebViewScreen } from '@/components/WebViewScreen';
import ENV from '@/config/environment';

export const ScheduleAppointmentScreen = () => {
  return (
    <WebViewScreen
      url={ENV.WEBVIEW_URLS.SCHEDULE_APPOINTMENT}
      title="Agendar Consulta"
    />
  );
};
