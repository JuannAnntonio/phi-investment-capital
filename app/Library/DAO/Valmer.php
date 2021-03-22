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

class Valmer extends Model
{
    public $table = 'vector_de_precios_historico';
    public $timestamps = false;
    //protected $dateFormat = 'U';
    //const CREATED_AT = 'created_at';
    //const UPDATED_AT = 'updated_at';
    //public $attributes;

    /* Get Instrumento */
    public static function scopeGetInstrumentoWithFilters($query){

      Log::info("[Valmer][scopeGetValmerWithFilters]");

      //activar log query
      DB::connection()->enableQueryLog();

      $sql = $query->select('issue')
                   ->where([['issue', '!=', ''],
                           ['issue', '!=', null],
                           ['date', '=', Valmer::max('date')]
                           ]
                   )
                   ->where(function($query) {
                     
                      return $query->where('tv', '=', 'LD')
                                   ->orWhere('tv', '=', 'M'); 
                    })
                   ->groupBy('issue')->get();

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;
        

    }
    
}

?>