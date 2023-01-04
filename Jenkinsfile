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
                bat "npm start &"
            }
        }
         stage('Executar os testes'){
            steps{
                bat "npx cypress run"
               }
            }
    }
}
