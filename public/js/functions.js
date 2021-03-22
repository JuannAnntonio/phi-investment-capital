var colorHover = "#394665";
var comilla = "'";
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthNames2 = [];
monthNames2["Jan"] = "01";
monthNames2["Feb"] = "02";
monthNames2["Mar"] = "03";
monthNames2["Apr"] = "04";
monthNames2["May"] = "05";
monthNames2["Jun"] = "06";
monthNames2["Jul"] = "07";
monthNames2["Aug"] = "08";
monthNames2["Sep"] = "09";
monthNames2["Oct"] = "10";
monthNames2["Nov"] = "11";
monthNames2["Dec"] = "12";
$.ajaxSetup({ cache: false });
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": 300,
    "hideDuration": 100,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function concatArray(array1, array2) {

    /*
    concatena un array con otro array
    */

    return array1.concat(array2);

}

function removeKeyFromArray(json, choice) {
    /*
      Remueve una llave de un array por completo
    */

    console.log("[functions][removeKeyFromArray]");
    console.log("[functions][removeKeyFromArray] size: " + json.length);

    for (var i = 0; i < json.length; i++) {
        delete json[i][choice];
    }

}

function addKeyToArray(data, array, choice, options) {
    /*
      agrega un array de llaves seleccionados de un array a otro array de la misma especie, es un especie de filtro o pipe.
      para datatables
    */

    console.log("[functions][addKeyToArray]");

    for (var x = 0; x < array.length; x++) {

        var obj = Array();

        for (var y = 0; y < choice.length; y++) {

            if (options[y] == ",") {

                obj[y] = numberWithCommas(array[x][choice[y]]);

            } else {

                obj[y] = array[x][choice[y]];

            }

        }

        data.push(obj);

    }
    return data;
}

function startLoading() {
    //loading screen
    console.log("[functions][Loading]");

    $('#loader-wrapper').css('display', '');
}

function googleAna(button) {
    console.log("[functions.js][googleAna] " + button);
    //alert(button);

    gtag('event', 'click', {
        'event_category': button,
        'event_label': button
    });
}

function bloquearTecla(event) {
    /* Bloquear ctr+u codigo fuente e inspector de elementos ctr+shift+i */
    /* return en la llama de la funcion para q devuelva el false ej "return bloquearTecla(event)" */
    /* no colocar alert ej: "alert("Bloqueado por Seguridad");" ya que firefox se salta la seguridad */

    if ((event.ctrlKey == true && event.keyCode == 85) || (event.ctrlKey == true && event.shiftKey == true && event.keyCode == 73)) {
        //alert("Bloqueado por Seguridad");
        return false;
    }
    //console.log(event.ctrlKey.toString() + " " + event.keyCode.toString());
}

function normalize(str) {
    str = str.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
    return str.replace(/[^a-zA-Z 0-9.]+/g, ' ');
}

function calcTime3(timeZone) {
    /*
    funciona con horarios de verano e invierno (es bueno)
    es el moment timezone hay que buscarlo en internet, se usó el de moment-timezone-with-data-1970-2030.js

    var fecha = new Date( moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss'));

    return fecha
  
    */
}

function calcTime2() {
    /*
      se necesita de moment y lo mismo que calctime 1 no calcula horario de verna ni de invierno (obsoleto) (seasons)
      sabiendo el utc por ejemeplo: UTC-6

      var utc = response.data.data[0].utc.split("UTC");

      utc = utc[1]*60; //para transformarlo en el utcOffset del tipo (60,360,etc)
      
      console.log(utc);

      var fecha = new Date(moment().utcOffset(utc).format('YYYY-MM-DD HH:mm:ss'));
    */
}

function replaceComasInNumbers(nombreInput) {
    var monto = $('#' + nombreInput).val().replace(/,/g, ''),
        montoAsNumber = +monto;

    return monto;
}

function numberWithCommas(x) {
    /**
     * Al parecer no acepta más de 2 decimales
     */
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberWithCommas(x) {
    /*
    Al parecer este método es mejor acepta más de 2 decimales
    */
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function quitarAcentos(str) {
    for (var i = 0; i < str.length; i++) {
        //Sustituye "Ã¡ Ã© Ã­ Ã³ Ãº"		  
        if (str.charAt(i) == "Ã¡") str = str.replace(/Ã¡/, "a");
        if (str.charAt(i) == "Ã©") str = str.replace(/Ã©/, "e");
        if (str.charAt(i) == "Ã­") str = str.replace(/Ã­/, "i");
        if (str.charAt(i) == "Ã³") str = str.replace(/Ã³/, "o");
        if (str.charAt(i) == "Ãº") str = str.replace(/Ãº/, "u");
        if (str.charAt(i) == "Ã") str = str.replace(/Ã/, "A");
        if (str.charAt(i) == "Ã‰") str = str.replace(/Ã‰/, "E");
        if (str.charAt(i) == "Ã") str = str.replace(/Ã/, "I");
        if (str.charAt(i) == "Ã“") str = str.replace(/Ã“/, "O");
        if (str.charAt(i) == "Ãš") str = str.replace(/Ãš/, "U");
    } //fin for		 
    return str;
}

function getLocation(options) {

    /*
      get location in coordinates

      getLocation()
          .then((position) => {
            console.log(position);
            geoLocation = position;
          })
          .catch((err) => {
            console.error(err.message);
          });
    */

    console.log("[functions][getLocation]");

    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });


}
// funcion para calcular la hora local en una ciudad dada la diferencia horaria.
function calcTime(city, offset) {
    //no calcula horario de verano ni de inverno (obsoleto) (seasons) es mejor usar la librería momenttimezone

    // creamos el objeto Date (la selecciona de la máquina cliente)
    // calcTime("mexico",-6)
    d = new Date();

    // lo convierte  a milisegundos
    // aÃ±ade la dirferencia horaria
    // recupera la hora en formato UTC
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // crea un nuevo objeto Date usando la diferencia dada.
    nd = new Date(utc + (3600000 * offset));

    // devuelve la hora como string.
    return nd;
}

function substractDaysDates(date) {
    //recibe parametro del tipo date()
    //sirve para restar días a la fecha
    var days = 1;

    date.setDate(date.getDate() - days);

    return date;
}

function tiempoRelativo(time_value) {
    /* Twitter Covertion Date */
    var values = time_value.split(" ");
    time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
    var parsed_date = Date.parse(time_value);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
    var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
    var shortdate = time_value.substr(4, 2) + " " + time_value.substr(0, 3);
    delta = delta + (relative_to.getTimezoneOffset() * 60);

    if (delta < 60) {
        return '1m';
    } else if (delta < 120) {
        return '1m';
    } else if (delta < (60 * 60)) {
        return (parseInt(delta / 60)).toString() + 'm';
    } else if (delta < (120 * 60)) {
        return '1h';
    } else if (delta < (24 * 60 * 60)) {
        return (parseInt(delta / 3600)).toString() + 'h';
    } else if (delta < (48 * 60 * 60)) {
        //return '1 day';
        return shortdate;
    } else {
        return shortdate;
    }
}

function diasEnUnMes(mes, año) {
    /** total de días que tiene un mes */
    return new Date(año, mes, 0).getDate();
}

function getSign(num) {
    /* obtener el signo de un número + o - */

    return num === 0 ? num : (num > 0 ? 1 : -1); // -1

}

function secondsToHHMMSS(hora, minutos, segundos) {

    /*
    the way to calculate the hour, minutes and seconds is converting everything to seconds and then sum all of them.

  */

    console.log("[functions][secondsToHHMMSS]");

    console.log("[functions][secondsToHHMMSS] Horas: " + hora + " Minutos: " + minutos + " Segundos: " + segundos);

    secHoras = hora * 3600;
    secMinutos = minutos * 60;
    secSegundos = segundos;

    seconds = secHoras + secMinutos + secSegundos;

    console.log(seconds);

    var horas_ = Array();
    horas_["horas"] = (seconds === 0 ? 1 : (seconds > 0 ? 1 : -1)) * (Math.floor(Math.abs(seconds) / 3600));
    horas_["minutos"] = (seconds === 0 ? 1 : (seconds > 0 ? 1 : -1)) * (("0" + Math.floor(Math.abs(seconds) / 60) % 60).slice(-2));
    horas_["segundos"] = (seconds === 0 ? 1 : (seconds > 0 ? 1 : -1)) * (("0" + Math.abs(seconds) % 60).slice(-2));

    console.log("[functions][secondsToHHMMSS] Horas: " + horas_["horas"] + " Minutos: " + horas_["minutos"] + " Segundos: " + horas_["segundos"]);


    return horas_;

}

function compararFechas24(horas1, horas2) {

    //recibe 6:20 PM
    //devuelve 18:20

    console.log("[functions][compararFechas24]");

    console.log("[functions][compararFechas24] hora: " + horas1);

    var formato12 = horas1.toString().split(" ");
    var horas12 = horas1.toString().split(":");

    if (formato12[1] == "PM" && horas12[0] < 12)
        horas12[0] = parseInt(horas12[0]) + 12;

    if (formato12[1] == "AM" && horas12[0] == 12)
        horas12[0] = parseInt(horas12[0]) - 12;

    formato12 = horas12[1].toString().split(" ");

    var horas1A = horas12[0] + ":" + formato12[0];

    console.log("[functions][compararFechas24] hora: " + horas2);

    var formato22 = horas2.toString().split(" ");
    var hora22 = horas2.toString().split(":");

    if (formato22[1] == "PM" && hora22[0] < 12)
        hora22[0] = parseInt(hora22[0]) + 12;

    if (formato22[1] == "AM" && hora22[0] == 12)
        hora22[0] = parseInt(hora22[0]) - 12;

    formato22 = hora22[1].toString().split(" ");

    var horas2A = hora22[0] + ":" + formato22[0];

    console.log(horas1A + " " + horas2A);

    var t1 = new Date(),
        t2 = new Date();

    t1.setHours(horas12[0], formato12[0], 0);
    t2.setHours(hora22[0], formato22[0], 0);

    //array["asistencias"][x].nombre = registros[key][i].nombre; 
    //array["asistencias"][x].apellido = registros[key][i].apellido; 
    //array["asistencias"][x].impuntualidad = 0; 

    if (t1 < t2) {

        console.log("-1");
        return -1;
    } else {
        console.log("1");
        return 1;
    }

}

function horasAMPMToSeconds(hora) {

    //recibe 10:00 AM
    //devuelve 3600 segundos

    console.log("[functions][horasAMPMTo24]");

    console.log("[functions][horasAMPMTo24] hora: " + hora);

    var formato = hora.toString().split(" ");
    var hora2 = hora.toString().split(":");

    if (formato[1] == "PM" && hora2[0] < 12)
        hora2[0] = parseInt(hora2[0]) + 12;

    if (formato[1] == "AM" && hora2[0] == 12)
        hora2[0] = parseInt(hora2[0]) - 12;

    formato = hora2[1].toString().split(" ");

    var hora = hora2[0];
    var minutos = formato[0];
    var segundos = 0;

    console.log("[functions][secondsToHHMMSS]");

    console.log("[functions][secondsToHHMMSS] Horas: " + hora + " Minutos: " + minutos + " Segundos: " + segundos);

    secHoras = hora * 3600;
    secMinutos = minutos * 60;
    secSegundos = segundos;

    seconds = secHoras + secMinutos + secSegundos;

    console.log(seconds);

    return seconds;

}

function horasAMPMTo24(hora) {

    //recibe 6:20 PM
    //devuelve 18:20

    console.log("[functions][horasAMPMTo24]");

    console.log("[functions][horasAMPMTo24] hora: " + hora);

    var formato = hora.toString().split(" ");
    var hora2 = hora.toString().split(":");

    if (formato[1] == "PM" && hora2[0] < 12)
        hora2[0] = parseInt(hora2[0]) + 12;

    if (formato[1] == "AM" && hora2[0] == 12)
        hora2[0] = parseInt(hora2[0]) - 12;

    formato = hora2[1].toString().split(" ");

    return hora2[0] + ":" + formato[0];
}

function ordenarPorNumeroDesc(array) {
    array.sort(function(a, b) {
        return (b - a);
    });
    return array;
}

function ordenarPorNumeroAsc(array) {
    array.sort(function(a, b) {
        return (a - b);
    });
    return array;
}

function orderFechaAsc(array) {
    array.sort(function(a, b) {
        return new Date(a.fecha) - new Date(b.fecha);
    });
    return array;
}

function orderFechaDesc(array) {
    array.sort(function(a, b) {
        return new Date(b.fecha) - new Date(a.fecha);
    });
    return array;
}

function restaFechas(f1, f2) {
    /* restaFechas("29-08-2019", "30-08-2019")
     */
    var aFecha1 = f1.split('-');
    var aFecha2 = f2.split('-');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}

function restaFechas2(f1, f2) {
    /* restaFechas("08-29-2019", "08-30-2019")
     */
    var aFecha1 = f1.split('-');
    var aFecha2 = f2.split('-');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[0], aFecha1[1] - 1);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[0], aFecha2[1] - 1);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}

function restaFechas3(f1, f2) {
    /* restaFechas("2019-08-29", "2019-08-28")
     */
    var aFecha1 = f1.split('-');
    var aFecha2 = f2.split('-');
    var fFecha1 = Date.UTC(aFecha1[0], aFecha1[1], aFecha1[2]);
    var fFecha2 = Date.UTC(aFecha2[0], aFecha2[1], aFecha2[2]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}

function restaFechas4(f1, f2) {
    /* restaFechas("2019/08/29", "2019/08/28")
     */
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[0], aFecha1[1] - 1, aFecha1[2]);
    var fFecha2 = Date.UTC(aFecha2[0], aFecha2[1] - 1, aFecha2[2]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}

function generarFechaHoy() {

    //genera la fecha hoy con formato mm/dd/YYYY

    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}

function generarFechaHoy2() {

    //genera la fecha hoy con formato dd/mm/YYYY

    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}

function generarFechaHoy3() {

    //genera la fecha hoy con formato YYYY/mm/dd

    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + '-' + dd;

    return today;
}

function agregarLinksEnCadena(data) {
    //Add link to all http:// links within tweets
    data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
        return '<a target="_blank" href="' + url + '" >' + url + '</a>';
    });

    //Add link to @usernames used within tweets
    data = data.replace(/\B@([_a-z0-9]+)/ig, function(reply) {
        return '<a target="_blank" href="http://twitter.com/' + reply.substring(1) + '" style="font-weight:lighter;" target="_blank">' + reply.charAt(0) + reply.substring(1) + '</a>';
    });
    //Add link to #hastags used within tweets
    data = data.replace(/\B#([_a-z0-9]+)/ig, function(reply) {
        return '<a target="_blank" href="https://twitter.com/search?q=' + reply.substring(1) + '" style="font-weight:lighter;" target="_blank">' + reply.charAt(0) + reply.substring(1) + '</a>';
    });
    return data;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function deleteAllCookies() {
    /* NOTA: revisa si el dominio coincide ya que si no no se borrarÃ¡n */
    console.log("Show Cookies");
    console.log(document.cookie);
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    console.log("finish deleteAllCookies");
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function utf8_decode(str_data) {
    //  discuss at: http://phpjs.org/functions/utf8_decode/
    // original by: Webtoolkit.info (http://www.webtoolkit.info/)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (http://brett-zamir.me)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Norman "zEh" Fuchs
    // bugfixed by: hitwork
    // bugfixed by: Onno Marsman
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: kirilloid
    //   example 1: utf8_decode('Kevin van Zonneveld');
    //   returns 1: 'Kevin van Zonneveld'

    var tmp_arr = [],
        i = 0,
        ac = 0,
        c1 = 0,
        c2 = 0,
        c3 = 0,
        c4 = 0;

    str_data += '';

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 <= 191) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 <= 223) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else if (c1 <= 239) {
            // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            c4 = str_data.charCodeAt(i + 3);
            c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
            c1 -= 0x10000;
            tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
            tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
            i += 4;
        }
    }

    return tmp_arr.join('');
}


function utf8_encode(argString) {
    //  discuss at: http://phpjs.org/functions/utf8_encode/
    // original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: sowberry
    // improved by: Jack
    // improved by: Yves Sucaet
    // improved by: kirilloid
    // bugfixed by: Onno Marsman
    // bugfixed by: Onno Marsman
    // bugfixed by: Ulrich
    // bugfixed by: Rafal Kukawski
    // bugfixed by: kirilloid
    //   example 1: utf8_encode('Kevin van Zonneveld');
    //   returns 1: 'Kevin van Zonneveld'

    if (argString === null || typeof argString === 'undefined') {
        return '';
    }

    var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var utftext = '',
        start, end, stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode(
                (c1 >> 6) | 192, (c1 & 63) | 128
            );
        } else if ((c1 & 0xF800) != 0xD800) {
            enc = String.fromCharCode(
                (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
            );
        } else { // surrogate pairs
            if ((c1 & 0xFC00) != 0xD800) {
                throw new RangeError('Unmatched trail surrogate at ' + n);
            }
            var c2 = string.charCodeAt(++n);
            if ((c2 & 0xFC00) != 0xDC00) {
                throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
            }
            c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
            enc = String.fromCharCode(
                (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
            );
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }

    if (end > start) {
        utftext += string.slice(start, stringl);
    }

    return utftext;
}

/**
 * Secure Hash Algorithm (SHA256)
 * http://www.webtoolkit.info/
 * Original code by Angel Marin, Paul Johnston
 **/

function SHA256(s) {
    var chrsz = 8;
    var hexcase = 0;

    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S(X, n) { return (X >>> n) | (X << (32 - n)); }

    function R(X, n) { return (X >>> n); }

    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }

    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }

    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }

    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }

    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }

    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

    function core_sha256(m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for (var j = 0; j < 64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    function binb2hex(binarray) {
        var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
        var str = '';
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}