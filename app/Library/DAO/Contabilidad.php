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

class Contabilidad extends Model
{
    public $table = 'valuacion_md';
    public $timestamps = false;
    //protected $dateFormat = 'U';
    //const CREATED_AT = 'created_at';
    //const UPDATED_AT = 'updated_at';
    //public $attributes;

    /* get reporte global by date max */
    public static function scopeGetReportGlobalByMaxDate($query){

      Log::info("[Contabilidad][scopeGetReportGlobalByMaxDate]");
      
      //activar log query
      DB::connection()->enableQueryLog();

      $sql =  $query->where('fecha_valuacion', '=', Contabilidad::max('fecha_valuacion'))->get();
        
      //return true in the other one return 1

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;

    }
    

    /* get all contaduria*/
    public static function scopeGetAllContaduria($query){

      Log::info("[Contabilidad][scopeGetFilter]");
      
      //activar log query
      DB::connection()->enableQueryLog();

      $sql =  $query->get();
        
      //return true in the other one return 1

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;

    }

    /* Get contabilidad table Filter Display Content table by date start and end and instrumento*/
    public static function scopeGetFilter($query, $start, $end, $instrumento){

      Log::info("[Contabilidad][scopeGetFilter]");
      
      //activar log query
      DB::connection()->enableQueryLog();

      $sql =  $query->where([['fecha_valuacion', '>=', $start],
                             ['fecha_valuacion', '<=', $end],
                             ['instrumento', '<=', $instrumento]
                            ]
                           )->get();
        
      //return true in the other one return 1

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;

    }

    /* Get Instrumento by fecha start and end */
    public static function scopeGetInstrumentoWithFilters($query, $start, $end){

      Log::info("[Contabilidad][scopeGetValmerWithFilters]");

      //activar log query
      DB::connection()->enableQueryLog();

      $sql = $query->select('instrumento')
                   ->where([['fecha_valuacion', '>=', $start],
                            ['fecha_valuacion', '<=', $end]
                           ]
                   )->groupBy('instrumento')->get();

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;
        

    }
    
}

?>