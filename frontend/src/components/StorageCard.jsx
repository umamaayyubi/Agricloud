import React from 'react';
import { Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';
import StorageIcon from '@mui/icons-material/Storage';

function StorageCard({ storage }) {
  const { t } = useTranslation();

  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2, height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <StorageIcon color="success" fontSize="large" />
          <Typography variant="h6" fontWeight="bold">
            {t('main.storageTitle')}
          </Typography>
        </Box>
        {storage && storage.length > 0 ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>{t('main.crop')}</strong></TableCell>
                <TableCell><strong>{t('main.quantity')}</strong></TableCell>
                <TableCell><strong>{t('main.storageLocation')}</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {storage.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.crop}</TableCell>
                  <TableCell>{item.quantityTons}</TableCell>
                  <TableCell>{item.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography color="text.secondary">{t('main.noData')}</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default StorageCard;

