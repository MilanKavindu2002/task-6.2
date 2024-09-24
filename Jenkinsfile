pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    bat 'mvn clean package'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    bat 'mvn test'
                }
            }
        }
        stage('Deploy') {
            steps {
                // Add your deployment steps here
            }
        }
        stage('Release') {
            steps {
                // Add your release steps here
            }
        }
    }
}
