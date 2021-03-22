<?php

namespace App\Library\DAO;
use Config;
use App;
use Log;
use DB;
use Illuminate\Database\Eloquent\Model;

/*

update and insert doesnt need get->()


*/

class Usuarios extends Model
{
    public $table = 'usuarios';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    //public $attributes;

    //cambio contraseña
    public function scopeCambioContrasena($query, $correo, $pass){

      Log::info("[Usuarios][scopeCambioContrasena]");
      
      //activar log query
      DB::connection()->enableQueryLog();

      $pass = hash("sha256", $pass);

      $sql =  $query->where([['correo', '=', $correo],
                           ])->update(['pass' => $pass]); //return true in the other one return 1

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;

    }

    //Modificar perfiles 
    public function scopeUpdateProfile($query, $id_Usuarios, $correo, $telefono_fijo, $celular){

      Log::info("[Usuarios][scopeUpdateProfile]");
      
      //activar log query
      DB::connection()->enableQueryLog();

      $sql =  $query->where([['id_Usuarios', '=', $id_Usuarios],
                           ])->update(['correo' => $correo,
                                       'telefono_fijo' => $telefono_fijo,
                                       'celular' => $celular]); //return true in the other one return 1

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;

    }

    //modificar contraseña en el perfil de los Usuarios
    public function scopeModPass($query, $id_Usuarios, $pass){

      Log::info("[Usuarios][scopeModPass]");
      
      //activar log query
      DB::connection()->enableQueryLog();

      $pass = hash("sha256", $pass);

      $sql =  $query->where([['id_Usuarios', '=', $id_Usuarios],
                           ])->update(['pass' => $pass]); //return true in the other one return 1

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;

    }

    //get timezone
    public function scopeGetTimeZone($query, $id_usuarios){

      Log::info("[Usuarios][scopeGetTimeZone] id_usuarios: ". $id_usuarios);
          
      //activar log query
      DB::connection()->enableQueryLog();

      $sql =  $query->join('zonas_horarias', 'usuarios.id_zonas_horarias', '=', 'zonas_horarias.id_zonas_horarias')
                    ->select('zonas_horarias.utc','zonas_horarias.id_zonas_horarias','zonas_horarias.nombre')
                    ->where('usuarios.id_usuarios', '=' , $id_usuarios)->get();

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;


    }

    //buscar Usuarios por id_usuarios
    public function scopeLookByIdUsuarios($query, $id_Usuarios)
    {   
        Log::info("[Usuarios][scopeLookByIdUsuarios]");

        Log::info("[Usuarios][scopeLookByIdUsuarios] id_Usuarios: ". $id_Usuarios);
          
        //activar log query
        DB::connection()->enableQueryLog();

        $sql =  $query->where([
          ['id_Usuarios', '=', $id_Usuarios],
        ])->get();

        //log query
        $queries = DB::getQueryLog();
        $last_query = end($queries);
        Log::info($last_query);

        return $sql;
    }

    //modificar plantilla
    public function scopeModTrabajador($query, $id_Usuarios, $id_empresas, $nombre, $apellido, $correo, $tel, $cel, $cargo, $numDNI, $numSS,
    $plantilla, $geoActivated, $latitud, $longitud, $address, $metros, $registroApp, $ipActivated, $ipAddress, $pcActivated, 
    $tabletasActivated, $movilesActivated/*, $pass*/)
    {
        

        Log::info("[Usuarios][scopeModTrabajador]");
          
        //activar log query
        DB::connection()->enableQueryLog();

        $obj = array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $query->where([['id_Usuarios', $id_Usuarios],
                                       ['id_empresas', $id_empresas]
                                      ])->update(['nombre' => $nombre,
                                                  'apellido' => $apellido,
                                                  'correo' => $correo,
                                                  'telefono_fijo' => $tel,
                                                  'celular' => $cel,
                                                  'cargo' => $cargo,
                                                  'dni_num' => $numDNI,
                                                  'seguro_social' => $numSS,
                                                  'id_plantillas' => $plantilla,
                                                  'geo_activated' => $geoActivated,
                                                  'latitud' => $latitud,
                                                  'longitud' => $longitud,
                                                  'direccion' => $address,
                                                  'metros' => $metros,
                                                  'app_geo_activated' => $registroApp,
                                                  'ip_activated' => $ipActivated,
                                                  'ip' => $ipAddress,
                                                  'pc_activated' => $pcActivated,
                                                  'tablet_activated' => $tabletasActivated,
                                                  'mobile_activated' => $movilesActivated
                                                 ]); //return true in the other one return 1
        $obj[0]->id = $id_empresas;


        //log query
        $queries = DB::getQueryLog();
        $last_query = end($queries);
        Log::info($last_query);

        return $obj;

    }

    //agrega plantilla
    public function scopeAddTrabajador($query, $id_empresas, $nombre, $apellido, $correo, $tel, $cel, $cargo, $numDNI, $numSS,
    $plantilla, $geoActivated, $latitud, $longitud, $address, $metros, $registroApp, $ipActivated, $ipAddress, $pcActivated, 
    $tabletasActivated, $movilesActivated, $pass)
    {
        

        Log::info("[Usuarios][scopeAddTrabajador]");
          
        //activar log query
        DB::connection()->enableQueryLog();


        $trabajador = new Usuarios;

        $trabajador->id_empresas = $id_empresas;
        $trabajador->nombre = $nombre;
        $trabajador->apellido = $apellido;
        $trabajador->correo = $correo;
        $trabajador->telefono_fijo = $tel;
        $trabajador->celular = $cel;
        $trabajador->cargo = $cargo;
        $trabajador->dni_num = $numDNI;
        $trabajador->seguro_social = $numSS;
        $trabajador->id_plantillas = $plantilla;
        $trabajador->geo_activated = $geoActivated;
        $trabajador->latitud = $latitud;
        $trabajador->longitud = $longitud;
        $trabajador->direccion = $address;
        $trabajador->metros = $metros;
        $trabajador->app_geo_activated = $registroApp;
        $trabajador->ip_activated = $ipActivated;
        $trabajador->ip = $ipAddress;
        $trabajador->pc_activated = $pcActivated;
        $trabajador->tablet_activated = $tabletasActivated;
        $trabajador->mobile_activated = $movilesActivated;

        $pass = hash("sha256", $pass);
        $trabajador->pass = $pass;

        $obj = Array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $trabajador->save(); //return true in the other one return 1
        $obj[0]->id = $trabajador->id;

        //log query
        $queries = DB::getQueryLog();
        $last_query = end($queries);
        Log::info($last_query);

        return $obj;

    }

    public function scopeLookForByEmailAndPass($query, $email, $pass)
    {

        Log::info("[Usuarios][scopeLookForByEmailAndPass]");
          
        //activar log query
        DB::connection()->enableQueryLog();

        $pass = hash("sha256", $pass);

        Log::info("[Usuarios][scopeLookForByEmailAndPass] pass: ". $pass);

        $sql =  $query->where([
          ['correo', '=', $email],
          ['pass', '=', $pass],
        ])->get();

        //log query
        $queries = DB::getQueryLog();
        $last_query = end($queries);
        Log::info($last_query);

        return $sql;

    }
}
?>
