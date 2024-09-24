pipeline {
    agent {
        docker {
            image 'node:14'  // Replace with your desired Docker image
            args '-v /var/run/docker.sock:/var/run/docker.sock'  // Mount Docker if you need to run Docker inside the container
        }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the web application...'
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        
        stage('Code Quality') {
            steps {
                echo 'Running code quality analysis...'
                sh 'sonar-scanner'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying to test environment...'
                sh 'docker build -t my-web-app .'
                sh 'docker run -d -p 3000:3000 my-web-app'
            }
        }
        
        stage('Release') {
            steps {
                echo 'Releasing to production...'
            }
        }
    }
}
