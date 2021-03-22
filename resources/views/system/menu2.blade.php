<header class="page-header" role="banner">
    <!-- we need this logo when user switches to nav-function-top -->
    <div class="page-logo">
        <a href="#" class="page-logo-link press-scale-down d-flex align-items-center position-relative" data-toggle="modal" data-target="#modal-shortcut">
            <img src="{{ url('img/logo.png') }}" alt="Conecta6" aria-roledescription="logo">
            <span class="page-logo-text mr-1">{{ Config::get('app.name') }}</span>
            <span class="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
            <i class="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
            
        </a>
    </div>
    
    <!-- DOC: nav menu layout change shortcut -->
    <div class="hidden-md-down dropdown-icon-menu position-relative">
        <a href="#" class="header-btn btn js-waves-off" data-action="toggle" data-class="nav-function-hidden" title="Hide Navigation">
            <i class="ni ni-menu"></i>
        </a>
    </div>
    <!-- DOC: mobile button appears during mobile width -->
    <div class="hidden-lg-up">
        <a href="#" class="header-btn btn press-scale-down" data-action="toggle" data-class="mobile-nav-on">
            <i class="ni ni-menu"></i>
        </a>
    </div>
    <div style="width: 100%;" class="d-flex">
    
        <!-- activate app search icon (mobile)
        <div class="hidden-sm-up">
            <a href="#" class="header-icon" data-action="toggle" data-class="mobile-search-on" data-focus="search-field" title="Search">
                <i class="fal fa-search"></i>
            </a>
        </div>
        -->

        @if (in_array("1", $user["permisos"]))
        
        <!-- menú escritorio -->

        <div class="hidden-xs hidden-sm hidden-md" style="width: 100%;">

            <ul style="float: right; list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: white;">
                <li style="padding: 0px 10px 0px 10px; float: left;"><a class="inicio hoverTop" href="{{ url('/inicio') }}">Inicio</a></li>
                <li style="padding: 0px 10px 0px 10px; float: left;"><a class="perfil hoverTop" href="{{ url('/perfil') }}">Perfil</a></li>
                <li style="padding: 0px 10px 0px 10px; float: left;"><a class="mesaDeDinero hoverTop" href="#">Mesa de Dinero</a></li>
                <li style="padding: 0px 10px 0px 10px; float: left;"><a class="backOffice hoverTop" href="#">Back Office</a></li>
                <li style="padding: 0px 10px 0px 10px; float: left;"><a class="uair2 hoverTop" href="#">UAIR</a></li>
                <li style="padding: 0px 10px 0px 10px; float: left;"><a class="hoverTop desarrollo" href="#">Contabilidad</a></li>
                <li style="padding: 0px 10px 0px 10px; float: left;"><a class="hoverTop contratos2" href="#">Contratos</a></li>
                <li style="padding: 0px 10px 0px 10px; float: left;"><a class="hoverTop desarrollo" href="#">Control Interno</a></li>
                <li style="padding: 0px 10px 0px 10px; float: left;"><a class="hoverTop desarrollo" href="#">Promoción</a></li>
                <li style="padding: 0px 10px 0px 10px; float: left;"><a class="hoverTop" href="#" ng-click="logout()">Salir</a></li>
            </ul>

        </div>

        <!--mobile menu-->

        <div style="margin: 0 20px 0 80%;" class="row hidden-lg">

            <div class="">

                <a href="#" data-toggle="dropdown" title="{{ $user['usr']->correo }}" class="header-icon d-flex align-items-center justify-content-center ml-2">
                    <img src="{{ url('img/profile-image.png') }}" class="profile-image rounded-circle" alt='{{ $user["usr"]->nombre }} {{ $user["usr"]->apellido }}'>
                    <!-- you can also add username next to the avatar with the codes below:
                    <span class="ml-1 mr-1 text-truncate text-truncate-header hidden-xs-down">Me</span>
                    <i class="ni ni-chevron-down hidden-xs-down"></i> -->
                </a>

                <div class="dropdown-menu dropdown-menu-animated dropdown-lg">
                    <div class="dropdown-header bg-trans-gradient d-flex flex-row py-4 rounded-top">
                        <div class="d-flex flex-row align-items-center mt-1 mb-1 color-white">
                            <span class="mr-2">
                                <img onerror="this.src='{{ url('img/profile-image.png') }}'" src="{{ url('img/profile-image.png') }}" class="rounded-circle profile-image" alt='{{ $user["usr"]->nombre }} {{ $user["usr"]->apellido }}'>
                            </span>
                            <div class="info-card-text">
                                <div class="fs-lg text-truncate text-truncate-lg">{{ $user["usr"]->nombre }} {{ $user["usr"]->apellido }}</div>
                                <span class="text-truncate text-truncate-md opacity-80">{{ $user["usr"]->correo }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown-divider m-0"></div>
                    <a href="{{ url('/') }}" class="dropdown-item">
                        <span data-i18n="drpdwn.reset_layout">Inicio</span>
                    </a>
                    <a href="{{ url('/perfil') }}" class="dropdown-item">
                        <span data-i18n="drpdwn.reset_layout">Ir al perfil</span>
                    </a>
                    <a href="#" class="dropdown-item backOffice">
                        <span data-i18n="drpdwn.reset_layout">Back Office</span>
                    </a>
                    <a href="#" class="dropdown-item mesaDeDinero">
                        <span data-i18n="drpdwn.reset_layout">Mesa de Dinero</span>
                    </a>
                    <a href="#" class="dropdown-item uair2">
                        <span data-i18n="drpdwn.reset_layout">UAIR</span>
                    </a>
                    <a href="#" class="dropdown-item desarrollo">
                        <span data-i18n="drpdwn.reset_layout">Contabilidad</span>
                    </a>
                    <a href="#" class="dropdown-item contratos2">
                        <span data-i18n="drpdwn.reset_layout">Contratos</span>
                    </a> 
                    <a href="#" class="dropdown-item desarrollo">
                        <span data-i18n="drpdwn.reset_layout">Control Interno</span>
                    </a> 
                    <a href="#" class="dropdown-item desarrollo">
                        <span data-i18n="drpdwn.reset_layout">Promoción</span>
                    </a>

                    <div class="dropdown-divider m-0"></div>
                    <a ng-click="logout()" class="dropdown-item fw-500 pt-3 pb-3" href="#">
                        <span data-i18n="drpdwn.page-logout">Salir</span>
                    </a>
                </div>

            </div>

        </div>

    </div>

    <!--fin app user menu-->
    
    @endif

</header>