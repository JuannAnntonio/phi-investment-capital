<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Ingresar Usuarios
Route::get('/usuarios/ingresar', 'APIUsuarios@Ingresar');

//Logout Usuarios
Route::get('/usuarios/logout', 'APIUsuarios@Logout');

//Get Usuarios
Route::get('/usuarios/obtener', 'APIUsuarios@GetUsuario');

//Get Zona Horaria
Route::get('/usuarios/zonaHoraria/obtener', 'APIUsuarios@GetZonaHoraria');

//Get Mesa de Dinero filter by start, end, instrumento de contabilidad
Route::get('/mesa-de-dinero/obtener', 'APIMesaDeDinero@GetMesaDeDinero');

//Get Mesa reporte global obtener por fecha mayor
Route::get('/mesa-de-dinero/posicion/global/obtenerByMaxDate', 'APIMesaDeDinero@GetReportGlobalByMaxDate');

//Get Mesa allContaduria
Route::get('/mesa-de-dinero/posicion/global/obtenerAll', 'APIMesaDeDinero@GetAllContaduria');

//Get Instrumento getContabilidadWithFilters
Route::get('/mesa-de-dinero/posicion/porInstrumento/obtenerInstrumentos', 'APIMesaDeDinero@GetInstrumentosContabilidad');

//Get Instrumento by MaxDate getValmerWithFilters
Route::get('/mesa-de-dinero/operacion/directo/obtenerInstrumentos', 'APIMesaDeDinero@GetInstrumentosValmer');

//Post Operacion Directo
Route::post('/mesa-de-dinero/operacion/directo/nueva', 'APIMesaDeDinero@PostNuevaOperacionDirecto');
