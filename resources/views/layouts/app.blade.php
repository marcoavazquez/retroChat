<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/gif" href="{{ asset('favicon.gif') }}">

    <title>{{ config('app.name', 'Retro Chat') }}</title>

    <!-- Styles / Scripts -->
    @vite(['resources/css/app.css', 'resources/js/main.tsx'])
</head>

<body>
    @yield('content')
</body>

</html>
