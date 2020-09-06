# Microservices app from Udemy

## Tips

### Secret for JWT_KEY created from command line

`kubectl create secret generic jwt-secret --from-literal JWT_KEY=asdf`
`kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<stripe_secret_key>`

### Remember to build and push docker images for each service

### Kubernetes commands cheatsheet

- `kubectl get pods`
- `kubectl get deployments`
- `kubectl get services`
- `kubectl get secrets`

### Ingress
This is the controller we use to access
the cluster. Download the Docker image
and run from the command line

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.35.0/deploy/static/provider/cloud/deploy.yaml
```
Here is the url if the above command doesnt work

[ingressnginx](https://kubernetes.github.io/ingress-nginx/deploy/)

## Deployment

I deployed to DigitalOcean using GH Student pack. 

I went to their page after creating an account, selected create kubernetes cluster, created the most basic nodes at the cheapest dev plan for now.

Had to install `doctl` from Digital Ocean in order to access my kubernetes cluster they are hosting. I used `brew install doctl`


Have to install new Kubernetes cluster context to get access to remote cluster via commands:

*This is the remote cluster name created on digital ocean*
`doctl kubernetes cluster kubeconfig save <cluster_name>`

*Lists all context*
`kubectl config view` 

*To use a different context*
*this is located at name under contexts in the config view*
`kubectl config use-context <context_name>`

Added Docker creds as GH secrets
