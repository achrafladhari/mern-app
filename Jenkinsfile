pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *')
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        IMAGE_NAME_SERVER = 'chrayef/mern-server'
        IMAGE_NAME_CLIENT = 'chrayef/mern-client'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'git@github.com:achrafladhari/mern-app.git',
                    credentialsId: 'github_ssh'
            }
        }

        stage('Build Server Image') {
           // when { changeset "server/*"}
            steps {
                dir('server') {
                    script {
                        dockerImageServer = docker.build("${IMAGE_NAME_SERVER}")
                    }
                }
            }
        }

        stage('Build Client Image') {
            when { changeset "client/*"}
            steps {
                dir('client') {
                    script {
                        dockerImageClient = docker.build("${IMAGE_NAME_CLIENT}")
                    }
                }
            }
        }

        stage('Scan Server Image') {
            when { changeset "server/*"}
            steps {
                script {
                    sh """
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
                    aquasec/trivy:latest image --exit-code 0 --severity LOW,MEDIUM,HIGH,CRITICAL \\
                    ${IMAGE_NAME_SERVER}
                    """
                }
            }
        }

        stage('Scan Client Image') {
            when { changeset "client/*"}
            steps {
                script {
                    sh """
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
                    aquasec/trivy:latest image --exit-code 0 --severity LOW,MEDIUM,HIGH,CRITICAL \\
                    ${IMAGE_NAME_CLIENT}
                    """
                }
            }
        }

        stage('Push Server Image to Docker Hub') {
            when { changeset "server/*"}
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        dockerImageServer.push()
                    }
                }
            }
        }
        stage('Push Client Image to Docker Hub') {
            when { changeset "client/*"}
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        dockerImageClient.push()
                    }
                }
            }
        }        
        stage('Cleanup Server locally'){
            when { changeset "server/*"}
            steps {
                script {
                    docker.rmi("${IMAGE_NAME_SERVER}")
                    sh "docker rmi ${IMAGE_NAME_SERVER}"
                    docker.imageExists('aquasec/trivy') ? docker.rmi('docker rmi aquasec/trivy') : echo "image trivy doesn't exist"
                }
            }
        }
        stage('Cleanup Client locally'){
            when { changeset "client/*"}
            steps {
                script {
                    docker.rmi("${IMAGE_NAME_CLIENT}")
                    docker.imageExists('aquasec/trivy') ? docker.rmi('docker rmi aquasec/trivy') : echo "image trivy doesn't exist"
                }                
            }
        }
    }
}
