pipeline {
    agent any

    tools {
        maven 'Maven 3.9.9' // Ensure Maven is configured in Jenkins
    }

    environment {
        SONARQUBE_URL = 'http://your-sonarqube-url' // SonarQube server URL
        DOCKER_IMAGE = 'your-docker-image' // Docker image for deployment
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                // Run Maven build to generate the artifact (e.g., JAR/WAR file)
                sh 'mvn clean package'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Run unit tests using Maven
                sh 'mvn test'
            }
        }

        stage('Code Quality Analysis') {
            steps {
                echo 'Running code quality analysis...'
                // Run SonarQube analysis (ensure SonarQube is configured in Jenkins)
                sh 'mvn sonar:sonar -Dsonar.host.url=$SONARQUBE_URL'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Use Docker to deploy the application to a test/staging environment
                sh 'docker build -t $DOCKER_IMAGE .'
                sh 'docker run -d -p 8080:8080 $DOCKER_IMAGE'
            }
        }

        stage('Release') {
            steps {
                echo 'Releasing the application...'
                // Simulate releasing the application (e.g., to production)
                sh 'echo "Promoting application to production..."'
                // Optionally integrate with a release management tool like Octopus Deploy or AWS CodeDeploy
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                echo 'Setting up monitoring and alerting...'
                // Integrate with monitoring tools like Datadog or New Relic
                sh 'echo "Monitoring production environment..."'
                // Simulate monitoring and alert setup
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
