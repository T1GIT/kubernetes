#!/bin/bash

# Имя namespace
NAMESPACE="security-ns"

# Удаление Prometheus
echo "Удаление Prometheus..."
helm uninstall prometheus -n "$NAMESPACE"

# Удаление Grafana
echo "Удаление Grafana..."
helm uninstall grafana -n "$NAMESPACE"
# Вывод сообщения
echo "Удаление сервисов из namespace $NAMESPACE..."

# Удаление деплойментов
kubectl delete -f ./templates/namespace.yml
