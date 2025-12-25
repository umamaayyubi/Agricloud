import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function WeatherCard({ weather }) {
  const { t } = useTranslation();

  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2, height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <WbSunnyIcon color="warning" fontSize="large" />
          <Typography variant="h6" fontWeight="bold">
            {t('main.weatherTitle')}
          </Typography>
        </Box>
        {weather ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body1">
              <strong>{t('main.location')}:</strong> {weather.location}
            </Typography>
            <Typography variant="body1">
              <strong>{t('main.temperature')}:</strong> {weather.temperature}°C
            </Typography>
            <Typography variant="body1">
              <strong>{t('main.condition')}:</strong> {weather.condition}
            </Typography>
          </Box>
        ) : (
          <Typography color="text.secondary">{t('main.noData')}</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default WeatherCard;

