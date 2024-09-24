pipeline {
    agent any

    tools {
        maven 'Maven 3.9.9' // Make sure this matches your configured Maven tool name
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/MilanKavindu2002/task-6.2'
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Building the web application..."
                    // Use 'bat' instead of 'sh' for Windows
                    bat 'mvn clean package'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo "Running tests..."
                    // Use 'bat' instead of 'sh' for Windows
                    bat 'mvn test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying the application..."
                    // Add your deployment script for Windows here
                }
            }
        }

        stage('Release') {
            steps {
                echo 'Releasing application...'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
