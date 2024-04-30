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
  allocated_storage = 10
  engine = "postgres"
  instance_class = "db.t3.micro"
  username = "foo"
  password = "foobarbaz"
  skip_final_snapshot = true // required to destroy
}
