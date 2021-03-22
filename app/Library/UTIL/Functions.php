<?PHP
namespace App\Library\UTIL;
use Illuminate\Support\Facades\Log;
use Config;
use App;
use carbon\Carbon;

class Functions
{
    public function __construct(){
        Log::info("[functions][constructor]");
    }

    public static function cPanelAddSubdomain($cpanelsername, $cpanelpassword, $subdominio, $domain){

        /*
        Al crear el subdominio este puede tardar un poco, debido, a la propagación de DNS.
        
        To delete the subdomain, run this query through the above script:

        $deletesub =  "https://$domain:2083/json-api/cpanel?cpanel_jsonapi_func=delsubdomain&cpanel_jsonapi_module=SubDomain&cpanel_jsonapi_version=2&domain=".$subdomain.'.'.$domain."&dir=$directory";  //Note: To delete the subdomain of an addon domain, separate the subdomain with an underscore (_) instead of a dot (.). For example, use the following format: subdomain_addondomain.tld
        
        And to delete the directory, run this:

        $deletedir =  "https://$domain:2083/json-api/cpanel?cpanel_jsonapi_module=Fileman&cpanel_jsonapi_func=fileop&op=unlink&sourcefiles=$directory";

        resultado positivo a la hora de generar un subdominio:

        {"cpanelresult":{"postevent":{"result":1},"apiversion":2,"func":"addsubdomain","data":[{"result":1,"reason":"The subdomain “vash.boogapp.info” has been added."}],"event":{"result":1},"module":"SubDomain","preevent":{"result":1}}}
  
        Acceso denegado:

        {"cpanelresult":{"apiversion":"2","error":"Access denied","data":{"reason":"Access denied","result":"0"},"type":"text"}}
  
        Cuando no encuentra el dominio devuelven vacíos [] y un error en artisan:

        "Could not resolve host: boogapp.info5" for https://boogapp.info5:2083/json-api/cpanel?cpanel_jsonapi_func=addsubdomain&cpanel_jsonapi_module=SubDomain&cpanel_jsonapi_version=2&domain=wqwwq&rootdomain=boogapp.info5&dir=/public_html/wqwwq

        */

        $subdomain = $subdominio;
        $directory = "/public_html/$subdomain";  // A valid directory path, relative to the user's home directory. Or you can use "/$subdomain" depending on how you want to structure your directory tree for all the subdomains.

        $query = "https://$domain:2083/json-api/cpanel?cpanel_jsonapi_func=addsubdomain&cpanel_jsonapi_module=SubDomain&cpanel_jsonapi_version=2&domain=$subdomain&rootdomain=$domain&dir=$directory";   

        $curl = curl_init();                                // Create Curl Object
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER,0);       // Allow self-signed certs
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST,0);       // Allow certs that do not match the hostname
        curl_setopt($curl, CURLOPT_HEADER,0);               // Do not include header in output
        curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);       // Return contents of transfer on curl_exec
        $header[0] = "Authorization: Basic " . base64_encode($cpanelsername .":".$cpanelpassword) . "\n\r";
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);    // set the username and password
        curl_setopt($curl, CURLOPT_URL, $query);            // execute the query
        $result = curl_exec($curl);
        if ($result == false) {
            error_log("curl_exec threw error \"" . curl_error($curl) . "\" for $query");   
                                                            // log error if curl exec fails
        }
        curl_close($curl);

        return $result;
    }

    public static function createArchive($nombre_archivo, $body)
    {
        /*
        crea un archvo

        parametro 1: ruta y nombre del archivo
        parametro 2: body of the document
        */

        $return = -1;
    
        if(file_exists($nombre_archivo))
        {
            $body = $body;
        }
    
        else
        {
            $body = $body;
        }
    
        if($archivo = fopen($nombre_archivo, "a"))
        {
            if(fwrite($archivo, $body))
            {
                $return = 1;
            }
            else
            {   $return = -1;
            }
    
            fclose($archivo);
        }

        return $return;
    }

    /*Creamos una función que detecte el idioma del navegador del cliente.*/
    public function getUserLanguage() {
        $idioma = "es";
        try {
          $browser_lang = !empty($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? strtok(strip_tags($_SERVER['HTTP_ACCEPT_LANGUAGE']), ',') : '';
          $idioma=substr($browser_lang,0,2);
          Log::info("[functions][getUserLanguage] Idioma: ".$idioma);
          if($idioma=='es'){
              $idioma = 'es';
              App::setLocale("es");
          } else {
              $idioma = Config::get('app.locale');
              App::setLocale($idioma);
          }
        } catch(Exception $e){
        }
        return $idioma;
        //return "es";
    }
    //WARNING: checa bien que no se repitan funciones declaradas
    public function getDirUrl($option){
        //include ''.dirname(__FILE__).'/../config.php';
        if($option==1){
            return $direccion_principal_config;
        } else {
            return "".$_SERVER['HTTP_HOST']."".dirname($_SERVER['PHP_SELF'])."";
        }
    }
    public function validar_propiedad($obj, $propiedad){
        /*dentro de una objeto validar una propiedad existente*/
        return property_exists($obj, $propiedad);
    }
    public function quitar_acentos($cadena){
        $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞ
    ßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ';
        $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuy
    bsaaaaaaaceeeeiiiidnoooooouuuyybyRr';
        $cadena = utf8_decode($cadena);
        $cadena = strtr($cadena, utf8_decode($originales), $modificadas);
        $cadena = strtolower($cadena);
        return utf8_encode($cadena);
    }
    public static function cleanDropdownA($string){
      if(stripos($string," a ")!==false){
        $string = explode(" a ", $string);
        return $string[0];
      }
      return $string;
    }
    public function cadenaAleatoria(){
      return md5(microtime(true));
    }
    public function base_de_datos_scape($conexionBD245,$string){
        /*utilizar fuera del sql principal*/
        return mysqli_real_escape_string($conexionBD245,$string);
    }
    public function base_de_datos_utf_8(){
        // Change character set to utf8
        mysqli_set_charset($conn,"utf8");
    }
    public function encriptar($string, $var = "sha256"){
        return hash($var,$string);
    }
    public function encriptarHtml($txt){
      $partes = str_split(trim($txt));
    	$nuevo = '';
    	foreach ($partes as $valor) {
    		$nuevo .= '&#'.ord($valor).';';
    	}
    	return $nuevo;
    }
    public function extraer_dominio($url){
        $protocolos = array('http://', 'https://', 'ftp://', 'www.');
        $url = explode('/', str_replace($protocolos, '', $url));
        return $url[0];
    }
    public function extraer_imagen($texto){
        preg_match_all('/< *img[^>]*src *= *["\']?([^"\']*).(jpg|png|gif)/i', $texto, $matches);
        $imagen = $matches[1][0].'.'.$matches[2][0];
        return $imagen;
    }
    public function arregloSeparador($array,$separador){
        return implode($array,$separador);
    }
    public function quitarHtml($string){
        return strip_tags($string);
    }
    public static function dateNowCarbonTimezone($usoHorario){
     
     //return now in timezone, seems like seasons are supported.

     return Carbon::createFromFormat('Y-m-d H:i:s', Carbon::now())->timezone($usoHorario);
     
   }
   public function distanceCalculation($point1_lat, $point1_long, $point2_lat, $point2_long, $unit = 'km', $decimals = 2) {
    
    //es más exacto    
    // Cálculo de la distancia en grados
        $degrees = rad2deg(acos((sin(deg2rad($point1_lat))*sin(deg2rad($point2_lat))) + (cos(deg2rad($point1_lat))*cos(deg2rad($point2_lat))*cos(deg2rad($point1_long-$point2_long)))));
    
        // Conversión de la distancia en grados a la unidad escogida (kilómetros, millas o millas naúticas)
        switch($unit) {
            case 'km':
                $distance = $degrees * 111.13384; // 1 grado = 111.13384 km, basándose en el diametro promedio de la Tierra (12.735 km)
                break;
            case 'mi':
                $distance = $degrees * 69.05482; // 1 grado = 69.05482 millas, basándose en el diametro promedio de la Tierra (7.913,1 millas)
                break;
            case 'nmi':
                $distance =  $degrees * 59.97662; // 1 grado = 59.97662 millas naúticas, basándose en el diametro promedio de la Tierra (6,876.3 millas naúticas)
        }
        return round($distance, $decimals);
    }
    public function calculaDistancia($longitud1, $latitud1, $longitud2, $latitud2){
        //podría no ser muy funcional y exacto
        //calculamos la diferencia de entre la longitud de los dos puntos
        $diferenciaX = $longitud1 - $longitud2;
 
        //ahora calculamos la diferencia entre la latitud de los dos puntos
        $diferenciaY = $latitud1 -$latitud2;
 
        // ahora ponemos en practica el teorema de pitagora para calcular la distancia
        $distancia = sqrt(pow($diferenciaX,2) + pow($diferenciaY,2));
        return $distancia;
     }
    public function mifechagmt($fecha_timestamp,$gmt=0){
        /*
        USO:
            $horarioP = substr($row["horario"],3,strlen($row["horario"])-5);
        strtotime(mifechagmt(time(),$horarioP))>=strtotime($row["fecha"])
        $usohorario: GMT (-0600)
        $row["fecha"]: strtotime('2013-01-19 01:23:42') ('Y-m-d H:i:s')
            date('d-m-Y', strtotime('27-05-2015 +30 Days'))
        NOTA: time() Return the current time as a Unix timestamp
        */
            //puedes poner aqui la hora en formato "Unix timestamp" obtenida de una tabla
        $timestamp=$fecha_timestamp;
            //La diferencia de horas entre el GMT del servidor y el GMT que queremos, en mi caso mi servidor es GTM-4, y si quiero un GTM -5 la diferencia será de -1 hora
            $diferenciahorasgmt = (date('Z', time()) / 3600 - $gmt) * 3600;
            //restamos a la hora actual la diferencia horaria en mi caso será -1 hora
        $timestamp_ajuste = $timestamp - $diferenciahorasgmt;
            //mostramos la fecha/hora
        $fecha = date("d-m-Y H:i", $timestamp_ajuste);
        return $fecha;
    }
    public function quitar_espacios_extras($cadena){
        return preg_replace('/\s+/',' ',$cadena);
    }
    public function cadena_a_getUrlCadena($cadena){
        /* Codificar estilo URL de acuerdo al RFC 3986
        Devuelve una cadena en donde todos los caracteres no-alfanuméricos, excepto -_.~,
        son reemplazados con un signo de porcentaje (%) seguido de dos dígitos hexadecimales
        */
        return rawurlencode($cadena);
    }
    public function getAjaxPhp($url){
        $fo= fopen($url,"r") or die ("false");
        while (!feof($fo)) {
            $cadena .= fgets($fo);
            $cadena = preg_replace('/\s+/',' ',$cadena);
        }
        fclose ($fo);
        return $cadena;
    }
    public function reemplazar_en_cadena($caracter,$cadena){
        return str_replace($caracter,'',$cadena);
    }
    public function scriptConMasTiempo($time=900000){
        /*recomendado 9000*/
        ini_set('max_execution_time', $time);
    }
    public function url_to_phpFiles($key, $url)
    {  /*convierte una url de imagen en $_FILES[][]*/
        $tempName = tempnam('/tmp', 'php');
        $originalName = basename(parse_url($url, PHP_URL_PATH));
        $imgRawData = file_get_contents($url);
        if(file_put_contents($tempName, $imgRawData)===false){
        echo "ERROR archivo no escrito";
        }
        $_FILES[$key] = array(
            'name' => $originalName,
            'type' => mime_content_type($tempName),
            'tmp_name' => $tempName,
            'error' => 0,
            'size' => strlen($imgRawData),
        );
    }
    public function base64_to_jpeg($base64_string, $output_file) {
        $ifp = fopen("bibliotecaImages/".$output_file."", "wb");
        $data = explode(',', $base64_string);
        fwrite($ifp, base64_decode($data[1]));
        fclose($ifp);
        return $output_file;
    }
    public function text_only($text){
      //permite solo a-z0-9 y espacios
      $text = str_replace(
          array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
          array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
          $text
      );
      $text = str_replace(
          array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
          array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
          $text
      );
      $text = str_replace(
          array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
          array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
          $text
      );
      $text = str_replace(
          array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
          array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
          $text
      );
      $text = str_replace(
          array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
          array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
          $text
      );
      $text = preg_replace("/[^a-zA-Z0-9 ]+/", "", $text);
      return $text;
    }
    public static function generacion_contrasenas_aleatorias($longitud){

        /*
        longitud de la pass: ej: 8
        */

        //Carácteres para la contraseña
        $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        $password = "";
        //Reconstruimos la contraseña segun la longitud que se quiera
        for($i=0;$i<$longitud;$i++) {
            //obtenemos un caracter aleatorio escogido de la cadena de caracteres
            $password .= substr($str,rand(0,62),1);
        }
        
        Log::info("[functions][generacion_contrasenas_aleatorias] Password generado: ". $password);

        return $password;
    }
    public function mail_only($text){
      //permite solo a-z0-9 y espacios
      $text = preg_replace("/[^a-zA-Z0-9@.]+/", "", $text);
      return $text;
    }
    public function sanear_string($string)
    {   $string = trim($string);
        $string = str_replace(
            array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
            array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
            $string
        );
        $string = str_replace(
            array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
            array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
            $string
        );
        $string = str_replace(
            array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
            array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
            $string
        );
        $string = str_replace(
            array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
            array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
            $string
        );
        $string = str_replace(
            array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
            array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
            $string
        );
        $string = str_replace(
            array('ñ', 'Ñ', 'ç', 'Ç'),
            array('n', 'N', 'c', 'C',),
            $string
        );
        //Esta parte se encarga de eliminar cualquier caracter extraño
        $string = str_replace(
            array("\\", "¨", "º", "-", "~",
                "#", "@", "|", "!", "\"",
                "·", "$", "%", "&", "/",
                "(", ")", "?", "'", "¡",
                "¿", "[", "^", "`", "]",
                "+", "}", "{", "¨", "´",
                ">", "< ", ";", ",", ":",
                ".", " "),
            '',
            $string
        );
        return $string;
    }
    public function msword_conversion($str)
    {   //arregla caracteres extraños de ASQUII, ISO, -> a UTF-8 que un decode no arregla muchas veces lo uso mucho para lectores XML
        $str = str_replace(chr(130), ',', $str);    // baseline single quote
        $str = str_replace(chr(131), 'NLG', $str);  // florin
        $str = str_replace(chr(132), '"', $str);    // baseline double quote
        $str = str_replace(chr(133), '...', $str);  // ellipsis
        $str = str_replace(chr(134), '**', $str);   // dagger (a second footnote)
        $str = str_replace(chr(135), '***', $str);  // double dagger (a third footnote)
        $str = str_replace(chr(136), '^', $str);    // circumflex accent
        $str = str_replace(chr(137), 'o/oo', $str); // permile
        $str = str_replace(chr(138), 'Sh', $str);   // S Hacek
        $str = str_replace(chr(139), '<', $str);    // left single guillemet
        $str = str_replace(chr(140), 'OE', $str);   // OE ligature
        $str = str_replace(chr(145), "'", $str);    // left single quote
        $str = str_replace(chr(146), "'", $str);    // right single quote
        $str = str_replace(chr(147), '"', $str);    // left double quote
        $str = str_replace(chr(148), '"', $str);    // right double quote
        $str = str_replace(chr(149), '-', $str);    // bullet
        $str = str_replace(chr(150), '-–', $str);    // endash
        $str = str_replace(chr(151), '--', $str);   // emdash
        $str = str_replace(chr(152), '~', $str);    // tilde accent
        $str = str_replace(chr(153), '(TM)', $str); // trademark ligature
        $str = str_replace(chr(154), 'sh', $str);   // s Hacek
        $str = str_replace(chr(155), '>', $str);    // right single guillemet
        $str = str_replace(chr(156), 'oe', $str);   // oe ligature
        $str = str_replace(chr(159), 'Y', $str);    // Y Dieresis
        $str = str_replace('°C', '&deg;C', $str);    // Celcius is used quite a lot so it makes sense to add this in
        $str = str_replace('£', '&pound;', $str);
        $str = str_replace("'", "'", $str);
        $str = str_replace('"', '"', $str);
        $str = str_replace('–', '&ndash;', $str);
        $str = preg_replace("/\s|&nbsp;/",' ',$str);
        $str = str_replace('[&#8230;]', '', $str);
        $str = str_replace('&iacute;', 'í', $str);
        $str = str_replace('&eacute;', 'é', $str);
        $str = str_replace('&aacute;', 'á', $str);
        $str = str_replace('&oacute;', 'ó', $str);
        $str = str_replace('&uacute;', 'ú', $str);
        $str = str_replace('&#233;', 'é', $str);
        $str = str_replace('&#250;', 'ú', $str);
        $str = str_replace('&#241;', 'ñ', $str);
        $str = str_replace('&#243;', 'ó', $str);
        $str = str_replace('&#225;', 'á', $str);
        $str = str_replace('&#039;', "'", $str);
        $str = str_replace('Ã±', 'ñ', $str);
        $str = str_replace('[&#038;hellip', '.', $str);
        $str = str_replace('&quot;', '"', $str);
        $str = html_entity_decode($str);
        return $str;
    }
}
?>