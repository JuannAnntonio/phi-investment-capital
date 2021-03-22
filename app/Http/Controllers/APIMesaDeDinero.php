<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Lang;
use App;
use Config;
use App\Library\VO\ResponseJSON;
use App\Library\UTIL\Functions;
use App\Library\DAO\Usuarios;
use App\Library\DAO\Permisos_inter;
use App\Library\DAO\Valmer;
use App\Library\DAO\Contabilidad;
use App\Library\DAO\Operaciones_directo;
use Browser;
use Auth;
use DB;
use carbon\Carbon;
use Illuminate\Support\Facades\Log;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Session;
use Validator;

class APIMesaDeDinero extends Controller
{

  
  public function MesaDeDinero(Request $request){
    
    Log::info('[APIMesaDeDinero][MesaDeDinero]');

    Log::info("[APIMesaDeDinero][MesaDeDinero] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIMesaDeDinero][MesaDeDinero] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIMesaDeDinero][MesaDeDinero] Permiso Existente");
          
          return view('system.mesaDeDinero',["title" => config('app.name'), 
                                            "lang" => "es", 
                                            "user" => $token_decrypt,
                                            "color" => 10
                                          ]
          );
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIMesaDeDinero][MesaDeDinero] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIMesaDeDinero][MesaDeDinero] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIMesaDeDinero][MesaDeDinero] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIMesaDeDinero][MesaDeDinero] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }
  
  public function PostNuevaOperacionDirecto(Request $request){
    
    Log::info('[APIMesaDeDinero][PostNuevaOperacionDirecto]');

    Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {


      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required',
        'fecha_de_operacion' => 'required',
        'operacion' => 'required',
        'instrumento' => 'required',
        'montoNominal' => 'required',
        'tasaSobreTasa' => 'required',
        'precio' => 'required',
        'numeroDeTitulos' => 'required',
        'montoLiquidacion' => 'required',
        'fechaLiquidacion' => 'required',
        'contraparte' => 'required'
      ]);
        
      $token = $request->input('token');
      $fecha_de_operacion = $request->input('fecha_de_operacion');
      $operacion = $request->input('operacion');
      $instrumento = $request->input('instrumento');
      $montoNominal = $request->input('montoNominal');
      $tasaSobreTasa = $request->input('tasaSobreTasa');
      $precio = $request->input('precio');
      $numeroDeTitulos = $request->input('numeroDeTitulos');
      $montoLiquidacion = $request->input('montoLiquidacion');
      $fechaLiquidacion = $request->input('fechaLiquidacion');
      $contraparte = $request->input('contraparte');

      Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] Token: ". $token);
      Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] fecha_de_operacion: ". $fecha_de_operacion);
      Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] operacion: ". $operacion);
      Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] instrumento: ". $instrumento);
      Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] montoNominal: ". $montoNominal);
      Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] tasaSobreTasa: ". $tasaSobreTasa);
      Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] precio: ". $precio);
      Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] numeroDeTitulos: ". $numeroDeTitulos);
      Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] montoLiquidacion: ". $montoLiquidacion);
      Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] fechaLiquidacion: ". $fechaLiquidacion);
      Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] contraparte: ". $contraparte);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIMesaDeDinero][PostNuevaOperacionDirecto] Permiso Existente");

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $operaciones_directo = Operaciones_directo::addNewOperacionDirecto($fecha_de_operacion, $operacion, $instrumento, $montoNominal, $precio,
                                                                              $tasaSobreTasa, $numeroDeTitulos, $montoLiquidacion, $fechaLiquidacion,
                                                                              $contraparte);
          

          if($operaciones_directo[0]->save==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($operaciones_directo));
            $responseJSON->data = $operaciones_directo;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($operaciones_directo));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIMesaDeDinero][PostNuevaOperacionDirecto] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIMesaDeDinero][PostNuevaOperacionDirecto] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIMesaDeDinero][PostNuevaOperacionDirecto] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIMesaDeDinero][PostNuevaOperacionDirecto] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function PorInstrumento(Request $request){
    
    Log::info('[APIMesaDeDinero][PorInstrumento]');

    Log::info("[APIMesaDeDinero][PorInstrumento] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIMesaDeDinero][PorInstrumento] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIMesaDeDinero][PorInstrumento] Permiso Existente");
          
          return view('system.porInstrumento',["title" => config('app.name'), 
                                            "lang" => "es", 
                                            "user" => $token_decrypt,
                                            "color" => 10
                                          ]
          );
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIMesaDeDinero][PorInstrumento] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIMesaDeDinero][PorInstrumento] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIMesaDeDinero][PorInstrumento] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIMesaDeDinero][PorInstrumento] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function  GetReportePosicionGlobal(Request $request){
    
    Log::info('[APIMesaDeDinero][GetReportePosicionGlobal]');

    Log::info("[APIMesaDeDinero][GetReportePosicionGlobal] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIMesaDeDinero][GetReportePosicionGlobal] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIMesaDeDinero][GetReportePosicionGlobal] Permiso Existente");
          
          return view('system.reportePosicionGlobal',["title" => config('app.name'), 
                                            "lang" => "es", 
                                            "user" => $token_decrypt,
                                            "color" => 10
                                          ]
          );
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIMesaDeDinero][GetReportePosicionGlobal] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIMesaDeDinero][GetReportePosicionGlobal] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIMesaDeDinero][GetReportePosicionGlobal] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIMesaDeDinero][GetReportePosicionGlobal] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function Directo(Request $request){
    
    Log::info('[APIMesaDeDinero][Directo]');

    Log::info("[APIMesaDeDinero][Directo] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIMesaDeDinero][Directo] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIMesaDeDinero][Directo] Permiso Existente");
          
          return view('system.directo',["title" => config('app.name'), 
                                            "lang" => "es", 
                                            "user" => $token_decrypt,
                                            "color" => 10
                                          ]
          );
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIMesaDeDinero][Directo] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIMesaDeDinero][Directo] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIMesaDeDinero][Directo] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIMesaDeDinero][Directo] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function GetReportGlobalByMaxDate(Request $request){

    Log::info('[APIMesaDeDinero][GetReportGlobalByMaxDate]');

    Log::info("[APIMesaDeDinero][GetReportGlobalByMaxDate] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIMesaDeDinero][GetReportGlobalByMaxDate] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIMesaDeDinero][GetReportGlobalByMaxDate] Permiso Existente");

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $contabilidad = Contabilidad::getReportGlobalByMaxDate();
          

          if(count($contabilidad)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($contabilidad));
            $responseJSON->data = $contabilidad;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.BDempty'), count($contabilidad));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIMesaDeDinero][GetReportGlobalByMaxDate] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIMesaDeDinero][GetReportGlobalByMaxDate] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIMesaDeDinero][GetReportGlobalByMaxDate] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIMesaDeDinero][GetReportGlobalByMaxDate] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }
  }

  public function GetAllContaduria(Request $request){

    Log::info('[APIMesaDeDinero][GetAllContaduria]');

    Log::info("[APIMesaDeDinero][GetAllContaduria] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIMesaDeDinero][GetAllContaduria] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIMesaDeDinero][GetAllContaduria] Permiso Existente");

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $contabilidad = Contabilidad::getAllContaduria();
          

          if(count($contabilidad)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($contabilidad));
            $responseJSON->data = $contabilidad;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.BDempty'), count($contabilidad));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIMesaDeDinero][GetAllContaduria] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIMesaDeDinero][GetAllContaduria] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIMesaDeDinero][GetAllContaduria] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIMesaDeDinero][GetAllContaduria] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }
  }

  public function GetMesaDeDinero(Request $request){

    Log::info('[APIMesaDeDinero][GetMesaDeDinero]');

    Log::info("[APIMesaDeDinero][GetMesaDeDinero] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required',
        'start' => 'required',
        'end' => 'required',
        'instrumento' => 'required'
      ]);
        
      $token = $request->input('token');
      $start = $request->input('start');
      $end = $request->input('end');
      $instrumento = $request->input('instrumento');

      Log::info("[APIMesaDeDinero][GetMesaDeDinero] Token: ". $token);
      Log::info("[APIMesaDeDinero][GetMesaDeDinero] Start: ". $start);
      Log::info("[APIMesaDeDinero][GetMesaDeDinero] End: ". $end);
      Log::info("[APIMesaDeDinero][GetMesaDeDinero] Instrumento: ". $instrumento);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIMesaDeDinero][GetMesaDeDinero] Permiso Existente");

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $contabilidad = Contabilidad::getFilter($start, $end, $instrumento);
          

          if(count($contabilidad)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($contabilidad));
            $responseJSON->data = $contabilidad;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.noHayInstrumentosEnEstasFechas'), count($contabilidad));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIMesaDeDinero][GetMesaDeDinero] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIMesaDeDinero][GetMesaDeDinero] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIMesaDeDinero][GetMesaDeDinero] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIMesaDeDinero][GetMesaDeDinero] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }
  }

  public function GetInstrumentosContabilidad(Request $request){

    Log::info('[APIMesaDeDinero][GetInstrumentosContabilidad]');

    Log::info("[APIMesaDeDinero][GetInstrumentosContabilidad] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required',
        'start' => 'required',
        'end' => 'required'
      ]);
        
      $token = $request->input('token');
      $start = $request->input('start');
      $end = $request->input('end');

      Log::info("[APIMesaDeDinero][GetInstrumentosContabilidad] Token: ". $token);
      Log::info("[APIMesaDeDinero][GetInstrumentosContabilidad] start: ". $start);
      Log::info("[APIMesaDeDinero][GetInstrumentosContabilidad] end: ". $end);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIMesaDeDinero][GetInstrumentosContabilidad] Permiso Existente");

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $Contabilidad = Contabilidad::getInstrumentoWithFilters($start, $end);
          
          Log::info($Contabilidad);

          if(count($Contabilidad)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Contabilidad));
            $responseJSON->data = $Contabilidad;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.noHayInstrumentosEnEstasFechas'), count($Contabilidad));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIMesaDeDinero][GetInstrumentosContabilidad] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIMesaDeDinero][GetInstrumentosContabilidad] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIMesaDeDinero][GetInstrumentosContabilidad] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIMesaDeDinero][GetInstrumentosContabilidad] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }
  }
  

  public function GetInstrumentosValmer(Request $request){

    Log::info('[APIMesaDeDinero][GetInstrumentosValmer]');

    Log::info("[APIMesaDeDinero][GetInstrumentosValmer] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIMesaDeDinero][GetInstrumentosValmer] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIMesaDeDinero][GetInstrumentosValmer] Permiso Existente");

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $valmer = Valmer::getInstrumentoWithFilters();
          
          Log::info($valmer);

          if(count($valmer)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($valmer));
            $responseJSON->data = $valmer;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($valmer));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIMesaDeDinero][GetInstrumentosValmer] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIMesaDeDinero][GetInstrumentosValmer] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIMesaDeDinero][GetInstrumentosValmer] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIMesaDeDinero][GetInstrumentosValmer] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }
  }

}

?>