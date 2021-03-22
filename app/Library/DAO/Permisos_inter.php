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

class Permisos_inter extends Model
{
    public $table = 'permisos_inter';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;
    //public $attributes;

    public function scopeDelByIdAdministrador($query, $id_administradores, $permiso){

        Log::info("[Permisos_inter][scopeDelByIdAdministrador]");

        //activar log query
        DB::connection()->enableQueryLog();
  
        $sql =  $query->where([
            ['id_administradores', '=', $id_administradores],
            ['id_permisos', '=', $permiso],
          ])->delete(); //return true in the other one return 1

          //log query
          $queries = DB::getQueryLog();
          $last_query = end($queries);
          Log::info($last_query);

        return $sql;

    }
    public function scopeAddNewTrabajador($query, $idTrabajador)
    {

        Log::info("[Permisos_inter][scopeAddNewTrabajador] idEmpresa: ". $idTrabajador);
            
        //activar log query
        DB::connection()->enableQueryLog();

        $permisos_inter = new Permisos_inter;
        $permisos_inter->id_trabajadores = $idTrabajador;
        $permisos_inter->id_permisos = 3;

        $obj = array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $permisos_inter->save(); //return true in the other one return 1
        $obj[0]->id = $permisos_inter->id;

        //log query
        $queries = DB::getQueryLog();
        $last_query = end($queries);
        Log::info($last_query);

        return $obj;

    }

    public function scopeLookForByIdUsuarios($query, $id_usuarios)
    {

        Log::info("[Permisos_inter][scopeLookForByIdUsuarios] id_usuarios: ". $id_usuarios);
            
        //activar log query
        DB::connection()->enableQueryLog();

        $sql =  $query->select('id_permisos')->where([
          ['id_usuarios', '=', $id_usuarios],
        ])->get();

        //log query
        $queries = DB::getQueryLog();
        $last_query = end($queries);
        Log::info($last_query);
        
        return $sql;

    }
}
?>
