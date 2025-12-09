import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import StorageCard from '../components/StorageCard';

const Dashboard = ({ onLogout }) => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [storageData, setStorageData] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const [weather, storage] = await Promise.all([
        axios.get('/api/weather', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/api/storage', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setWeatherData(weather.data);
      setStorageData(storage.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-brand">🌾 AgriCloud</div>
        <div className="navbar-actions">
          <select
            className="language-select"
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">{t('languages.en')}</option>
            <option value="hi">{t('languages.hi')}</option>
            <option value="bn">{t('languages.bn')}</option>
            <option value="te">{t('languages.te')}</option>
            <option value="mr">{t('languages.mr')}</option>
            <option value="ta">{t('languages.ta')}</option>
            <option value="gu">{t('languages.gu')}</option>
            <option value="kn">{t('languages.kn')}</option>
            <option value="ml">{t('languages.ml')}</option>
            <option value="pa">{t('languages.pa')}</option>
          </select>
          <button className="btn btn-logout" onClick={onLogout}>
            {t('dashboard.logout')}
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            {t('dashboard.welcome')}, {user?.name}!
          </h1>
          <p className="dashboard-subtitle">{t('dashboard.subtitle')}</p>
        </div>

        <div className="cards-grid">
          <WeatherCard data={weatherData} />
          <StorageCard data={storageData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

