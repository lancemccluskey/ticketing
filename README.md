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


