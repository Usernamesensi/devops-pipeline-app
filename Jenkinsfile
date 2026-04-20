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
                withSonarQubeEnv('sonarqube') {
                    sh 'npx sonar-scanner'
                }
            }
        }

        stage('Security') {
            steps {
                sh 'docker run devops-app npm audit || true'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker rm -f devops-container || true'
                sh 'docker run -d -p 3004:3000 --name devops-container devops-app'
            }
        }

        stage('Release') {
            steps {
                sh 'docker tag devops-app devops-app:prod'
            }
        }

        stage('Monitoring') {
            steps {
                sh 'docker logs devops-container || true'
            }
        }
    }
}