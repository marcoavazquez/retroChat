FROM php:8.5-fpm-alpine3.23

# 1. Instalamos dependencias del sistema necesarias
# postgresql-dev es el nombre correcto del paquete de desarrollo en Alpine para Postgres
RUN apk add --no-cache \
  postgresql-dev \
  bash \
  shadow \
  libpq

RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

# 2. Instalamos las extensiones de PHP
# Encadenamos los comandos para asegurar que se ejecuten en la misma capa
RUN docker-php-ext-install pdo pdo_pgsql

WORKDIR /var/www/html

COPY . .

RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

USER www-data