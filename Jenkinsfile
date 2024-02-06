pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/brugdev/testes-api-cy.git'
                
            }
        }

        stage('Instalar dependenia') {
            steps {
                bat 'npm install'
                
            }
        }
        stage('Subir servidor') {
            steps {
                bat 'npm run cy:run-ci'
                
            }
        }          
        stage('Execucao testes') {
            steps {
                bat 'npm run cy:run'
                
            }
        }

    }
}

