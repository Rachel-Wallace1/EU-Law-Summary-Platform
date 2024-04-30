# Automated AWS Service Installation with Terraform
1. Install Terraform:
Download Terraform from the official website and follow the installation instructions.

2. Set Up AWS Credentials:
Run aws configure and ensure you have Administrator Access credentials configured.

3. Initialize Terraform, Plan, and Apply Changes:
Note: Depending on your role, set up your Terraform environment in either developer-terraform or system-admin-terraform folders. Apply step 3 accordingly.

- Navigate to your Terraform configuration directory:
```bash
terraform init
terraform plan
terraform apply
```
4. Clean Up:
```bash
terraform destroy
```

# Manual Installation of AWS Services

# AWS Deployment Guide
This guide provides instructions for deploying applications to Amazon ECR and Amazon ECS using GitHub Actions.

1. Create ECR for frontend and backend app

- Navigate to the ECR console in the AWS Management Console.
Click on "Create repository."
- Enter a name for the repository and optional tags.
Click on "Create repository."
- Repeat these steps to create a separate ECR repository for each of your applications.


2. Create 2 Task Definitions (one for the backend Python application and one for the frontend React application)

- Navigate to the ECS console in the AWS Management Console.
In the Task Definitions section, click on "Create new Task Definition."
- Choose the launch type compatibility (Fargate) and click "Next step."
- Configure the task definition settings, including container definitions, CPU and memory limits, networking, volumes, etc.
- Review and create the task definition.
- Repeat these steps to create a separate task definition for each of your applications.

3. Create 2 ECS Instances 
(one for the backend Python application and one for the frontend React application)

To create ECS instances, follow these steps:

- Navigate to the ECS console in the AWS Management Console.
In the Clusters section, select the cluster where you want to add instances or create a new cluster.
- Click on "Create Cluster" if you're creating a new cluster.
Choose the EC2 Linux + Networking or EC2 Windows + Networking launch type.
- Configure the instance settings, including instance type, key pair, networking, and IAM role.
- Review and create the cluster.


4. Create Security Group
To create a security group for your ECS instances and load balancer, follow these steps:

- Navigate to the EC2 console in the AWS Management Console.
In the left navigation pane, click on "Security Groups" under the "Network & Security" section.
- Click on "Create Security Group."
- Configure the security group settings, including name, description, VPC, inbound and outbound rules.
- Review and create the security group.

5. Create Load Balancer
To create a load balancer for distributing traffic to your ECS instances, follow these steps:

- Navigate to the EC2 console in the AWS Management Console.
In the left navigation pane, click on "Load Balancers" under the "Load Balancing" section.
- Click on "Create Load Balancer."
- Choose the load balancer type (Application Load Balancer or Network Load Balancer).
- Configure the load balancer settings, including name, scheme, listeners, subnets, security groups, etc.
- Review and create the load balancer.


6. Create 1 postgres instance

7. Create 1 documentdb instance
