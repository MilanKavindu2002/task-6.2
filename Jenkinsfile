pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout the code from GitHub
                    git url: 'https://github.com/MilanKavindu2002/task-6.2'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Build the application using Maven
                    bat 'mvn clean package'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests using Maven
                    bat 'mvn test'
                }
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    // Build Docker image (adjust Dockerfile path if necessary)
                    bat 'docker build -t my-web-app .'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Deploy the application (add actual deployment command)
                    echo 'Deploying application...'
                    // Example: bat 'deploy-command'
                }
            }
        }
        stage('Release') {
            steps {
                script {
                    // Release the application (add actual release command)
                    echo 'Releasing application...'
                    // Example: bat 'release-command'
                }
            }
        }
    }
}
