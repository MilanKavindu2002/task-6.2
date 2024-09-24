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
                script {
                    try {
                        echo 'Building the application...'
                        bat 'mvn clean package'
                    } catch (Exception e) {
                        error "Build failed: ${e.message}"
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    try {
                        echo 'Running tests...'
                        bat 'mvn test'
                    } catch (Exception e) {
                        error "Test execution failed: ${e.message}"
                    }
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                script {
                    try {
                        echo 'Running code quality analysis...'
                        withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                            bat 'mvn sonar:sonar -Dsonar.host.url=http://localhost:9000 -Dsonar.login=%SONAR_TOKEN%'
                        }
                    } catch (Exception e) {
                        error "Code quality analysis failed: ${e.message}"
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
            steps {
                echo 'Deploying the application...'
                // Add deployment commands here, if any
            }
        }

        stage('Start Application') {
            steps {
                echo 'Starting the web application...'
                bat 'start npm start'
            }
        }

        stage('Release') {
            when {
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
            steps {
                echo 'Releasing the application...'
                // Add release commands here, if any
            }
        }

        stage('Monitoring and Alerting') {
            when {
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
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
