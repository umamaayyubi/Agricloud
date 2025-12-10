# 🌾 AgriCloud - Weather & Storage Management Platform

A modern, multi-language agricultural platform with beautiful UI/UX focusing on weather forecasting and storage management.

## Features

- 🔐 Secure JWT authentication
- 🌍 Multi-language support (10 Indian languages)
- ⛅ Real-time weather information
- 🏪 Storage inventory management
- 🎨 Modern, responsive UI
- 🚀 CI/CD with GitHub Actions
- ☸️ Kubernetes deployment on AWS EC2

## Quick Start (Local Development)

\`\`\`bash
# Start with docker-compose
docker-compose up -d

# Access at http://localhost
\`\`\`

## Kubernetes Deployment on AWS EC2

### Prerequisites
- AWS EC2 instances (us-east-1 region)
- Kubernetes cluster setup with kubeadm
- kubectl configured
- Docker Hub account

### Steps

1. **Clone repository**
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/agricloud.git
cd agricloud
\`\`\`

2. **Build and push Docker images**
\`\`\`bash
docker build -t YOUR_DOCKERHUB_USERNAME/agricloud-backend:latest ./backend
docker build -t YOUR_DOCKERHUB_USERNAME/agricloud-frontend:latest ./frontend

docker push YOUR_DOCKERHUB_USERNAME/agricloud-backend:latest
docker push YOUR_DOCKERHUB_USERNAME/agricloud-frontend:latest
\`\`\`

3. **Update deployment files**
Edit `k8s/backend-deployment.yaml` and `k8s/frontend-deployment.yaml` to use your Docker Hub username.

4. **Deploy to Kubernetes**
\`\`\`bash
chmod +x deploy.sh
./deploy.sh
\`\`\`

5. **Access application**
\`\`\`bash
# Get EC2 public IP
curl http://169.254.169.254/latest/meta-data/public-ipv4

# Access at http://YOUR_EC2_IP:30080
\`\`\`

## CI/CD Setup

1. Add GitHub Secrets:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
   - `EC2_HOST`
   - `SSH_PRIVATE_KEY`

2. Push to main branch triggers automatic deployment

## Default Login
- Email: farmer@example.com
- Password: password123

## Tech Stack

- **Frontend**: React 18 + Vite, i18next
- **Backend**: FastAPI, PostgreSQL
- **Deployment**: Kubernetes, Docker, GitHub Actions
- **Cloud**: AWS EC2 (us-east-1)

## License
MIT
# CI/CD Pipeline Active
