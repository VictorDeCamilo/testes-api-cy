pipeline{

    agent any

    parameters{
        string(name: "CY", defaultValue: "cypress/e2e/**")
        choice(name: "BROWSER", choices: ['chrome', 'edge', 'firefox'])
    }
    
    stages{
        stage('Deploy'){
            steps{
                bat "npm i"
                bat "npx cypress run"
            }
        }
    }
}
