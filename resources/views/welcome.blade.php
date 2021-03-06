<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Pratoverde</title>

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css">
        <link href="{{url('')}}/css/bootstrap.min.css" rel="stylesheet">
        <!-- Material Design Bootstrap -->
        <link href="{{url('')}}/css/mdb.min.css" rel="stylesheet">
        <link rel="stylesheet" href="{{asset('css/style.css')}}">
        <script type="text/babel" src="{{asset('../dist/main.js')}}"></script>
        <script>
            let codes = {
                '2': 'Такой номер уже существует'
            };
            const apiUrl = '/api/';

            let payMethods = ['Наличные', 'Оплата картой', 'Денежный перевод'];
            let statusBook = ['Не подтверждена', 'Подтверждена', 'Гость приехал', 'Гость не приехал'];
        </script>
    </head>
    <body>
        <div id="cube-loader" class="hide">
            <div class="layout-loader">

            </div>
            <div class="caption">
                <div class="cube-loader">
                    <div class="cube loader-1"></div>
                    <div class="cube loader-2"></div>
                    <div class="cube loader-4"></div>
                    <div class="cube loader-3"></div>
                </div>
            </div>
        </div>
        <div id="root"></div>
        <script type="text/javascript" src="{{asset('js/app.js')}}"></script>
    </body>
</html>
