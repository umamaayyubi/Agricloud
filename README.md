# 🌾 AgriCloud Lite

> A multilingual agricultural management platform with real-time weather tracking and storage management, powered by AWS DynamoDB and Kubernetes.

[![Docker](https://img.shields.io/badge/Docker-umamaayyubi817-blue)](https://hub.docker.com/u/umamaayyubi817)
[![AWS](https://img.shields.io/badge/AWS-DynamoDB-orange)](https://aws.amazon.com/dynamodb/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-k3s-326CE5)](https://k3s.io/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933)](https://nodejs.org/)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
  - [1. AWS DynamoDB Setup](#1-aws-dynamodb-setup)
  - [2. EC2 Instance Setup](#2-ec2-instance-setup)
  - [3. GitHub Repository Setup](#3-github-repository-setup)
  - [4. Deploy Application](#4-deploy-application)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Multilingual Support](#-multilingual-support)
- [Monitoring & Scaling](#-monitoring--scaling)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Development Guide](#-development-guide)
- [Troubleshooting](#-troubleshooting)
- [Production Deployment](#-production-deployment)
- [Security Best Practices](#-security-best-practices)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

AgriCloud Lite is a modern, cloud-native agricultural management system designed for Indian farmers. It provides real-time weather updates and storage inventory management in 10 Indian languages, deployed on a self-managed Kubernetes cluster on AWS EC2 with auto-scaling capabilities.[web:119][web:144]

**Key Highlights:**
- 🌐 **10 Indian Languages** - Full UI translation support
- ☁️ **Cloud-Native** - Deployed on Kubernetes with DynamoDB backend
- 📈 **Auto-Scaling** - HPA at 45% CPU utilization
- 🔄 **CI/CD** - Automated deployment via GitHub Actions
- 🎨 **Modern UI** - Material-UI components with responsive design

---

## ✨ Features

### Core Features
- **Multilingual Interface**: Support for English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, and Punjabi
- **Weather Dashboard**: Real-time weather data with location, temperature, and conditions
- **Storage Management**: Track crop inventory with quantities and storage locations
- **User Authentication**: Secure login system (expandable for real authentication)
- **Responsive Design**: Mobile-friendly interface with Material-UI

### Technical Features
- **Horizontal Pod Autoscaling**: Automatic scaling between 1-5 pods at 45% CPU
- **Health Monitoring**: Health check endpoints for all services
- **Containerized Deployment**: Docker images for frontend and backend
- **Infrastructure as Code**: Kubernetes manifests for reproducible deployments
- **Automated CI/CD**: GitHub Actions workflow for continuous deployment

---

## 🏗️ Architecture

┌─────────────────────────────────────────────────────────────┐
│ Internet │
└────────────────────────┬────────────────────────────────────┘
│
Port 30080
│
┌────────────────────────▼────────────────────────────────────┐
│ AWS EC2 Instance │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Kubernetes (k3s) Cluster │ │
│ │ │ │
│ │ ┌─────────────────┐ ┌──────────────────┐ │ │
│ │ │ Frontend Pod │ │ Backend Pod │ │ │
│ │ │ (React+NGINX) │◄────►│ (Node.js) │ │ │
│ │ │ Port: 80 │ │ Port: 4000 │ │ │
│ │ └─────────────────┘ └────────┬─────────┘ │ │
│ │ │ │ │ │
│ │ │ │ │ │
│ │ ┌──────▼──────────┐ ┌───────▼────────┐ │ │
│ │ │ frontend-service│ │backend-service │ │ │
│ │ │ (NodePort) │ │ (ClusterIP) │ │ │
│ │ └─────────────────┘ └────────────────┘ │ │
│ │ │ │ │
│ │ ┌───────▼────────┐ │ │
│ │ │ Backend HPA │ │ │
│ │ │ (45% CPU) │ │ │
│ │ └────────────────┘ │ │
│ └───────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
│ AWS SDK
│ (IAM Role)
│
┌───────────────▼───────────────┐
│ AWS DynamoDB (us-east-1) │
│ ┌──────────────────────────┐ │
│ │ AgriCloud_weather │ │
│ │ (Weather data) │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ AgriCloud_storage │ │
│ │ (Storage inventory) │ │
│ └──────────────────────────┘ │
└────────────────────────────────┘


**Data Flow:**
1. User accesses `http://EC2_IP:30080`
2. NGINX serves React SPA and proxies API calls to backend
3. Backend (Node.js + Express) queries DynamoDB tables
4. DynamoDB returns data to backend
5. Backend sends JSON response to frontend
6. Frontend displays data in selected language

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3** - UI library[web:144]
- **Vite 5.4** - Build tool and dev server
- **Material-UI 6.1** - Component library
- **i18next 24.0** - Internationalization[web:148]
- **React Router 6.28** - Client-side routing
- **Axios 1.7** - HTTP client
- **NGINX** - Web server and reverse proxy

### Backend
- **Node.js 20** - Runtime environment
- **Express 4.21** - Web framework[web:28]
- **AWS SDK v3** - DynamoDB client[web:97]
- **@aws-sdk/client-dynamodb** - Low-level DynamoDB client
- **@aws-sdk/lib-dynamodb** - High-level document client

### Infrastructure
- **AWS EC2** - Compute instance (Ubuntu)
- **AWS DynamoDB** - NoSQL database (us-east-1)[web:97]
- **Kubernetes (k3s)** - Container orchestration[web:79]
- **Docker** - Containerization
- **Docker Hub** - Container registry (umamaayyubi817)
- **GitHub Actions** - CI/CD automation[web:29]

### DevOps
- **kubectl** - Kubernetes CLI
- **k3s** - Lightweight Kubernetes distribution
- **Horizontal Pod Autoscaler** - Auto-scaling[web:119]
- **GitHub Actions** - CI/CD pipeline

---

## 📋 Prerequisites

### Required
- **AWS Account** with DynamoDB and EC2 access
- **EC2 Instance**: Ubuntu 22.04 LTS, t3.small or higher
- **Docker Hub Account**: Username `umamaayyubi817`
- **GitHub Account** for repository and CI/CD
- **AWS CLI** installed and configured locally

### Security & Access
- EC2 Security Group allowing ports: 22 (SSH), 30080 (NodePort)
- IAM role attached to EC2 with DynamoDB permissions
- SSH key pair for EC2 access
- Docker Hub access token

---



