pipeline {
    agent any
    environment {
        MONGO_URI = credentials('MONGO_URI')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/dev-ugo/budget-tracker-node'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    bat 'npm run test'
                }
            }
        }
        stage('Start Server') {
            steps {
                script {
                    bat 'npm run start'
                }
            }
        }
    }
}