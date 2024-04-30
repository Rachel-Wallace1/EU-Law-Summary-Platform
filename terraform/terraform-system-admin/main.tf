provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "my_ec2_instance" {
  ami           = "ami-023e152801ee4846a"   # Replace with your desired AMI ID
  instance_type = "t2.micro"        # Replace with your desired instance type
  tags = {
    Name = "MyEC2Instance"          # Replace with a name for your instance
  }
}

resource "aws_docdb_cluster" "my_documentdb" {
  cluster_identifier      = "my-docdb-cluster"
  engine                  = "docdb"
  master_username         = "foo"
  master_password         = "mustbeeightchars"
  skip_final_snapshot     = true
}

resource "aws_db_instance" "my_postgres_db" {
  identifier = "my-postgres-db"
  allocated_storage = 10
  engine = "postgres"
  instance_class = "db.t3.micro"
  username = "foo"
  password = "foobarbaz"
  skip_final_snapshot = true // required to destroy
}


resource "aws_ecr_repository" "my-backend-ecr" {
  name                 = "my-backend-ecr"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "my-frontend-ecr" {
  name                 = "my-frontend-ecr"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecs_task_definition" "my-python-app" {
  family = "my-python-app"
  
  container_definitions = jsonencode([
    {
      "name" = "my-python-app",
      "image" = "my-python-app",
      "cpu" = 256,
      "memory" = 512,
      "essential" = true,
      "portMappings": [
          {
              "name": "8000",
              "containerPort": 8000,
              "hostPort": 8000,
              "protocol": "tcp",
              "appProtocol": "http"
          }
      ],
    }
  ])
  
  requires_compatibilities = ["FARGATE"] # This line is required for Fargate
  network_mode             = "awsvpc"    # awsvpc is required for Fargate
  cpu                      = "256"       # Minimum CPU value for Fargate is 256
  memory                   = "512"       # Minimum Memory value for Fargate is 0.5GB
}


resource "aws_ecs_task_definition" "my-react-app" {
  family = "my-react-app"
  
  container_definitions = jsonencode([
    {
      "name" = "my-react-app",
      "image" = "my-react-app",
      "cpu" = 256,
      "memory" = 512,
      "essential" = true,
      "portMappings": [
          {
              "name": "3000",
              "containerPort": 3000,
              "hostPort": 3000,
              "protocol": "tcp",
              "appProtocol": "http"
          }
      ],
    }
  ])
  
  requires_compatibilities = ["FARGATE"] # This line is required for Fargate
  network_mode             = "awsvpc"    # awsvpc is required for Fargate
  cpu                      = "256"       # Minimum CPU value for Fargate is 256
  memory                   = "512"       # Minimum Memory value for Fargate is 0.5GB
}
