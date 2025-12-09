import React from 'react';
import { useTranslation } from 'react-i18next';

const WeatherCard = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-icon">⛅</div>
      <h2 className="card-title">{t('weather.title')}</h2>
      <p className="card-content">{t('weather.description')}</p>
      
      {data && (
        <div className="weather-info">
          <div className="weather-item">
            <span>{t('weather.temperature')}:</span>
            <strong>{data.temperature}°C</strong>
          </div>
          <div className="weather-item">
            <span>{t('weather.humidity')}:</span>
            <strong>{data.humidity}%</strong>
          </div>
          <div className="weather-item">
            <span>{t('weather.rainfall')}:</span>
            <strong>{data.rainfall} mm</strong>
          </div>
          <div className="weather-item">
            <span>{t('weather.wind')}:</span>
            <strong>{data.wind_speed} km/h</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;

