#!/bin/bash

# Имя namespace
NAMESPACE="security-ns"

# Вывод сообщения
echo "Удаление сервисов из namespace $NAMESPACE..."

# Удаление деплойментов
kubectl delete -f templates/registry-service.yml --namespace "$NAMESPACE"
kubectl delete -f templates/integrity-service.yml --namespace "$NAMESPACE"
kubectl delete -f templates/config-service.yml --namespace "$NAMESPACE"
kubectl delete -f templates/notification-service.yml --namespace "$NAMESPACE"
kubectl delete -f templates/audit-log-service.yml --namespace "$NAMESPACE"
kubectl delete -f templates/audit-client.yml --namespace "$NAMESPACE"

# Удаление namespace (если нужно)
echo "Удаление namespace $NAMESPACE..."
kubectl delete namespace "$NAMESPACE"

# Сообщение об успешном удалении
echo "Все сервисы успешно удалены из namespace $NAMESPACE!"
