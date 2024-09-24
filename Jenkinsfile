pipeline {
    agent any

    tools {
        // Assuming you are using Maven for build, you can also define other tools here
        maven 'Maven 3.9.9' // Make sure 'Maven 3.9.9' is configured in Jenkins Global Tools
    }

    stages {
        stage('Checkout SCM') {
            steps {
                // Fetching the code from GitHub repository
                git branch: 'main', url: 'https://github.com/MilanKavindu2002/task-6.2'
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Building the web application..."
                    // Run Maven build, adjust the command if you're using npm, yarn, or other tools
                    sh 'mvn clean package'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo "Running Tests..."
                    // Run your test suite, adjust based on the test tool you are using
                    sh 'mvn test' // Adjust if you're using a different test tool
                }
            }
        }

        stage('Docker Build') {
            when {
                expression { fileExists('Dockerfile') } // Only run if a Dockerfile exists
            }
            steps {
                script {
                    echo "Building Docker Image..."
                    sh 'docker build -t my-app .'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying Application..."
                    // You can define your own deployment steps here, for example, using SCP to upload to a server
                    sh 'scp target/my-app.jar user@server:/path/to/deploy'
                }
            }
        }

        stage('Release') {
            steps {
                script {
                    echo "Releasing Application..."
                    // Add your release steps here if necessary
                }
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
