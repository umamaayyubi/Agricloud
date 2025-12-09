import React from 'react';
import { useTranslation } from 'react-i18next';

const StorageCard = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-icon">🏪</div>
      <h2 className="card-title">{t('storage.title')}</h2>
      <p className="card-content">{t('storage.description')}</p>
      
      {data && data.length > 0 && (
        <div className="storage-list">
          {data.map((item, index) => (
            <div key={index} className="storage-item">
              <span>{item.crop_name}</span>
              <strong>{item.quantity} {item.unit}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorageCard;

