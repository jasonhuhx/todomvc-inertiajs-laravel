## About This Project

This is a simple to-do web app built with React, Inertia.js, and Laravel. It demonstrates Inertia's ability to build a database-backed single-page React app while utilizing classic Laravel server-side routing. This means no client-side routing is necessary, and the app is still fully client-side rendered. Inspect the network requests for a quick understanding of how it works. This project uses [TodoMVC](https://github.com/tastejs/todomvc-app-template?tab=readme-ov-file) as a starting point for the UI templates.

## Live Demo

A live demo is available at [https://todomvc-inertiajs-laravel-withered-leaf-694.fly.dev/todos](https://todomvc-inertiajs-laravel-withered-leaf-694.fly.dev/todos). Your to-do data is saved in a SQLite database and associated with your session ID. Please be considerate of the server.

## Features

* Create, list, update, and delete to-dos.
* Data is saved on the server side in a SQLite database and preserved within your current browser session.
⠀
## Setup

To run this app on your localhost, you will need a [PHP/Laravel environment](https://laravel.com/docs/10.x/starter-kits#introduction) and npm installed.

```
# Under project root
mv .env.example .env

# Migrate database
php artisan migrate

# Install npm dependencies
npm install
npm run dev

# Serve using Laravel, if you don't have a PHP server running already
# php artisan serve
```