pipeline {
    agent any  // Utilise n'importe quel agent disponible (machine Jenkins)

    environment {
        MONGO_URI = credentials('MONGO_URI')  // Récupère une variable depuis Jenkins (optionnel)
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
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm run test'
                }
            }
        }

        stage('Start Server') {
            steps {
                script {
                    sh 'npm run start'
                }
            }
        }
    }
}
