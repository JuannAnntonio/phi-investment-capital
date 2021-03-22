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
use Browser;
use Auth;
use carbon\Carbon;
use Illuminate\Support\Facades\Log;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Session;
use Validator;

class APIUsuarios extends Controller
{

  public function SignIn(Request $request){
  
    Log::info('[APIUsuarios][SignIn]');

    Log::info("[APIUsuarios][SignIn] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

        return view('login.login',["title" => config('app.name'), 
                                        "lang" => "es"
                                        ]
                                    );

    
      return ;

    } else {

      abort(404);
    
    }

  }

  public function Ingresar(Request $request){
    
    Log::info('[APIUsuarios][ingresar]');

    Log::info("[APIUsuarios][ingresar] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {
      
      $correo = $request->input('correo');
      $contPass = $request->input('contPass');
      
      Log::info("[APIUsuarios][ingresar] correo: ". $correo);
      Log::info("[APIUsuarios][ingresar] contPass: ". $contPass);
      
      $usuarios = Usuarios::lookForByEmailAndPass($correo, $contPass);
      
      if(count($usuarios)>0){

        $permisos_inter_object = Permisos_inter::lookForByIdUsuarios($usuarios->first()->id_usuarios);
        $permisos_inter = array();
        foreach($permisos_inter_object as $permiso){
          $permisos_inter[] = $permiso["id_permisos"];
        }

        $jwt_token = null;

        $factory = JWTFactory::customClaims([
          'sub'   => $usuarios->first()->id_usuarios, //id a conciliar del usuario
          'iss'   => config('app.name'),
          'iat'   => Carbon::now()->timestamp,
          'exp'   => Carbon::tomorrow()->timestamp,
          'nbf'   => Carbon::now()->timestamp,
          'jti'   => uniqid(),
          'usr'   => $usuarios->first(),
          'permisos' => $permisos_inter
        ]);
        
        $payload = $factory->make();
        
        $jwt_token = JWTAuth::encode($payload);
        Log::info("[APIUsuarios][ingresar] new token: ". $jwt_token->get());
        Log::info("[APIUsuarios][ingresar] Permisos: ");
        Log::info($permisos_inter);

        
        $fecha = explode(" ", $usuarios->first()->fecha_fin);
        
        Log::info("[APIUsuarios][ingresar] " . print_r($fecha[0], true));

        Log::info("[APIUsuarios][ingresar] " . date("Y-m-d"));

        if($fecha==""){

          
        Log::info("[APIUsuarios][ingresar] fecha vacía.");

          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDdata'), count($usuarios));
          $responseJSON->data = $usuarios;
          $responseJSON->token = $jwt_token->get();

        } else if($fecha[0]>=date("Y-m-d")) {

           
        Log::info("[APIUsuarios][ingresar] fecha fin es menor.");

          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDdata'), count($usuarios));
          $responseJSON->data = $usuarios;
          $responseJSON->token = $jwt_token->get();

        } else {
          
          Log::info("[APIUsuarios][ingresar] fecha fin es mayor.");

          $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'), "Ya no quedan días para el periodo de pruebas", count($usuarios));
          $responseJSON->data = $usuarios;
          $responseJSON->token = $jwt_token->get();

        }

        return json_encode($responseJSON);

      } else {
        $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBDFail'), count($usuarios));
        $responseJSON->data = $usuarios;
        return json_encode($responseJSON);

      }

      return "";
      
    } else {
      abort(404);
    }
  }

  
  public function Inicio(Request $request){
    
    Log::info('[APIUsuarios][Inicio]');

    Log::info("[APIUsuarios][Inicio] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIUsuarios][Inicio] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIUsuarios][Inicio] Permiso Existente");
          
          return view('system.inicio',["title" => config('app.name'), 
                                            "lang" => "es", 
                                            "user" => $token_decrypt,
                                            "color" => 10
                                          ]
          );
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIUsuarios][Inicio] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIUsuarios][Inicio] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIUsuarios][Inicio] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIUsuarios][Inicio] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  
  public function Perfil(Request $request){
    
    Log::info('[APIUsuarios][Perfil]');

    Log::info("[APIUsuarios][Perfil] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIUsuarios][Perfil] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIUsuarios][Inicio] Permiso Existente");
          
          return view('system.perfil',["title" => config('app.name'), 
                                            "lang" => "es", 
                                            "user" => $token_decrypt,
                                            "color" => 10
                                          ]
          );
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIUsuarios][Perfil] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIUsuarios][Perfil] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIUsuarios][Perfil] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIUsuarios][Perfil] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function GetUsuario(Request $request){

    Log::info('[APIUsuarios][GetUsuario]');

    Log::info("[APIUsuarios][GetUsuario] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIUsuarios][GetUsuario] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIUsuarios][GetUsuario] Permiso Existente");
          
          Validator::make($request->all(), [
            'id_usuarios' => 'required'
          ])->validate();
        
          $id_usuarios = $request->input('id_usuarios');

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $id_usuarios = Usuarios::lookByIdUsuarios($id_usuarios);

          if(count($id_usuarios)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($id_usuarios));
            $responseJSON->data = $id_usuarios;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($id_usuarios));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIUsuarios][ChangePerfilPass] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIUsuarios][ChangePerfilPass] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIUsuarios][ChangePerfilPass] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIUsuarios][ChangePerfilPass] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }
  }

  
  public function GetZonaHoraria(Request $request)
  {
    Log::info('[APIUsuarios][GetZonasHorarias]');

    Log::info("[APIUsuarios][GetZonasHorarias] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIUsuarios][GetZonasHorarias] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIUsuarios][GetZonasHorarias] Permiso Existente");
          

          Validator::make($request->all(), [
            'id_usuarios' => 'required'
          ])->validate();
          
          $id_usuarios = $request->input('id_usuarios');

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $Usuarios = Usuarios::getTimeZone($id_usuarios);


          if(count($Usuarios)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Usuarios));
            $responseJSON->data = $Usuarios;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Usuarios));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');



      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIUsuarios][GetZonasHorarias] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIUsuarios][GetZonasHorarias] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIUsuarios][GetZonasHorarias] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIUsuarios][GetZonasHorarias] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }
  
  public function Logout(Request $request){
    
    Log::info('[APIUsuarios][Logout]');

    Log::info("[APIUsuarios][Logout] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        // attempt to verify the credentials and create a token for the user
        JWTAuth::parseToken()->invalidate();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Invalidado Exitosamente", 0);
        return json_encode($responseJSON);


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIUsuarios][Logout] Token error: token_expired');

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Expirado", 0);
        return json_encode($responseJSON);
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIUsuarios][Logout] Token error: token_invalid');

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Inválido", 0);
        return json_encode($responseJSON);
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIUsuarios][Logout] Token error: token_absent');

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Ausente", 0);
        return json_encode($responseJSON);
  
      }



    } else {
      abort(404);
    }

  }

}

?>