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
        -e SONAR_HOST_URL=http://host.docker.internal:9000 \
        -e SONAR_LOGIN=squ_00b939d089776123905b650c6f4f488b7e8deddc \
        -v $(pwd):/usr/src \
        sonarsource/sonar-scanner-cli
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
                sh 'docker logs devops-container || true'
            }
        }
    }
}