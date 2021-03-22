<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


//sign in usuarios (URL a evaluación)
Route::get('/', 'APIUsuarios@SignIn');

//Sistema Welcome
Route::get('/inicio', 'APIUsuarios@Inicio');

//Perfil
Route::get('/perfil', 'APIUsuarios@Perfil');



/******** Mesa de Dinero ********/

//mesa de dinero
Route::get('/mesa-de-dinero', 'APIMesaDeDinero@MesaDeDinero');

//reporte posición Global
Route::get('/posicion/reportePosicion', 'APIMesaDeDinero@GetReportePosicionGlobal');

//por instrumento
Route::get('/posicion/porInstrumento', 'APIMesaDeDinero@PorInstrumento');

//Mesa de Dinero
Route::get('/operacion/directo', 'APIMesaDeDinero@Directo');



/******* Fin Mesa de Dinero *******/

/* UAIR */

Route::get('/UAIR/limites-lineas/asignacion-de-limites', 'APIUAIR@AsignacionLimites');

Route::get('/UAIR/VaR/historico', 'APIUAIR@VaRHistorico');

Route::get('/UAIR/limites','APIUAIR@Limites');

Route::get('/UAIR/semaforos','APIUAIR@Semaforos');


Route::get('/UAIR/logaritmo','APIUAIR@Logaritmo');

/* FIN DE UAIR */



/* CSV */

Route::get('/UAIR/csvfile','APIUAIR@CSV');

Route::get('/UAIR/generarvar','APIUAIR@Generarvar');