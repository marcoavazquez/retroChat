FROM php:search en hub

RUN mkdir -p /home/app

COPY . /home/app

EXPOSE 8000

CMD ["php artisan serve"]

