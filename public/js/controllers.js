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
            var fecha = document.getElementById("varDate").value;
            let data = {
                fecha: fecha
            };
            functions.mesaDeDerivados(token, JSON.stringify(data)).then(function(response) {
                var da = response.data;
                console.log(da);
                const selectPorcentajePre = $('#porcentajeSelect').val();
                const selectPorcentajeSplit = selectPorcentajePre.split('&');
                const selectPorcentaje = selectPorcentajeSplit[0];
                const selectPorcentajeValor = parseFloat(selectPorcentajeSplit[1]);

                if(null!=da && undefined != da){
                    if (da['length'] > 0) {
                        $scope.labels = [];
                        $scope.data= [];
                        let htmTableMercado = '';

                        var cellValue = da[3];
                        var date = new Date(cellValue);
                        date.setDate(date.getDate() + 1);
                        $("#fecha").text("Fecha: " + date.toLocaleDateString("es-ES", options));
                        if(fecha===null || fecha===""){
                            document.getElementById("varDate").value = (""+date.getUTCFullYear())+"-"+(date.getMonth()+1)+"-"+date.getDate();
                        }

                        if (undefined != da[2]) {
                            $scope.limite = da[1][0]['globalLimit']; 
                            var obj = {
                                titulo: 'Posición Global',
                                var1: da[2]['var1'],
                                var2: da[2]['var2'],
                                var3: da[2]['var3'],
                                limite: da[1][0]['globalLimit'], 
                                valuacion: da[2]['valuacion']
                            };

                            $scope.makeSummaryTable(obj);
                           
                        } else {
                            $('#l99').text(0.0)
                            $('#l97').text(0.0)
                            $('#l95').text(0.0)
                            $('#valuacion').text(0.0)
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
                        globalLimitParaTablaMercados = da[1][0]['globalLimit'];
                        $scope.limite = globalLimitParaTablaMercados;

                        // Límite de VaR - (suma columna VaR)
                        var sumVar =0; 
                        $scope.mercados = da[4];
                        for (let i = 0; i < da[4].length; i++) {
                            htmTableMercado += '<tr style="cursor:pointer;" onclick="getTableProductos('+da[4][i].cdMercado+');">';
                            htmTableMercado += '<td>' + da[4][i].nombre + '</td>';
                            $scope.labels.push(da[4][i].nombre);
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
                            $scope.data.push(varPorcentaje.toFixed(2));
                            sumVar+=varPorcentaje

                            htmTableMercado += '<td>' + comas(dosDecimales(varPorcentaje)) + ' </td>';
                            htmTableMercado += '<td>' + comas(dosDecimales(globalLimitParaTablaMercados)) + ' </td>';

                            var calculoMenosVar = globalLimitParaTablaMercados - varPorcentaje;

                            if (calculoMenosVar < 0) {
                                htmTableMercado += '<td style="color:red;"> ' + comas(dosDecimales(calculoMenosVar)) + '</td>';
                            } else {
                                htmTableMercado += '<td style="color:green;"> ' + comas(dosDecimales(calculoMenosVar)) + '</td>';
                            }
                            htmTableMercado += '</tr>';
                        }
                        
                        $scope.data.splice(0, 0, (globalLimitParaTablaMercados-sumVar).toFixed(2));
                        $scope.labels.splice(0, 0,"Límite Disponible");
                        console.log("LABELS_597::",$scope.labels);
                        console.log("DATA_598::",$scope.data);

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

                    }
                }
                console.log("DATA_CONTROLLER::",$scope.data);
                console.log("LABELS_CONTROLLER::",$scope.labels);
                var color = 0;
                if (globalLimitParaTablaMercados-sumVar<=0){
                    color = 1;
                }
                functions.generarGraficaDona('graficaVarHistorico',$scope.labels, $scope.data,color);
            });
            
            
        }
        $scope.refreshTableMercados();
        
        $scope.makeSummaryTable = function (obj){

            console.log("OBJ",obj);
            if (undefined != obj && obj!=null) {
                var var1 = obj['var1'];
                var var2 = obj['var2'];
                var var3 = obj['var3'];

                $('#titleGlobal').text(obj.titulo);
                $('#l99').text(var1.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                $('#l97').text(var2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                $('#l95').text(var3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

                $('#valuacion').text(obj['valuacion'].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
                document.getElementById('valuacion').style.setProperty("background-color", "#faf9fc");
                document.getElementById('valuacionTxt').style.setProperty("background-color", "#faf9fc");


                var limite = obj.limite;

                $('#limite').text(limite.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
                $('#limite99').text(limite)
                $('#limite97').text(limite)
                $('#limite95').text(limite)

                var nivelConfianza_99 = limite -obj['var1'];
                var nivelConfianza_97 = limite -obj['var2'];
                var nivelConfianza_95 = limite -obj['var3'];
                $('#nivelConfianza_99').text(nivelConfianza_99.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
                $('#nivelConfianza_97').text(nivelConfianza_97.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
                $('#nivelConfianza_95').text(nivelConfianza_95.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))


            } else {
                $('#l99').text(0.0)
                $('#l97').text(0.0)
                $('#l95').text(0.0)
                $('#valuacion').text(0.0)
            }
        }

        $scope.refreshTableProductos = function() {
            if(null!=$scope.mercadoSelect){
                $scope.getTableProductos($scope.mercadoSelect);
            }
        }

        $scope.getTableProductos = function(idMercado){
            var found = $scope.mercados.find(element => element.cdMercado == idMercado);
            var obj = {
                titulo: found.nombre,
                var1: found.var1,
                var2: found.var2,
                var3: found.var3,
                limite: $scope.limite, 
                valuacion: found.valuacion
            };
            $scope.makeSummaryTable(obj);
            $scope.data =[];
            $scope.labels=[];

            var fecha = document.getElementById("varDate").value;
            $scope.mercadoSelect = idMercado;
            let data = {
                idMercado: idMercado,
                fecha: fecha
            };
            functions.getProductosVar(token, JSON.stringify(data)).then(function(response) {
                console.log("### getProductosVar:: ",response)

                let htmTableIntermedio = '';
                const selectPorcentajePre = $('#porcentajeSelect').val();
                const selectPorcentajeSplit = selectPorcentajePre.split('&');
                const selectPorcentaje = selectPorcentajeSplit[0];

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
                    $scope.labels = [];
                    $scope.data= [];
                    var mercados = response.data;
                    $scope.productos = mercados;
                    var sumVar=0;
                    for (let i = 0; i < mercados.length; i++) {
                        htmTableIntermedio += '<tr style="cursor:pointer;" onclick="getTableTransacciones('+mercados[i].cdInstrumento+')">';
                        htmTableIntermedio += ' <th scope="row">' + (i + 1) + '</th>';
                        htmTableIntermedio += '<td>'+mercados[i].nombre+'</td>';
                        $scope.labels.push(mercados[i].nombre);
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
			//$scope.data[i+1]=varPorcentaje;
                        $scope.data.push(varPorcentaje.toFixed(2));
                        sumVar+=varPorcentaje;

                        htmTableIntermedio += '<td> ' + comas(dosDecimales(varPorcentaje)) + '</td>';
                        htmTableIntermedio += '<td> ' + comas(dosDecimales($scope.limite)) + '</td>';

                        var limiteMenosVar = $scope.limite -varPorcentaje;
                        if (limiteMenosVar < 0) {
                            htmTableIntermedio += '<td style="color:red;"> ' + comas(dosDecimales(limiteMenosVar)) + '</td>';
                        } else {
                            htmTableIntermedio += '<td style="color:green;"> ' + comas(dosDecimales(limiteMenosVar)) + '</td>';
                        }

                        htmTableIntermedio += '</tr>';
                    }
                }

                htmTableIntermedio += '</tbody>';
                htmTableIntermedio += '</table>';

                $scope.data.splice(0, 0,($scope.limite-sumVar).toFixed(2));
                $scope.labels.splice(0, 0,"Límite Disponible");
		
		

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

                console.log("DATA_CONTROLLER_869::",$scope.data);
                console.log("LABELS_CONTROLLER_869::",$scope.labels);
                var color = 0;
                if ($scope.limite-sumVar<=0){
                    color = 1;
                }
                functions.generarGraficaDona('graficaVarHistorico',$scope.labels, $scope.data, color);
            });
        };


        $scope.refreshTableTransacciones = function() {
            if(null!=$scope.productoSelect){
                $scope.getTableTransacciones($scope.productoSelect);
            }
        }

        $scope.getTableTransacciones = function(idProducto){
            console.log("PRODUCTOS", $scope.productos);
            var found = $scope.productos.find(element => element.cdInstrumento == idProducto);
            var obj = {
                titulo: found.nombre,
                var1: found.var1,
                var2: found.var2,
                var3: found.var3,
                limite: $scope.limite, 
                valuacion: found.valuacion
            };
            $scope.makeSummaryTable(obj);
            
            var fecha = document.getElementById("varDate").value;
            $scope.productoSelect = idProducto;
            let data = {
                idMercado: $scope.mercadoSelect,
                idInstrumento: idProducto,
                fecha: fecha
            };
            functions.getTransaccionesVar(token, JSON.stringify(data)).then(function(response) {
                console.log("DATA_TRANSACCIONES: ", response);
                if(response.status==200){
                    const selectPorcentajePre = $('#porcentajeSelect').val();
                    const selectPorcentajeSplit = selectPorcentajePre.split('&');
                    const selectPorcentaje = selectPorcentajeSplit[0];
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

                    $scope.labels = [];
                    $scope.data= [];
                    var transacciones = response.data;
                    var sumVar =0;
                    for (let i = 0; i < transacciones.length; i++) {
                        htmTableDetalle += '<tr style="cursor:pointer;" >';
                        htmTableDetalle += '<td scope="row">' + (i + 1) + '</td>';
                        htmTableDetalle += '<td>' + transacciones[i].cdTransaccion + '</td>';
                        $scope.labels.push(transacciones[i].cdTransaccion);
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
                        $scope.data.push(varPorcentaje);
                        sumVar+=varPorcentaje;

                        htmTableDetalle += '<td> ' + comas(dosDecimales(varPorcentaje)) + '</td>';
                        htmTableDetalle += '<td> ' + comas(dosDecimales($scope.limite)) + '</td>';

                        var limiteMenosVar = $scope.limite - varPorcentaje;

                        if (limiteMenosVar < 0) {
                            htmTableDetalle += '<td style="color:red;"> ' + comas(dosDecimales(limiteMenosVar)) + '</td>';
                        } else {
                            htmTableDetalle += '<td style="color:green;"> ' + comas(dosDecimales(limiteMenosVar)) + '</td>';
                        }

                        htmTableDetalle += '</tr>';
                    }
                    htmTableDetalle += '</tbody>';
                    htmTableDetalle += '</table>';
                    
		            $scope.data.splice(0, 0,$scope.limite-sumVar);
                    $scope.labels.splice(0, 0,"Límite Disponible");
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

                    console.log("DATA_CONTROLLER_1052::",$scope.data);
                    console.log("LABELS_CONTROLLER_1053::",$scope.labels);
                    var color = 0;
                    if ($scope.limite-sumVar<=0){
                        color = 1;
                    }
                    functions.generarGraficaDona('graficaVarHistorico',$scope.labels, $scope.data,color);
                }
            });
        };

        makeSummaryTable = $scope.makeSummaryTable;
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
    $scope.consultarLimites = function(tipo, divisaValor) {
        if (tipo == "contraparte") {
            tipoEnvio = 0;
        } else if (tipo == "operador") {
            tipoEnvio = 1;
        } else if (tipo == "varLimite") {
            tipoEnvio = 2;
        } else if (tipo == "mercadoLimite") {
            tipoEnvio = 3;
        }

        if (tipoEnvio == 0 || tipoEnvio == 1) {


            functions.postLimitesLineas(token, tipoEnvio).then(function(response) {
                var da = response.data;
                console.log(da);


                $("#conteTable").empty()

                if (tipo == "contraparte") {

                    $("#conteTable").append('<table class="table table-striped" id="limites" >' +
                        '<thead class="bg-warning-200">' +
                        '<tr>' +
                        '<th>Contraparte</th>' +
                        '<th>Limite Global</th>' +
                        '<th>Límite Operaciones Directo</th>' +
                        '<th>Límite Operaciones en Reporto</th>' +
                        '<th>Límite por Operción</th>' +
                        '<th>Límite Mercado de Cambios</th>' +
                        '<th>Límite por Operción Mercado de Cambios</th>' +
                        '<th></th>' +
                        '<th></th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody id="tableLimites">' +

                        '</tbody>' +
                        '</table>');
                    for (var i = 0; i < da.length; i++) {

                        var globalLimitConverted = ((parseFloat(da[i]['globalLimit'])) * (parseFloat(divisaValor))) / 1;

                        var directOperationLimit = ((parseFloat(da[i]['directOperationLimit'])) * (parseFloat(divisaValor))) / 1;
                        var reportoOperationLimit = ((parseFloat(da[i]['reportoOperationLimit'])) * (parseFloat(divisaValor))) / 1;
                        var operationLimitMoneyMarket = ((parseFloat(da[i]['operationLimitMoneyMarket'])) * (parseFloat(divisaValor))) / 1;
                        var exchangeMarketLimit = ((parseFloat(da[i]['exchangeMarketLimit'])) * (parseFloat(divisaValor))) / 1;
                        var limitOperationExchangeMarket = ((parseFloat(da[i]['limitOperationExchangeMarket'])) * (parseFloat(divisaValor))) / 1;


                        $("#tableLimites").append('<tr  id="' + da[i]['contraparte'] + '">' +
                            '<td>' + da[i]['contraparte'] + '</td>' +

                            '<td><span>' + formatDollar(parseFloat(globalLimitConverted.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + globalLimitConverted.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(directOperationLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + directOperationLimit.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(reportoOperationLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + reportoOperationLimit.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(operationLimitMoneyMarket.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + operationLimitMoneyMarket.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(exchangeMarketLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + exchangeMarketLimit.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(limitOperationExchangeMarket.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + limitOperationExchangeMarket.toFixed(2) + '" step="0.01"></td>' +


                            "<td><a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteq('" + da[i]['contraparte'] + "')\">Eliminar</a></td>" +
                            "<td><a id=\"button_modi_" + i + "\" class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"modificar('" + da[i]['contraparte'] + "','" + i + "')\">Modificar</a>" +
                            "<a id=\"button_guar_" + i + "\" class=\"btn btn-primary btn-xs\" style=\"color: white; display:none;\" onclick=\"guardarModi('" + da[i]['contraparte'] + "','" + i + "')\">Guardar</a>" +
                            "<a id=\"button_cancel_" + i + "\" class=\"btn btn-danger btn-xs\" style=\"color: white; display:none;\" onclick=\"cancelModi('" + da[i]['contraparte'] + "','" + i + "')\">Cancelar</a>" +
                            "</td>" +

                            '</tr>');



                    }




                } else if (tipo == "operador") {

                    $("#conteTable").append('<table class="table table-striped" id="limites" >' +
                        '<thead class="bg-warning-200">' +
                        '<tr>' +
                        '<th>Operador</th>' +
                        '<th>Limite Global</th>' +
                        '<th>Límite Operaciones Directo</th>' +
                        '<th>Límite Operaciones en Reporto</th>' +
                        '<th>Límite por Operción</th>' +
                        '<th>Límite Mercado de Cambios</th>' +
                        '<th>Límite por Operción Mercado de Cambios</th>' +
                        '<th></th>' +
                        '<th></th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody id="tableLimites">' +

                        '</tbody>' +
                        '</table>');
                    for (var i = 0; i < da.length; i++) {

                        var globalLimitConverted = ((parseFloat(da[i]['globalLimit'])) * (parseFloat(divisaValor))) / 1;

                        var directOperationLimit = ((parseFloat(da[i]['directOperationLimit'])) * (parseFloat(divisaValor))) / 1;
                        var reportoOperationLimit = ((parseFloat(da[i]['reportoOperationLimit'])) * (parseFloat(divisaValor))) / 1;
                        var operationLimitMoneyMarket = ((parseFloat(da[i]['operationLimitMoneyMarket'])) * (parseFloat(divisaValor))) / 1;
                        var exchangeMarketLimit = ((parseFloat(da[i]['exchangeMarketLimit'])) * (parseFloat(divisaValor))) / 1;
                        var limitOperationExchangeMarket = ((parseFloat(da[i]['limitOperationExchangeMarket'])) * (parseFloat(divisaValor))) / 1;


                        $("#tableLimites").append('<tr  id="' + da[i]['contraparte'] + '">' +
                            '<td>' + da[i]['contraparte'] + '</td>' +

                            '<td><span>' + formatDollar(parseFloat(globalLimitConverted.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + globalLimitConverted.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(directOperationLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + directOperationLimit.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(reportoOperationLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + reportoOperationLimit.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(operationLimitMoneyMarket.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + operationLimitMoneyMarket.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(exchangeMarketLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + exchangeMarketLimit.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(limitOperationExchangeMarket.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + limitOperationExchangeMarket.toFixed(2) + '" step="0.01"></td>' +

                            "<td><a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteq('" + da[i]['contraparte'] + "')\">Eliminar</a></td>" +
                            "<td><a id=\"button_modi_" + i + "\" class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"modificar('" + da[i]['contraparte'] + "','" + i + "')\">Modificar</a>" +
                            "<a id=\"button_guar_" + i + "\" class=\"btn btn-primary btn-xs\" style=\"color: white; display:none;\" onclick=\"guardarModi('" + da[i]['contraparte'] + "','" + i + "')\">Guardar</a>" +
                            "<a id=\"button_cancel_" + i + "\" class=\"btn btn-danger btn-xs\" style=\"color: white; display:none;\" onclick=\"cancelModi('" + da[i]['contraparte'] + "','" + i + "')\">Cancelar</a>" +
                            "</td>" +
                            '</tr>');
                    } //fin for
                } //fin if

                $('#limites').dataTable({

                    "pageLength": 25,
                    select: true,
                    "ordering": false,
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


            }); //fin fucion al controller



        } else if (tipoEnvio == 2 || tipoEnvio == 3) {

            console.log("selecciono 2 o 3");

            if (tipoEnvio == 2) {


                functions.getLimitesVarMd(token).then(function(response) {
                    var da = response.data;
                    console.log(da);
                    $("#conteTable").empty();
                    $("#conteTable").append('<table class="table table-striped" id="limites" >' +
                        '<thead class="bg-warning-200">' +
                        '<tr>' +
                        '<th>Producto</th>' +
                        '<th>Limite Global</th>' +
                        //'<th>Límite Operaciones Directo</th>' +
                        //'<th>Límite Operaciones en Reporto</th>' +
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

                        var globalLimitConverted = ((parseFloat(da[i]['globalLimit'])) * (parseFloat(divisaValor))) / 1;

                        var directOperationLimit = ((parseFloat(da[i]['directOperationLimit'])) * (parseFloat(divisaValor))) / 1;
                        var reportoOperationLimit = ((parseFloat(da[i]['reportoOperationLimit'])) * (parseFloat(divisaValor))) / 1;
                        var operationLimitMoneyMarket = ((parseFloat(da[i]['operationLimitMoneyMarket'])) * (parseFloat(divisaValor))) / 1;
                        var exchangeMarketLimit = ((parseFloat(da[i]['exchangeMarketLimit'])) * (parseFloat(divisaValor))) / 1;
                        var limitOperationExchangeMarket = ((parseFloat(da[i]['limitOperationExchangeMarket'])) * (parseFloat(divisaValor))) / 1;


                        var mercadoNuevo = "";
                        if (da[i]['market'] != null) {
                            mercadoNuevo = da[i]['market'];
                        }
                        var productoVistaValidacion = "";

                        if (da[i]['producto'] == 2) {
                            productoVistaValidacion = "Swaps"
                        } else {
                            productoVistaValidacion = da[i]['producto']
                        }

                        $("#tableLimites").append('<tr  id="' + da[i]['contraparte'] + '">' +
                            '<td>' + productoVistaValidacion + '</td>' +

                            '<td><span>' + formatDollar(parseFloat(globalLimitConverted.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + globalLimitConverted.toFixed(2) + '" step="0.01"></td>' +
                            //'<td><span>' + formatDollar(parseFloat(directOperationLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + directOperationLimit.toFixed(2) + '" step="0.01"></td>' +
                            //'<td><span>' + formatDollar(parseFloat(reportoOperationLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + reportoOperationLimit.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(operationLimitMoneyMarket.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + operationLimitMoneyMarket.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + mercadoNuevo + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="text" id="" name="" value="' + mercadoNuevo + '" ></td>' + //nuevo 27_09_2020
                            //'<td><span>' + formatDollar(parseFloat(exchangeMarketLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + exchangeMarketLimit.toFixed(2) + '" step="0.01"></td>' +
                            //'<td><span>' + formatDollar(parseFloat(limitOperationExchangeMarket.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + limitOperationExchangeMarket.toFixed(2) + '" step="0.01"></td>' +

                            "<td><a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteqMercadoVarLimite('" + da[i]['idVarLimiteMd'] + "','varMd')\">Eliminar</a></td>" +
                            "<td><a id=\"button_modi_" + i + "\" class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"modificar('" + da[i]['idVarLimiteMd'] + "','" + i + "')\">Modificar</a>" +
                            "<a id=\"button_guar_" + i + "\" class=\"btn btn-primary btn-xs\" style=\"color: white; display:none;\" onclick=\"guardarModiMercadoVarLimite('" + da[i]['idVarLimiteMd'] + "','" + i + "','varMd','" + da[i]['limite'] + "&" + da[i]['producto'] + "')\">Guardar</a>" +
                            "<a id=\"button_cancel_" + i + "\" class=\"btn btn-danger btn-xs\" style=\"color: white; display:none;\" onclick=\"cancelModi('" + da[i]['idVarLimiteMd'] + "','" + i + "')\">Cancelar</a>" +
                            "</td>" +
                            '</tr>');
                    } //fin for

                    $('#limites').dataTable({

                        "pageLength": 25,
                        select: true,
                        "ordering": false,
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

            } else if (tipoEnvio == 3) {

                functions.getLimitesVarMercado(token).then(function(response) {
                    var da = response.data;
                    console.log(da);
                    $("#conteTable").empty();

                    $("#conteTable").append('<table class="table table-striped" id="limites" >' +
                        '<thead class="bg-warning-200">' +
                        '<tr>' +
                        '<th>Mercado</th>' +
                        '<th>Limite Global</th>' +
                        '<th>Límite Operaciones Directo</th>' +
                        '<th>Límite Operaciones en Reporto</th>' +
                        '<th>Límite por Operción</th>' +
                        '<th>Límite Mercado de Cambios</th>' +
                        '<th>Límite por Operción Mercado de Cambios</th>' +
                        '<th></th>' +
                        '<th></th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody id="tableLimites">' +

                        '</tbody>' +
                        '</table>');
                    for (var i = 0; i < da.length; i++) {

                        var globalLimitConverted = ((parseFloat(da[i]['globalLimit'])) * (parseFloat(divisaValor))) / 1;

                        var directOperationLimit = ((parseFloat(da[i]['directOperationLimit'])) * (parseFloat(divisaValor))) / 1;
                        var reportoOperationLimit = ((parseFloat(da[i]['reportoOperationLimit'])) * (parseFloat(divisaValor))) / 1;
                        var operationLimitMoneyMarket = ((parseFloat(da[i]['operationLimitMoneyMarket'])) * (parseFloat(divisaValor))) / 1;
                        var exchangeMarketLimit = ((parseFloat(da[i]['exchangeMarketLimit'])) * (parseFloat(divisaValor))) / 1;
                        var limitOperationExchangeMarket = ((parseFloat(da[i]['limitOperationExchangeMarket'])) * (parseFloat(divisaValor))) / 1;


                        $("#tableLimites").append('<tr  id="' + da[i]['contraparte'] + '">' +
                            '<td>' + da[i]['mercado'] + '</td>' +

                            '<td><span>' + formatDollar(parseFloat(globalLimitConverted.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + globalLimitConverted.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(directOperationLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + directOperationLimit.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(reportoOperationLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + reportoOperationLimit.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(operationLimitMoneyMarket.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + operationLimitMoneyMarket.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(exchangeMarketLimit.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + exchangeMarketLimit.toFixed(2) + '" step="0.01"></td>' +
                            '<td><span>' + formatDollar(parseFloat(limitOperationExchangeMarket.toFixed(2))) + '</span><input style="display:none; width: 90%; border: solid 1px silver; border-radius: 5px;" type="number" id="" name="" value="' + limitOperationExchangeMarket.toFixed(2) + '" step="0.01"></td>' +

                            "<td><a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteqMercadoVarLimite('" + da[i]['mercado'] + "','mercado')\">Eliminar</a></td>" +
                            "<td><a id=\"button_modi_" + i + "\" class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"modificar('" + da[i]['mercado'] + "','" + i + "')\">Modificar</a>" +
                            "<a id=\"button_guar_" + i + "\" class=\"btn btn-primary btn-xs\" style=\"color: white; display:none;\" onclick=\"guardarModiMercadoVarLimite('" + da[i]['mercado'] + "','" + i + "','mercado','" + da[i]['mercado'] + "')\">Guardar</a>" +
                            "<a id=\"button_cancel_" + i + "\" class=\"btn btn-danger btn-xs\" style=\"color: white; display:none;\" onclick=\"cancelModi('" + da[i]['mercado'] + "','" + i + "')\">Cancelar</a>" +
                            "</td>" +
                            '</tr>');
                    } //fin for

                    $('#limites').dataTable({

                        "pageLength": 25,
                        select: true,
                        "ordering": false,
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

            }

        } //FIN IF NUEVO




    }



    $scope.cambioDivisasMethod = function(tipo) {

        var tipoDivisas = $('#selectDivisas').val();
        var divisaValor = '';
        console.log(tipoDivisas);

        if (tipoDivisas == 'MXN') {
            divisaValor = '1';
        } else if (tipoDivisas == 'US') {
            divisaValor = '0.053';
        }

        this.divisaGlobal = divisaValor;

        consultarLimites(tipo, divisaValor);


    };


    $scope.cambio = function() {
        var tipo = $('#selectTipo').val();
        cambioDivisasMethod(tipo);
    }


    $scope.add = function() {
        $('#btnAgregar').slideUp('fast');
        $('#add').css('display', 'block');

        if ($('#selectTipo').val() == "varLimite") {
            $('#inputsFromLimitesVar').css('display', '');
            $('#contraparte').attr("placeholder", "limite");

            $('#inputsNormal1').css('display', 'none');
            $('#inputsNormal2').css('display', 'none');
            $('#limitOperationExchangeMarket').css('display', 'none');
            $('#inputsFromLimitesVar2').css('display', '');





        } else if ($('#selectTipo').val() == "mercadoLimite") {

            //$('#contraparte').placeholder = "";
            $('#contraparte').attr("placeholder", "Mercado");

        } else if ($('#selectTipo').val() == "operador") {

            //$('#contraparte').placeholder = "";
            $('#contraparte').attr("placeholder", "Operador");

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


            /*var validacionLimiteGlobal = (parseInt($('#directOperationLimit').val())) + (parseInt($('#reportoOperationLimit').val())) + (parseInt($('#exchangeMarketLimit').val()));
            console.log(validacionLimiteGlobal);
            var validacionOperacionMercadoMoney = (parseInt($('#directOperationLimit').val())) + (parseInt($('#reportoOperationLimit').val()));
            console.log(validacionOperacionMercadoMoney);
            var validacionOperacionMercadoCambios = (parseInt($('#exchangeMarketLimit').val()));
            console.log(validacionOperacionMercadoCambios);

            var uno = $('#contraparte').val();

            if ($('#contraparte').val() == '') {
                toastr["error"]("Campo contraparte es necesario", "");

            } else if ($('#selectTipo').val()=="varLimite" && $('#productoVarLimite').val() == ''){
                toastr["error"]("Campo producto es necesario", "");

            }else if ($('#globalLimit').val() == '') {
                toastr["error"]("Campo limite global es necesario", "");

            } else if ($('#directOperationLimit').val() == '') {
                toastr["error"]("Campo limite operaciones directo es necesario", "");

            } else if ($('#reportoOperationLimit').val() == '') {
                toastr["error"]("Campo limite operaciones reporto es necesario", "");

            } else if ($('#operationLimitMoneyMarket').val() == '') {
                toastr["error"]("Campo limite por operacion es necesario", "");

            } else if ($('#exchangeMarketLimit').val() == '') {
                toastr["error"]("Campo limite mercado es necesario", "");

            } else if ($('#limitOperationExchangeMarket').val() == '') {
                toastr["error"]("Campo limite por operacion mercado es necesario", "");

            } else if (parseInt($('#globalLimit').val()) < validacionLimiteGlobal) {

                $('#globalLimit').focus();
                toastr["error"]("El campo limite global debe ser mayor", "");

            } else if (parseInt($('#operationLimitMoneyMarket').val()) > validacionOperacionMercadoMoney) {

                $('#operationLimitMoneyMarket').focus();
                toastr["error"]("El campo limite por operación debe ser menor", "");

            } else if (parseInt($('#limitOperationExchangeMarket').val()) > validacionOperacionMercadoCambios) {

                $('#limitOperationExchangeMarket').focus();
                toastr["error"]("El campo limite por operación mercado de cambios debe ser menor", "");

            } else {*/

            if ($('#selectTipo').val() != "varLimite" && $('#selectTipo').val() != "mercadoLimite") {



                var contraparte = $('#contraparte').val();
                contraparte = contraparte.toString().toUpperCase();

                var globalLimit;
                var directOperationLimit;
                var reportoOperationLimit;
                var operationLimitMoneyMarket;
                var exchangeMarketLimit;
                var limitOperationExchangeMarket;
                var estatus;


                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                });

                Swal.fire({
                    title: '¿Desea registrar el limite como contraparte o como operador?',
                    text: '',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#47FFAB',
                    cancelButtonColor: '#47C2FF',
                    confirmButtonText: 'Contraparte',
                    cancelButtonText: 'Operador',
                    reverseButtons: true
                }).then((result) => {

                    if (result.value) {


                        const estatus = 0;

                        if ($('#selectDivisas').val() != 'MXN') {

                            Swal.fire({
                                title: 'El valor serà convertido a pesos mexicanos!',
                                text: '',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if (result.value) {

                                    globalLimit = ((parseFloat($('#globalLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                                    directOperationLimit = ((parseFloat($('#directOperationLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                                    reportoOperationLimit = ((parseFloat($('#reportoOperationLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                                    operationLimitMoneyMarket = ((parseFloat($('#operationLimitMoneyMarket').val())) * (1)) / parseFloat(this.divisaGlobal);
                                    exchangeMarketLimit = ((parseFloat($('#exchangeMarketLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                                    limitOperationExchangeMarket = ((parseFloat($('#limitOperationExchangeMarket').val())) * (1)) / parseFloat(this.divisaGlobal);

                                    const data = JSON.stringify({
                                        contraparte: contraparte,
                                        globalLimit: globalLimit,
                                        directOperationLimit: directOperationLimit,
                                        reportoOperationLimit: reportoOperationLimit,
                                        operationLimitMoneyMarket: operationLimitMoneyMarket,
                                        exchangeMarketLimit: exchangeMarketLimit,
                                        limitOperationExchangeMarket: limitOperationExchangeMarket,
                                        mercado: 'mexicano',
                                        //usuario : "Roberto",
                                        estatus: estatus
                                    });


                                    functions.addLimites(token, data).then(function(response) {
                                        $('#contraparte').val('');
                                        $('#globalLimit').val('');
                                        $('#directOperationLimit').val('');
                                        $('#reportoOperationLimit').val('');
                                        $('#operationLimitMoneyMarket').val('');
                                        $('#exchangeMarketLimit').val('');
                                        $('#limitOperationExchangeMarket').val('');
                                        $('#add').css('display', 'none');
                                        $('#btnAgregar').slideDown('slow');
                                        Swal.fire('La contraparte se registro correctamente', '', 'success');
                                        cambioDivisasMethod($('#selectTipo').val());

                                    })
                                }
                            });

                        } else {

                            globalLimit = $('#globalLimit').val();
                            directOperationLimit = $('#directOperationLimit').val();
                            reportoOperationLimit = $('#reportoOperationLimit').val();
                            operationLimitMoneyMarket = $('#operationLimitMoneyMarket').val();
                            exchangeMarketLimit = $('#exchangeMarketLimit').val();
                            limitOperationExchangeMarket = $('#limitOperationExchangeMarket').val();

                            const data = JSON.stringify({
                                contraparte: contraparte,
                                globalLimit: globalLimit,
                                directOperationLimit: directOperationLimit,
                                reportoOperationLimit: reportoOperationLimit,
                                operationLimitMoneyMarket: operationLimitMoneyMarket,
                                exchangeMarketLimit: exchangeMarketLimit,
                                limitOperationExchangeMarket: limitOperationExchangeMarket,
                                mercado: 'mexicano',
                                //usuario : "Roberto",
                                estatus: estatus
                            });

                            functions.addLimites(token, data).then(function(response) {
                                $('#contraparte').val('');
                                $('#globalLimit').val('');
                                $('#directOperationLimit').val('');
                                $('#reportoOperationLimit').val('');
                                $('#operationLimitMoneyMarket').val('');
                                $('#exchangeMarketLimit').val('');
                                $('#limitOperationExchangeMarket').val('');
                                $('#add').css('display', 'none');
                                $('#btnAgregar').slideDown('slow');
                                Swal.fire('La contraparte se registro correctamente', '', 'success');
                                cambioDivisasMethod($('#selectTipo').val());


                            })

                        }

                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        const estatus = 1;

                        if ($('#selectDivisas').val() != 'MXN') {


                            Swal.fire({
                                title: 'El valor serà convertido a pesos mexicanos!',
                                text: '',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if (result.value) {

                                    globalLimit = ((parseFloat($('#globalLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                                    directOperationLimit = ((parseFloat($('#directOperationLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                                    reportoOperationLimit = ((parseFloat($('#reportoOperationLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                                    operationLimitMoneyMarket = ((parseFloat($('#operationLimitMoneyMarket').val())) * (1)) / parseFloat(this.divisaGlobal);
                                    exchangeMarketLimit = ((parseFloat($('#exchangeMarketLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                                    limitOperationExchangeMarket = ((parseFloat($('#limitOperationExchangeMarket').val())) * (1)) / parseFloat(this.divisaGlobal);


                                    const data = JSON.stringify({
                                        contraparte: contraparte,
                                        globalLimit: globalLimit,
                                        directOperationLimit: directOperationLimit,
                                        reportoOperationLimit: reportoOperationLimit,
                                        operationLimitMoneyMarket: operationLimitMoneyMarket,
                                        exchangeMarketLimit: exchangeMarketLimit,
                                        limitOperationExchangeMarket: limitOperationExchangeMarket,
                                        mercado: 'mexicano',
                                        //usuario : "Roberto",
                                        estatus: estatus
                                    });

                                    functions.addLimites(token, data).then(function(response) {

                                        $('#contraparte').val('');
                                        $('#globalLimit').val('');
                                        $('#directOperationLimit').val('');
                                        $('#reportoOperationLimit').val('');
                                        $('#operationLimitMoneyMarket').val('');
                                        $('#exchangeMarketLimit').val('');
                                        $('#limitOperationExchangeMarket').val('');
                                        $('#add').css('display', 'none');
                                        $('#btnAgregar').slideDown('slow');
                                        Swal.fire('La contraparte se registro correctamente', '', 'success');
                                        cambioDivisasMethod($('#selectTipo').val());

                                    })
                                }
                            });

                        } else {


                            globalLimit = $('#globalLimit').val();
                            directOperationLimit = $('#directOperationLimit').val();
                            reportoOperationLimit = $('#reportoOperationLimit').val();
                            operationLimitMoneyMarket = $('#operationLimitMoneyMarket').val();
                            exchangeMarketLimit = $('#exchangeMarketLimit').val();
                            limitOperationExchangeMarket = $('#limitOperationExchangeMarket').val();

                            const data = JSON.stringify({
                                contraparte: contraparte,
                                globalLimit: globalLimit,
                                directOperationLimit: directOperationLimit,
                                reportoOperationLimit: reportoOperationLimit,
                                operationLimitMoneyMarket: operationLimitMoneyMarket,
                                exchangeMarketLimit: exchangeMarketLimit,
                                limitOperationExchangeMarket: limitOperationExchangeMarket,
                                mercado: 'mexicano',
                                //usuario : "Roberto",
                                estatus: estatus
                            });

                            functions.addLimites(token, data).then(function(response) {
                                $('#contraparte').val('');
                                $('#globalLimit').val('');
                                $('#directOperationLimit').val('');
                                $('#reportoOperationLimit').val('');
                                $('#operationLimitMoneyMarket').val('');
                                $('#exchangeMarketLimit').val('');
                                $('#limitOperationExchangeMarket').val('');
                                $('#add').css('display', 'none');
                                $('#btnAgregar').slideDown('slow');

                                Swal.fire('La contraparte se registro correctamente', '', 'success');
                                cambioDivisasMethod($('#selectTipo').val());


                            })

                        }
                    }

                });

            } else {

                console.log("el select est en 2 o 3")

                var contraparte = $('#contraparte').val();
                contraparte = contraparte.toString();

                var globalLimit;
                var directOperationLimit;
                var reportoOperationLimit;
                var operationLimitMoneyMarket;
                var exchangeMarketLimit;
                var limitOperationExchangeMarket;
                var estatus = 1;

                if ($('#selectDivisas').val() != 'MXN') {


                    Swal.fire({
                        title: 'El valor serà convertido a pesos mexicanos!',
                        text: '',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.value) {

                            globalLimit = ((parseFloat($('#globalLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                            directOperationLimit = ((parseFloat($('#directOperationLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                            reportoOperationLimit = ((parseFloat($('#reportoOperationLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                            operationLimitMoneyMarket = ((parseFloat($('#operationLimitMoneyMarket').val())) * (1)) / parseFloat(this.divisaGlobal);
                            exchangeMarketLimit = ((parseFloat($('#exchangeMarketLimit').val())) * (1)) / parseFloat(this.divisaGlobal);
                            limitOperationExchangeMarket = ((parseFloat($('#limitOperationExchangeMarket').val())) * (1)) / parseFloat(this.divisaGlobal);

                            if ($('#selectTipo').val() == "varLimite") {

                                /* var producto=$('#productoVarLimite').val()

                                 const data = JSON.stringify({
                                     limite: contraparte,
                                     producto: producto,
                                     globalLimit: globalLimit,
                                     directOperationLimit: directOperationLimit,
                                     reportoOperationLimit: reportoOperationLimit,
                                     operationLimitMoneyMarket: operationLimitMoneyMarket,
                                     exchangeMarketLimit: exchangeMarketLimit,
                                     limitOperationExchangeMarket: limitOperationExchangeMarket,
                                     //mercado: 'mexicano',
                                     //usuario : "Roberto",
                                     status: "1"
                                 });*/


                                //nuevo 27_09_2020
                                var productoSelectValor = $('#productoSelect').val();
                                var mercadoSelectValor = $('#mercadoSelect').val();
                                globalLimit = ((parseFloat($('#globalLimitNuevo').val())) * (1)) / parseFloat(this.divisaGlobal);
                                operationLimitMoneyMarket = ((parseFloat($('#operationLimitMoneyMarketNuevo').val())) * (1)) / parseFloat(this.divisaGlobal);


                                const data = JSON.stringify({
                                        limite: 0,
                                        producto: productoSelectValor,
                                        globalLimit: globalLimit,
                                        directOperationLimit: 0,
                                        reportoOperationLimit: 0,
                                        operationLimitMoneyMarket: operationLimitMoneyMarket,
                                        exchangeMarketLimit: 0,
                                        limitOperationExchangeMarket: 0,
                                        //mercado: 'mexicano',
                                        //usuario : "Roberto",
                                        status: "1",
                                        market: mercadoSelectValor
                                    })
                                    //-------

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
                                    Swal.fire('El limite var se registro correctamente', '', 'success');
                                    cambioDivisasMethod($('#selectTipo').val());

                                    //nuevo 27_09_2020
                                    $('#productoSelect').val('0');
                                    $('#mercadoSelect').val('0');
                                    $('#globalLimitNuevo').val('');
                                    $('#operationLimitMoneyMarketNuevo').val('');

                                    //---------
                                })

                            } else if ($('#selectTipo').val() == "mercadoLimite") {

                                const data = JSON.stringify({
                                    mercado: contraparte,
                                    globalLimit: globalLimit,
                                    directOperationLimit: directOperationLimit,
                                    reportoOperationLimit: reportoOperationLimit,
                                    operationLimitMoneyMarket: operationLimitMoneyMarket,
                                    exchangeMarketLimit: exchangeMarketLimit,
                                    limitOperationExchangeMarket: limitOperationExchangeMarket,
                                    //mercado: 'mexicano',
                                    //usuario : "Roberto",
                                    status: "1"
                                });

                                functions.addLimitesMercado(token, data).then(function(response) {

                                    $('#contraparte').val('');
                                    $('#globalLimit').val('');
                                    $('#directOperationLimit').val('');
                                    $('#reportoOperationLimit').val('');
                                    $('#operationLimitMoneyMarket').val('');
                                    $('#exchangeMarketLimit').val('');
                                    $('#limitOperationExchangeMarket').val('');
                                    $('#add').css('display', 'none');
                                    $('#btnAgregar').slideDown('slow');
                                    Swal.fire('El mercado se registro correctamente', '', 'success');
                                    cambioDivisasMethod($('#selectTipo').val());

                                })
                            } // fin if tipo select




                        }
                    });

                } else {


                    globalLimit = $('#globalLimit').val();
                    directOperationLimit = $('#directOperationLimit').val();
                    reportoOperationLimit = $('#reportoOperationLimit').val();
                    operationLimitMoneyMarket = $('#operationLimitMoneyMarket').val();
                    exchangeMarketLimit = $('#exchangeMarketLimit').val();
                    limitOperationExchangeMarket = $('#limitOperationExchangeMarket').val();

                    if ($('#selectTipo').val() == "varLimite") {
                        /*
                        var producto=$('#productoVarLimite').val()

                        const data = JSON.stringify({
                            limite: contraparte,
                            producto: producto,
                            globalLimit: globalLimit,
                            directOperationLimit: directOperationLimit,
                            reportoOperationLimit: reportoOperationLimit,
                            operationLimitMoneyMarket: operationLimitMoneyMarket,
                            exchangeMarketLimit: exchangeMarketLimit,
                            limitOperationExchangeMarket: limitOperationExchangeMarket,
                            //mercado: 'mexicano',
                            //usuario : "Roberto",
                            status: "1"
                        });*/

                        //nuevo 27_09_2020
                        var productoSelectValor = $('#productoSelect').val();
                        var mercadoSelectValor = $('#mercadoSelect').val();
                        globalLimit = $('#globalLimitNuevo').val();
                        operationLimitMoneyMarket = $('#operationLimitMoneyMarketNuevo').val();


                        const data = JSON.stringify({
                            limite: 0,
                            producto: productoSelectValor,
                            globalLimit: globalLimit,
                            directOperationLimit: 0,
                            reportoOperationLimit: 0,
                            operationLimitMoneyMarket: operationLimitMoneyMarket,
                            exchangeMarketLimit: 0,
                            limitOperationExchangeMarket: 0,
                            //mercado: 'mexicano',
                            //usuario : "Roberto",
                            status: "1",
                            market: mercadoSelectValor
                        })


                        //-------

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
                            Swal.fire('El limite var se registro correctamente', '', 'success');
                            cambioDivisasMethod($('#selectTipo').val());


                            //nuevo 27_09_2020
                            $('#productoSelect').val('0');
                            $('#mercadoSelect').val('0');
                            $('#globalLimitNuevo').val('');
                            $('#operationLimitMoneyMarketNuevo').val('');

                            //---------


                        })

                    } else if ($('#selectTipo').val() == "mercadoLimite") {

                        const data = JSON.stringify({
                            mercado: contraparte,
                            globalLimit: globalLimit,
                            directOperationLimit: directOperationLimit,
                            reportoOperationLimit: reportoOperationLimit,
                            operationLimitMoneyMarket: operationLimitMoneyMarket,
                            exchangeMarketLimit: exchangeMarketLimit,
                            limitOperationExchangeMarket: limitOperationExchangeMarket,
                            //mercado: 'mexicano',
                            //usuario : "Roberto",
                            status: "1"
                        });

                        functions.addLimitesMercado(token, data).then(function(response) {

                            $('#contraparte').val('');
                            $('#globalLimit').val('');
                            $('#directOperationLimit').val('');
                            $('#reportoOperationLimit').val('');
                            $('#operationLimitMoneyMarket').val('');
                            $('#exchangeMarketLimit').val('');
                            $('#limitOperationExchangeMarket').val('');
                            $('#add').css('display', 'none');
                            $('#btnAgregar').slideDown('slow');
                            Swal.fire('El mercado se registro correctamente', '', 'success');
                            cambioDivisasMethod($('#selectTipo').val());

                        })
                    } // fin if tipo select


                } //fin if de divisas

            } //fin if del tipo 2 y 3

            //}//fin if validaciones


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
                    cambioDivisasMethod($('#selectTipo').val());


                })

            }
        });

    }


    $scope.deleteqMercadoVarLimite = function(id, tipo) {

        var tituloMensaTempo = "";
        if (tipo == "mercado") {
            tituloMensaTempo = "¿Esta seguro de querer eliminar el mercado?"
        } else {
            tituloMensaTempo = "¿Esta seguro de querer eliminar el limite var?"

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
                        cambioDivisasMethod($('#selectTipo').val());
                    })

                } else {

                    functions.deletelimiteVar(token, id).then(function(response) {
                        cambioDivisasMethod($('#selectTipo').val());
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

        } else {

            for (var i = 0; i < 7; i++) {
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

        } else {

            for (var i = 0; i < 7; i++) {
                var valueTd = valueTr.getElementsByTagName('td')[i]

                if (i != 0) {
                    var span = valueTd.getElementsByTagName("span")
                    span[0].style.display = "block";
                    var input = valueTd.getElementsByTagName("input")
                        //input[0].value=""
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

            functions.updateLimites(token, data, id).then(function(response) {

                Swal.fire('Datos actualizados correctamente', '', 'success');
                cambioDivisasMethod($('#selectTipo').val());

            })



        }





    }




    $scope.guardarModiMercadoVarLimite = function(id, contador, tipo, otro) {

        var valoresColumna = [];

        //document.getElementById("button_modi_"+contador).style.display="block";
        //document.getElementById("button_guar_"+contador).style.display="none";
        //document.getElementById("button_cancel_"+contador).style.display="none";

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
                    //input[0].value=""
                    //input[0].style.display="none";
                }

            }



        } else {

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

        /*var validacionLimiteGlobal = (parseInt(valoresColumna[1])) + (parseInt(valoresColumna[2])) + (parseInt(valoresColumna[4]));
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

        } else {*/

        /*
          valoresColumna[0]=globalLimit
          valoresColumna[1]=directOperationLimit
          valoresColumna[2]=reportoOperationLimit
          valoresColumna[3]=operationLimitMoneyMarket
          valoresColumna[4]=exchangeMarketLimit
          valoresColumna[5]=limitOperationExchangeMarket
        */



        if (tipo == "mercado") {

            const data = JSON.stringify({
                mercado: otro,
                globalLimit: valoresColumna[0],
                directOperationLimit: valoresColumna[1],
                reportoOperationLimit: valoresColumna[2],
                operationLimitMoneyMarket: valoresColumna[3],
                exchangeMarketLimit: valoresColumna[4],
                limitOperationExchangeMarket: valoresColumna[5],
                status: '1',

                //mercado: 'mexicano',
                //usuario : "Roberto"
            });

            functions.updateLimitesMercado(token, data, id).then(function(response) {

                Swal.fire('Datos actualizados correctamente', '', 'success');
                cambioDivisasMethod($('#selectTipo').val());

            })

        } else {

            var splitOtro = otro.split("&");

            /*const data = JSON.stringify({
                producto: splitOtro[1],
                limite: splitOtro[0],
                globalLimit: valoresColumna[0],
                directOperationLimit: valoresColumna[1],
                reportoOperationLimit: valoresColumna[2],
                operationLimitMoneyMarket: valoresColumna[3],
                exchangeMarketLimit: valoresColumna[4],
                limitOperationExchangeMarket: valoresColumna[5],
                status: '1',

                //mercado: 'mexicano',
                //usuario : "Roberto"
            });*/

            //nuevo 27_09_2020
            const data = JSON.stringify({
                producto: splitOtro[1],
                limite: 0,
                globalLimit: valoresColumna[0],
                directOperationLimit: 0,
                reportoOperationLimit: 0,
                operationLimitMoneyMarket: valoresColumna[1],
                exchangeMarketLimit: 0,
                limitOperationExchangeMarket: 0,
                status: '1'

                //mercado: 'mexicano',
                //usuario : "Roberto"
            });
            //-----------------


            functions.updateLimitesVarMd(token, data, id).then(function(response) {

                Swal.fire('Datos actualizados correctamente', '', 'success');
                cambioDivisasMethod($('#selectTipo').val());

            })

        }




        //}





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
    cambioDivisasMethod = $scope.cambioDivisasMethod;
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

    functions.getSemaforos(token, 0).then(function(response) {
        var da = response.data;

        console.log(da);
        $('#spinner').fadeIn();
        $('#conteTableSemaforo').append('<table class="table table-striped" id="semaforo" >' +
            '<thead class="bg-warning-200">' +
            '<tr>' +
            '<th>Contraparte</th>' +
            '<th>Limite Global</th>' +
            '<th>Límite Utilizado</th>' +
            '<th>Límite Restante</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody id="tableSemaforo">' +
            '</tbody>' +
            '</table>');


        for (let i = 0; i < da['length']; i++) {
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
            $('#tableSemaforo').append('<tr>' +
                '<td>' + da[i].contraparte + '</td>' +
                '<td>' + formatDollar(parseFloat(da[i].globalLimit)) + '</td>' +
                '<td>' + formatDollar(parseFloat(da[i].suma)) + '</td>' +
                '<td class="' + clase + '">' + formatDollar(parseFloat(resta)) + '</td>' +
                '</tr>');
            this.arrayContraparte.push(da[i].contraparte); // Pariente
            this.arrayLimiteGlobal.push(da[i].globalLimit); // Pariente
            this.arrayLimiteUtilizado.push(da[i].suma); // Pariente
            this.arrayLimiteRestante.push(resta); // Pariente
        }

        $('#semaforo').dataTable({

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

        functions.generarGraficaSemaforos(arrayContraparte, 'graficaSemaforo', arrayLimiteGlobal);
        this.getListaSemaforosOperador();


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
                '<thead class="bg-warning-200">' +
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

            this.getListaSemaforosLimitesVarMercado();
            functions.generarGraficaSemaforos(arrayContraparte4, 'graficaSemaforoVarLimite', arrayLimiteGlobal4);


        });
    }



    $scope.getListaSemaforosLimitesVarMercado = function() {

        functions.getLimitesVarMercado(token).then(function(response) {
            var da = response.data;
            console.log(da)
            console.log("termino 2--------")

            $('#conteTableSemaforoMercado').append('<table class="table table-striped" id="semaforoMercado" >' +
                '<thead class="bg-warning-200">' +
                '<tr>' +
                '<th>Mercado</th>' +
                '<th>Limite Global</th>' +
                '<th>Límite Utilizado</th>' +
                '<th>Límite Restante</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody id="tableSemaforoMercado">' +
                '</tbody>' +
                '</table>');


            // console.log(da);
            const arrayContraparte = [],
                arrayLimiteGlobal = [],
                arrayLimiteUtilizado = [],
                arrayLimiteRestante = []; // Pariente
            for (let i = 0; i < da['length']; i++) {
                // console.log("....");
                da[i].suma = 10; //temporal
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

                $('#tableSemaforoMercado').append('<tr>' +
                    '<td>' + da[i].mercado + '</td>' +
                    '<td>' + formatDollar(parseFloat(da[i].globalLimit)) + '</td>' +
                    '<td>' + formatDollar(parseFloat(da[i].suma)) + '</td>' +
                    '<td class="' + clase + '">' + formatDollar(parseFloat(resta)) + '</td>' +
                    '</tr>');
                this.arrayContraparte5.push(da[i].mercado); // Pariente
                this.arrayLimiteGlobal5.push(da[i].globalLimit); // Pariente
                //this.arrayLimiteUtilizado2.push(da[i].suma); // Pariente
                //this.arrayLimiteRestante2.push(resta); // Pariente
            }

            $('#semaforoMercado').dataTable({

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

            //this.getListaSemaforosLimitesVarMercado();
            functions.generarGraficaSemaforos(arrayContraparte5, 'graficaSemaforoMercado', arrayLimiteGlobal5);


        });
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

    $scope.showChart = function(idGrafica, idButton) {


        if (document.getElementById(idGrafica).style.display == "none") {
            document.getElementById(idGrafica).style.display = "block";
            document.getElementById(idButton).text = "Ocultar Grafica";
            document.getElementById(idButton).innerHTML = "Ocultar Grafica";
        } else {
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
    getListaSemaforosLimitesVarMercado = $scope.getListaSemaforosLimitesVarMercado;
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
            for (var i = 0; i < response.length; i++) {
                rows.push(response[0][i]["filas"]);
                cols.push(response[0][i]["columna"]);
                cdCurvas.push(response[0][i]["cdCurva"]);
            }
            console.log(rows);
            console.log(cols);
            console.log(cdCurvas);
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

    $scope.upValidation= function() {
        // determinas fecha X nombreArchivo
        // tipoArchivo
        // var tipo = document.getElementById('elements').value;


        if(respuesta == "SUCCESS"){
            $scope.up();
        }{
            //MSJ "Se reemplazaran datos?  "
        }
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



    $scope.procesoExcel = function(jsondata) {
        $('#loader-wrapper').css('display', '');
        var rv2 = {};
        var url;
        var tipo = document.getElementById('elements').value;
        var columns = header(jsondata);
        var conteo = 0;

        if (tipo == "1") { // H_Curvas
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
                url = 'hcurvas';
                functions.csv(token, rv, url).then(function(response) {
                    var response = response.data;
                    console.log(response)
                    return response
                }).then(res => {

                    if (val == columns.length) {
                        $('#loader-wrapper').css('display', 'none');
                        Swal.fire({
                            title: 'Proceso terminado correctamente',
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
                        title: 'Error en el proceso',
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
        } else if (tipo == "2") { //CURVAS
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
                                        title: 'Proceso terminado correctamente',
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
                                    title: 'Error en el proceso',
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

        } else if (tipo == "5") { // SWAPS
            return new Promise((resolve, reject) => {
                functions.deleteSwapData(token).then(function(response) {
                    var response = response.data;
                    console.log(response);
                    console.log("termino el proceso de eliminación--------")
                    return response;
                }).then(res => {
                    console.log(res);
                    var val1 = 1;
                    for (var i = 0; i < jsondata.length; i++) {
                        var rv = {};
                        url = 'deswap';
                        if (columns.length == 16) {
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
                                                title: 'Error en el formato de fecha',
                                                text: 'El formato de fecha debe ser yyyy-mm-dd',
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
                                            title: 'Error en el formato de fecha',
                                            text: 'El formato de fecha debe ser yyyy-mm-dd',
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
                                        title: 'Proceso terminado correctamente',
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
                                    title: 'Error en el proceso',
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
                                title: 'Error de archivo',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {}
                            })
                            return;
                        }
                    }
                })
            })
        } else {
            var val1 = 1;
            for (var i = 0; i < jsondata.length; i++) {
                var rv = {};
                switch (tipo) {
                    //CAPS
                    case "3":
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
                                                title: 'Error en el formato de fecha',
                                                text: 'El formato de fecha debe ser yyyy-mm-dd',
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
                                            title: 'Error en el formato de fecha',
                                            text: 'El formato de fecha debe ser yyyy-mm-dd',
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
                                        title: 'Proceso terminado correctamente',
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
                                    title: 'Error en el proceso',
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
                                title: 'Error de archivo',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {}
                            })

                            return;
                        }
                        break;
                    // FLUJO DE CAPS
                    case "4":

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
                                                title: 'Error en el formato de fecha',
                                                text: 'El formato de fecha debe ser yyyy-mm-dd',
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
                                            title: 'Error en el formato de fecha',
                                            text: 'El formato de fecha debe ser yyyy-mm-dd',
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
                                        title: 'Proceso terminado correctamente',
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
                                    title: 'Error en el proceso',
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
                                title: 'Error de archivo',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {}
                            })
                            return;
                        }
                        break;
                    // FLUJO DE SWAPS
                    case "6":
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
                                                title: 'Error en el formato de fecha',
                                                text: 'El formato de fecha debe ser yyyy-mm-dd',
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
                                            title: 'Error en el formato de fecha',
                                            text: 'El formato de fecha debe ser yyyy-mm-dd',
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
                                        title: 'Proceso terminado correctamente',
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
                                    title: 'Error en el proceso',
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
                                title: 'Error de archivo',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {}
                            })
                            return;
                        }
                        break;
                    // FUTUROS
                    case "7":
                        url = 'deFuturos';

                        if (columns.length == 12) {
                            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                                if (colIndex == 2 || colIndex == 3) {
                                    var cellValue = jsondata[i][columns[colIndex]];
                                    if (cellValue.indexOf("/") > -1) {

                                        var date = new Date(cellValue);

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
                                                title: 'Error en el formato de fecha',
                                                text: 'El formato de fecha debe ser yyyy-mm-dd',
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
                                            title: 'Error en el formato de fecha',
                                            text: 'El formato de fecha debe ser yyyy-mm-dd',
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
                                        title: 'Proceso terminado correctamente',
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
                                    title: 'Error en el proceso',
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
                                title: 'Error de archivo',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: `Entendido`,
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {}
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

        if (tipo == "1" || tipo == "2") {
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
            Swal.fire('Proceso realizado correctamente', '', 'success');


        })


    }

    procesoVar = $scope.procesoVar;


})

app.controller('generarvar', function( $scope, functions) {
    
    
    
    functions.loading();

    $scope.validaGenerarVar = function(){
        
        $("#conntentSpinner").fadeIn();
        var fecha = document.getElementById("varDate").value;
        if(null==fecha || undefined==fecha || ""==fecha){
            document.getElementById('mensajeError').innerHTML ="Por favor selecciona una fecha.";
            $('#messageValidaVar').modal('show');
        } else {
            let data = {
                fecha: fecha
            };
            functions.validaGenerarVarFactory(token, JSON.stringify(data)).then(function(response) {
                console.log("### getProductosVar:: ",response);
                var res = response.data;

                if (res.status=="NO_CONTENT"){
                    document.getElementById('mensajeError').innerHTML =res.mensaje;
                    $('#messageValidaVar').modal('show');
                } else if (res.status=="FOUND"){
                    document.getElementById('mensajeConfirmacion').innerHTML =res.mensaje;
                    $('#messageConfirmacion').modal('show');
                } else if (res.status=="OK"){
                    document.getElementById('mensajeError').innerHTML ="Proceso realizado correctamente.";
                    $('#messageConfirmacion').modal('show');
                } else {
                    document.getElementById('mensajeError').innerHTML ="Ocurrió un problema al realizar el proceso.";
                    $('#messageConfirmacion').modal('show');
                }
            });
        }
        $("#conntentSpinner").fadeOut();
        
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
            console.log("termino el proceso--------")
            if (res.status=="OK"){
                document.getElementById('mensajeError').innerHTML ="Proceso realizado correctamente.";
                $('#messageConfirmacion').modal('show');
            } else {
                document.getElementById('mensajeError').innerHTML ="Ocurrió un problema al realizar el proceso.";
                $('#messageConfirmacion').modal('show');
            }


            $("#conntentSpinner").fadeOut();
        })


    };


    
    
    generarVar = $scope.generarVar;

})
