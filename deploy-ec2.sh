#!/bin/bash

echo "===== Agricloud EC2 Apache2 Deployment Script ====="

# Variables
APP_DIR="/var/www/html/agricloud"
FRONTEND_DIR="${APP_DIR}/frontend"
BACKEND_DIR="/home/ubuntu/agricloud-backend"

# Update system
echo "Updating system..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python and Apache2
echo "Installing Python, pip, and Apache2..."
sudo apt install -y python3 python3-pip apache2

# Enable Apache modules for proxy (for backend API)
echo "Enabling Apache modules..."
sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers

# Install PostgreSQL
echo "Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
echo "Setting up database..."
sudo -u postgres psql <<EOF
CREATE DATABASE agricloud_db;
CREATE USER agricloud_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE agricloud_db TO agricloud_user;
\q
EOF

# Navigate to project directory
cd /home/ubuntu
if [ -d "agricloud" ]; then
    cd agricloud
    git pull origin main
else
    git clone https://github.com/your-username/agricloud.git
    cd agricloud
fi

# ===== FRONTEND DEPLOYMENT =====
echo "Building frontend..."
cd frontend
npm install
npm run build

# Create Apache directory for frontend
sudo mkdir -p $FRONTEND_DIR
sudo rm -rf $FRONTEND_DIR/*

# Copy build files
sudo cp -r dist/* $FRONTEND_DIR/
sudo cp .htaccess $FRONTEND_DIR/

# Set permissions
sudo chown -R www-data:www-data $FRONTEND_DIR
sudo chmod -R 755 $FRONTEND_DIR

# ===== BACKEND DEPLOYMENT =====
echo "Setting up backend..."
cd /home/ubuntu/agricloud/backend

# Create backend directory
mkdir -p $BACKEND_DIR
cp -r * $BACKEND_DIR/

# Install Python dependencies
cd $BACKEND_DIR
pip3 install -r requirements.txt

# Create systemd service for FastAPI backend
echo "Creating systemd service for backend..."
sudo tee /etc/systemd/system/agricloud-backend.service > /dev/null <<EOF
[Unit]
Description=Agricloud FastAPI Backend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=$BACKEND_DIR
Environment="PATH=/home/ubuntu/.local/bin"
ExecStart=/usr/bin/python3 -m uvicorn app.main:app --host 127.0.0.1 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Start backend service
sudo systemctl daemon-reload
sudo systemctl enable agricloud-backend
sudo systemctl start agricloud-backend

# Configure Apache Virtual Host
echo "Configuring Apache..."
sudo cp /home/ubuntu/agricloud/apache-configs/frontend.conf /etc/apache2/sites-available/agricloud.conf

# Enable site
sudo a2ensite agricloud.conf
sudo a2dissite 000-default.conf

# Test Apache configuration
sudo apache2ctl configtest

# Restart Apache
sudo systemctl restart apache2

# Check services status
echo "Checking service status..."
sudo systemctl status apache2 --no-pager
sudo systemctl status agricloud-backend --no-pager

echo "===== Deployment Complete! ====="
echo "Frontend: http://$(curl -s ifconfig.me)"
echo "Backend API: http://$(curl -s ifconfig.me)/api"
echo ""
echo "To check logs:"
echo "Frontend: sudo tail -f /var/log/apache2/agricloud-error.log"
echo "Backend: sudo journalctl -u agricloud-backend -f"
