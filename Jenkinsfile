pipeline{

    agent any

    parameters{
        string(name: "CY", defaultValue: "cypress/e2e/**")
        choice(name: "BROWSER", choices: ['chrome', 'edge', 'firefox'])
    }
    options{
        ansiColor("xterm")
    }
    stages{
        stage('Deploy'){
            steps{
                bat "npm i"
                bat "npm start & wait-on http://localhost:3000"
            }
        }
        stage('Executar testes'){
            steps{
                bat 'npm run cy:run'
            }
        }
    }
}
