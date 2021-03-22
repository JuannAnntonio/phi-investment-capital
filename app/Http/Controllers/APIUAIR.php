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

class APIUAIR extends Controller
{
    public function AsignacionLimites(){

    }

    public function VaRHistorico(Request $request){
        Log::info('[APIUAIR][VaRHistorico]');

        Log::info("[APIUAIR][VaRHistorico] Método Recibido: ". $request->getMethod());

        if($request->isMethod('GET')) {

            $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

            $this->validate($request, [
                'token' => 'required'
            ]);

            $token = $request->input('token');

            Log::info("[APIUAIR][VaRHistorico] Token: ". $token);

            try {

                // attempt to verify the credentials and create a token for the user
                $token = JWTAuth::getToken();
                $token_decrypt = JWTAuth::getPayload($token)->toArray();

                //print_r($token_decrypt["id"]);

                //print_r($token_decrypt);

                if(in_array(1, $token_decrypt["permisos"])){

                    Log::info("[APIUAIR][VaRHistorico] Permiso Existente");

                    return view('system.UAIR.varHistorico',["title" => "VaR histórico",
                            "lang" => "es",
                            "user" => $token_decrypt,
                            "color" => 10
                        ]
                    );

                }

                return redirect('/');


            } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                //token_expired

                Log::info('[APIUAIR][VaRHistorico] Token error: token_expired');

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

                //token_invalid

                Log::info('[APIUAIR][VaRHistorico] Token error: token_invalid');

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

                //token_absent

                Log::info('[APIUAIR][VaRHistorico] Token error: token_absent');

                return redirect('/');

            } catch(Exception $e) {

                //Errores

                Log::info('[APIUAIR][VaRHistorico] ' . $e);

                return redirect('/');

            }



        } else {
            abort(404);
        }
    }





    public function Limites(Request $request){
      
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

                //print_r($token_decrypt["id"]);

                //print_r($token_decrypt);

                if(in_array(1, $token_decrypt["permisos"])){
                    return view('system.UAIR.limites',["title" => "Limites y lineas",
                            "lang" => "es",
                            "user" => $token_decrypt,
                            "color" => 10
                        ]
                    );
                }

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                //token_expired

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

                //token_invalid


                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

                //token_absent

                return redirect('/');

            } catch(Exception $e) {

                //Errores

                return redirect('/');

            }



        } else {
            abort(404);
        }
    }

    public function Semaforos(Request $request){

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

                //print_r($token_decrypt["id"]);

                //print_r($token_decrypt);

                if(in_array(1, $token_decrypt["permisos"])){
                    return view('system.UAIR.semaforos',["title" => "Semaforos y Alertas",
                            "lang" => "es",
                            "user" => $token_decrypt,
                            "color" => 10
                        ]
                    );
                }

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                //token_expired

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

                //token_invalid


                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

                //token_absent

                return redirect('/');

            } catch(Exception $e) {

                //Errores

                return redirect('/');

            }



        } else {
            abort(404);
        }
    }



 

    public function Logaritmo(Request $request){

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

                //print_r($token_decrypt["id"]);

                //print_r($token_decrypt);

                if(in_array(1, $token_decrypt["permisos"])){
                    return view('system.UAIR.logaritmo',["title" => "Logaritmo",
                            "lang" => "es",
                            "user" => $token_decrypt,
                            "color" => 10
                        ]
                    );
                }

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                //token_expired

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

                //token_invalid


                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

                //token_absent

                return redirect('/');

            } catch(Exception $e) {

                //Errores

                return redirect('/');

            }



        } else {
            abort(404);
        }
    }




    public function CSV(Request $request){

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

                //print_r($token_decrypt["id"]);

                //print_r($token_decrypt);

                if(in_array(1, $token_decrypt["permisos"])){
                    return view('system.UAIR.csvfile',["title" => "CSV",
                            "lang" => "es",
                            "user" => $token_decrypt,
                            "color" => 10
                        ]
                    );
                }

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                //token_expired

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

                //token_invalid


                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

                //token_absent

                return redirect('/');

            } catch(Exception $e) {

                //Errores

                return redirect('/');

            }



        } else {
            abort(404);
        }
    }

        public function Generarvar(Request $request){

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

                //print_r($token_decrypt["id"]);

                //print_r($token_decrypt);

                if(in_array(1, $token_decrypt["permisos"])){
                    return view('system.UAIR.generarvar',["title" => "Generar Var",
                            "lang" => "es",
                            "user" => $token_decrypt,
                            "color" => 10
                        ]
                    );
                }

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                //token_expired

                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

                //token_invalid


                return redirect('/');

            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

                //token_absent

                return redirect('/');

            } catch(Exception $e) {

                //Errores

                return redirect('/');

            }



        } else {
            abort(404);
        }
    }

}
