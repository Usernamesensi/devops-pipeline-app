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
                echo 'Code Quality Stage'
            }
        }

        stage('Security') {
            steps {
                sh 'docker run devops-app npm audit || true'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d -p 3004:3000 devops-app'
            }
        }

        stage('Release') {
            steps {
                sh 'docker tag devops-app devops-app:prod'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Monitoring logs'
            }
        }
    }
}