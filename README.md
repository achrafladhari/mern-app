# MERN APP - TP 2

## Vue d'Ensemble
Ce projet est une application full-stack qui consiste en un client React et un serveur Node.js utilisant MongoDB comme base de données. Docker est utilisé pour la conteneurisation, et Docker Compose est utilisé pour orchestrer les services.

## Table des Matières
- [Technologies Utilisées](#technologies-utilisées)
- [Variables d'Environnement](#variables-denvironnement)
- [Configuration de Docker](#configuration-de-docker)
- [Images Docker](#images-docker)
- [Docker Compose](#docker-compose)
- [Comment Exécuter le Projet](#comment-executer-le-projet)

## Technologies Utilisées
- **Frontend** : React
- **Backend** : Node.js, Express
- **Base de Données** : MongoDB
- **Conteneurisation** : Docker, Docker Compose

## Variables d'Environnement
Les variables d'environnement suivantes sont utilisées dans l'application :

- **REACT_APP_API_URL** : Cette variable contient l'URL de base pour le serveur API. Elle est utilisée dans le client React pour faire des requêtes au serveur.
- **MONGO_URI** : L'URI de connexion à MongoDB utilisée par le serveur pour se connecter à l'instance MongoDB.

## Configuration de Docker
Ce projet comprend des Dockerfiles pour le client et le serveur, qui facilitent la construction et l'exécution des services dans des conteneurs isolés. Les configurations incluent :

- **Client** : Un environnement Node.js pour construire l'application React. Les dépendances sont installées et l'application est construite pour une utilisation en production. Un serveur HTTP simple peut être utilisé pour servir l'application construite.
  
- **Serveur** : Un environnement Node.js qui installe les dépendances nécessaires et configure l'application pour écouter sur un port spécifique.

## Images Docker
Les images Docker créées pour ce projet sont les suivantes :

- **Image du Client** : `node:lts-alpine`
- **Image du Serveur** : `node:lts-alpine`
- **Image de la Base de Données** : `mongo:latest`

Ces images sont spécifiées dans les Dockerfiles respectifs et sont utilisées lors de la construction et du déploiement des services.

## Docker Compose
Docker Compose est utilisé pour gérer les différents services de l'application, y compris le client, le serveur et MongoDB. Les services sont interconnectés, ce qui permet une communication fluide entre le client et le serveur. Le fichier de configuration spécifie les images, les ports exposés, ainsi que les variables d'environnement nécessaires pour chaque service.

## Comment Exécuter le Projet
1. Assurez-vous d'avoir Docker et Docker Compose installés sur votre machine.
2. Clonez ce dépôt sur votre machine locale.
3. Accédez au répertoire du projet dans votre terminal.
4. Construisez et démarrez l'application en utilisant Docker Compose :

   ```bash
   docker-compose up --build
   ```

5. Accédez au client à [http://localhost:3000](http://localhost:3000).


## Screens
### Application
![Application](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/screen1.png)

### Images
![Images](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/screen3.png)
### Containers
![Containers](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/screen4.png)
### Network
![Network](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/screen2.png)


---

# Jenkins - TP 3
## Pipeline 

Notre pipeline Jenkins automatise le déploiement d'une application MERN (MongoDB, Express, React, Node.js). Il surveille les changements dans le dépôt Git, construit et scanne des images Docker pour les services client et serveur lorsque des modifications sont détectées dans leurs répertoires respectifs. Les images sont ensuite poussées vers Docker Hub après avoir passé les scans de sécurité avec Trivy. Enfin, une phase de nettoyage supprime les images temporaires pour maintenir un environnement propre.

## Screens
### Build without client changes
![Without Client](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/build_with_server_changes.png)
### Build without server changes
![Without Server](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/build_client_changes.png)
### Build without any changes
![Without Changes](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/build_without_changes.png)
### Build with an error
![With Error](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/build_fail_with_post_actions.png)

---

# Kubernetes - TP 4
## Configuration Ingress 
1. Ajout du dépôt Helm du contrôleur Ingress NGINX : `helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx`
2. Création d'un namespace Kubernetes pour ingress : `kubectl create ns ingress`
3. Mise à jour des dépôts Helm : `helm repo update`
4. Installation du contrôleur Ingress NGINX : `helm install my-ingress ingress-nginx/ingress-nginx -n ingress`
5. Ajout une ressource Kubernetes de type Ingress pour router les requetes : `kubectl apply -f ingress.yaml`
## Ajouter les ressources Kubernetes 
`kubectl apply -f <nom_fichier.yaml>`

## Screens
### Kubernetes Azure
![Kubernetes Azure](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/kube_azure.png)
### ConfigMap
![ConfigMap](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/app-config.png)
### Ajout du dépot - création ns - mise a jour des dépots - installation ingress NGINX
![HELM](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/ingress_nginx.png)
### Ajout Ressource Kubernetes Ingress
![INGRESS](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/ingress_config.png)
### Ajouter les autres ressources Kubernetes (deployments - services)
![DEPLOYMENTS SERVICES](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/kube_commands.png)
### Services
![Services](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/kube_service.png)
### Services And Ingress Azure
![Services Azure](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/service_and_ingress_azure.png)
### Deployments
![Deployments](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/scaling_server_deployment.png)
### Deployments Azure
![Deployments Azure](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/deployment_azure.png)
### Pods
![Deployments](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/pods_kube.png)
### Test Application
![Application](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/app_test.png)

---

# ArgoCD & HELM - TP 5
## Création Charts Helm 
1. Création du répertoire mern-charts : `mkdir mern-charts`
2. Création Chart.yaml : `touch Chart.yaml`
3. Création du répertoire charts contenant nos charts dans mern-charts : `mkdir mern-charts/charts`
4. Création 3 charts pour mongodb, Client et Server : `helm create <mongodb, client, server>`
5. Configuration du values.yaml dans chaque chart.
6. Ajout env dans templates/deployment.yaml pour référencer le bloc env à partir de values.yaml
7. Ajout du dépôt Helm du contrôleur Ingress NGINX (TP4)
8. Installation ArgoCD dans le Cluster Kubernetes
9. Si vous avez utilisé AKS ou EKS vous devez définir le type (service) du serveur ArgoCD "LoadBalancer": `kubectl edit svc argocd-server -n argocd`
10. Nous avons connecté le Repo avec HTTPS parceque notre repo est public
11. Ajouter l'application dans ArgoCD

## Screens
### ArgoCD
![ArgoCD](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/config_cluster_argocd.png)
### ArgoCD Service
![ArgoCD Service](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/edit_argocd_server_LoadBalancer.png)
### ArgoCD Password
![INGRESS](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/getting_argocd_password.png)
### Ajouter les charts
![CHARTS](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/mern-charts-dir.png)
### Configuration deployment pour réferencer le bloc env a partir de values.yaml
![Configuration](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/add_env_in_deploymentYaml.png)
### MERN APP
![Application](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/mern-app-argocd.png)
### MERN APP WITH AUGMENTATION REPLICAs
![Application_Increse](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/augmentation_replica.png)
### Test Application
![Application](https://raw.githubusercontent.com/achrafladhari/mern-app/main/screens/test_app.png)