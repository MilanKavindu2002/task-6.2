pipeline {
    agent any

    tools {
        // Replace 'Maven 3.9.9' with 'Maven' or the configured Maven name in Global Tools
        maven 'Maven'
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
                    sh 'mvn clean package'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo "Running Tests..."
                    sh 'mvn test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying the application..."
                    // Add your deployment script here
                }
            }
        }

        stage('Release') {
            steps {
                echo 'Releasing Application...'
                // Additional release steps can go here
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
