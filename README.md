# eCommerce AWS Application

A cloud-native eCommerce application built using AWS microservices architecture and modern AWS deployment patterns.

## Overview

This project demonstrates a complete cloud-native microservices-based application consisting of frontend, backend, database, networking, authentication, and messaging layers deployed on AWS.

The application showcases scalable cloud architecture patterns using containerized services, API Gateway, authentication systems, managed databases, and asynchronous messaging.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Cost Estimates](#cost-estimates)
- [Getting Started](#getting-started)

## Architecture Overview

This project demonstrates a complete cloud-native microservices-based application where we have Frontend, Backend, Database, Access, and Integration layers.

Below is the architecture for this application:

<img width="800" height="450" alt="image" src="https://github.com/user-attachments/assets/f4059007-aea1-4a75-9a2f-9178a86cd373" />

### AWS Services

- **Frontend**: S3 + CloudFront + Route53
- **API Layer**: API Gateway (HTTP API) + VPC Link + ALB
- **Compute**: ECS/Fargate
- **Authentication**: Cognito User Pools
- **Databases**: DynamoDB and RDS PostgreSQL
- **Messaging**: SNS + SQS (+ SES)
- **Networking**: VPC, Subnets, Security Groups, NAT Gateway
- **Logs and Management**: CloudWatch, Systems Manager
- **Security**: IAM

## Project Structure

```text
ecommerce-web-app/
├── services/                    # Backend microservices
│   ├── product-service/         # Python FastAPI
│   ├── cart-service/            # Python FastAPI
│   ├── user-service/            # Python FastAPI
│   └── order-service/           # Python FastAPI
├── frontend/
│   └── react-app/               # React application
├── data/                        # Product data + S3 upload scripts
├── deployment/                  # AWS deployment guides
│   ├── README.md                # Deployment overview
│   └── module*.md               # Step-by-step modules
└── install-prerequisites.sh     # Tool installation script

```

## Microservices

- **Product Service** — Product catalog management (DynamoDB)
- **Cart Service** — Shopping cart operations (DynamoDB)
- **User Service** — User profile management (RDS PostgreSQL)
- **Order Service** — Order processing and orchestration (RDS PostgreSQL)
- **Notification Service** — Asynchronous email notifications (SNS/SQS/SES)

## AWS Deployment

The application deployment is organized into modular AWS infrastructure steps:

- Module 0: Prerequisites
- Module 1: Networking (VPC, Subnets, Security Groups)
- Module 2: Authentication (Cognito)
- Module 3: Frontend Infrastructure (S3, CloudFront)
- Module 4: Data Layer (RDS, DynamoDB)
- Module 5: Container Deployment (ECR, ECS/Fargate, ALB)
- Module 6: API Gateway (HTTP API, VPC Link)
- Module 7: Frontend-Backend Integration
- Module 8: Notification (SNS, SQS)
- Module 9: Custom Domain & SSL (Route53, ACM)
- Module 10: Cleanup

## Cost Estimates

- **AWS Deployment**: Costs vary depending on usage and active resources.

> Remember to clean up AWS resources after testing to avoid unnecessary charges.

## Getting Started

1. Proceed to [AWS Deployment](deployment/README.md)
2. Configure required AWS resources
3. Deploy services module-by-module
4. Clean up resources after completion

## Tech Stack

- React
- Python FastAPI
- AWS ECS/Fargate
- API Gateway
- Cognito
- DynamoDB
- PostgreSQL
- SNS/SQS
- CloudFront
- Route53

## License

This project is for educational and development purposes.