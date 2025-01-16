#!/bin/bash

# Имя namespace
NAMESPACE="security-ns"

# Вывод сообщения
echo "Развертывание сервисов в namespace $NAMESPACE..."

# Проверка, существует ли namespace, если нет, то создать
if ! kubectl get namespace "$NAMESPACE" > /dev/null 2>&1; then
  echo "Namespace $NAMESPACE не найден. Создаю его..."
  kubectl create namespace "$NAMESPACE"
fi

# Установка Prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus --namespace "$NAMESPACE"
kubectl expose service prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-np --namespace "$NAMESPACE"

# Установка Grafana
helm repo add grafana https://grafana.github.io/helm-charts
helm install grafana grafana/grafana --namespace "$NAMESPACE"
kubectl expose service grafana --type=NodePort --target-port=3000 --name=grafana-np --namespace "$NAMESPACE"

# Применение YAML-файлов для развертывания сервисов
kubectl apply -f ./templates/namespace.yml
kubectl apply -f ./templates/redis.yml --namespace "$NAMESPACE"
kubectl apply -f ./templates/config-service.yml --namespace "$NAMESPACE"
#kubectl apply -f ./templates/registry-service.yml --namespace "$NAMESPACE"
#kubectl apply -f ./templates/integrity-service.yml --namespace "$NAMESPACE"
kubectl apply -f ./templates/notification-service.yml --namespace "$NAMESPACE"
kubectl apply -f ./templates/audit-service.yml --namespace "$NAMESPACE"
kubectl apply -f ./templates/audit-client.yml --namespace "$NAMESPACE"
kubectl apply -f ./templates/caddy.yml --namespace "$NAMESPACE"

# Сообщение об успешном развертывании
echo "Все сервисы успешно развернуты в namespace $NAMESPACE!"
