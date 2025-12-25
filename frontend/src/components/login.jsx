import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError(t('login.error'));
      return;
    }

    try {
      const res = await axios.post('/api/login', { username, password });
      localStorage.setItem('token', res.data.token || 'demo');
      navigate('/main');
    } catch {
      setError(t('login.error'));
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ maxWidth: 450, width: '100%', boxShadow: 6, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            {t('login.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            {t('login.subtitle')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label={t('login.username')}
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label={t('login.password')}
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5, mt: 1 }}>
              {t('login.button')}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;

