pipeline {
    agent any

    environment {
        MAVEN_HOME = 'C:\\Users\\milan\\Downloads\\apache-maven-3.9.9-bin\\apache-maven-3.9.9'
        PATH = "${env.MAVEN_HOME}\\bin;${env.PATH}"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
                bat 'mvn clean package'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'mvn test'
            }
        }
        stage('Code Quality Analysis') {
            steps {
                echo 'Running code quality analysis...'
                bat 'mvn sonar:sonar -Dsonar.host.url=http://localhost:9000' // Update this with the correct URL
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Add your deploy command here
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing the application...'
                // Add your release command here
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up monitoring and alerting...'
                // Add monitoring and alerting steps here
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
