pipeline{
    
        agent {
        label 'Slave_Induccion'
        }
    
        
        triggers {
        pollSCM('@hourly')
        }
    
        options {
            buildDiscarder(logRotator(numToKeepStr: '5'))
            disableConcurrentBuilds()
        }
        
        stages{
        
            stage('Checkout') {
                steps {
                echo '------------>Checkout desde Git Microservicio<------------'
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default' , submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'GitHub_Bacca2095', url: 'https://github.com/Bacca2095/taxi-backend.git']]])
                }
            }

            stage('instalar '){
                steps {
                    sh 'npm i'                    
                }
            }
            stage('lint '){
                steps {
                    sh 'npm run lint'                    
                }
            }
            stage('test '){
                steps {
                    sh 'npm run test:cov'                    
                }
            }
        
            stage('compilar '){
                steps {
                    sh 'npm i'
                    sh 'npm run build'                    
                }
            }
           

            
             stage('Sonar Analysis'){
                 steps{
                     echo '------------>Analisis de código estático<------------'
                       withSonarQubeEnv('Sonar') {
                         sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=./sonar-project.properties"
                      }
                 }
             }
        
        

        }
        post {
            failure {
                mail(to: 'cesar.bacca@ceiba.com.co',
                body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
                subject: "ERROR CI: ${env.JOB_NAME}")
            }
        }    
            
}