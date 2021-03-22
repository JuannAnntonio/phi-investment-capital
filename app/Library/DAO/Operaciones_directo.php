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

class Operaciones_directo extends Model
{
    public $table = 'operaciones_md';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;
    //public $attributes;

    public function scopeAddNewOperacionDirecto($query, $fecha_de_operacion, $operacion, $instrumento, $montoNominal, $precio, 
                                                $tasaSobreTasa, $numeroDeTitulos, $montoLiquidacion, $fechaLiquidacion,
                                                $contraparte)
    {

        Log::info("[Permisos_inter][scopeAddNewOperacionDirecto]");
            
        //activar log query
        DB::connection()->enableQueryLog();

        $operaciones_directo = new Operaciones_directo;
        $operaciones_directo->fecha_de_operacion = $fecha_de_operacion;
        $operaciones_directo->tipo_de_operacion = $operacion;
        $operaciones_directo->instrumento = $instrumento;
        $operaciones_directo->monto_nominal = $montoNominal;
        $operaciones_directo->tasa_sobreTasa = $tasaSobreTasa;
        $operaciones_directo->precio = $precio;
        $operaciones_directo->numero_de_titulos = $numeroDeTitulos;
        $operaciones_directo->monto_liquidacion = $montoLiquidacion;
        $operaciones_directo->fecha_liquidacion = $fechaLiquidacion;
        $operaciones_directo->contraparte = $contraparte;

        $obj = array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $operaciones_directo->save(); //return true in the other one return 1
        $obj[0]->id = $operaciones_directo->id;

        //log query
        $queries = DB::getQueryLog();
        $last_query = end($queries);
        Log::info($last_query);

        return $obj;

    }

}
?>
