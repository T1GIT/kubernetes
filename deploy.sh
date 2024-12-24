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

# Применение YAML-файлов для развертывания сервисов
kubectl apply -f templates/registry-service.yml --namespace "$NAMESPACE"
kubectl apply -f templates/integrity-service.yml --namespace "$NAMESPACE"
kubectl apply -f templates/config-service.yml --namespace "$NAMESPACE"
kubectl apply -f templates/notification-service.yml --namespace "$NAMESPACE"
kubectl apply -f templates/audit-log-service.yml --namespace "$NAMESPACE"
kubectl apply -f templates/audit-client.yml --namespace "$NAMESPACE"

# Сообщение об успешном развертывании
echo "Все сервисы успешно развернуты в namespace $NAMESPACE!"
