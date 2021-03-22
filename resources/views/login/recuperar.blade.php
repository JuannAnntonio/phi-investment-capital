@extends('trabajadores.master')

  {{-- lang html tag --}}

  @section('lang'){{$lang}}@stop

  {{-- Title Head --}}

  @section('title'){{$title}}@stop

  {{-- Metatag Head --}}

  @section('Content-Type','text/html; charset=UTF-8')
  @section('x-ua-compatible','ie=edge')
  @section('keywords','')
  @section('description','')
  @section('viewport','width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1')
  @section('idiomaLang','es-mx')

  <!--Menu Transparente
  @section('menuCSS','css/menu/menu.css?v='.cache("js_version_number").'')
  -->

  {{-- Angular Controller --}}

  @section('controller','recuperarTrabajadores')

  {{-- Body --}}

  @section('content')


    <!--Main layout-->
    <main>
    
        <section id="signin">

          <div class="row">

            <div class="col-md-3"></div>

            <div class="col-md-6">

              <div class="card">

                <div class="card-image resaltar">
                  <img onerror="this.src='{{ url('img/logo-example.png') }}'" class="profile-image logoCompany text-center" src="{{ url('img/logo-example.png') }}">
                </div>

                <div class="card-content">

                  <div class="col-md-2"></div>

                  <div class="col-md-8 resaltar">

                    <p class="resaltar">Ingresa tu correo para Recuperar tu Contraseña</p>

                    <div class="input-group resaltar">
                      <span class="input-group-addon "><span class="fa fa-user"></span></span>
                      <input id="correo" type="text" placeholder="Correo Electrónico" class="form-control bootstrap-normal-input" aria-label="Amount (to the nearest dollar)">
                    </div>

                    <button ng-click="postRecuperarClick()" id="ingresarButton" style="margin-top: 40px; margin-bottom: 40px;" class="btn waves-effect waves-light resaltar" type="submit" name="action">Recuperar
                      <i class="fa fa-sign-in" aria-hidden="true"></i>
                    </button>

                    <a style="margin-bottom: 40px;" href="#">
                      <p class="resaltar"><a href="{{ url('/'.$subdominio.'/') }}">Iniciar Sesión</a></p>
                    </a>
                    
                  </div>

                </div>

                <div class="col-md-2"></div>

                <div class="wave"></div>

              </div>

            </div>

            <div class="col-md-3"></div>

          </div>

        </section>

    </main>
    <!--Main layout-->

    <script>
        $(document).ready(function(){

          angular.element('body').scope().getImageEmpresaClick("{{ $id_empresas }}");
        });
    </script>

    @stop
