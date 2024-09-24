pipeline {
    agent any

    environment {
        MAVEN_HOME = 'C:\\Users\\milan\\Downloads\\apache-maven-3.9.9-bin\\apache-maven-3.9.9'
        PATH = "${MAVEN_HOME}\\bin;${env.PATH}"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out the source code...'
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
                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                    bat 'mvn sonar:sonar -Dsonar.host.url=http://localhost:9000 -Dsonar.login=%SONAR_TOKEN%'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Add your deployment commands here, if needed
            }
        }

        stage('Start Application') {
            steps {
                echo 'Starting the web application...'
                bat 'start cmd /c "npm start"'
            }
        }

        stage('Release') {
            steps {
                echo 'Releasing the application...'
                // Add release commands here, if any
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up monitoring and alerting...'
                // Add monitoring commands here, if any
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
