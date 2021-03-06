<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>@yield('title', env('APP_NAME'))</title>

        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa&family=Poppins:wght@300;400&display=swap" rel="stylesheet">

        <script src="{{ asset('js/app.js') }}" defer></script>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>

    <body>
        <div id="app">
            @unless($hide_navigation ?? false)
            <nav class="navbar is-black" id="menu" role="navigation" aria-label="main navigation">
                <div class="container is-fluid">
                    <div class="navbar-brand">
                        <a class="navbar-item " href="/" title="Home">
                            <img src="{{ asset('images/logo.svg') }}" alt="{{ env('APP_NAME') }} logo" class="logo" />
                        </a>

                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="menu">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="menu" class="navbar-menu">
                        <div class="navbar-start">
                            @if(config('cartridge.allow_guests') || Auth::check())
                                <div class="navbar-item">
                                    <a href="{{ route('games') }}">
                                        <span>Games</span>
                                    </a>
                                </div>

                                <div class="navbar-item">
                                    <a href="{{ route('platforms') }}">
                                        <span>Platforms</span>
                                    </a>
                                </div>

                            @endif
                        </div>

                        <div class="navbar-end">
                            @guest
                                <div class="navbar-item">
                                    <div class="buttons">
                                        @if (Route::has('login'))
                                            <a class="button is-primary is-outlined" href="{{ route('login') }}">
                                                {{ __('Login') }}
                                            </a>
                                        @endif

                                        @if (Route::has('register'))
                                            <a class="button is-primary is-outlined" href="{{ route('register') }}">
                                                <strong>{{ __('Register') }}</strong>
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            @else
                                <div class="navbar-item has-dropdown is-hoverable">
                                    <a class="navbar-link has-icon-left">
                                        <icon type="user"></icon>

                                        <span>
                                            {{ Auth::user()->name }}
                                        </span>
                                    </a>

                                    <div class="navbar-dropdown is-right">
                                        @if(Auth::check() && Auth::user()->is_admin)
                                            <a class="navbar-item has-icon-left" href="{{ route('admin_dashboard') }}">
                                                <icon type="database"></icon>

                                                <span>
                                                    {{ __('Admininstration') }}
                                                </span>
                                            </a>
                                        @endif

                                        <a class="navbar-item has-icon-left" href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                document.getElementById('logout-form').submit();">
                                            <icon type="log-out"></icon>

                                            <span>
                                                {{ __('Logout') }}
                                            </span>
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                            @csrf
                                        </form>
                                    </div>
                                </div>
                            @endguest
                        </div>
                    </div>
                </div>
            </nav>
            @endif

            <main>
                @yield('content')
            </main>
        </div>
    </body>
</html>
