pipeline{
    agent any

    stages{
        stage('setup'){
            steps{
                git branch: 'main', url: 'https://github.com/brugdev/testes-api-cy.git'
                sh 'npm install'
            }

        }
        stage('test'){
            steps{
                sh 'NO_COLOR=1 npm run cy:run-ci'
            }

        }
    }
}