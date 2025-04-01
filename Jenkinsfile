pipeline {
    agent any  // Utilise n'importe quel agent disponible (machine Jenkins)

    environment {
        MONGO_URI = credentials('MONGO_URI')  // Récupère une variable depuis Jenkins (optionnel)
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/dev-ugo/budget-tracker-node'
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
                    sh 'nohup node server.js > server.log 2>&1 &'
                }
            }
        }
    }
}
