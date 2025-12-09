import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🌾</div>
          <h1 className="login-title">{t('login.title')}</h1>
          <p className="login-subtitle">{t('login.subtitle')}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t('login.email')}</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="farmer@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('login.password')}</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Loading...' : t('login.button')}
          </button>
        </form>

        <div className="language-selector">
          <label className="form-label">{t('login.selectLanguage')}</label>
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
        </div>
      </div>
    </div>
  );
};

export default Login;

