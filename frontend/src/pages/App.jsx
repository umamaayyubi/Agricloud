import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Container, Button, ThemeProvider, createTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import Login from '../components/Login';
import WeatherCard from '../components/WeatherCard';
import StorageCard from '../components/StorageCard';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: { main: '#2e7d32' },
    secondary: { main: '#ff6f00' }
  }
});

function MainPage() {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    axios.get('/api/weather').then((res) => setWeather(res.data)).catch(() => setWeather(null));
    axios.get('/api/storage').then((res) => setStorage(res.data)).catch(() => setStorage([]));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        {t('main.greeting')}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 3 }}>
        <WeatherCard weather={weather} />
        <StorageCard storage={storage} />
      </Box>
    </Container>
  );
}

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const isLoginPage = location.pathname === '/';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    if (isLoggedIn && isLoginPage) {
      navigate('/main');
    }
  }, [isLoggedIn, isLoginPage, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5' }}>
        <AppBar position="static" elevation={2}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight="bold">
              {t('app.title')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <LanguageSelector />
              {isLoggedIn && !isLoginPage && (
                <Button color="inherit" variant="outlined" onClick={handleLogout} sx={{ borderColor: 'white' }}>
                  {t('main.logout')}
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

