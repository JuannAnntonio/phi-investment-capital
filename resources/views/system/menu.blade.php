
        <aside class="page-sidebar">
            <div style="display: block; padding-left: 0;" class="page-logo">
                <a href="#" class="page-logo-linkalign-items-center">
                    <center>
                        <img class="" src="{{ url('img/logo-blanco.png') }}" alt="PhiInvestmentCapital" aria-roledescription="logo">
                    </center>
                </a>

            </div>
            <!--
            <div style="text-align: center;">

                <img style="width: 200px;" src="{{ url('img/sigmact.act.png') }}" alt="PhiInvestmentCapital">

            </div>
            -->

            <!-- BEGIN PRIMARY NAVIGATION -->
            <nav id="js-primary-nav" style="box-shadow: none !important;" class="primary-nav" role="navigation">

                <div class="nav-filter">
                    <div class="position-relative">
                        <input type="text" id="nav_filter_input" placeholder="Filter menu" class="form-control" tabindex="0">
                        <a href="#" onclick="return false;" class="btn-primary btn-search-close js-waves-off" data-action="toggle" data-class="list-filter-active" data-target=".page-sidebar">
                            <i class="fal fa-chevron-up"></i>
                        </a>
                    </div>
                </div>

                <!--

                Instruccione del menú:

                Agregar más de dos etiquetas <ul id="js-nav-menu" hará que ninguno de los menús se haga desplegable.

                Comentado no pasa nada. Display: none; no sirve para evitar el error.

                -->

                <!-- Usuarios admin -->

                @if(in_array("1", $user["permisos"]))

                    <ul id="js-nav-menu" class="nav-menu">

                        <!-- Menu Principal -->

                        <div class="mainMenu">

                            @if(Request::is('inicio') || Request::is('perfil'))

                                @if ($__env->yieldContent('menuActive')=="inicio")
                                    <li class="active">
                                @else
                                    <li class="">
                                @endif
                                        <a href="{{ url('/inicio') }}" title="Analytics Dashboard" data-filter-tags="application intel analytics dashboard">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Inicio</span>
                                        </a>
                                    </li>
                                @if ($__env->yieldContent('menuActive')=="perfil")
                                    <li class="active">
                                @else
                                    <li class="">
                                @endif
                                        <a href="{{ url('/perfil') }}" title="Perfil" data-filter-tags="perfil">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Perfil</span>
                                        </a>
                                    </li>

                                    <li class="mesaDeDinero">
                                        <a href="#" title="Mesa de Dinero" data-filter-tags="mesa de dinero">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Mesa de Dinero</span>
                                        </a>
                                    </li>

                                    <li class="backOffice">
                                        <a href="#" title="Back Office" data-filter-tags="Back Office">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Back Office</span>
                                        </a>
                                    </li>

                                    <li class="uair2">
                                        <a href="#" title="UAIR" data-filter-tags="UAIR">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">UAIR</span>
                                        </a>
                                    </li>

                                    <li class="desarrollo">
                                        <a href="#" title="Contabilidad" data-filter-tags="Contabilidad">
                                            <span class="nav-link-text desarrollo" data-i18n="nav.application_intel_analytics_dashboard">Contabilidad</span>
                                        </a>
                                    </li>

                                    <li class="contratos2">
                                        <a href="#" title="Contratos" data-filter-tags="Contratos">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Contratos</span>
                                        </a>
                                    </li>

                                    <li class="desarrollo">
                                        <a href="#" title="Control Interno" data-filter-tags="Control Interno">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Control Interno</span>
                                        </a>
                                    </li>

                                    <li class="desarrollo">
                                        <a href="#" title="Promoción" data-filter-tags="Promoción">
                                            <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Promoción</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" ng-click="logout()" title="Salir" data-filter-tags="salir">
                                            <span class="nav-link-text" data-i18n="nav.pages_chat">Salir</span>
                                        </a>
                                    </li>

                            @endif

                        </div>

                        <!--Menú Mesa de dinero-->

                        <div class="mesaDeDineroMenu">

                            @if ($__env->yieldContent('menuActive')=="capitales")
                                <li class="active">
                            @else
                                <li class="">
                            @endif
                                    <a href="#" title="Capitales" data-filter-tags="Capitales">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Capitales</span>
                                    </a>

                                    <ul>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Reporte de Posición Global" data-filter-tags="Reporte de Posición Global">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Reporte de Posición Global</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Posición por Instrumento" data-filter-tags="Posición por Instrumento">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Posición por Instrumento</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Trading" data-filter-tags="Trading">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Trading</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Promoción" data-filter-tags="Promoción">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Promoción</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Análisis" data-filter-tags="Análisis">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Análisis</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Reportes" data-filter-tags="Reportes">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Reportes</span>
                                            </a>

                                        </li>

                                    </ul>

                                </li>


                            @if ($__env->yieldContent('menuActive')=="reportePosicion" ||
                                    $__env->yieldContent('menuActive')=="porInstrumento" ||
                                    $__env->yieldContent('menuActive')=="analisis")
                                <li class="active open">
                            @else
                                <li class="open">
                            @endif
                                <a href="#" title="Application Intel" data-filter-tags="application intel">
                                    <span class="nav-link-text" data-i18n="nav.application_intel">Deudas</span>
                                </a>



                                <ul>

                                    @if ($__env->yieldContent('menuActive')=="reportePosicion")
                                        <li class="active">
                                    @else
                                        <li class="">
                                    @endif
                                            <a href="{{ url('/posicion/reportePosicion') }}" title="Reporte de Posición Global" data-filter-tags="Reporte de Posición Global">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Reporte de Posición Global</span>
                                            </a>
                                        </li>


                                    @if ($__env->yieldContent('menuActive')=="porInstrumento")
                                        <li class="active">
                                    @else
                                        <li class="">
                                    @endif
                                            <a href="{{ url('/posicion/porInstrumento') }}" title="Posición Por Instrumento" data-filter-tags="Posición Por Instrumento">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Posición Por Instrumento</span>
                                            </a>
                                        </li>


                                    @if ($__env->yieldContent('menuActive')=="libros")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="libros" data-filter-tags="libros">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Libros</span>
                                            </a>
                                        </li>


                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active ordenes">
                                    @else
                                        <li class="ordenes">
                                    @endif
                                            <a href="#" title="ordenes" data-filter-tags="ordenes">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Órdenes</span>
                                            </a>

                                            <ul>

                                            @if ($__env->yieldContent('menuActive')=="")
                                                <li class="active">
                                            @else
                                                <li class="">
                                            @endif
                                                    <a href="{{ url('/operacion/directo') }}" title="directo" data-filter-tags="directo">
                                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Directo</span>
                                                    </a>
                                                </li>

                                            @if ($__env->yieldContent('menuActive')=="")
                                                <li class="active">
                                            @else
                                                <li class="">
                                            @endif
                                                    <a href="#" title="Reporto" data-filter-tags="Reporto">
                                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Reporto</span>
                                                    </a>
                                                </li>

                                            </ul>

                                        </li>


                                    @if ($__env->yieldContent('menuActive')=="trading")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="trading" data-filter-tags="trading">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Trading</span>
                                            </a>
                                        </li>


                                    @if ($__env->yieldContent('menuActive')=="promocion")
                                        <li class="active">
                                    @else
                                        <li class="">
                                    @endif
                                            <a href="#" title="promocion" data-filter-tags="promocion">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Promocion</span>
                                            </a>

                                            <ul>

                                            @if ($__env->yieldContent('menuActive')=="")
                                                <li class="active desarrollo">
                                            @else
                                                <li class="desarrollo">
                                            @endif
                                                    <a href="#" title="Bandas de Reporto" data-filter-tags="Bandas de Reporto">
                                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Bandas de Reporto</span>
                                                    </a>
                                                </li>

                                            @if ($__env->yieldContent('menuActive')=="")
                                                <li class="active desarrollo">
                                            @else
                                                <li class="desarrollo">
                                            @endif
                                                    <a href="#" title="Bandas Directo" data-filter-tags="Bandas Directo">
                                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Bandas Directo</span>
                                                    </a>
                                                </li>

                                            </ul>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="analisis")
                                        <li class="active">
                                    @else
                                        <li class="">
                                    @endif
                                            <a href="{{ url('/posicion/analisis') }}" title="analisis" data-filter-tags="analisis">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Análisis</span>
                                            </a>
                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="reportes")
                                        <li class="active">
                                    @else
                                        <li class="">
                                    @endif
                                            <a href="#" title="reportes" data-filter-tags="reportes">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Reportes</span>
                                            </a>

                                            <ul>

                                            @if ($__env->yieldContent('menuActive')=="")
                                                <li class="active desarrollo">
                                            @else
                                                <li class="desarrollo">
                                            @endif
                                                    <a href="#" title="Resultados" data-filter-tags="Resultados">
                                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Resultados</span>
                                                    </a>
                                                </li>

                                            </ul>
                                        </li>

                                </ul>
                            </li>

                            @if ($__env->yieldContent('menuActive')=="Divisas")
                                <li class="active">
                            @else
                                <li class="">
                            @endif
                                    <a href="#" title="Divisas" data-filter-tags="Divisas">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Divisas</span>
                                    </a>

                                    <ul>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Reporte de Posición Global" data-filter-tags="Reporte de Posición Global">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Reporte de Posición Global</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Posición por Instrumento" data-filter-tags="Posición por Instrumento">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Posición por Instrumento</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Trading" data-filter-tags="Trading">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Trading</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Promoción" data-filter-tags="Promoción">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Promoción</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Análisis" data-filter-tags="Análisis">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Análisis</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Reportes" data-filter-tags="Reportes">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Reportes</span>
                                            </a>

                                        </li>

                                    </ul>

                                </li>

                            @if ($__env->yieldContent('menuActive')=="Derivados")
                                <li class="active">
                            @else
                                <li class="">
                            @endif
                                    <a href="#" title="Derivados" data-filter-tags="Derivados">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Derivados</span>
                                    </a>

                                    <ul>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Reporte de Posición Global" data-filter-tags="Reporte de Posición Global">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Reporte de Posición Global</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Posición por Instrumento" data-filter-tags="Posición por Instrumento">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Posición por Instrumento</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Trading" data-filter-tags="Trading">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Trading</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Promoción" data-filter-tags="Promoción">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Promoción</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Análisis" data-filter-tags="Análisis">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Análisis</span>
                                            </a>

                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Reportes" data-filter-tags="Reportes">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Reportes</span>
                                            </a>

                                        </li>

                                    </ul>

                                </li>

                            @if ($__env->yieldContent('menuActive')=="")
                                <li class="active desarrollo">
                            @else
                                <li class="desarrollo">
                            @endif
                                    <a href="#" title="Fondos de Inversión" data-filter-tags="Fondos de Inversión">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Fondos de Inversión</span>
                                    </a>

                                </li>

                        </div>

                        <!--Menú Backoffice-->

                        <div class="bOffice">

                            @if ($__env->yieldContent('menuActive')=="")
                                <li class="active desarrollo">
                            @else
                                <li class="desarrollo">
                            @endif
                                    <a href="#" title="Capitales" data-filter-tags="Capitales">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Capitales</span>
                                    </a>
                                </li>

                            @if ($__env->yieldContent('menuActive')=="")
                                <li class="active">
                            @else
                                <li class="">
                            @endif
                                    <a href="#" title="Deuda" data-filter-tags="Deuda">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Deuda</span>
                                    </a>

                                    <ul>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Posición Global" data-filter-tags="Posición Global">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Posición Global</span>
                                            </a>
                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Ordenes" data-filter-tags="Ordenes">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Ordenes</span>
                                            </a>
                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="Asignación" data-filter-tags="Asignación">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Asignación</span>
                                            </a>
                                        </li>

                                    </ul>

                                </li>

                            @if ($__env->yieldContent('menuActive')=="")
                                <li class="active desarrollo">
                            @else
                                <li class="desarrollo">
                            @endif
                                    <a href="#" title="Divisas" data-filter-tags="Divisas">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Divisas</span>
                                    </a>
                                </li>

                            @if ($__env->yieldContent('menuActive')=="")
                                <li class="active desarrollo">
                            @else
                                <li class="desarrollo">
                            @endif
                                    <a href="#" title="Derivados" data-filter-tags="Derivados">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Derivados</span>
                                    </a>
                                </li>

                            @if ($__env->yieldContent('menuActive')=="")
                                <li class="active desarrollo">
                            @else
                                <li class="desarrollo">
                            @endif
                                    <a href="#" title="Carga de Parámetros" data-filter-tags="Carga de Parámetros">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Carga de Parámetros</span>
                                    </a>
                                </li>


                        </div>

                        <!--Menú UAIR-->

                        <div class="UAIR">

                            @if ($__env->yieldContent('menuActive')=="UAIRPosicionGlobal")
                                <li class="active UAIRPos">
                            @else
                                <li class="UAIRPos">
                            @endif
                                    <a href="#" title="Posición Global" data-filter-tags="Posición Global">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Posición Global</span>
                                    </a>
                                </li>

                            @if ($__env->yieldContent('menuActive')=="UAIRAsignacionLimites"||$__env->yieldContent('menuActive')=="UAIRAsemaforos"||$__env->yieldContent('menuActive')=="UAIRLogaritmo")
                                <li class="active open">
                            @else
                                <li class="">
                            @endif
                                    <a href="#" title="Límites y Líneas" data-filter-tags="Límites y Líneas">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Límites y Líneas</span>
                                    </a>

                                    <ul>

                                    @if ($__env->yieldContent('menuActive')=="UAIRLogaritmo")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                    <!--/UAIR/logaritmo-->
                                            <a href="#" title="Asignación de Líneas" data-filter-tags="Asignación de Líneas">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Asignación de Líneas</span>
                                            </a>
                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="UAIRAsignacionLimites")
                                        <li class="active">
                                    @else
                                        <li class="">
                                    @endif
                                            <a href="/UAIR/limites" title="Asignación de Límites" data-filter-tags="Asignación de Límites">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Asignación de Límites</span>
                                            </a>
                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="UAIRAsemaforos")
                                        <li class="active">
                                    @else
                                        <li class="">
                                    @endif
                                            <a href="/UAIR/semaforos" title="Semáforos y Alertas" data-filter-tags="Semáforos y Alertas">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Semáforos y Alertas</span>
                                            </a>
                                        </li>

                                    </ul>

                                </li>

                            @if ($__env->yieldContent('menuActive')=="UAIRSensibilidad")
                                <li class="active varHistorico">
                            @else
                                <li class="varHistorico">
                            @endif
                                    <a href="/UAIR/VaR/historico" title="sensibilidad Y Var" data-filter-tags="sensibilidad Y Var">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Sensibilidad Y Var</span>
                                    </a>
                                </li>

                            @if ($__env->yieldContent('menuActive')=="consumoDeCapital")
                                <li class="active desarrollo">
                            @else
                                <li class="desarrollo">
                            @endif
                                    <a href="#" title="Consumo de Capital" data-filter-tags="Consumo de Capital">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Consumo de Capital</span>
                                    </a>
                                </li>

                            @if ($__env->yieldContent('menuActive')=="escenarioDeEstres")
                                <li class="active desarrollo">
                            @else
                                <li class="desarrollo">
                            @endif
                                    <a href="#" title="Escenario de Estres" data-filter-tags="Escenario de Estres">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Escenario de Estres</span>
                                    </a>
                                </li>

                            @if ($__env->yieldContent('menuActive')=="reportesRegulatorios")
                                <li class="active reportesRegulatorios">
                            @else
                                <li class="reportesRegulatorios">
                            @endif
                                    <a href="#" title="Reportes Regulatorios" data-filter-tags="Reportes Regulatorios">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Reportes Regulatorios</span>
                                    </a>

                                    <ul>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="RC's" data-filter-tags="RC's">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_introduction">RC's</span>
                                            </a>
                                        </li>

                                    @if ($__env->yieldContent('menuActive')=="")
                                        <li class="active desarrollo">
                                    @else
                                        <li class="desarrollo">
                                    @endif
                                            <a href="#" title="ALCME" data-filter-tags="ALCME">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_introduction">ALCME</span>
                                            </a>
                                        </li>

                                    </ul>

                                </li>


                            @if ($__env->yieldContent('menuActive')=="csv")
                                <li class="active cargaParametros">
                            @else
                                <li class="cargaParametros">
                            @endif
                                    <a href="/UAIR/csvfile" title="Carga de Parámetros" data-filter-tags="Carga de Parámetros">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Carga de Parámetros</span>
                                    </a>
                                </li>


                             @if ($__env->yieldContent('menuActive')=="generarvar")
                                <li class="active generarvar">
                            @else
                                <li class="generarvar">
                            @endif
                                    <a href="/UAIR/generarvar" title="Generar VaR" data-filter-tags="Generar VaR">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Generar VaR</span>
                                    </a>
                                </li>

                        </div>

                        <!--Menú Contratos -->

                        <div class="contratos">

                            @if ($__env->yieldContent('menuActive')=="contabilidadReporteGlobal")
                                <li class="active">
                            @else
                                <li class="">
                            @endif
                                    <a href="#" title="Registro de Contratos" data-filter-tags="Registro de Contratos">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Registro de Contratos</span>
                                    </a>
                                </li>

                        </div>


                    </ul>

                @endif

                <!-- menu normal

                @if(in_array("1", $user["permisos"]))

                    <ul id="js-nav-menu" class="nav-menu mainMenu">

                        @if(Request::is('inicio') || Request::is('perfil'))

                            @if ($__env->yieldContent('menuActive')=="inicio")
                                <li class="active">
                            @else
                                <li class="">
                            @endif
                                    <a href="{{ url('/inicio') }}" title="Analytics Dashboard" data-filter-tags="application intel analytics dashboard">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Inicio</span>
                                    </a>
                                </li>
                            @if ($__env->yieldContent('menuActive')=="perfil")
                                <li class="active">
                            @else
                                <li class="">
                            @endif
                                    <a href="{{ url('/perfil') }}" title="Perfil" data-filter-tags="perfil">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Perfil</span>
                                    </a>
                                </li>

                                <li class="">
                                    <a href="{{ url('/mesa-de-dinero') }}" title="Mesa de Dinero" data-filter-tags="mesa de dinero">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Mesa de Dinero</span>
                                    </a>
                                </li>

                                <li class="">
                                    <a href="{{ url('/UAIR') }}" title="UAIR" data-filter-tags="UAIR">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">UAIR</span>
                                    </a>
                                </li>

                                <li class="">
                                    <a href="{{ url('/contabilidad') }}" title="Contabilidad" data-filter-tags="Contabilidad">
                                        <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Contabilidad</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#" ng-click="logout()" title="Salir" data-filter-tags="salir">
                                        <span class="nav-link-text" data-i18n="nav.pages_chat">Salir</span>
                                    </a>
                                </li>

                        @endif


                        @if(Request::is('mesa-de-dinero') ||
                            Request::is('posicion/reportePosicion') ||
                            Request::is('posicion/porInstrumento') ||
                            Request::is('operacion/directo'))

                                @if ($__env->yieldContent('menuActive')=="reportePosicion" ||
                                        $__env->yieldContent('menuActive')=="porInstrumento" ||
                                        $__env->yieldContent('menuActive')=="analisis")
                                    <li class="active open">
                                @else
                                    <li class="active open">
                                @endif
                                    <a href="#" title="Application Intel" data-filter-tags="application intel">
                                        <span class="nav-link-text" data-i18n="nav.application_intel">Posición</span>
                                    </a>



                                    <ul>
                                        @if ($__env->yieldContent('menuActive')=="reportePosicion")
                                            <li class="active">
                                        @else
                                            <li class="">
                                        @endif
                                                <a href="{{ url('/posicion/reportePosicion') }}" title="Perfil" data-filter-tags="perfil">
                                                    <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Reporte Posición</span>
                                                </a>
                                            </li>
                                        @if ($__env->yieldContent('menuActive')=="porInstrumento")
                                            <li class="active">
                                        @else
                                            <li class="">
                                        @endif
                                                <a href="{{ url('/posicion/porInstrumento') }}" title="Empresas" data-filter-tags="empresas">
                                                    <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Por Instrumento</span>
                                                </a>
                                            </li>
                                        @if ($__env->yieldContent('menuActive')=="idiomas")
                                            <li class="active">
                                        @else
                                            <li class="">
                                        @endif
                                                <a href="{{ url('/posicion/analisis') }}" title="Idiomas" data-filter-tags="idiomas">
                                                    <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Análisis</span>
                                                </a>
                                            </li>
                                    </ul>
                                </li>

                                    @if ($__env->yieldContent('menuActive')=="directo" ||
                                        $__env->yieldContent('menuActive')=="reporto")
                                        <li class="active open">
                                    @else
                                        <li class="active open">
                                    @endif

                                        <a href="#" title="Application Intel" data-filter-tags="application intel">
                                            <span class="nav-link-text" data-i18n="nav.application_intel">Operación</span>
                                        </a>

                                    <ul>
                                    @if ($__env->yieldContent('menuActive')=="directo")
                                        <li class="active">
                                    @else
                                        <li class="">
                                    @endif
                                            <a href="{{ url('/operacion/directo') }}" title="Perfil" data-filter-tags="perfil">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_analytics_dashboard">Directo</span>
                                            </a>
                                        </li>
                                    @if ($__env->yieldContent('menuActive')=="reporto")
                                        <li class="active">
                                    @else
                                        <li class="">
                                    @endif
                                            <a href="{{ url('/operacion/reporto') }}" title="Empresas" data-filter-tags="empresas">
                                                <span class="nav-link-text" data-i18n="nav.application_intel_introduction">Reporto</span>
                                            </a>
                                        </li>

                                    </ul>

                                </li>

                        @endif

                    </ul>

                @endif
                -->

                <div class="filter-message js-filter-message bg-success-600"></div>
            </nav>

                <!-- END PRIMARY NAVIGATION -->
                <!-- NAV FOOTER -->
                <div class="nav-footer shadow-top">
                    <a href="#" onclick="return false;" data-action="toggle" data-class="nav-function-minify" class="hidden-md-down">
                        <i class="ni ni-chevron-right"></i>
                        <i class="ni ni-chevron-right"></i>
                    </a>
                    <ul class="list-table m-auto nav-footer-buttons">
                        <li>
                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="Chat logs">
                                <i class="fal fa-comments"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="Support Chat">
                                <i class="fal fa-life-ring"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="Make a call">
                                <i class="fal fa-phone"></i>
                            </a>
                        </li>
                    </ul>
                </div> <!-- END NAV FOOTER -->
            </aside>
