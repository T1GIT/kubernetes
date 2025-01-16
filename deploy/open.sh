#!/bin/bash

sudo kubectl port-forward -n security-ns service/caddy-service 80:80 443:443
