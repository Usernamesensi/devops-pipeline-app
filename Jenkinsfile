pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                sh 'docker build -t devops-app .'
            }
        }

        stage('Test') {
            steps {
                sh 'docker run devops-app npm test'
            }
        }

        stage('Code Quality') {
            steps {
                sh '''
                docker run --rm \
                -v /var/jenkins_home/workspace/DevSecOps-Pipeline:/usr/src \
                sonarsource/sonar-scanner-cli \
                -Dsonar.projectKey=devops-app \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://host.docker.internal:9000 \
                -Dsonar.login=squ_b3a645ec3b03aff93c4bd6d1f406a8209f7e6ad4
                '''
            }
        }

        stage('Security') {
            steps {
                sh 'docker run devops-app npm audit || true'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop devops-app-container || true
                docker rm devops-app-container || true
                docker run -d -p 3004:3000 --name devops-app-container devops-app
                '''
            }
        }

        stage('Release') {
            steps {
                sh 'docker tag devops-app devops-app:prod'
            }
        }

        stage('Monitoring') {
            steps {
                sh 'docker logs devops-app-container || true'
            }
        }
    }
}