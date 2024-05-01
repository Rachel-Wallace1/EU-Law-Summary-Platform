# Automated AWS Service Installation with Terraform
1. [Install Terraform](https://developer.hashicorp.com/terraform/install)

2. Set Up AWS Credentials:
```bash
aws configure
```

3. Based on your role, choose the appropriate Terraform environment folder: developer-terraform for developers or system-admin-terraform for system administrators.
- For developer setup, navigate to the terraform-developer folder and set up EC2, DocumentDB, and PostgreSQL:
```bash
cd terraform-developer
```
- For system administrators responsible for setting up all AWS components, navigate to the terraform-system-admin folder:
```bash
cd terraform-system-admin
```

4. Initialize Terraform, Plan, and Apply Changes:
- Navigate to your Terraform configuration directory:
```bash
terraform init
terraform plan
terraform apply
```
5. Clean Up:
```bash
terraform destroy
```

# Manual Method: Installation of AWS Services

This guide provides instructions for deploying applications to Amazon ECR and Amazon ECS using GitHub Actions.
- [x] ECR
- [x] Task Definition and ECS
- [x] DocumentDB
- [x] RDS Postgresql
- [x] DocumentDB
- [x] Security Group, Load Balancer
- [x] ACM, Route53


1. Create ECR for frontend and backend app

- Navigate to the ECR console in the AWS Management Console: Click on "Create repository."


2. Create Task Definitions for frontend and backend app

- Navigate to the ECS console in the AWS Management Console.
In the Task Definitions section, click on "Create new Task Definition."
- Choose the launch type compatibility (Fargate) and click "Next step."
- Configure the task definition settings, including container definitions, CPU and memory limits, networking, volumes, etc.
- Review and create the task definition.
- Repeat these steps to create a separate task definition for each of your applications.

3. Create 2 ECS Instances 

- Navigate to the ECS console in the AWS Management Console.
In the Clusters section, select the cluster where you want to add instances or create a new cluster.
- Click on "Create Cluster" if you're creating a new cluster.
Choose the EC2 Linux + Networking or EC2 Windows + Networking launch type.
- Configure the instance settings, including instance type, key pair, networking, and IAM role.
- Review and create the cluster.


4. Create 1 PostgreSQL Instance

5. Create 1 DocumentDB Instance

6. Create Security Group

- Navigate to the EC2 console in the AWS Management Console.
In the left navigation pane, click on "Security Groups" under the "Network & Security" section.
- Click on "Create Security Group."
- Configure the security group settings, including name, description, VPC, inbound and outbound rules.
- Review and create the security group.

7. Create Load Balancer

- Please refer to the AWS Doc for [Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancer-getting-started.html#prerequisites)

8. Create ACM
- Please refer to the AWS Doc for [ACM](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html)

9. Route 53 
- Please refer to the AWS Doc for [Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html#domain-register-procedure-section)
