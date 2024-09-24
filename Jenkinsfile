pipeline {
    agent {
        docker {
            image 'node:14'
            args '-u root'  // Ensures the pipeline runs as the root user
        }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the web application...'
                sh 'npm install'  // Installs dependencies
                sh 'npm run build'  // Builds the project (if you have a build script)
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'  // Assuming you have tests
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying to test environment...'
                sh 'docker build -t my-web-app .'  // Builds Docker image
                sh 'docker run -d -p 3000:3000 my-web-app'  // Runs Docker container
            }
        }
    }
}
