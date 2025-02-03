## Laravel, Inertiajs, Primevue and Tailwind Starter.

A starter kit with all the required technologies for web development.
Please note that vue framework uses composition api with typescript for source code.
You can remove the packages which you dont require.

### Requirements

- [PHP 8.1+](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node](https://nodejs.org/)

### Installation

```sh
git clone https://github.com/aasiph/lips.git yourappname
cd yourappname

composer install
npm install

php artisan migrate
php artisan db:seed

composer dev
```

### Framework and Libraries used in this project including other packages.

- **[Laravel 11](https://laravel.com/)**
    - [Spatie](https://spatie.be/)
        - spatie/laravel-backup
        - spatie/laravel-data
        - spatie/laravel-medialibrary
        - spatie/laravel-permission
        - spatie/laravel-typescript-transformer
- **[Inertiajs 2](https://inertiajs.com/)**
- **[Vue.js 3](https://vuejs.org/)**
    - [@vueuse/core](https://vueuse.org/)
    - [axios](https://axios-http.com/)
    - [primevue](https://primevue.org/)
- **[Tailwind CSS](https://tailwindcss.com/)**
