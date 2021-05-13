(function() {

    //This is global functions for every controler.
    app.run(function($rootScope, $window, functions) {
        $rootScope.logout = function() {

            functions.loading();

            functions.postLogout().then(function(response) {

                if (response.data.success == "TRUE") {
                    console.log("[run][postLogout]");

                    toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");

                    deleteAllCookies();
                    $window.location.href = "/";

                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function(response) {
                /*ERROR*/
                toastr["error"]("Inténtelo de nuevo más tarde", "");
                functions.loadingEndWait();

            }); /*fin postLogout*/
        };
    });

    app.controller('signin', function($scope, functions, $window) {

        functions.loading();

        $("body").css("background-image", "url('../img/texture.png')");


        console.log("[signin]");

        $scope.send = function() {
                console.log("[signin][send]");

                functions.loadingWait();

                var correo = "";
                var contPass = "";

                correo = $("#correo").val();
                contPass = $("#contPass").val();

                console.log("[signin][send] correo: " + correo);
                console.log("[signin][send] contPass: " + contPass);

                if (correo.indexOf("@") == "-1" || correo.indexOf(".") == "-1" || correo.indexOf(" ") != "-1" || correo.indexOf(",") != "-1") {
                    toastr["error"]("Llena correctamente<br /> tu correo electrónico", "");
                    functions.loadingEndWait();
                    $("#ingresarButton").effect("shake");
                } else if (contPass == "") {
                    toastr["error"]("Llena correctamente<br /> tu contraseña", "");
                    functions.loadingEndWait();
                    $("#ingresarButton").effect("shake");

                } else {

                    functions.postIngresar(correo, contPass).then(function(response) {

                        if (response.data.success == "TRUE") {
                            console.log("[signin][postIngresar]");

                            toastr["success"]("Tu solicitud se<br /> ha enviado correctamente", "");

                            deleteAllCookies();
                            setCookie("token", response.data.token, 1);

                            $window.location.href = "/inicio";

                        } else {
                            toastr["warning"](response.data.description, "");
                            functions.loadingEndWait();
                        }
                    }, function(response) {
                        /*ERROR*/
                        toastr["error"]("Inténtelo de nuevo más tarde", "");
                        functions.loadingEndWait();

                    }); /*fin postSubscriber*/

                }

            } //fin send ng

    }); //fin controller signin


    app.controller('inicio', function($scope, functions, $window) {

        console.log("[inicio]");

        functions.loading();

    }); //fin controller inicio


    app.controller('mesaDeDinero', function($scope, functions, $window) {

        console.log("[mesaDeDinero]");

        functions.loading();

    }); //fin controller mesaDeDinero


    app.controller('porInstrumento', function($scope, functions, $window) {

        console.log("[porInstrumento]");

        functions.loading();

        $scope.getPosicionPorInstrumentoObtenerInstrumentosClick = function(start, end) {

            functions.getPosicionPorInstrumentoObtenerInstrumentos(start, end).then(function(response) {

                if (response.data.success == "TRUE") {
                    console.log("[porInstrumento][getPosicionPorInstrumentoObtenerInstrumentos]");

                    console.log(response.data.data);

                    $scope.instrumentos = response.data.data;

                    toastr["success"]("Selecciona un Instrumento.", "");

                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function(response) {
                /*ERROR*/
                toastr["error"]("Inténtelo de nuevo más tarde", "");
                functions.loadingEndWait();

            }); /*fin getPosicionPorInstrumentoObtenerInstrumentos*/

        }; //fin getZonaHorariaFrontClick

        getPosicionPorInstrumentoObtenerInstrumentosClick = $scope.getPosicionPorInstrumentoObtenerInstrumentosClick;

        $scope.getZonaHorariaFrontClick = function(id_usuarios) {

            functions.loading();

            console.log("[porInstrumento] ");

            console.log("id_usuarios: " + id_usuarios);

            functions.getZonaHoraria(id_usuarios).then(function(response) {

                if (response.data.success == "TRUE") {
                    console.log("[porInstrumento][getZonaHoraria]");

                    console.log(response.data.data);

                    var start = new Date(moment().subtract(48, 'hour').tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));
                    var end = new Date(moment().add(48, 'hour').tz(response.data.data[0].nombre).format('YYYY-MM-DD HH:mm:ss'));

                    $('#datepicker-2').daterangepicker({
                        timePicker: false,
                        startDate: start,
                        endDate: end,
                        locale: {
                            format: 'YYYY-MM-DD'
                        }
                    });

                    getPosicionPorInstrumentoObtenerInstrumentosClick(start, end);

                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function(response) {
                /*ERROR*/
                toastr["error"]("Inténtelo de nuevo más tarde", "");
                functions.loadingEndWait();

            }); /*fin getZonaHoraria*/

        }; //fin getZonaHorariaFrontClick

        getZonaHorariaFront = $scope.getZonaHorariaFrontClick;

        $scope.getMesaDeDineroClick = function(start, end, instrumento) {

            functions.getMesaDeDinero(start, end, instrumento).then(function(response) {

                if (response.data.success == "TRUE") {

                    console.log("[mesaDeDinero][getMesaDeDinero]");

                    console.log(response.data.data);

                    var contabilidad = response.data.data;

                    contabilidad = functions.generateAddKeyResult(contabilidad);

                    var data = Array();

                    var choices = Array();
                    choices = ["fecha_valuacion", "no_hay_titulo", "caja", "resultado"];
                    option = ["", ",", ",", ","];

                    data = addKeyToArray(data, contabilidad, choices, option);

                    $('#contabilidad').dataTable().fnClearTable();

                    $('#contabilidad').dataTable().fnAddData(data);

                    var _data = Array();

                    choices = ["id", "fecha_valuacion", "no_hay_titulo", "caja", "resultado", "valor_en_libros", "val_costo", "precio_mercado"];
                    option = ["", "", "", "", "", "", ""];

                    _data = addKeyToArray(_data, contabilidad, choices, option);

                    console.log(_data);

                    //aquí Gráfica
                    functions.generarGraficaBarras(_data);


                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function(response) {
                /*ERROR*/
                toastr["error"]("Inténtelo de nuevo más tarde", "");
                functions.loadingEndWait();

            }); /*fin getMesaDeDinero*/

        }; //fin getMesaDeDineroClick

        getMesaDeDinero = $scope.getMesaDeDineroClick;

    }); //fin controller porInstrumento

    app.controller('perfil', function($scope, functions, $window) {

        console.log("[perfil]");

        functions.loading();

        $scope.getUsuarioClick = function(id_usuarios) {

            functions.getUsuario(id_usuarios).then(function(response) {

                if (response.data.success == "TRUE") {
                    console.log("[perfil][getUsuario]");

                    console.log(response.data.data);

                    $scope.administradorPerfil = response.data.data[0];

                } else {
                    toastr["warning"](response.data.description, "");
                    functions.loadingEndWait();
                }
            }, function(response) {
                /*ERROR*/
                toastr["error"]("Inténtelo de nuevo más tarde", "");
                functions.loadingEndWait();

            }); /*fin getUsuario*/

        }; //fin getUsuarioClick

        getUsuarioClick = $scope.getUsuarioClick;

    }); //fin controller perfil


    app.controller('directo', function($scope, functions, $window) {

        console.log("[directo]");

        functions.loading();

        var fecha = generarFechaHoy3();

        $("#datepicker-2").val(fecha);

        $scope.guardar = function() {


            functions.loading();

            console.log("[controller][directo][guardar]");

            var fecha_de_operacion = "";
            var operacionX = "";
            var operacionY = "";
            var operacion = "";
            var instrumentoX = "";
            var instrumentoY = "";
            var instrumento = "";
            var montoNominal = "";
            var tasaSobreTasa = "";
            var precio = "";
            var numeroDeTitulos = "";
            var montoLiquidacion = "";
            var fechaLiquidacionX = "";
            var fechaLiquidacionY = "";
            var fechaLiquidacion = "";
            var contraparte = "";


            fecha_de_operacion = $("#datepicker-2").val();
            operacionX = document.getElementById("operacion").selectedIndex;
            operacionY = document.getElementById("operacion").options;
            operacion = operacionY[operacionX].value;
            instrumentoX = document.getElementById("instrumento").selectedIndex;
            instrumentoY = document.getElementById("instrumento").options;
            instrumento = instrumentoY[instrumentoX].value;
            montoNominal = parseFloat(replaceComasInNumbers("montoNominal"));
            tasaSobreTasa = $("#tasaSobreTasa").val();
            precio = parseFloat(replaceComasInNumbers("precio"));
            numeroDeTitulos = parseFloat(replaceComasInNumbers("numeroDeTitulos"));
            montoLiquidacion = parseFloat(replaceComasInNumbers("montoLiquidacion"));
            fechaLiquidacionX = document.getElementById("fechaLiquidacion").selectedIndex;
            fechaLiquidacionY = document.getElementById("fechaLiquidacion").options;
            fechaLiquidacion = fechaLiquidacionY[fechaLiquidacionX].value;
            contraparte = $("#contraparte").val();

            console.log("[directo] Fecha de Operación: " + fecha_de_operacion);
            console.log("[directo] operacionX: " + operacionX);
            console.log("[directo] operacionY: " + operacionY);
            console.log("[directo] operacion: " + "Index: " + operacionY[operacionX].index + " is " + operacionY[operacionX].text + " value " + operacionY[operacionX].value);
            console.log("[directo] operacion: " + operacion);
            console.log("[directo] instrumentoX: " + instrumentoX);
            console.log("[directo] instrumentoY: " + instrumentoY);
            console.log("[directo] instrumento: " + "Index: " + instrumentoY[instrumentoX].index + " is " + instrumentoY[instrumentoX].text + " value " + instrumentoY[instrumentoX].value);
            console.log("[directo] instrumento: " + instrumento);
            console.log("[directo] montoNominal: " + montoNominal);
            console.log("[directo] tasaSobreTasa: " + tasaSobreTasa);
            console.log("[directo] precio: " + precio);
            console.log("[directo] numeroDeTitulos: " + numeroDeTitulos);
            console.log("[directo] montoLiquidacion: " + montoLiquidacion);
            console.log("[directo] fechaLiquidacionX: " + fechaLiquidacionX);
            console.log("[directo] fechaLiquidacionY: " + fechaLiquidacionY);
            console.log("[directo] fechaLiquidacion: " + "Index: " + fechaLiquidacionY[fechaLiquidacionX].index + " is " + fechaLiquidacionY[fechaLiquidacionX].text + " value " + fechaLiquidacionY[fechaLiquidacionX].value);
            console.log("[directo] fechaLiquidacion: " + fechaLiquidacion);
            console.log("[directo] contraparte: " + contraparte);

            if (fecha_de_operacion == "" || operacion == "default" || instrumento == "default" || montoNominal == "" || tasaSobreTasa == "" ||
                precio == "" || numeroDeTitulos == "" || montoLiquidacion == "" || fechaLiquidacion == "default" || contraparte == "") {

                toastr["error"]("Llene todos los campos.", "");
                functions.loadingEndWait();

            } else {

                console.log("Mandar");

                functions.postOperacionDirecta(fecha_de_operacion, operacion, instrumento, montoNominal, precio,
                    tasaSobreTasa, numeroDeTitulos, montoLiquidacion, fechaLiquidacion,
                    contraparte).then(function(response) {

                    if (response.data.success == "TRUE") {
                        console.log("[controller][directo][guardar][postOperacionDirecta]");

                        console.log(response.data.data);

                        toastr["success"](response.data.description, "");

                        $window.location = "/operacion/directo";

                    } else {
                        toastr["warning"](response.data.description, "");
                        functions.loadingEndWait();
                    }
                }, function(response) {
                    /*ERROR*/
                    toastr["error"]("Inténtelo de nuevo más tarde", "");
                    functions.loadingEndWait();

                }); /*fin postOperacionDirecta*/

            }

        }

        functions.getOperacionesDirectoObtenerInstrumentos().then(function(response) {

            if (response.data.success == "TRUE") {
                console.log("[mesaDeDinero][getOperacionesDirectoObtenerInstrumentos]");

                console.log(response.data.data);

                $scope.instrumentos = response.data.data;

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function(response) {
            /*ERROR*/
            toastr["error"]("Inténtelo de nuevo más tarde", "");
            functions.loadingEndWait();

        }); /*fin getMesaDeDinero*/

    }); //fin controller mesaDeDinero


    app.controller('reportePosicionGlobal', function($scope, functions, $window) {

        console.log("[reportePosicionGlobal]");

        functions.loading();

        functions.getContaduriaByMaxDate().then(function(response) {

            if (response.data.success == "TRUE") {
                console.log("[controller][reportePosicionGlobal][getContaduriaByMaxDate]");

                console.log(response.data.data);

                toastr["success"](response.data.description, "");

                var sumaNoHayTitulo = functions.sumaArray(response.data.data, "no_hay_titulo");

                var sumaTotalValCosto = functions.sumaArray(response.data.data, "val_costo");

                console.log("[controller][reportePosicionGlobal][getContaduriaByMaxDate] sumaTotalValCosto: " + sumaTotalValCosto);

                console.log("[controller][reportePosicionGlobal][getContaduriaByMaxDate] sumaNoHayTitulo: " + sumaNoHayTitulo);

                $("#posGlo").html(numberWithCommas(sumaTotalValCosto.toFixed(2)));
                $("#PL").html(numberWithCommas(sumaNoHayTitulo.toFixed(2)));

                var data = Array();

                var choices = Array();
                choices = ["fecha_valuacion", "instrumento", "titulos", "valor_en_libros", "precio_mercado", "no_hay_titulo", "DV01"];
                option = ["", "", ",", ",", ",", ",", ","];

                data = addKeyToArray(data, response.data.data, choices, option);

                $('#contabilidad').dataTable().fnClearTable();

                $('#contabilidad').dataTable().fnAddData(data);

                functions.generarGraficaPieChart(response.data.data);

            } else {
                toastr["warning"](response.data.description, "");
                functions.loadingEndWait();
            }
        }, function(response) {
            /*ERROR*/
            toastr["error"]("Inténtelo de nuevo más tarde", "");
            functions.loadingEndWait();

        }); /*fin postOperacionDirecta*/

    }); //fin controller reportePosicionGlobal


    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQaGlJbnZlc3RtZW50Q2FwaXRhbCIsImlhdCI6MTU5MzY0NjMwMSwiZXhwIjoxNTkzNjQ4MDAwLCJuYmYiOjE1OTM2NDYzMDEsImp0aSI6IjVlZmQxY2RkYjNjY2IiLCJzdWIiOjEsInVzciI6eyJpZF91c3VhcmlvcyI6MSwiaWRfem9uYXNfaG9yYXJpYXMiOjQ5LCJub21icmUiOiJNYW5saW8iLCJhcGVsbGlkbyI6IlRlcmFuIiwiY29ycmVvIjoibWFubGlvZWxudW0xQGhvdG1haWwuY29tIiwiY2FyZ28iOiJNYW5hZ2VyIiwidGVsZWZvbm9fZmlqbyI6IjU2NzEzMTc0NSIsImNlbHVsYXIiOiI1NTEwODAwMjkxIiwiY3JlYXRlZF9hdCI6IjIwMTktMTAtMTYgMjA6NDg6MzAiLCJ1cGRhdGVkX2F0IjoiMjAxOS0xMC0xMSAwODozODozOSIsImRuaV9udW0iOiIyMzQzMjQzMjQiLCJzZWd1cm9fc29jaWFsIjoiMzQ1NDM1NDM1IiwiZm90b19iYXNlNjQiOiIiLCJwYXNzIjoiOGU5NmJkMDJmYmNiMDU0Y2NhMTFjZjhkZWIwMzE1NjJiOWFhZWRkODNmODNmZjdhYmY3YzNmYTc4N2FkOWJiZCJ9LCJwZXJtaXNvcyI6WzFdfQ.fvWH5Kwip6cD5_XpXP3HdgvdeGdGDSwvAoXN3EdDHzY'
    app.controller('varHistorico', function($scope, functions, $window) {

        console.log("[varHistorico]");

        functions.loading();
        $scope.limite = 0.0;
        $scope.mercados =[];
        $scope.mercadoSelect = null;
        $scope.productos =[];
        $scope.productoSelect = null;
        $scope.labels = [];
        $scope.data=[];
        
        $scope.refreshTableMercados = function() {
            const selectPorcentajePre = $('#porcentajeSelect').val();
            const selectPorcentajeSplit = selectPorcentajePre.split('&');
            const selectPorcentaje = selectPorcentajeSplit[0];

            var tpPercentil =0;
            if (selectPorcentaje == 99) {
                tpPercentil = 1;
            } else if (selectPorcentaje == 97) {
                tpPercentil = 2;
            } else if (selectPorcentaje == 95) {
                tpPercentil = 3;
            }

            var fecha = document.getElementById("varDate").value;
            let data = {
                tpPercentil: tpPercentil,
                fecha: fecha
            };
            functions.mesaDeDerivados(token, JSON.stringify(data)).then(function(response) {
                var da = response.data;
                console.log(da);
                console.log("### DATA_CHART::" , da[0]);
                
                const selectPorcentajeValor = parseFloat(selectPorcentajeSplit[1]);

                if(null!=da && undefined != da){
                    if (da['length'] > 0) {
                        let htmTableMercado = '';
                        var cellValue = da[3];
                        var date = new Date(cellValue);
                        date.setDate(date.getDate() + 1);
                        $("#fecha").text("Fecha: " + date.toLocaleDateString("es-ES", options));
                        if(fecha===null || fecha===""){
                            var month = date.getMonth()+1;
                            if(month<10){
                                month='0'+month;
                            }
                            document.getElementById("varDate").value = (""+date.getUTCFullYear())+"-"+ month +"-"+date.getDate();
                        }

                        if (undefined != da[2]) {
                            var obj = {
                                titulo: 'Posición Global',
                                var1: da[2].var1,
                                var2: da[2].var2,
                                var3: da[2].var3,
                                limite: da[2].limite,
                                valuacion: da[2].valuacion
                            };

                            //globalLimitParaTablaMercados = da[1][0]['globalLimit'];
                            $scope.limite = da[2].limite;
                            $scope.makeSummaryTable(obj);
                           
                        } else {
                            $('#l99').text(0.0);
                            $('#l97').text(0.0);
                            $('#l95').text(0.0);
                            $('#valuacion').text(0.0);
                        }

                        var options = { year: "numeric", month: "long", day: "numeric" };
                        

                        htmTableMercado += '<table class="table" id="tableMercado">';
                        htmTableMercado += '<thead class="p-3 mb-2 bg-dark text-white">';
                        htmTableMercado += '<tr>';
                        htmTableMercado += '<th scope="col">Mesa de Operación</th>';
                        htmTableMercado += '<th scope="col">Valuación </th>';
                        htmTableMercado += '<th scope="col">VaR </th>';
                        htmTableMercado += '<th scope="col">Límite Var</th>';
                        htmTableMercado += '<th scope="col">Límite Disponible</th>';
                        htmTableMercado += '</tr>';
                        htmTableMercado += '</thead>';
                        htmTableMercado += '<tbody>';

                        $scope.mercados = da[4];
                        console.log("### MERCADOS", $scope.mercados);
                        for (let i = 0; i < da[4].length; i++) {
                            htmTableMercado += '<tr style="cursor:pointer;" onclick="getTableProductos('+da[4][i].cdMercado+');">';
                            htmTableMercado += '<td>' + da[4][i].nombre + '</td>';
                            
                            htmTableMercado += '<td>' + comas(dosDecimales(Number.parseFloat(da[4][i].valuacion))) + '</td>';

                            var varPorcentaje = 0.0;
                            if (selectPorcentaje == 99) {
                                varPorcentaje = da[4][i].var1;
                                varPorcentaje =  varPorcentaje * -1;
                            } else if (selectPorcentaje == 97) {
                                varPorcentaje = da[4][i].var2;
                                varPorcentaje =  varPorcentaje * -1;
                            } else if (selectPorcentaje == 95) {
                                varPorcentaje = da[4][i].var3;
                                varPorcentaje =  varPorcentaje * -1;
                            }
                        
                            htmTableMercado += '<td>' + comas(dosDecimales(varPorcentaje)) + ' </td>';
                            
                            var limite = da[4][i].limite;
                            var calculoMenosVar = limite - varPorcentaje;
                            var porcentajeUtilizado = calculoMenosVar/limite ;


                            //htmTableMercado += '<td>' + comas(dosDecimales($scope.limite)) + ' </td>';
                            htmTableMercado += '<td>' + comas(dosDecimales(limite)) + ' </td>';

                            if (calculoMenosVar <= 0) {
                                htmTableMercado += '<td style="color:red; font-weight:bold;"> ' + comas(dosDecimales(calculoMenosVar)) + '</td>';
                            } else if (porcentajeUtilizado >0.10) {
                                htmTableMercado += '<td style="color:green; font-weight:bold;"> ' + comas(dosDecimales(calculoMenosVar)) + '</td>';
                            }else if (0.10>= porcentajeUtilizado > 0) {
                                htmTableMercado += '<td style="color:orange; font-weight:bold;"> ' + comas(dosDecimales(calculoMenosVar)) + '</td>';
                            }
                            htmTableMercado += '</tr>';
                        }

                        document.getElementById('tableSecond').innerHTML = htmTableMercado;

                        $('#tableMercado').dataTable({

                            "pageLength": 25,
                            select: true,
                            "ordering": true,
                            responsive: true,
                            dom: "<'row mb-3'<'col-sm-12 col-md-4 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-8 d-flex align-items-center justify-content-end'B>>" +
                                "<'row'<'col-sm-12'tr>>" +
                                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                            //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
                            buttons: [{
                                    extend: 'pageLength',
                                    className: 'btn-outline-default'
                                },
                                {
                                    extend: 'collection',
                                    text: 'Export',
                                    buttons: [{ //meter librería jszip
                                            extend: 'excelHtml5',
                                            text: 'Excel',
                                            orientation: 'landscape',
                                            titleAttr: 'Generate Excel',
                                            className: 'btn-outline-default'
                                        },
                                        {
                                            extend: 'csvHtml5',
                                            text: 'CSV',
                                            titleAttr: 'Generate CSV',
                                            className: 'btn-outline-default'
                                        },
                                        {
                                            //se debe incluir libreria pdf maker
                                            extend: 'pdfHtml5',
                                            text: 'PDF',
                                            titleAttr: 'PDF',
                                            customize: function(doc) {
                                                //pageMargins [left, top, right, bottom]
                                                doc.pageMargins = [20, 20, 20, 20];
                                            },
                                            className: 'btn-outline-default'
                                        }
                                    ],
                                    className: 'btn-outline-default'

                                },
                                {
                                    extend: 'copyHtml5',
                                    text: 'Copy',
                                    titleAttr: 'Copy to clipboard',
                                    className: 'btn-outline-default'
                                },
                                {
                                    extend: 'print',
                                    text: '<i class="fal fa-print"></i>',
                                    titleAttr: 'Print Table',
                                    className: 'btn-outline-default'
                                }

                            ]

                        });

                        if (undefined != da[0] && null!= da[0]) {
                            $scope.makeChart(da[0]);
                        }

                    }
                }
                
                
            });
            
            
        }
        $scope.refreshTableMercados();
        
        $scope.makeSummaryTable = function (obj){

            console.log("OBJ",obj);
            if (undefined != obj && obj!=null) {
                var var1 = obj['var1'];
                var var2 = obj['var2'];
                var var3 = obj['var3'];
                var1 = var1 * -1;
                var2 = var2 * -1;
                var3 = var3 * -1;

                $('#titleGlobal').text(obj.titulo);
                $('#l99').text(comas(dosDecimales(var1)));
                $('#l97').text(comas(dosDecimales(var2)));
                $('#l95').text(comas(dosDecimales(var3)));

                $('#valuacion').text(comas(dosDecimales(obj.limite)));
                document.getElementById('valuacion').style.setProperty("background-color", "#f4f3f3");
                document.getElementById('valuacionTxt').style.setProperty("background-color", "#f4f3f3");
                document.getElementById('valuacion').style.setProperty("font-weight", "bold");
                document.getElementById('valuacionTxt').style.setProperty("font-weight", "bold");


                var limite = obj.limite;

                $('#limite').text(limite);
                $('#limite99').text(comas(dosDecimales(limite)));
                $('#limite97').text(comas(dosDecimales(limite)));
                $('#limite95').text(comas(dosDecimales(limite)));

                var nivelConfianza_99 = limite - var1;
                var nivelConfianza_97 = limite - var2;
                var nivelConfianza_95 = limite - var3;
                var porcentajeUtilizado_99 = nivelConfianza_99/limite;
                var porcentajeUtilizado_97 = nivelConfianza_97/limite;
                var porcentajeUtilizado_95 = nivelConfianza_95/limite;
                
                if(nivelConfianza_99<=0){
                    document.getElementById('nivelConfianza_99').style.setProperty("color", "red");
                }else if(0.10>=porcentajeUtilizado_99>0){
                    document.getElementById('nivelConfianza_99').style.setProperty("color", "orange");
                }else if (porcentajeUtilizado_99>0.10){
                    document.getElementById('nivelConfianza_99').style.setProperty("color", "green");
                }

                if (nivelConfianza_97<=0){
                    document.getElementById('nivelConfianza_97').style.setProperty("color", "red");

                }else if(0.10>=porcentajeUtilizado_97>0){
                    document.getElementById('nivelConfianza_97').style.setProperty("color", "orange");

                }else if (porcentajeUtilizado_97>0.10){
                    document.getElementById('nivelConfianza_97').style.setProperty("color", "green"); 
                }

                if (nivelConfianza_95<=0){
                    document.getElementById('nivelConfianza_95').style.setProperty("color", "red");
                }else if(0.10>=porcentajeUtilizado_95>0){
                    document.getElementById('nivelConfianza_95').style.setProperty("color", "orange");

                }else if (porcentajeUtilizado_95>0.10){
                    document.getElementById('nivelConfianza_95').style.setProperty("color", "green");
                }

                
                document.getElementById('nivelConfianza_99').style.setProperty("font-weight", "bold");
                document.getElementById('nivelConfianza_97').style.setProperty("font-weight", "bold");
                document.getElementById('nivelConfianza_95').style.setProperty("font-weight", "bold");
                
                $('#nivelConfianza_99').text(comas(dosDecimales(nivelConfianza_99)));
                $('#nivelConfianza_97').text(comas(dosDecimales(nivelConfianza_97)));
                $('#nivelConfianza_95').text(comas(dosDecimales(nivelConfianza_95)));


            } else {
                $('#l99').text(0.0)
                $('#l97').text(0.0)
                $('#l95').text(0.0)
                $('#valuacion').text(0.0)
            }
        };

        $scope.makeChart = function (data){
            console.log("DATA_CHART_FUNCTION",data);
            $scope.labels = [];
            $scope.data= [];

            var sumVar =0;
            for (let i = 0; i < data.length; i++) {
                $scope.labels.push(data[i].nbSerie);
                $scope.data.push(data[i].nuDiferencia.toFixed(2));
                sumVar+=data[i].nuDiferencia;
            }

            $scope.data.splice(0, 0, ($scope.limite-sumVar).toFixed(2));
            $scope.labels.splice(0, 0,"Límite Disponible");
            console.log("CHART_LABELS::",$scope.labels);
            console.log("CHART_DATA::",$scope.data);

            var color = 0;
            if ($scope.limite-sumVar<=0){
                color = 1;
            }else if(0.10>=1-sumVar/$scope.limite>0){
                color = 2;
            }
            functions.generarGraficaDona('graficaVarHistorico',$scope.labels, $scope.data,color,$scope.limite);

        };

        $scope.refreshTableProductos = function() {
            if(null!=$scope.mercadoSelect){
                $scope.getTableProductos($scope.mercadoSelect);
            }
        };

        $scope.getTableProductos = function(idMercado){
            var found = $scope.mercados.find(element => element.cdMercado == idMercado);
            console.log("getTableProductos", found);
            const selectPorcentajePre = $('#porcentajeSelect').val();
            const selectPorcentajeSplit = selectPorcentajePre.split('&');
            const selectPorcentaje = selectPorcentajeSplit[0];

            var tpPercentil =0;
            if (selectPorcentaje == 99) {
                tpPercentil = 1;
            } else if (selectPorcentaje == 97) {
                tpPercentil = 2;
            } else if (selectPorcentaje == 95) {
                tpPercentil = 3;
            }

            var obj = {
                titulo: found.nombre,
                var1: found.var1,
                var2: found.var2,
                var3: found.var3,
                limite: found.limite, 
                valuacion: found.valuacion
            };
            $scope.limite = obj.limite;
            $scope.makeSummaryTable(obj);

            var fecha = document.getElementById("varDate").value;
            $scope.mercadoSelect = idMercado;
            let data = {
                idMercado: idMercado,
                tpPercentil: tpPercentil,
                fecha: fecha
            };
            functions.getProductosVar(token, JSON.stringify(data)).then(function(response) {
                console.log("### getProductosVar:: ",response)

                let htmTableIntermedio = '';

                if(response.status==200){

                    htmTableIntermedio += '<table class="table" id="tableIntermedio" style="width:100%;">';
                    htmTableIntermedio += '<thead class="p-3 mb-2 bg-dark text-white">';
                    htmTableIntermedio += '<tr>';
                    htmTableIntermedio += '<th scope="col">#</th>';
                    htmTableIntermedio += '<th scope="col">Producto</th>';
                    htmTableIntermedio += '<th scope="col">Valuación</th>';
                    htmTableIntermedio += '<th scope="col">Var: ' + selectPorcentaje + '%</th>';
                    htmTableIntermedio += '<th scope="col">Límite</th>';
                    htmTableIntermedio += '<th scope="col">Límite Disponible</th>';
                    htmTableIntermedio += '</tr>';
                    htmTableIntermedio += '</thead>';
                    htmTableIntermedio += '<tbody>';

                    var mercados = response.data[0];
                    $scope.productos = mercados;
                    
                    for (let i = 0; i < mercados.length; i++) {
                        htmTableIntermedio += '<tr style="cursor:pointer;" onclick="getTableTransacciones('+mercados[i].cdInstrumento+')">';
                        htmTableIntermedio += ' <th scope="row">' + (i + 1) + '</th>';
                        htmTableIntermedio += '<td>'+mercados[i].nombre+'</td>';
                        htmTableIntermedio += '<td> ' + comas(dosDecimales(Number.parseFloat(mercados[i].valuacion))) + '</td>'

                        var varPorcentaje = 0.0;
                        if (selectPorcentaje == 99) {
                            varPorcentaje = mercados[i].var1;
                            varPorcentaje =  varPorcentaje * -1;
                        } else if (selectPorcentaje == 97) {
                            varPorcentaje = mercados[i].var2;
                            varPorcentaje =  varPorcentaje * -1;
                        } else if (selectPorcentaje == 95) {
                            varPorcentaje = mercados[i].var3;
                            varPorcentaje =  varPorcentaje * -1;
                        }

                        htmTableIntermedio += '<td> ' + comas(dosDecimales(varPorcentaje)) + '</td>';
                        htmTableIntermedio += '<td> ' + comas(dosDecimales(mercados[i].limite)) + '</td>';

                        var limiteMenosVar = mercados[i].limite -varPorcentaje;
                        if (limiteMenosVar <= 0) {
                            htmTableIntermedio += '<td style="color:red; font-weight:bold;"> ' + comas(dosDecimales(limiteMenosVar)) + '</td>';
                        } else if(0.10>= limiteMenosVar/mercados[i].limite >0) {
                            htmTableIntermedio += '<td style="color:orange; font-weight:bold;"> ' + comas(dosDecimales(limiteMenosVar)) + '</td>';
                        }else {
                            htmTableIntermedio += '<td style="color:green; font-weight:bold;"> ' + comas(dosDecimales(limiteMenosVar)) + '</td>';
                        }

                        htmTableIntermedio += '</tr>';
                    }
                }

                htmTableIntermedio += '</tbody>';
                htmTableIntermedio += '</table>';

                document.getElementById('tableFirst').innerHTML = htmTableIntermedio;

                $('#tableIntermedio').dataTable({

                    "pageLength": 25,
                    select: true,
                    "ordering": true,
                    responsive: true,
                    dom: "<'row mb-3'<'col-sm-12 col-md-4 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-8 d-flex align-items-center justify-content-end'B>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                    //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
                    buttons: [{
                            extend: '',
                            text: '<span id="buttonRegresar">Regresar</span>',
                            titleAttr: 'Regresar',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'pageLength',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'collection',
                            text: 'Export',
                            buttons: [{ //meter librería jszip
                                    extend: 'excelHtml5',
                                    text: 'Excel',
                                    orientation: 'landscape',
                                    titleAttr: 'Generate Excel',
                                    className: 'btn-outline-default'
                                },
                                {
                                    extend: 'csvHtml5',
                                    text: 'CSV',
                                    titleAttr: 'Generate CSV',
                                    className: 'btn-outline-default'
                                },
                                {
                                    //se debe incluir libreria pdf maker
                                    extend: 'pdfHtml5',
                                    text: 'PDF',
                                    titleAttr: 'PDF',
                                    customize: function(doc) {
                                        //pageMargins [left, top, right, bottom]
                                        doc.pageMargins = [20, 20, 20, 20];
                                    },
                                    className: 'btn-outline-default'
                                }
                            ],
                            className: 'btn-outline-default'

                        },
                        {
                            extend: 'copyHtml5',
                            text: 'Copy',
                            titleAttr: 'Copy to clipboard',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'print',
                            text: '<i class="fal fa-print"></i>',
                            titleAttr: 'Print Table',
                            className: 'btn-outline-default'
                        }

                    ]

                });
                $("#tableFirst").css("display","");
                $("#buttonRegresar").css("display","");
                $("#tableSecond").css("display","none");


                if (undefined != response.data[1] && null!= response.data[1]) {
                    $scope.makeChart(response.data[1]);
                }
            });
        };


        $scope.refreshTableTransacciones = function() {
            if(null!=$scope.productoSelect){
                $scope.getTableTransacciones($scope.productoSelect);
            }
        }

        $scope.getTableTransacciones = function(idProducto){
            var found = $scope.productos.find(element => element.cdInstrumento == idProducto);
            
            const selectPorcentajePre = $('#porcentajeSelect').val();
            const selectPorcentajeSplit = selectPorcentajePre.split('&');
            const selectPorcentaje = selectPorcentajeSplit[0];

            var tpPercentil =0;
            if (selectPorcentaje == 99) {
                tpPercentil = 1;
            } else if (selectPorcentaje == 97) {
                tpPercentil = 2;
            } else if (selectPorcentaje == 95) {
                tpPercentil = 3;
            }

            var obj = {
                titulo: found.nombre,
                var1: found.var1,
                var2: found.var2,
                var3: found.var3,
                limite: found.limite, 
                valuacion: found.valuacion
            };
            $scope.limite = found.limite
            $scope.makeSummaryTable(obj);
            
            var fecha = document.getElementById("varDate").value;
            $scope.productoSelect = idProducto;
            let data = {
                idMercado: $scope.mercadoSelect,
                idInstrumento: idProducto,
                tpPercentil: tpPercentil,
                fecha: fecha
            };
            functions.getTransaccionesVar(token, JSON.stringify(data)).then(function(response) {
                console.log("DATA_TRANSACCIONES: ", response);
                if(response.status==200){
                    let htmTableDetalle = '<br/><table class="table" id="tableProductodetalle" style="width:100%;">';
                    htmTableDetalle += '<thead class="p-3 mb-2 bg-dark text-white">';
                    htmTableDetalle += '<tr>';
                    htmTableDetalle += '<th scope="col">#</th>';
                    htmTableDetalle += '<th scope="col">Transacción</th>';
                    htmTableDetalle += '<th scope="col">Valuación</th>';
                    htmTableDetalle += '<th scope="col">Var: ' + selectPorcentaje + '%</th>';
                    htmTableDetalle += '<th scope="col">Límite</th>';
                    htmTableDetalle += '<th scope="col">Límite Disponible</th>';
                    htmTableDetalle += '</tr>';
                    htmTableDetalle += '</thead>';
                    htmTableDetalle += '<tbody>';

                    var transacciones = response.data[0];
                    for (let i = 0; i < transacciones.length; i++) {
                        htmTableDetalle += '<tr style="cursor:pointer;" >';
                        htmTableDetalle += '<td scope="row">' + (i + 1) + '</td>';
                        htmTableDetalle += '<td>' + transacciones[i].cdTransaccion + '</td>';
                        htmTableDetalle += '<td> ' + comas(dosDecimales(Number.parseFloat(transacciones[i].valuacion))) + '</td>'

                        var varPorcentaje = 0.0;
                        if (selectPorcentaje == 99) {
                            varPorcentaje = transacciones[i].var1;
                            varPorcentaje =  varPorcentaje * -1;
                        } else if (selectPorcentaje == 97) {
                            varPorcentaje = transacciones[i].var2;
                            varPorcentaje =  varPorcentaje * -1;
                        } else if (selectPorcentaje == 95) {
                            varPorcentaje = transacciones[i].var3;
                            varPorcentaje =  varPorcentaje * -1;
                        }

                        htmTableDetalle += '<td> ' + comas(dosDecimales(varPorcentaje)) + '</td>';
                        htmTableDetalle += '<td> ' + comas(dosDecimales(transacciones[i].limite)) + '</td>';

                        var limiteMenosVar = transacciones[i].limite - varPorcentaje;

                        if (limiteMenosVar <= 0) {
                            htmTableDetalle += '<td style="color:red; font-weight:bold;"> ' + comas(dosDecimales(limiteMenosVar)) + '</td>';
                        } else if(0.10>= limiteMenosVar/transacciones[i].limite>0){
                            htmTableDetalle += '<td style="color:orange; font-weight:bold;"> ' + comas(dosDecimales(limiteMenosVar)) + '</td>';
                        }else {
                            htmTableDetalle += '<td style="color:green; font-weight:bold;"> ' + comas(dosDecimales(limiteMenosVar)) + '</td>';
                        }

                        htmTableDetalle += '</tr>';
                    }
                    htmTableDetalle += '</tbody>';
                    htmTableDetalle += '</table>';
                    
                    document.getElementById('tableThird').innerHTML = htmTableDetalle;

                    $('#tableProductodetalle').dataTable({

                        "pageLength": 25,
                        select: true,
                        "ordering": true,
                        responsive: true,
                        dom: "<'row mb-3'<'col-sm-12 col-md-4 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-8 d-flex align-items-center justify-content-end'B>>" +
                            "<'row'<'col-sm-12'tr>>" +
                            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                        //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
                        buttons: [{
                                extend: '',
                                text: '<span id="buttonRegresarSecond">Regresar</span>',
                                titleAttr: 'Regresar',
                                className: 'btn-outline-default'
                            },
                            {
                                extend: 'pageLength',
                                className: 'btn-outline-default'
                            },
                            {
                                extend: 'collection',
                                text: 'Export',
                                buttons: [{ //meter librería jszip
                                        extend: 'excelHtml5',
                                        text: 'Excel',
                                        orientation: 'landscape',
                                        titleAttr: 'Generate Excel',
                                        className: 'btn-outline-default'
                                    },
                                    {
                                        extend: 'csvHtml5',
                                        text: 'CSV',
                                        titleAttr: 'Generate CSV',
                                        className: 'btn-outline-default'
                                    },
                                    {
                                        //se debe incluir libreria pdf maker
                                        extend: 'pdfHtml5',
                                        text: 'PDF',
                                        titleAttr: 'PDF',
                                        customize: function(doc) {
                                            //pageMargins [left, top, right, bottom]
                                            doc.pageMargins = [20, 20, 20, 20];
                                        },
                                        className: 'btn-outline-default'
                                    }
                                ],
                                className: 'btn-outline-default'

                            },
                            {
                                extend: 'copyHtml5',
                                text: 'Copy',
                                titleAttr: 'Copy to clipboard',
                                className: 'btn-outline-default'
                            },
                            {
                                extend: 'print',
                                text: '<i class="fal fa-print"></i>',
                                titleAttr: 'Print Table',
                                className: 'btn-outline-default'
                            }

                        ]

                    });


                    $("#tableFirst").css("display", "none");
                    $("#tableThird").css("display", "");

                    if (undefined != response.data[1] && null!= response.data[1]) {
                        $scope.makeChart(response.data[1]);
                    }
                }
            });
        };

        makeSummaryTable = $scope.makeSummaryTable;
        makeChart = $scope.makeChart;
        getTableProductos = $scope.getTableProductos;
        getTableTransacciones = $scope.getTableTransacciones;
        refreshTableProductos = $scope.refreshTableProductos;
        refreshTableMercados = $scope.refreshTableMercados;
        refreshTableTransacciones = $scope.refreshTableTransacciones;
        
        comas = function numberWithCommas(x) {
            x = x.toString();
            var pattern = /(-?\d+)(\d{3})/;
            while (pattern.test(x))
                x = x.replace(pattern, "$1,$2");
            return x;
        }

        CeroDecimales = function(numero) {
            var numeroOriginal = numero;
            var signo = 1;
            if (numero < 0){
                numeroOriginal = numeroOriginal * -1;
                signo = -1;
            }
            let t = numeroOriginal.toString();
            let regex = /(\d*.\d{0,0})/;
            var vreturn = t.match(regex)[0];
            vreturn = vreturn * signo
            return vreturn;
        }


        cuatroDecimales = function(numero) {
            var numeroOriginal = numero;
            var signo = 1;
            if (numero < 0){
                numeroOriginal = numeroOriginal * -1;
                signo = -1;
            }
            let t = numeroOriginal.toString();
            let regex = /(\d*.\d{0,4})/;
            var vreturn = t.match(regex)[0];
            vreturn = vreturn * signo
            return vreturn;
        }

        dosDecimales = function(numero) {
            var numeroOriginal = numero;
            var signo = 1;
            if (numero < 0){
                numeroOriginal = numeroOriginal * -1;
                signo = -1;
            }
            let t = numeroOriginal.toString();
            let regex = /(\d*.\d{0,2})/;
            var vreturn = t.match(regex)[0];
            vreturn = vreturn * signo
            return vreturn;
        }


    }); //fin controller varHistorico

    return;

}).call(this);



app.controller('limites', function($scope, functions, $window) {

    functions.loading();
    divisaGlobal = '';
    $scope.consultarLimites = function(tipo) {
        if (tipo == "mercado") {
            tipoEnvio = 1;
        } else if (tipo == "varLimite") {
            tipoEnvio = 2;
        } 

        if (tipoEnvio == 1) {
            console.log("selecciono 1");
          
            functions.getLimitesVarMercado(token).then(function(response) {
                var da = response.data;
                console.log(da);
                $("#conteTable").empty();

                $("#conteTable").append('<table class="table" id="limites">' +
                    '<thead class="bg-dark text-white">' +
                    '<tr>' +
                    '<th style=\'text-align: center;\'>Mercado</th>' +
                    '<th> Limite del Mercado</th>' +
                    '<th style=\'text-align: center;\'></th>' +
                    '<th style=\'text-align: center;\'></th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody id="tableLimites">' +

                    '</tbody>' +
                    '</table>');
                for (var i = 0; i < da.length; i++) {

                    var globalLimitConverted = (parseFloat(da[i].limite));

                    $("#tableLimites").append('<tr  id="' + da[i].idMercado + '">' +
                        '<td>' + da[i].nombre + '</td>' +

                        '<td><span>' + formatDollar(parseFloat(globalLimitConverted.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" value="' + globalLimitConverted.toFixed(2) + '" step="0.01"></td>' +

                        "<td><a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteqMercadoVarLimite('" + da[i].idMercado + "','mercado')\">Eliminar</a></td>" +
                        "<td><a id=\"button_modi_" + i + "\" class=\"btn btn-update btn-xs\" style=\"color: white\" onclick=\"modificar('" + da[i].nombre + "','" + i + "')\">Modificar</a>" +
                        "<a id=\"button_guar_" + i + "\" class=\"btn btn-save btn-xs\" style=\"color: white; width: 80px; margin-bottom: 3px; display:none;\" onclick=\"guardarModiMercadoVarLimite('" + da[i].idMercado + "','" + i + "','mercado','" + da[i]['mercado'] + "')\">Guardar</a>" +
                        "<a id=\"button_cancel_" + i + "\" class=\"btn btn-cancel btn-xs\" style=\"color: white; width: 80px; display:none;\" onclick=\"cancelModi('" + da[i].idMercado + "','" + i + "')\">Cancelar</a>" +
                        "</td>" +
                        '</tr>');
                } //fin for

                $('#limites').dataTable({

                    pageLength: 25,
                    select: true,
                    ordering: false,
                    dom: "<'row mb-3'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-4 d-flex justify-content-end'B>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                    //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
                    buttons: [{
                            extend: 'pageLength',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'colvis',
                            text: 'Column Visibility',
                            titleAttr: 'Col visibility',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'collection',
                            text: 'Export',
                            buttons: [{ //meter librería jszip
                                    extend: 'excelHtml5',
                                    text: 'Excel',
                                    orientation: 'landscape',
                                    titleAttr: 'Generate Excel',
                                    className: 'btn-outline-default'
                                },
                                {
                                    extend: 'csvHtml5',
                                    text: 'CSV',
                                    titleAttr: 'Generate CSV',
                                    className: 'btn-outline-default'
                                },
                                {
                                    //se debe incluir libreria pdf maker
                                    extend: 'pdfHtml5',
                                    text: 'PDF',
                                    titleAttr: 'PDF',
                                    customize: function(doc) {
                                        //pageMargins [left, top, right, bottom]
                                        doc.pageMargins = [20, 20, 20, 20];
                                    },
                                    className: 'btn-outline-default'
                                }
                            ],
                            className: 'btn-outline-default'

                        },
                        {
                            extend: 'copyHtml5',
                            text: 'Copy',
                            titleAttr: 'Copy to clipboard',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'print',
                            text: '<i class="fal fa-print"></i>',
                            titleAttr: 'Print Table',
                            className: 'btn-outline-default'
                        }

                    ]

                }); //fin table library

            }); //fin fincion al controller

        } else if (tipoEnvio == 2 ) {
            console.log("selecciono 2");

            functions.getLimitesVarMd(token).then(function(response) {
                var da = response.data;
                console.log(da);
                $("#conteTable").empty();
                $("#conteTable").append('<table class="table" id="limites" >' +
                    '<thead class="bg-dark text-white">' +
                    '<tr>' +
                    '<th>Producto</th>' +
                    //'<th>Limite Global</th>' +
                    //'<th>Límite Operaciones Directo</th>' +
                    //'<th>Límite Operaciones en Reporto</th>' +
                    '<th>Límite por Instrumento</th>' +
                    '<th>Límite por Operción</th>' +
                    '<th>Mercado</th>' + //nuevo 27_09_2020
                    //'<th>Límite Mercado de Cambios</th>' +
                    //'<th>Límite por Operción Mercado de Cambios</th>' +
                    '<th></th>' +
                    '<th></th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody id="tableLimites">' +

                    '</tbody>' +
                    '</table>');
                for (var i = 0; i < da.length; i++) {

                    var instrumentLimitConverted = parseFloat(da[i].limiteInstrumento);
                    var operationLimitMoneyMarket = parseFloat(da[i].limiteOperacion);
                    

                    $("#tableLimites").append('<tr  id="' + da[i].idInstrumento + '">' +
                        '<td>' + da[i].producto  + '</td>' +

                        '<td><span>' + formatDollar(parseFloat(instrumentLimitConverted.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" value="' + instrumentLimitConverted.toFixed(2) + '" step="0.01"></td>' +
                        
                        '<td><span>' + formatDollar(parseFloat(operationLimitMoneyMarket.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" value="' + operationLimitMoneyMarket.toFixed(2) + '" step="0.01"></td>' +
                        '<td><span>' + da[i].mercado + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="text" value="' + da[i].mercado + '" ></td>' + //nuevo 27_09_2020
                        
                        "<td><a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteqMercadoVarLimite('" + da[i].idInstrumento + "','varMd')\">Eliminar</a></td>" +
                        "<td><a id=\"button_modi_" + i + "\" class=\"btn btn-update btn-xs\" style=\"color: white\" onclick=\"modificar('" + da[i].producto + "','" + i + "')\">Modificar</a>" +
                        "<a id=\"button_guar_" + i + "\" class=\"btn btn-save btn-xs\" style=\"color: white; width: 80px; margin-bottom: 3px; display:none;\" onclick=\"guardarModiMercadoVarLimite('" + da[i].idInstrumento + "','" + i + "','varMd','" + da[i].limiteInstrumento + "&" + da[i].producto + "')\">Guardar</a>" +
                        "<a id=\"button_cancel_" + i + "\" class=\"btn btn-cancel btn-xs\" style=\"color: white; width: 80px; display:none;\" onclick=\"cancelModi('" + da[i].idInstrumento + "','" + i + "')\">Cancelar</a>" +
                        "</td>" +
                        '</tr>');
                } //fin for

                $('#limites').dataTable({

                    "pageLength": 25,
                    select: true,
                    "ordering": false,
                    //responsive: true,
                    dom: "<'row mb-3'<'col-sm-12 col-md-4 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-8 d-flex align-items-center justify-content-end'B>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                    //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
                    buttons: [{
                            extend: 'pageLength',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'colvis',
                            text: 'Column Visibility',
                            titleAttr: 'Col visibility',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'collection',
                            text: 'Export',
                            buttons: [{ //meter librería jszip
                                    extend: 'excelHtml5',
                                    text: 'Excel',
                                    orientation: 'landscape',
                                    titleAttr: 'Generate Excel',
                                    className: 'btn-outline-default'
                                },
                                {
                                    extend: 'csvHtml5',
                                    text: 'CSV',
                                    titleAttr: 'Generate CSV',
                                    className: 'btn-outline-default'
                                },
                                {
                                    //se debe incluir libreria pdf maker
                                    extend: 'pdfHtml5',
                                    text: 'PDF',
                                    titleAttr: 'PDF',
                                    customize: function(doc) {
                                        //pageMargins [left, top, right, bottom]
                                        doc.pageMargins = [20, 20, 20, 20];
                                    },
                                    className: 'btn-outline-default'
                                }
                            ],
                            className: 'btn-outline-default'

                        },
                        {
                            extend: 'copyHtml5',
                            text: 'Copy',
                            titleAttr: 'Copy to clipboard',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'print',
                            text: '<i class="fal fa-print"></i>',
                            titleAttr: 'Print Table',
                            className: 'btn-outline-default'
                        }

                    ]

                }); //fin table library

            }); // fin funcion al controller

        } //FIN IF NUEVO
    }

    $scope.cambio = function() {
        var tipo = $('#selectTipo').val();
        consultarLimites(tipo)
    }

    $scope.add = function() {
        if ($('#selectTipo').val() == "varLimite") {
            $('#btnAgregar').slideUp('fast');
            $('#add').css('display', 'block');
            
            $('#inputsFromLimitesVar').css('display', '');
            $('#inputsFromLimitesVar2').css('display', '');

            $('#inputsMercados').css('display', 'none');
        } else if ($('#selectTipo').val() == "mercado") {
            $('#btnAgregar').slideUp('fast');
            $('#add').css('display', 'block');
            
            $('#inputsMercados').css('display', '');

            $('#inputsFromLimitesVar').css('display', 'none');
            $('#inputsFromLimitesVar2').css('display', 'none');
        }
    }

    $scope.cancelar = function() {

        $('#add').css('display', 'none');
        $('#btnAgregar').slideDown('fast');
        $('#contraparte').val('');
        $('#globalLimit').val('');
        $('#directOperationLimit').val('');
        $('#reportoOperationLimit').val('');
        $('#operationLimitMoneyMarket').val('');
        $('#exchangeMarketLimit').val('');
        $('#limitOperationExchangeMarket').val('');
        $('#add').css('display', 'none');
        $('#inputsFromLimitesVar').css('display', 'none');
        $('#contraparte').attr("placeholder", "Contraparte");

        $('#inputsNormal1').css('display', '');
        $('#inputsNormal2').css('display', '');
        $('#limitOperationExchangeMarket').css('display', '');
        $('#inputsFromLimitesVar2').css('display', 'none');



    }

    $scope.insert = function() {

        var tipo = $('#selectTipo').val();
        if(tipo=="mercado"){
            
            var nameMarket = $('#newNameMarket').val();
            var limiteMarket= $('#newMarketLimit').val();

            console.log("nameMarket",nameMarket);
            console.log("limiteMarket",limiteMarket);
            var mensjeError='';
            if(nameMarket==null || nameMarket==undefined || nameMarket=="" || nameMarket.length==0){
                mensjeError = 'Por Favor Ingrese el Nombre del Mercado'; 
            } else if(limiteMarket==null || limiteMarket==undefined || limiteMarket==0){
                mensjeError = 'Por Favor Ingrese el Límite del Mercado';
            } 
            if(mensjeError!=''){
                Swal.fire({
                    title: mensjeError,
                    text: '',
                    icon: 'warning',
                    confirmButtonColor: '#47FFAB',
                    confirmButtonText: 'OK',
                    reverseButtons: true
                }).then((result) => {});
            } else {

                var data={
                    nombre: nameMarket,
                    cdActivo: 1,
                    limite: limiteMarket                
                };

                functions.addLimitesMercado(token, data).then(function(response) {

                    $('#newNameMarket').val('');
                    $('#newMarketLimit').val('');
                    
                    $('#add').css('display', 'none');
                    $('#btnAgregar').slideDown('fast');
                    
                    var tipo = $('#selectTipo').val();
                    consultarLimites(tipo);

                    Swal.fire('Se registro correctamente', '', 'success'); 
                });
            }

        }else{
            var nombreProducto = $('#newNameProducto').val();
            var idMercado = $('#mercadoSelect').val();
            var limiteInstrumento= $('#instrumentLimitNuevo').val();
            var limiteTransaccion = $('#operationLimitNuevo').val();

            console.log("NOMBRE_PRODUCTO",nombreProducto);
            console.log("ID_MERCADO_SELECT",idMercado);
            console.log("LIMITE_PRODUCTO",limiteInstrumento);
            console.log("LIMITE_X_OPERACION",limiteTransaccion);

            var mensjeError='';
            if(nombreProducto==null || nombreProducto==undefined || nombreProducto=="" || nombreProducto.length==0){
                mensjeError = 'Por Favor Ingrese el Nombre del Producto'; 
            } else if(idMercado==0){
                mensjeError = 'Por Favor Seleccione un Mercado';
            } else if(limiteInstrumento==null || limiteInstrumento==undefined || limiteInstrumento==0){
                mensjeError = 'Por Favor Ingrese el Límite por Instrumento';
            } else if(limiteTransaccion==null || limiteTransaccion==undefined || limiteTransaccion==0){
                mensjeError = 'Por Favor Ingrese el Límite por Operación';
            }
            
            if(mensjeError!=''){
                Swal.fire({
                    title: mensjeError,
                    text: '',
                    icon: 'warning',
                    confirmButtonColor: '#47FFAB',
                    confirmButtonText: 'OK',
                    reverseButtons: true
                }).then((result) => {});
            } else {

                var data={
                    nombre: nombreProducto,
                    idMercado: idMercado,
                    cdActivo: 1,
                    limiteInstrumento: limiteInstrumento,
                    limiteTransaccion: limiteTransaccion
                };

                functions.addLimitesVarMd(token, data).then(function(response) {

                    $('#contraparte').val('');
                    $('#productoVarLimite').val('');
                    $('#globalLimit').val('');
                    $('#directOperationLimit').val('');
                    $('#reportoOperationLimit').val('');
                    $('#operationLimitMoneyMarket').val('');
                    $('#exchangeMarketLimit').val('');
                    $('#limitOperationExchangeMarket').val('');
                    $('#add').css('display', 'none');
                    $('#btnAgregar').slideDown('fast');
                    
                    $('#productoSelect').val('0');
                    $('#mercadoSelect').val('0');
                    $('#globalLimitNuevo').val('');
                    $('#operationLimitMoneyMarketNuevo').val('');
    
                    var tipo = $('#selectTipo').val();
                    consultarLimites(tipo);

                    Swal.fire('Se registro correctamente', '', 'success'); 
                });

            }          
        }
        

             
    } //fin metodo



    $scope.deleteq = function(id) {

        Swal.fire({
            title: '¿Esta seguro de querer eliminar la contraparte?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.value) {

                functions.deleteLimites(token, id).then(function(response) {
                    //TODO REFRESH

                })

            }
        });

    }


    $scope.deleteqMercadoVarLimite = function(id, tipo) {

        var tituloMensaTempo = "";
        if (tipo == "mercado") {
            tituloMensaTempo = "¿Esta seguro de Querer Eliminar el Mercado?"
        } else {
            tituloMensaTempo = "¿Esta Seguro de Querer Eliminar el Limite VaR?"

        }
        Swal.fire({
            title: tituloMensaTempo,
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.value) {
                if (tipo == "mercado") {
                    functions.deleteMercado(token, id).then(function(response) {
                        var tipo = $('#selectTipo').val();
                        consultarLimites(tipo);
                    })

                } else {
                    functions.deletelimiteVar(token, id).then(function(response) {
                        var tipo = $('#selectTipo').val();
                        consultarLimites(tipo);
                    })

                }
            }
        });

    }




    $scope.modificar = function(id, contador) {

        document.getElementById("button_modi_" + contador).style.display = "none";
        document.getElementById("button_guar_" + contador).style.display = "block";
        document.getElementById("button_cancel_" + contador).style.display = "block";

        contador = parseInt(contador) + 1;
        var table = document.getElementById("limites");
        var valueTr = table.getElementsByTagName('tr')[contador]

        if ($('#selectTipo').val() == "varLimite") {

            for (var i = 0; i < 3; i++) {
                var valueTd = valueTr.getElementsByTagName('td')[i]

                if (i != 0 && i != 3) {
                    var span = valueTd.getElementsByTagName("span")
                    span[0].style.display = "none";
                    var input = valueTd.getElementsByTagName("input")
                    input[0].style.display = "block";
                }

            }

        } else if ($('#selectTipo').val() == "mercado") {

            for (var i = 0; i < 2; i++) {
                var valueTd = valueTr.getElementsByTagName('td')[i]

                if (i != 0) {
                    var span = valueTd.getElementsByTagName("span")
                    span[0].style.display = "none";
                    var input = valueTd.getElementsByTagName("input")
                    input[0].style.display = "block";
                }

            }

        }





    }

    $scope.cancelModi = function(id, contador) {

        document.getElementById("button_modi_" + contador).style.display = "";
        document.getElementById("button_guar_" + contador).style.display = "none";
        document.getElementById("button_cancel_" + contador).style.display = "none";

        contador = parseInt(contador) + 1;
        var table = document.getElementById("limites");
        var valueTr = table.getElementsByTagName('tr')[contador]


        if ($('#selectTipo').val() == "varLimite") {

            for (var i = 0; i < 3; i++) {
                var valueTd = valueTr.getElementsByTagName('td')[i]

                if (i != 0) {
                    var span = valueTd.getElementsByTagName("span")
                    span[0].style.display = "block";
                    var input = valueTd.getElementsByTagName("input")
                        //input[0].value=""
                    input[0].style.display = "none";
                }

            }

        } else if ($('#selectTipo').val() == "mercado"){

            for (var i = 0; i < 2; i++) {
                var valueTd = valueTr.getElementsByTagName('td')[i]

                if (i != 0) {
                    var span = valueTd.getElementsByTagName("span")
                    span[0].style.display = "block";
                    var input = valueTd.getElementsByTagName("input")
                    //input[0].value="0.00";
                    input[0].style.display = "none";
                }

            }

        }
    }

    $scope.guardarModi = function(id, contador) {

        var valoresColumna = [];

        //document.getElementById("button_modi_"+contador).style.display="block";
        //document.getElementById("button_guar_"+contador).style.display="none";
        //document.getElementById("button_cancel_"+contador).style.display="none";

        contador = parseInt(contador) + 1;
        var table = document.getElementById("limites");
        var valueTr = table.getElementsByTagName('tr')[contador]

        for (var i = 0; i < 7; i++) {
            var valueTd = valueTr.getElementsByTagName('td')[i]

            if (i != 0) {

                var input = valueTd.getElementsByTagName("input")
                var valueInput = input[0].value;
                valoresColumna.push(valueInput);
                //input[0].value=""
                //input[0].style.display="none";
            }

        }

        console.log(valoresColumna);
        /*
          valoresColumna[0]=globalLimit
          valoresColumna[1]=directOperationLimit
          valoresColumna[2]=reportoOperationLimit
          valoresColumna[3]=operationLimitMoneyMarket
          valoresColumna[4]=exchangeMarketLimit
          valoresColumna[5]=limitOperationExchangeMarket
        */

        var validacionLimiteGlobal = (parseInt(valoresColumna[1])) + (parseInt(valoresColumna[2])) + (parseInt(valoresColumna[4]));
        console.log(validacionLimiteGlobal);
        var validacionOperacionMercadoMoney = (parseInt(valoresColumna[1])) + (parseInt(valoresColumna[2]));
        console.log(validacionOperacionMercadoMoney);
        var validacionOperacionMercadoCambios = (parseInt(valoresColumna[4]));
        console.log(validacionOperacionMercadoCambios);


        if (valoresColumna[0] == '') {
            toastr["error"]("Campo limite global es necesario", "");

        } else if (valoresColumna[1] == '') {
            toastr["error"]("Campo limite operaciones directo es necesario", "");

        } else if (valoresColumna[2] == '') {
            toastr["error"]("Campo limite operaciones reporto es necesario", "");

        } else if (valoresColumna[3] == '') {
            toastr["error"]("Campo limite por operacion es necesario", "");

        } else if (valoresColumna[4] == '') {
            toastr["error"]("Campo limite mercado es necesario", "");

        } else if (valoresColumna[5] == '') {
            toastr["error"]("Campo limite por operacion mercado es necesario", "");

        } else if (parseInt(valoresColumna[0]) < validacionLimiteGlobal) {

            //$('#globalLimit').focus();
            toastr["error"]("El campo limite global debe ser mayor", "");

        } else if (parseInt(valoresColumna[3]) > validacionOperacionMercadoMoney) {

            //$('#operationLimitMoneyMarket').focus();
            toastr["error"]("El campo limite por operación debe ser menor", "");

        } else if (parseInt(valoresColumna[5]) > validacionOperacionMercadoCambios) {

            //$('#limitOperationExchangeMarket').focus();
            toastr["error"]("El campo limite por operación mercado de cambios debe ser menor", "");

        } else {

            /*
          valoresColumna[0]=globalLimit
          valoresColumna[1]=directOperationLimit
          valoresColumna[2]=reportoOperationLimit
          valoresColumna[3]=operationLimitMoneyMarket
          valoresColumna[4]=exchangeMarketLimit
          valoresColumna[5]=limitOperationExchangeMarket
        */

            const data = JSON.stringify({
                contraparte: id,

                globalLimit: valoresColumna[0],
                directOperationLimit: valoresColumna[1],
                reportoOperationLimit: valoresColumna[2],
                operationLimitMoneyMarket: valoresColumna[3],
                exchangeMarketLimit: valoresColumna[4],
                limitOperationExchangeMarket: valoresColumna[5],

                mercado: 'mexicano',
                //usuario : "Roberto"
            });

            //document.getElementById("button_modi_" + contador).style.display = "block";
            //document.getElementById("button_guar_" + contador).style.display = "none";
            //document.getElementById("button_cancel_" + contador).style.display = "none";

            functions.updateLimites(token, data, id).then(function(response) {
                Swal.fire('Datos actualizados correctamente', '', 'success');

            })



        }





    }




    $scope.guardarModiMercadoVarLimite = function(id, contador, tipo, otro) {

        var valoresColumna = [];
        contador = parseInt(contador) + 1;
        var table = document.getElementById("limites");
        var valueTr = table.getElementsByTagName('tr')[contador]



        if (tipo == "varMd") {

            for (var i = 0; i < 3; i++) {
                var valueTd = valueTr.getElementsByTagName('td')[i]

                if (i != 0 && i != 3) {

                    var input = valueTd.getElementsByTagName("input")
                    var valueInput = input[0].value;
                    valoresColumna.push(valueInput);
                }

            }
        } else if (tipo == "mercado") {

            for (var i = 0; i < 2; i++) {
                var valueTd = valueTr.getElementsByTagName('td')[i]
                if (i != 0) {
                    var input = valueTd.getElementsByTagName("input")
                    var valueInput = input[0].value;
                    valoresColumna.push(valueInput);
                }

            }

        }


        console.log("VALORES_NUEVOS_ID:",id);
        console.log("VALORES_NUEVOS_COLUMNAS:",valoresColumna);
       
        if (tipo == "mercado") {

            const data = JSON.stringify({
                idMercado: id,
                limite: valoresColumna[0]
            });

            functions.updateLimitesMercado(token, data, id).then(function(response) {
                var tipo = $('#selectTipo').val();
                consultarLimites(tipo);
                Swal.fire('Datos actualizados correctamente', '', 'success');
            });
        } else if (tipo == "varMd") {
            
            const data = JSON.stringify({
                idInstrumento: id,
                limiteInstrumento: valoresColumna[0],
                limiteTransaccion: valoresColumna[1]
            });

            console.log("DATA_UPDATE:", data);
            functions.updateLimitesVarMd(token, data, id).then(function(response) {
                var tipo = $('#selectTipo').val();
                consultarLimites(tipo);
                Swal.fire('Datos actualizados correctamente', '', 'success');
            });
        }


    }



    $scope.formatDollar = function(num) {
        //console.log(num)
        var p = num.toFixed(2).split(".");
        if (p[0] >= 0) {

            return "" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
                return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
            }, "") + "." + p[1];

        } else {

            return "-" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
                return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
            }, "") + "." + p[1];

        }

    }

    formatDollar = $scope.formatDollar;


    agregar = $scope.agregar;
    consultarLimites = $scope.consultarLimites;
    cambio = $scope.cambio;
    add = $scope.add;
    cancelar = $scope.cancelar;
    insert = $scope.insert;
    deleteq = $scope.deleteq;
    modificar = $scope.modificar;
    cancelModi = $scope.cancelModi;
    guardarModi = $scope.guardarModi;
    deleteqMercadoVarLimite = $scope.deleteqMercadoVarLimite;
    guardarModiMercadoVarLimite = $scope.guardarModiMercadoVarLimite;

}); //fin controller limites




app.controller('semaforos', function($scope, functions, $window) {


    arrayContraparte = [];
    arrayLimiteGlobal = [];
    arrayLimiteUtilizado = [];
    arrayLimiteRestante = [];
    arrayContraparte2 = [];
    arrayLimiteGlobal2 = [];
    arrayLimiteUtilizado2 = [];
    arrayLimiteRestante2 = [];
    arrayContraparte3 = [];
    arrayLimiteGlobal3 = [];
    arrayLimiteUtilizado3 = [];
    arrayLimiteRestante3 = [];

    arrayContraparte4 = [];
    arrayLimiteGlobal4 = [];

    arrayContraparte5 = [];
    arrayLimiteGlobal5 = [];



    functions.loading()

    functions.getSemaforoContraParte(token).then(function(response) {
        var da = response.data;

        console.log("[getSemaforoContraParte]",da);
        $('#spinner').fadeIn();
        $('#conteTableSemaforo').append('<table class="table table-striped" id="semaforo" >' +
            '<thead class="bg-dark text-white">' +
            '<tr>' +
            '<th>Mercado</th>' +
            '<th>Instrumento</th>' +
            '<th>Nu Valuacion Dia</th>' +
            '<th>Nu Valuacion Historico</th>' +
            '<th>Nu Diferencia</th>' +
            '<th>Trader</th>' +
            '<th>ContraParte</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody id="tableSemaforo">' +
            '</tbody>' +
            '</table>');

        var dataChart =  [];
        var labelsChart = [];
        for (let i = 0; i < da.length; i++) {
            dataChart[da[i].contraparte] = 0;
        }

        for (let i = 0; i < da.length; i++) {
            //const resta = (parseFloat(da[i].globalLimit) - parseFloat(da[i].suma));
            //const porcentaje = ((resta * 100) / parseFloat(da[i].globalLimit));
            /*let clase = '';
            if (porcentaje > 50) {
                clase = 'alert alert-success';
            } else if (porcentaje > 25 && porcentaje < 50) {
                clase = 'alert alert-warning';
            } else {
                clase = 'alert alert-danger';
            }*/
            var valDia = parseFloat(da[i].nuValuacionDia);
            $('#tableSemaforo').append('<tr>' +
                '<td>' + da[i].mercado + '</td>' +
                '<td>' + da[i].instrumento + '</td>' +
                '<td>' + formatDollar(valDia) + '</td>' +
                '<td>' + formatDollar(parseFloat(da[i].nuValuacionHistorico)) + '</td>' +
                '<td>' + formatDollar(parseFloat(da[i].nuDiferencia)) + '</td>' +
                '<td>' + da[i].trader + '</td>' +
                '<td>' + da[i].contraparte + '</td>' +
                '</tr>');
            /*this.arrayContraparte.push(da[i].contraparte); // Pariente
            this.arrayLimiteGlobal.push(da[i].globalLimit); // Pariente
            this.arrayLimiteUtilizado.push(da[i].suma); // Pariente
            this.arrayLimiteRestante.push(resta); // Pariente
            */
            if (labelsChart.indexOf(da[i].contraparte) === -1){
                labelsChart.push(da[i].contraparte);   
            }
            dataChart[da[i].contraparte] =+valDia.toFixed(2);
        }

        $('#semaforo').dataTable({
            "pageLength": 3,
            select: true,
            "ordering": true,
            responsive: true,
            dom: "<'row mb-3'<'col-sm-12 col-md-4 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-8 d-flex align-items-center justify-content-end'B>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
            buttons: [{
                    extend: '',
                    text: '<span id="btnShowGraficaSemaforo" onclick="showChart(\'graficaSemaforo\', \'btnShowGraficaSemaforo\')">Mostrar Grafica</span>',
                    titleAttr: 'Regresar',
                    className: 'btn-outline-default'
                },
                {
                    extend: 'pageLength',
                    className: 'btn-outline-default'
                },
                {
                    extend: 'colvis',
                    text: 'Column Visibility',
                    titleAttr: 'Col visibility',
                    className: 'btn-outline-default'
                },
                {
                    extend: 'collection',
                    text: 'Export',
                    buttons: [{ //meter librería jszip
                            extend: 'excelHtml5',
                            text: 'Excel',
                            orientation: 'landscape',
                            titleAttr: 'Generate Excel',
                            className: 'btn-outline-default'
                        },
                        {
                            extend: 'csvHtml5',
                            text: 'CSV',
                            titleAttr: 'Generate CSV',
                            className: 'btn-outline-default'
                        },
                        {
                            //se debe incluir libreria pdf maker
                            extend: 'pdfHtml5',
                            text: 'PDF',
                            titleAttr: 'PDF',
                            customize: function(doc) {
                                //pageMargins [left, top, right, bottom]
                                doc.pageMargins = [20, 20, 20, 20];
                            },
                            className: 'btn-outline-default'
                        }
                    ],
                    className: 'btn-outline-default'

                },
                {
                    extend: 'copyHtml5',
                    text: 'Copy',
                    titleAttr: 'Copy to clipboard',
                    className: 'btn-outline-default'
                },
                {
                    extend: 'print',
                    text: '<i class="fal fa-print"></i>',
                    titleAttr: 'Print Table',
                    className: 'btn-outline-default'
                }

            ]

        });

        var dataValues=[];
        Object.keys(dataChart).forEach(function(key){
            dataValues.push(dataChart[key]);
        });
        console.log("LABELS_2", labelsChart);
        console.log("CHART_2", dataValues);
        functions.generarGraficaDonaBasic('graficaSemaforo', labelsChart, dataValues);
        //$scope.getListaSemaforosOperador();


    })



    $scope.getListaSemaforosOperador = function(id) {

        functions.getSemaforos(token, 1).then(function(response) {
            var da = response.data;
            console.log(da);

            $('#conteTableSemaforoUsuario').append('<table class="table table-striped" id="semaforoUsuario" >' +
                '<thead class="bg-warning-200">' +
                '<tr>' +
                '<th>Operador</th>' +
                '<th>Limite Global</th>' +
                '<th>Límite Utilizado</th>' +
                '<th>Límite Restante</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody id="tableSemaforoUsuario">' +
                '</tbody>' +
                '</table>');


            // console.log(da);
            const arrayContraparte = [],
                arrayLimiteGlobal = [],
                arrayLimiteUtilizado = [],
                arrayLimiteRestante = []; // Pariente
            for (let i = 0; i < da['length']; i++) {
                // console.log("....");
                const resta = (parseFloat(da[i].globalLimit) - parseFloat(da[i].suma));
                const porcentaje = ((resta * 100) / parseFloat(da[i].globalLimit));
                let clase = '';
                if (porcentaje > 50) {
                    clase = 'alert alert-success';
                } else if (porcentaje > 25 && porcentaje < 50) {
                    clase = 'alert alert-warning';
                } else {
                    clase = 'alert alert-danger';
                }

                $('#tableSemaforoUsuario').append('<tr>' +
                    '<td>' + da[i].contraparte + '</td>' +
                    '<td>' + formatDollar(parseFloat(da[i].globalLimit)) + '</td>' +
                    '<td>' + formatDollar(parseFloat(da[i].suma)) + '</td>' +
                    '<td class="' + clase + '">' + formatDollar(parseFloat(resta)) + '</td>' +
                    '</tr>');
                this.arrayContraparte2.push(da[i].contraparte); // Pariente
                this.arrayLimiteGlobal2.push(da[i].globalLimit); // Pariente
                this.arrayLimiteUtilizado2.push(da[i].suma); // Pariente
                this.arrayLimiteRestante2.push(resta); // Pariente
            }

            $('#semaforoUsuario').dataTable({

                "pageLength": 25,
                select: true,
                "ordering": true,
                responsive: true,
                dom: "<'row mb-3'<'col-sm-12 col-md-4 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-8 d-flex align-items-center justify-content-end'B>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
                buttons: [{
                        extend: '',
                        text: '<span id="btnShowGraficaSemaforoUsuario" onclick="showChart(\'graficaSemaforoUsuario\', \'btnShowGraficaSemaforoUsuario\')">Mostrar Grafica</span>',
                        titleAttr: 'Regresar',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'pageLength',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'colvis',
                        text: 'Column Visibility',
                        titleAttr: 'Col visibility',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'collection',
                        text: 'Export',
                        buttons: [{ //meter librería jszip
                                extend: 'excelHtml5',
                                text: 'Excel',
                                orientation: 'landscape',
                                titleAttr: 'Generate Excel',
                                className: 'btn-outline-default'
                            },
                            {
                                extend: 'csvHtml5',
                                text: 'CSV',
                                titleAttr: 'Generate CSV',
                                className: 'btn-outline-default'
                            },
                            {
                                //se debe incluir libreria pdf maker
                                extend: 'pdfHtml5',
                                text: 'PDF',
                                titleAttr: 'PDF',
                                customize: function(doc) {
                                    //pageMargins [left, top, right, bottom]
                                    doc.pageMargins = [20, 20, 20, 20];
                                },
                                className: 'btn-outline-default'
                            }
                        ],
                        className: 'btn-outline-default'

                    },
                    {
                        extend: 'copyHtml5',
                        text: 'Copy',
                        titleAttr: 'Copy to clipboard',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'print',
                        text: '<i class="fal fa-print"></i>',
                        titleAttr: 'Print Table',
                        className: 'btn-outline-default'
                    }

                ]

            });

            this.getListaSemaforosOperaciones();
            functions.generarGraficaSemaforos(arrayContraparte2, 'graficaSemaforoUsuario', arrayLimiteGlobal2);


        });
    }


    $scope.getListaSemaforosOperaciones = function() {

        functions.getListaSemaforosOperaciones(token).then(function(response) {
            var da = response.data;

            $('#conteTableSemaforoOperaciones').append('<table class="table table-striped" id="semaforoOperacion" >' +
                '<thead class="bg-warning-200">' +
                '<tr>' +
                '<th>Mercado</th>' +
                '<th>ID Operación</th>' +
                '<th>Contraparte</th>' +
                '<th>Operador</th>' +
                '<th>Reporto/Directo</th>' +
                '<th>Límite x Operación</th>' +
                '<th>Monto de la Operación</th>' +
                '<th>Límite Restante</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody id="tableSemaforoOperacion">' +
                '</tbody>' +
                '</table>');

            //console.log(da);
            const arrayContraparte = [],
                arrayLimiteGlobal = [],
                arrayLimiteUtilizado = [],
                arrayLimiteRestante = []; // Pariente
            for (let i = 0; i < da['length']; i++) {
                const resta = (parseFloat(da[i].reportoDirecto) - parseFloat(da[i].multiplicacion));
                /*	var porcentaje = ((resta*100) / parseFloat(da[i]['globalLimit']));
                var clase = "";
                if(porcentaje > 50 ){
                  clase = "alert alert-success";
                }else if(porcentaje > 25 && porcentaje < 50){
                  clase = "alert alert-warning";
                }else{
                  clase = "alert alert-danger";
                }*/

                $('#tableSemaforoOperacion').append('<tr>' +
                    '<td>M Dinero</td>' +
                    '<td>' + da[i].idOperacionesDirecto + '</td>' +
                    '<td>' + da[i].contraparte + '</td>' +
                    '<td>' + da[i].nombre + ' ' + da[i].apellido + '</td>' +
                    '<td>' + da[i].directoReporto + '</td>' +
                    '<td>' + formatDollar(parseFloat(da[i].reportoDirecto)) + '</td>' +
                    '<td>' + formatDollar(parseFloat(da[i].multiplicacion)) + '</td>' +
                    '<td>' + formatDollar(parseFloat(resta)) + '</td>' +
                    '</tr>');
                this.arrayContraparte3.push(da[i].contraparte); // Pariente
                this.arrayLimiteGlobal3.push(da[i].reportoDirecto); // Pariente
                this.arrayLimiteUtilizado3.push(da[i].multiplicacion); // Pariente
                this.arrayLimiteRestante3.push(resta); // Pariente
            }

            $('#semaforoOperacion').dataTable({

                "pageLength": 25,
                select: true,
                "ordering": true,
                responsive: true,
                dom: "<'row mb-3'<'col-sm-12 col-md-4 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-8 d-flex align-items-center justify-content-end'B>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
                buttons: [{
                        extend: '',
                        text: '<span id="btnShowGraficaSemaforoOperaciones" onclick="showChart(\'graficaSemaforoOperaciones\', \'btnShowGraficaSemaforoOperaciones\')">Mostrar Grafica</span>',
                        titleAttr: 'Regresar',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'pageLength',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'colvis',
                        text: 'Column Visibility',
                        titleAttr: 'Col visibility',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'collection',
                        text: 'Export',
                        buttons: [{ //meter librería jszip
                                extend: 'excelHtml5',
                                text: 'Excel',
                                orientation: 'landscape',
                                titleAttr: 'Generate Excel',
                                className: 'btn-outline-default'
                            },
                            {
                                extend: 'csvHtml5',
                                text: 'CSV',
                                titleAttr: 'Generate CSV',
                                className: 'btn-outline-default'
                            },
                            {
                                //se debe incluir libreria pdf maker
                                extend: 'pdfHtml5',
                                text: 'PDF',
                                titleAttr: 'PDF',
                                customize: function(doc) {
                                    //pageMargins [left, top, right, bottom]
                                    doc.pageMargins = [20, 20, 20, 20];
                                },
                                className: 'btn-outline-default'
                            }
                        ],
                        className: 'btn-outline-default'

                    },
                    {
                        extend: 'copyHtml5',
                        text: 'Copy',
                        titleAttr: 'Copy to clipboard',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'print',
                        text: '<i class="fal fa-print"></i>',
                        titleAttr: 'Print Table',
                        className: 'btn-outline-default'
                    }

                ]

            });


            functions.generarGraficaSemaforos(arrayContraparte3, 'graficaSemaforoOperaciones', arrayLimiteGlobal3);
            this.getListaSemaforosLimitesVarMdPre();

        });
    }

    var limiteUtilParaLimPro = "10";
    $scope.getListaSemaforosLimitesVarMdPre = function() {

        functions.mesaDeDerivados(token).then(function(response) {
            var da = response.data;
            console.log(da)
            console.log("antes de la tabla buena")
            limiteUtilParaLimPro = da[2][0]['var1'] // quizas
            this.getListaSemaforosLimitesVarMd();
        });



    }

    $scope.getListaSemaforosLimitesVarMd = function() {




        functions.getLimitesVarMd(token).then(function(response) {
            var da = response.data;
            console.log(da)
            console.log("termino--------")
            console.log("la tabla buena")

            $('#conteTableSemaforoVarLimite').append('<table class="table table-striped" id="semaforoLimiteVar" >' +
                '<thead class="bg-dark text-white">' +
                '<tr>' +
                '<th>Producto</th>' +
                '<th>Limite Global</th>' +
                '<th>Límite Utilizado</th>' +
                '<th>Límite Restante</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody id="tableSemaforoLimiteVar">' +
                '</tbody>' +
                '</table>');


            // console.log(da);
            const arrayContraparte = [],
                arrayLimiteGlobal = [],
                arrayLimiteUtilizado = [],
                arrayLimiteRestante = []; // Pariente
            for (let i = 0; i < da['length']; i++) {
                // console.log("....");
                da[i].suma = limiteUtilParaLimPro; //temporal
                const resta = (parseFloat(da[i].globalLimit) - parseFloat(da[i].suma));
                const porcentaje = ((resta * 100) / parseFloat(da[i].globalLimit));
                let clase = '';
                if (porcentaje > 50) {
                    clase = 'alert alert-success';
                } else if (porcentaje > 25 && porcentaje < 50) {
                    clase = 'alert alert-warning';
                } else {
                    clase = 'alert alert-danger';
                }

                var productoVistaTabla = "";
                if (da[i].producto == "2") {
                    productoVistaTabla = "Swap";
                } else {
                    productoVistaTabla = da[i].producto;
                }

                $('#tableSemaforoLimiteVar').append('<tr>' +
                    '<td>' + productoVistaTabla + '</td>' +
                    '<td>' + formatDollar(parseFloat(da[i].globalLimit)) + '</td>' +
                    '<td>' + formatDollar(parseFloat(da[i].suma)) + '</td>' +
                    '<td class="' + clase + '">' + formatDollar(parseFloat(resta)) + '</td>' +
                    '</tr>');
                this.arrayContraparte4.push(da[i].limite); // Pariente
                this.arrayLimiteGlobal4.push(da[i].globalLimit); // Pariente
                //this.arrayLimiteUtilizado2.push(da[i].suma); // Pariente
                //this.arrayLimiteRestante2.push(resta); // Pariente
            }

            $('#semaforoLimiteVar').dataTable({

                "pageLength": 25,
                select: true,
                "ordering": true,
                responsive: true,
                dom: "<'row mb-3'<'col-sm-12 col-md-4 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-8 d-flex align-items-center justify-content-end'B>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
                buttons: [{
                        extend: '',
                        text: '<span id="btnShowGraficaSemaforoLimiteVar" onclick="showChart(\'graficaSemaforoVarLimite\', \'btnShowGraficaSemaforoLimiteVar\')">Mostrar Grafica</span>',
                        titleAttr: 'Regresar',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'pageLength',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'colvis',
                        text: 'Column Visibility',
                        titleAttr: 'Col visibility',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'collection',
                        text: 'Export',
                        buttons: [{ //meter librería jszip
                                extend: 'excelHtml5',
                                text: 'Excel',
                                orientation: 'landscape',
                                titleAttr: 'Generate Excel',
                                className: 'btn-outline-default'
                            },
                            {
                                extend: 'csvHtml5',
                                text: 'CSV',
                                titleAttr: 'Generate CSV',
                                className: 'btn-outline-default'
                            },
                            {
                                //se debe incluir libreria pdf maker
                                extend: 'pdfHtml5',
                                text: 'PDF',
                                titleAttr: 'PDF',
                                customize: function(doc) {
                                    //pageMargins [left, top, right, bottom]
                                    doc.pageMargins = [20, 20, 20, 20];
                                },
                                className: 'btn-outline-default'
                            }
                        ],
                        className: 'btn-outline-default'

                    },
                    {
                        extend: 'copyHtml5',
                        text: 'Copy',
                        titleAttr: 'Copy to clipboard',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'print',
                        text: '<i class="fal fa-print"></i>',
                        titleAttr: 'Print Table',
                        className: 'btn-outline-default'
                    }

                ]

            });

            this.getHistoricoVarMercado();
            functions.generarGraficaSemaforos(arrayContraparte4, 'graficaSemaforoVarLimite', arrayLimiteGlobal4);


        });
    }


    
    $scope.getHistoricoVarMercado = function() {

        functions.getHistoricoVarMercado(token).then(function(response) {
            var data = response.data;
            console.log()
            console.log("[getHistoricoVarMercado] ", data)

            $('#conteTableSemaforoMercado').append('<table class="table table-striped" id="semaforoMercado" >' +
                '<thead class="bg-dark text-white">' +
                '<tr>' +
                '<th>Mercado</th>' +
                '<th>Fecha</th>' +
                '<th>Instrumento</th>' +
                '<th>Valuacion D</th>' +
                '<th>Valuacion H</th>' +
                '<th>Nu Diferencia</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody id="tableSemaforoMercado">' +
                '</tbody>' +
                '</table>');

            var dataHistotico =  {};
            var dataLimiteMercado =  [];
            var labelsChart = [];

            for (let i = 0; i < data.length; i++) {
                dataHistotico[data[i].mercado] = [];
            }

            for (let i = 0; i < data.length; i++) {
                
                $('#tableSemaforoMercado').append('<tr>' +
                    '<td>' + data[i].mercado + '</td>' +
                    '<td>' + data[i].fhDate + '</td>' +
                    '<td>' + data[i].instrumento + '</td>' +
                    '<td>' + formatDollar(parseFloat(data[i].nuValuaciond)) + '</td>' +
                    '<td>' + formatDollar(parseFloat(data[i].nuValuacionh)) + '</td>' +
                    '<td>' + formatDollar(parseFloat(data[i].nuDiferencia)) + '</td>' +
                    '</tr>');
                
                dataHistotico[data[i].mercado].push(Math.abs(data[i].nuDiferencia).toFixed(2));
                
                if (labelsChart.indexOf(data[i].fhDate) === -1){
                    labelsChart.push(data[i].fhDate);
                    dataLimiteMercado.push(Math.abs(data[i].limite).toFixed(2));    
                }
            }

            $('#semaforoMercado').dataTable({

                "pageLength": 3,
                select: true,
                "ordering": true,
                responsive: true,
                dom: "<'row mb-3'<'col-sm-12 col-md-4 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-8 d-flex align-items-center justify-content-end'B>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                //data: [ [ "Tiger Nixon", "System Architect", "Edinburgh", "5421" ],[ "Tigerr Nixon", "System Architect", "Edinburgh", "5421" ] ],
                buttons: [{
                        extend: '',
                        text: '<span id="btnShowGraficaSemaforoMercado" onclick="showChart(\'graficaSemaforoMercado\', \'btnShowGraficaSemaforoMercado\')">Mostrar Grafica</span>',
                        titleAttr: 'Regresar',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'pageLength',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'colvis',
                        text: 'Column Visibility',
                        titleAttr: 'Col visibility',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'collection',
                        text: 'Export',
                        buttons: [{ //meter librería jszip
                                extend: 'excelHtml5',
                                text: 'Excel',
                                orientation: 'landscape',
                                titleAttr: 'Generate Excel',
                                className: 'btn-outline-default'
                            },
                            {
                                extend: 'csvHtml5',
                                text: 'CSV',
                                titleAttr: 'Generate CSV',
                                className: 'btn-outline-default'
                            },
                            {
                                //se debe incluir libreria pdf maker
                                extend: 'pdfHtml5',
                                text: 'PDF',
                                titleAttr: 'PDF',
                                customize: function(doc) {
                                    //pageMargins [left, top, right, bottom]
                                    doc.pageMargins = [20, 20, 20, 20];
                                },
                                className: 'btn-outline-default'
                            }
                        ],
                        className: 'btn-outline-default'

                    },
                    {
                        extend: 'copyHtml5',
                        text: 'Copy',
                        titleAttr: 'Copy to clipboard',
                        className: 'btn-outline-default'
                    },
                    {
                        extend: 'print',
                        text: '<i class="fal fa-print"></i>',
                        titleAttr: 'Print Table',
                        className: 'btn-outline-default'
                    }

                ]

            });

            var dataSet=[{
                type: 'line',
                label: 'Límite Global',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgb(255, 205, 86)',
                data: dataLimiteMercado,
            }];
            var dynamicColors = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
             };
            Object.keys(dataHistotico).forEach(function(key){
                var color = dynamicColors();
                dataSet.push({
                    type: 'line',
                    data: dataHistotico[key],
                    label: key,
                    backgroundColor: color,
                    borderColor: color,
                    fill: false,      
                    borderWidth: 2,
                });
            });

            const dataChart = {
                labels: labelsChart,
                datasets: dataSet
            };
            console.log('dataChart', dataChart);
            functions.generarGraficaHistoricoVaR('graficaSemaforoMercado', dataChart, 'Histórico VaR');


        });
    };
    $scope.getHistoricoVarMercado();





    $scope.formatDollar = function(num) {
        //console.log(num)
        var p = num.toFixed(2).split(".");
        if (p[0] >= 0) {

            return "" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
                return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
            }, "") + "." + p[1];

        } else {

            return "-" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
                return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
            }, "") + "." + p[1];

        }

    }

    formatDollar = $scope.formatDollar;

    $scope.showChart = function(idGrafica, idButton, idContenedor) {
        if (document.getElementById(idGrafica).style.display == "none") {
            if(undefined!=idContenedor){
                document.getElementById(idContenedor).style.display = "block";    
            }
            document.getElementById(idGrafica).style.display = "block";
            document.getElementById(idButton).text = "Ocultar Grafica";
            document.getElementById(idButton).innerHTML = "Ocultar Grafica";
        } else {
            if(undefined!=idContenedor){
                document.getElementById(idContenedor).style.display = "none";    
            }
            document.getElementById(idGrafica).style.display = "none";
            document.getElementById(idButton).text = "Mostrar Grafica";
            document.getElementById(idButton).innerHTML = "Mostrar Grafica";

        }
    }


    getListaSemaforosOperador = $scope.getListaSemaforosOperador;
    getListaSemaforosOperaciones = $scope.getListaSemaforosOperaciones;
    chart = $scope.chart;
    showChart = $scope.showChart;
    getListaSemaforosLimitesVarMd = $scope.getListaSemaforosLimitesVarMd;
    getListaSemaforosLimitesVarMdPre = $scope.getListaSemaforosLimitesVarMdPre;
    getHistoricoVarMercado = $scope.getHistoricoVarMercado;
}); //fin controller semaforos




app.controller('logaritmo', function($scope, functions, $window) {



        functions.loading()

        $scope.logaritmo = function() {

            let tasa = $('#tasaMercado').val();
            if (tasa === '') {
                tasa = 0;
            }

            let obj = {
                descripcion: $('#producto').val(),
                tasa: tasa,
                fecha: $('#fecha').val()
            };
            let myjson = JSON.stringify(obj);

            functions.getLogaritmo(token, myjson).then(function(response) {
                var response = response.data;

                $('#conteLog').empty();
                if (response['length'] > 0) {
                    for (let i = 0; i < response['length']; i++) {
                        let suma = parseFloat((tasa)) + parseFloat((response[i].logaritmo));
                        $('#conteLog')
                            .append(
                                '<div>' +
                                '<div class="col-sm-6" style="display: inline-table;">' +
                                response[i].logaritmo +
                                '</div>' +
                                '<div class="col-sm-6" style="display: inline-table;">' +
                                suma + '</div></div>');

                    }
                } else {
                    $('#conteLog').append(
                        '<center><h2>Sin Resultados</h2></center>');
                }



            })

        }

        logaritmo = $scope.logaritmo

    }) // fin controller


app.controller('csv', function($scope, functions, $window) {
    var rows = [];
    var cols = [];
    var cdCurvas = [];

    $scope.getParameter = function() {
        $('#loader-wrapper').css('display', '');
        functions.getParametros(token).then(function(response) {
            var response = response.data;
            console.log(response);
            console.log("termino el proceso--------")
            var options = { year: "numeric", month: "long", day: "numeric" };
            var cellValue = response[1];
            var date = new Date(cellValue);
            $("#fecha").text("Fecha: " + date.toLocaleDateString("es-ES", options));
            for (var i = 0; i < response[0].length; i++) {
                rows.push(response[0][i]["filas"]);
                cols.push(response[0][i]["columna"]);
                cdCurvas.push(response[0][i]["cdCurva"]);
            }
            console.log("ROWS::",rows);
            console.log("COLS::",cols);
            console.log("CD_CURVAS::",cdCurvas);
            $('#loader-wrapper').css('display', 'none');
        }).catch(err => {
            $('#loader-wrapper').css('display', 'none');
            Swal.fire({
                title: 'Error al conectar con la base de datos',
                icon: 'error',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: `Recargar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    location.reload();
                }
            })
            console.log(err)
        })
    }

  
    $scope.up = function(results) {
        $('#loader-wrapper').css('display', '');
        var xlsxflag = false;
        if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {
            xlsxflag = true;
        } else if ($("#excelfile").val().toLowerCase().indexOf(".csv") > 0) {
            xlsxflag = false;
        } else {
            xlsxflag = false;
        }
        /*Checks whether the browser supports HTML5*/
        if (typeof(FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                if (xlsxflag) {
                    var workbook = XLSX.read(data, { type: 'binary', cellText: false, cellDates: true });
                } else {
                    var workbook = XLS.read(data, { type: 'binary', cellText: false, cellDates: true });
                }
                var Sheet = workbook.SheetNames[0];
                if (xlsxflag) {
                    var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[Sheet], { raw: false, dateNF: 'yyyy-mm-dd' });
                } else {
                    var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[Sheet], { raw: false, dateNF: 'yyyy-mm-dd' });
                }
                if (exceljson.length > 0) {
                    console.log(exceljson);
                    procesoExcel(exceljson);
                }
            }
            if (xlsxflag) {
                reader.readAsArrayBuffer($("#excelfile")[0].files[0]);
            } else {
                reader.readAsBinaryString($("#excelfile")[0].files[0]);
            }
        } else {
            $('#loader-wrapper').css('display', 'none');
            alert("Sorry! Your browser does not support HTML5!");
        }
    }

    $scope.existeDatos = function (){
        var fechaCalendario = document.getElementById("calendario").value;
        if (fechaCalendario != null && fechaCalendario != undefined && fechaCalendario !='') {
            var data={
                fecha:fechaCalendario
            };
            functions.existenDatos(token, data).then(function(response) {
                var numeroRegistros = response.data;
                console.log("RES_1",numeroRegistros);
                
                if(numeroRegistros > 0){
                    Swal.fire({
                        title: 'Se Encontrarón Datos Para el Proceso Seleccionado, ¿Desea Reemplazarlos?',
                        icon: 'warning',
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: 'Continuar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $scope.deleteExistenteFecha();                           
                        };
                    })
                } else {
                    $scope.up();
                }
            })
        } else {
            $scope.up();
        }
    }
    existeDatos = $scope.existeDatos;

    $scope.deleteExistenteFecha = function (){
        var fechaCalendario = document.getElementById("calendario").value;
        var data={
            fecha:fechaCalendario
        }; functions.deleteExistenteFecha(token, data).then(function(response) {
            $scope.up();
        })
    }

    $scope.insertaLn = function (){
        var fechaCalendario = document.getElementById("calendario").value;
        var data={
            fecha:fechaCalendario
        }; 
        debugger;
        functions.insertaLn(token, data).then(function(response) {
      
        })
    }

    $scope.procesoExcel = function(jsondata) {
        $('#loader-wrapper').css('display', '');
        var rv2 = {};
        var url;
        var tipo = document.getElementById('elements').value;
        var columns = header(jsondata);
        var conteo = 0;

        if (tipo == "1") { // H_Curvas >> ahora Curvas
            for (var c = 0; c < columns.length; c++) {
                var rv = {};
                var arrayRows = rows[c].split('|');
                var d = 0;
                var val = 1;
                for (var i = 0; i < arrayRows.length; i++) {
                    if (i == 0) {
                        var dataInt = parseInt(arrayRows[i]) - 1
                        rv[d] = conteo;
                        conteo++
                        d++;
                        console.log("ID?",cdCurvas[c]);
                        rv[d] = cdCurvas[c];
                        d++;
                        rv[d] = jsondata[dataInt][columns[c]]
                        d++;
                    } else {
                        var dataInt = parseInt(arrayRows[i]) - 1
                        rv[d] = jsondata[dataInt][columns[c]]
                        d++;
                    }
                }
                console.log(rv);
                console.log("FECHA:",  document.getElementById("calendario").value);
                rv.fecha = document.getElementById("calendario").value;
                url = 'hcurvas';
                console.log(rv);
                functions.csv(token, rv, url).then(function(response) {
                    var response = response.data;
                    console.log(response)
                    return response
                }).then(res => {

                    if (val == columns.length) {
                        $('#loader-wrapper').css('display', 'none');
                        Swal.fire({
                            title: 'Proceso Realizado Correctamente.',
                            icon: 'success',
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: `Entendido`,
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {}
                        })
                    }
                    val++;
                }).catch(error => {
                    $('#loader-wrapper').css('display', 'none');
                    Swal.fire({
                        title: 'Error en el Proceso.',
                        icon: 'error',
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: `Entendido`,
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {}
                    })
                    return
                })
            }

            $scope.insertaLn();

        } else if (tipo == "12") { //CURVAS
            return new Promise((resolve, reject) => {
                functions.deleteSwapData(token).then(function(response) {
                    var response = response.data;
                    console.log(response);
                    console.log("termino el proceso de eliminación--------")
                    return response;
                }).then(res => {
                    console.log(res);
                    var r = 0
                    var val = 1;
                    var val2 = 0;
                    for (var d = 0; d < rows.length; d++) {
                        var arrayRows = rows[d].split('|');
                        val2 = arrayRows.length + val2;
                    }
                    for (var i = 0; i < rows.length; i++) {
                        var arrayRows = rows[i].split('|');
                        for (var e = 0; e < arrayRows.length; e++) {
                            var rv = {};
                            var dataInt = parseInt(arrayRows[e]) - 1
                            rv[0] = r;
                            r++;
                            var index = 1
                            rv[index] = cdCurvas[i];
                            index++;
                            rv[index] = dataInt + 1;
                            index++;
                            var cellValue = jsondata[dataInt][columns[i]];
                            rv[index] = cellValue;
                            url = 'curvas';
                            functions.csv(token, rv, url).then(function(response) {
                                var response = response.data;
                                console.log(response)
                                return response
                            }).then(res => {
                                console.log(val)
                                if (val == val2) {
                                    $('#loader-wrapper').css('display', 'none');
                                    Swal.fire({
                                        title: 'Proceso Realizado Correctamente.',
                                        icon: 'success',
                                        showDenyButton: false,
                                        showCancelButton: false,
                                        confirmButtonText: `Entendido`,
                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {}
                                    })
                                }
                                val++;
                            }).catch(error => {
                                $('#loader-wrapper').css('display', 'none');

                                Swal.fire({
                                    title: 'Error en el Proceso.',
                                    icon: 'error',
                                    showDenyButton: false,
                                    showCancelButton: false,
                                    confirmButtonText: `Entendido`,
                                }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {}
                                })
                                return
                            })
                        }
                    }

                })
            })

        } else if (tipo == "2") { // SWAPS
            
            var val1 = 1;
            for (var i = 0; i < jsondata.length; i++) {
                var rv = {};
                url = 'deswap';
                if (columns.length == 18) {
                    rv[0] = conteo;
                    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                        if (colIndex == 2 || colIndex == 3) {
                            var cellValue = jsondata[i][columns[colIndex]];
                            if (cellValue.indexOf("/") > -1) {
                                var arrayRows = cellValue.split('/');
                                if (isNaN(date.getTime())) {
                                    var arrayRows = cellValue.split('/');
                                    var d = arrayRows[2] + "-" + arrayRows[1] + "-" + arrayRows[0]
                                } else {
                                    date.setDate(date.getDate() + 1);
                                    var d = date.toISOString().slice(0, 10);
                                }
                            } else if (cellValue.indexOf("-") > -1) {
                                var date = new Date(cellValue);
                                if (isNaN(date.getTime())) {
                                    $('#loader-wrapper').css('display', 'none');
                                    Swal.fire({
                                        title: 'Error en el Formato de Fecha.',
                                        text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                        icon: 'error',
                                        showDenyButton: false,
                                        showCancelButton: false,
                                        confirmButtonText: `Entendido`,
                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {}
                                    })
                                    return
                                } else {
                                    date.setDate(date.getDate() + 1);
                                    var d = date.toISOString().slice(0, 10);
                                }
                            } else {
                                $('#loader-wrapper').css('display', 'none');
                                Swal.fire({
                                    title: 'Error en el Formato de Fecha.',
                                    text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                    icon: 'error',
                                    showDenyButton: false,
                                    showCancelButton: false,
                                    confirmButtonText: `Entendido`,
                                }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {}
                                })
                                return

                            }
                            rv[colIndex + 1] = d;
                        } else {
                            var cellValue = jsondata[i][columns[colIndex]];
                            rv[colIndex + 1] = cellValue;
                        }
                    }
                    conteo++;
                    functions.csv(token, rv, url).then(function(response) {
                        var response = response.data;
                        console.log(response)
                        return response
                    }).then(res => {
                        if (val1 == jsondata.length) {
                            $('#loader-wrapper').css('display', 'none');
                            Swal.fire({
                                title: 'Proceso Realizado Correctamente.',
                                icon: 'success',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {}
                            })
                        }
                        val1++;
                    }).catch(error => {
                        $('#loader-wrapper').css('display', 'none');

                        Swal.fire({
                            title: 'Error en el Proceso.',
                            icon: 'error',
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: `Entendido`,
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {}
                        })
                        return
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de Archivo.',
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: `Entendido`,
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            $('#loader-wrapper').css('display', 'none');
                        }
                    })
                    return;
                }
            }
                
        } else {
            var val1 = 1;
            for (var i = 0; i < jsondata.length; i++) {
                var rv = {};
                switch (tipo) {
                    //CAPS
                    case "10":
                        url = 'decapsfloor';
                        if (columns.length == 10) {
                            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                                if (colIndex == 2 || colIndex == 3) {
                                    var cellValue = jsondata[i][columns[colIndex]];
                                    if (cellValue.indexOf("/") > -1) {
                                        if (isNaN(date.getTime())) {
                                            var arrayRows = cellValue.split('/');
                                            var d = arrayRows[2] + "-" + arrayRows[1] + "-" + arrayRows[0]
                                        } else {
                                            date.setDate(date.getDate() + 1);
                                            var d = date.toISOString().slice(0, 10);
                                        }
                                    } else if (cellValue.indexOf("-") > -1) {
                                        var date = new Date(cellValue);
                                        if (isNaN(date.getTime())) {
                                            $('#loader-wrapper').css('display', 'none');
                                            Swal.fire({
                                                title: 'Error en el Formato de Fecha.',
                                                text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                                icon: 'error',
                                                showDenyButton: false,
                                                showCancelButton: false,
                                                confirmButtonText: `Entendido`,
                                            }).then((result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {}
                                            })
                                            return
                                        } else {
                                            date.setDate(date.getDate() + 1);
                                            var d = date.toISOString().slice(0, 10);
                                        }
                                    } else {
                                        $('#loader-wrapper').css('display', 'none');
                                        Swal.fire({
                                            title: 'Error en el Formato de Fecha.',
                                            text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                            icon: 'error',
                                            showDenyButton: false,
                                            showCancelButton: false,
                                            confirmButtonText: `Entendido`,
                                        }).then((result) => {
                                            /* Read more about isConfirmed, isDenied below */
                                            if (result.isConfirmed) {}
                                        })
                                        return

                                    }
                                    rv[colIndex] = d;
                                } else {
                                    var cellValue = jsondata[i][columns[colIndex]];
                                    rv[colIndex] = cellValue;
                                }
                            }
                            console.log(rv);
                            functions.csv(token, rv, url).then(function(response) {
                                var response = response.data;
                                console.log(response)
                                return response
                            }).then(res => {
                                if (val1 == jsondata.length) {
                                    $('#loader-wrapper').css('display', 'none');
                                    Swal.fire({
                                        title: 'Proceso Realizado Correctamente.',
                                        icon: 'success',
                                        showDenyButton: false,
                                        showCancelButton: false,
                                        confirmButtonText: `Entendido`,
                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {}
                                    })
                                }
                                val1++;
                            }).catch(error => {
                                $('#loader-wrapper').css('display', 'none');
                                Swal.fire({
                                    title: 'Error en el Proceso.',
                                    icon: 'error',
                                    showDenyButton: false,
                                    showCancelButton: false,
                                    confirmButtonText: `Entendido`,
                                }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {}
                                })
                                return
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error de Archivo.',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    $('#loader-wrapper').css('display', 'none');
                                }
                            })

                            return;
                        }
                        break;
                    // FLUJO DE CAPS
                    case "11":

                        url = 'flujoscapsfloor';

                        if (columns.length == 7) {

                            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                                if (colIndex == 2) {
                                    var cellValue = jsondata[i][columns[colIndex]];
                                    if (cellValue.indexOf("/") > -1) {
                                        var arrayRows = cellValue.split('/');
                                        if (isNaN(date.getTime())) {
                                            var arrayRows = cellValue.split('/');
                                            var d = arrayRows[2] + "-" + arrayRows[1] + "-" + arrayRows[0]
                                        } else {
                                            date.setDate(date.getDate() + 1);
                                            var d = date.toISOString().slice(0, 10);
                                        }
                                    } else if (cellValue.indexOf("-") > -1) {
                                        var date = new Date(cellValue);

                                        if (isNaN(date.getTime())) {
                                            $('#loader-wrapper').css('display', 'none');
                                            Swal.fire({
                                                title: 'Error en el Formato de Fecha.',
                                                text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                                icon: 'error',
                                                showDenyButton: false,
                                                showCancelButton: false,
                                                confirmButtonText: `Entendido`,
                                            }).then((result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {}
                                            })
                                            return
                                        } else {
                                            date.setDate(date.getDate() + 1);
                                            var d = date.toISOString().slice(0, 10);
                                        }
                                    } else {
                                        $('#loader-wrapper').css('display', 'none');
                                        Swal.fire({
                                            title: 'Error en el Formato de Fecha.',
                                            text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                            icon: 'error',
                                            showDenyButton: false,
                                            showCancelButton: false,
                                            confirmButtonText: `Entendido`,
                                        }).then((result) => {
                                            /* Read more about isConfirmed, isDenied below */
                                            if (result.isConfirmed) {}
                                        })
                                        return

                                    }
                                    rv[colIndex] = d;
                                } else {
                                    var cellValue = jsondata[i][columns[colIndex]];
                                    rv[colIndex] = cellValue;
                                }

                            }
                            functions.csv(token, rv, url).then(function(response) {
                                var response = response.data;
                                console.log(response)
                                return response
                            }).then(res => {
                                if (val1 == jsondata.length) {
                                    $('#loader-wrapper').css('display', 'none');
                                    Swal.fire({
                                        title: 'Proceso Realizado Correctamente.',
                                        icon: 'success',
                                        showDenyButton: false,
                                        showCancelButton: false,
                                        confirmButtonText: `Entendido`,
                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {}
                                    })
                                }
                                val1++;
                            }).catch(error => {
                                $('#loader-wrapper').css('display', 'none');

                                Swal.fire({
                                    title: 'Error en el Proceso.',
                                    icon: 'error',
                                    showDenyButton: false,
                                    showCancelButton: false,
                                    confirmButtonText: `Entendido`,
                                }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {}
                                })
                                return
                            })

                            console.log(rv);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error de Archivo.',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    $('#loader-wrapper').css('display', 'none');
                                }
                            })
                            return;
                        }
                        break;
                    // FLUJO DE SWAPS
                    case "3":
                        url = 'flujosSwap';

                        if (columns.length == 10) {

                            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                                if (colIndex == 2 || colIndex == 7) {
                                    var cellValue = jsondata[i][columns[colIndex]];
                                    if (cellValue.indexOf("/") > -1) {
                                        if (isNaN(date.getTime())) {
                                            var arrayRows = cellValue.split('/');
                                            var d = arrayRows[2] + "-" + arrayRows[1] + "-" + arrayRows[0]
                                        } else {
                                            date.setDate(date.getDate() + 1);
                                            var d = date.toISOString().slice(0, 10);
                                        }
                                    } else if (cellValue.indexOf("-") > -1) {
                                        var date = new Date(cellValue);

                                        if (isNaN(date.getTime())) {
                                            $('#loader-wrapper').css('display', 'none');
                                            Swal.fire({
                                                title: 'Error en el Formato de Fecha.',
                                                text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                                icon: 'error',
                                                showDenyButton: false,
                                                showCancelButton: false,
                                                confirmButtonText: `Entendido`,
                                            }).then((result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {}
                                            })
                                            return
                                        } else {
                                            date.setDate(date.getDate() + 1);
                                            var d = date.toISOString().slice(0, 10);
                                        }
                                    } else {
                                        $('#loader-wrapper').css('display', 'none');
                                        Swal.fire({
                                            title: 'Error en el Formato de Fecha.',
                                            text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                            icon: 'error',
                                            showDenyButton: false,
                                            showCancelButton: false,
                                            confirmButtonText: `Entendido`,
                                        }).then((result) => {
                                            /* Read more about isConfirmed, isDenied below */
                                            if (result.isConfirmed) {}
                                        })
                                        return

                                    }
                                    rv[colIndex] = d;
                                } else {
                                    var cellValue = jsondata[i][columns[colIndex]];
                                    rv[colIndex] = cellValue;
                                }
                            }
                            console.log(rv);
                            functions.csv(token, rv, url).then(function(response) {
                                var response = response.data;
                                console.log(response)
                                return response
                            }).then(res => {
                                if (val1 == jsondata.length) {
                                    $('#loader-wrapper').css('display', 'none');
                                    Swal.fire({
                                        title: 'Proceso Realizado Correctamente.',
                                        icon: 'success',
                                        showDenyButton: false,
                                        showCancelButton: false,
                                        confirmButtonText: `Entendido`,
                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {}
                                    })
                                }
                                val1++;
                            }).catch(error => {
                                $('#loader-wrapper').css('display', 'none');
                                Swal.fire({
                                    title: 'Error en el Proceso.',
                                    icon: 'error',
                                    showDenyButton: false,
                                    showCancelButton: false,
                                    confirmButtonText: `Entendido`,
                                }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {}
                                })
                                return
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error de Archivo.',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    $('#loader-wrapper').css('display', 'none');
                                }
                            })
                            return;
                        }
                        break;
                    // FORDWARD
                    case "4":
                        url = 'fordward';
                        
                        if (columns.length == 14) {

                            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                                console.log('cheli',colIndex,jsondata[i][columns[colIndex]]);

                                if (colIndex == 2 || colIndex == 3) {
                                    var cellValue = jsondata[i][columns[colIndex]];
                                    if (cellValue.indexOf("/") > -1) {
                                        if (isNaN(date.getTime())) {
                                            var arrayRows = cellValue.split('/');
                                            var d = arrayRows[2] + "-" + arrayRows[1] + "-" + arrayRows[0]
                                        } else {
                                            date.setDate(date.getDate() + 1);
                                            var d = date.toISOString().slice(0, 10);
                                        }
                                    } else if (cellValue.indexOf("-") > -1) {
                                        var date = new Date(cellValue);

                                        if (isNaN(date.getTime())) {
                                            $('#loader-wrapper').css('display', 'none');
                                            Swal.fire({
                                                title: 'Error en el Formato de Fecha.',
                                                text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                                icon: 'error',
                                                showDenyButton: false,
                                                showCancelButton: false,
                                                confirmButtonText: `Entendido`,
                                            }).then((result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {}
                                            })
                                            return
                                        } else {
                                            date.setDate(date.getDate() + 1);
                                            var d = date.toISOString().slice(0, 10);
                                        }
                                    } else {
                                        $('#loader-wrapper').css('display', 'none');
                                        Swal.fire({
                                            title: 'Error en el Formato de Fecha.',
                                            text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                            icon: 'error',
                                            showDenyButton: false,
                                            showCancelButton: false,
                                            confirmButtonText: `Entendido`,
                                        }).then((result) => {
                                            /* Read more about isConfirmed, isDenied below */
                                            if (result.isConfirmed) {}
                                        })
                                        return

                                    }
                                    rv[colIndex] = d;
                                } else {
                                    var cellValue = jsondata[i][columns[colIndex]];
                                    rv[colIndex] = cellValue;
                                }
                            }
                            console.log(rv);
                            functions.csv(token, rv, url).then(function(response) {
                                var response = response.data;
                                console.log(response)
                                return response
                            }).then(res => {
                                if (val1 == jsondata.length) {
                                    $('#loader-wrapper').css('display', 'none');
                                    Swal.fire({
                                        title: 'Proceso Realizado Correctamente.',
                                        icon: 'success',
                                        showDenyButton: false,
                                        showCancelButton: false,
                                        confirmButtonText: `Entendido`,
                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {}
                                    })
                                }
                                val1++;
                            }).catch(error => {
                                $('#loader-wrapper').css('display', 'none');
                                Swal.fire({
                                    title: 'Error en el Proceso.',
                                    icon: 'error',
                                    showDenyButton: false,
                                    showCancelButton: false,
                                    confirmButtonText: `Entendido`,
                                }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {}
                                })
                                return
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error de Archivo.',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    $('#loader-wrapper').css('display', 'none');
                                }
                            })
                            return;
                        }
                        break;
                        
                    // MESA DE DEUDA
                    case "5":
                        url = 'deuda';

                        if (columns.length == 25) {

                            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                               var cellValue = jsondata[i][columns[colIndex]];
                                rv[colIndex] = cellValue;
                                
                            }
                            console.log(rv);
                            functions.csv(token, rv, url).then(function(response) {
                                var response = response.data;
                                console.log(response)
                                return response
                            }).then(res => {
                                if (val1 == jsondata.length) {
                                    $('#loader-wrapper').css('display', 'none');
                                    Swal.fire({
                                        title: 'Proceso Realizado Correctamente.',
                                        icon: 'success',
                                        showDenyButton: false,
                                        showCancelButton: false,
                                        confirmButtonText: `Entendido`,
                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {}
                                    })
                                }
                                val1++;
                            }).catch(error => {
                                $('#loader-wrapper').css('display', 'none');
                                Swal.fire({
                                    title: 'Error en el Proceso.',
                                    icon: 'error',
                                    showDenyButton: false,
                                    showCancelButton: false,
                                    confirmButtonText: `Entendido`,
                                }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {}
                                })
                                return
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error de Archivo.',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    $('#loader-wrapper').css('display', 'none');
                                }
                            })
                            return;
                        }
                        break;

                         // Flujo mesa de deudas
                    case "6":
                        url = 'flujosDeuda';
                        
                        if (columns.length == 7) {

                            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                                console.log('cheli',colIndex,jsondata[i][columns[colIndex]]);

                                if (colIndex == 5 || colIndex == 6) {
                                    var cellValue = jsondata[i][columns[colIndex]];
                                    if (cellValue.indexOf("/") > -1) {
                                        if (isNaN(date.getTime())) {
                                            var arrayRows = cellValue.split('/');
                                            var d = arrayRows[2] + "-" + arrayRows[1] + "-" + arrayRows[0]
                                        } else {
                                            date.setDate(date.getDate() + 1);
                                            var d = date.toISOString().slice(0, 10);
                                        }
                                    } else if (cellValue.indexOf("-") > -1) {
                                        var date = new Date(cellValue);

                                        if (isNaN(date.getTime())) {
                                            $('#loader-wrapper').css('display', 'none');
                                            Swal.fire({
                                                title: 'Error en el Formato de Fecha.',
                                                text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                                icon: 'error',
                                                showDenyButton: false,
                                                showCancelButton: false,
                                                confirmButtonText: `Entendido`,
                                            }).then((result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {}
                                            })
                                            return
                                        } else {
                                            date.setDate(date.getDate() + 1);
                                            var d = date.toISOString().slice(0, 10);
                                        }
                                    } else {
                                        $('#loader-wrapper').css('display', 'none');
                                        Swal.fire({
                                            title: 'Error en el Formato de Fecha.',
                                            text: 'El Formato de Fecha Debe Ser yyyy-mm-dd',
                                            icon: 'error',
                                            showDenyButton: false,
                                            showCancelButton: false,
                                            confirmButtonText: `Entendido`,
                                        }).then((result) => {
                                            /* Read more about isConfirmed, isDenied below */
                                            if (result.isConfirmed) {}
                                        })
                                        return

                                    }
                                    rv[colIndex] = d;
                                } else {
                                    var cellValue = jsondata[i][columns[colIndex]];
                                    rv[colIndex] = cellValue;
                                }
                            }
                            console.log(rv);
                            functions.csv(token, rv, url).then(function(response) {
                                var response = response.data;
                                console.log(response)
                                return response
                            }).then(res => {
                                if (val1 == jsondata.length) {
                                    $('#loader-wrapper').css('display', 'none');
                                    Swal.fire({
                                        title: 'Proceso Realizado Correctamente.',
                                        icon: 'success',
                                        showDenyButton: false,
                                        showCancelButton: false,
                                        confirmButtonText: `Entendido`,
                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {}
                                    })
                                }
                                val1++;
                            }).catch(error => {
                                $('#loader-wrapper').css('display', 'none');
                                Swal.fire({
                                    title: 'Error en el Proceso.',
                                    icon: 'error',
                                    showDenyButton: false,
                                    showCancelButton: false,
                                    confirmButtonText: `Entendido`,
                                }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {}
                                })
                                return
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error de Archivo.',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    $('#loader-wrapper').css('display', 'none');
                                }
                            })
                            return;
                        }
                        break;
                        
                    default:
                        $('#loader-wrapper').css('display', 'none');

                        console.log("none");

                }


            }

        }



    }



    $scope.header = function(jsondata) {
        var columExcel = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB", "AC", "AD", "AE", "AF"];
        var columnSet = [];
        var e = 0

        for (var i = 0; i < jsondata.length; i++) {
            var rowHash = jsondata[i];
            for (var key in rowHash) {
                if (rowHash.hasOwnProperty(key)) {
                    if ($.inArray(key, columnSet) == -1) {
                        columnSet.push(key);
                    }
                }

            }
        }

        var tipo = document.getElementById('elements').value;

        if (tipo == "1" ) {
            var colTemp = [];
            for (var i = 0; i < cols.length; i++) {
                for (var u = 0; u < columExcel.length; u++) {
                    if (columExcel[u] == cols[i]) {
                        console.log(columExcel[u]);
                        console.log(cols[i]);
                        console.log(u);
                        colTemp.push(columnSet[u])
                    }
                }
            }

            columnSet = colTemp;
        }
        return columnSet;
    }

    up = $scope.up
    procesoExcel = $scope.procesoExcel
    header = $scope.header
    getParameter = $scope.getParameter

    $scope.procesoVar = function() {

        $("#conntentSpinner").fadeIn();

        functions.iniciarProcesoVar(token).then(function(response) {
            var response = response.data;
            console.log(response);
            console.log("termino el proceso--------")


            $("#conntentSpinner").fadeOut();
            Swal.fire('Proceso Realizado Correctamente.', '', 'success');


        })


    }

    procesoVar = $scope.procesoVar;


})

app.controller('generarvar', function( $scope, functions) {
    
    
    
    functions.loading();

    $scope.validaGenerarVar = function(){
        
        
        var fecha = document.getElementById("varDate").value;
        if(null==fecha || undefined==fecha || ""==fecha){
            Swal.fire('Por favor selecciona una fecha', '', 'warning');
        } else {
            let data = {
                fecha: fecha
            };
            $("#conntentSpinner").fadeIn();
            functions.validaGenerarVarFactory(token, JSON.stringify(data)).then(function(response) {
                console.log("### getProductosVar:: ",response);
                var res = response.data;
                console.log("### STATUS_getProductosVar:: ",res.status);
                if (res.status=="NO_CONTENT"){
                    Swal.fire(res.mensaje, '', 'warning');
                } else if (res.status=="FOUND"){
                    Swal.fire({
                        title: res.mensaje,
                        icon: 'warning',
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: 'Continuar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $scope.generarVar();
                        }
                    });
                } else if (res.status=="OK"){
                    Swal.fire('Cálculo de VaR Relizado Correctamente.', '', 'success');
                } else {
                    Swal.fire('Ocurrió un Problema al Realizar el Proceso.', '', 'error');
                }
                $("#conntentSpinner").fadeOut();
            });
        }
                                    
        
    };
    validaGenerarVar = $scope.validaGenerarVar;

    $scope.generarVar = function() {
        $("#conntentSpinner").fadeIn();
        var fecha = document.getElementById("varDate").value;
        let data = {
            fecha: fecha
        };
        functions.generarVarFactory(token, JSON.stringify(data)).then(function(response) {
            var res = response.data;
            console.log(res);
            $("#conntentSpinner").fadeOut();
            console.log("termino el proceso--------")
            if (res.status=="OK"){
                Swal.fire('Cálculo de VaR Relizado Correctamente.', '', 'success');
            } else {
                Swal.fire('Ocurrió un Problema al Realizar el Proceso.', '', 'error');
            }

        })

    };


    
    
    generarVar = $scope.generarVar;

})
