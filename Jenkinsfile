pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the web application...'
                sh 'npm install'  // Install dependencies
                sh 'npm run build'  // Build the project
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'  // Run tests
            }
        }
        
        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t my-web-app .'  // Build the Docker image
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying to test environment...'
                sh 'docker run -d -p 3000:3000 my-web-app'  // Run the container
            }
        }
    }
}
