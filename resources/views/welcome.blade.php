<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel</title>

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css">
        <link href="{{url('')}}/css/bootstrap.min.css" rel="stylesheet">
        <!-- Material Design Bootstrap -->
        <link href="{{url('')}}/css/mdb.min.css" rel="stylesheet">
        <link rel="stylesheet" href="{{asset('css/style.css')}}">
        <script>
            let codes = {
                '2': 'Такой номер уже существует'
            }
        </script>
    </head>
    <body>
        <div id="root"></div>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
