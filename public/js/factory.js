(function() {
    var PORT=8080;
    app.factory('functions', function($http, $window) {
        return {
            loading: function() {
                console.log("[factory.js] loading");

                $('#loader-wrapper').css('display', '');
                $window.onload = function(e) {
                    //your magic here
                    $('#loader-wrapper').css('display', 'none');
                }

                setTimeout(function() {
                    $('#loader-wrapper').css('display', 'none');
                }, 4000);
            },
            loadingWait: function() {
                console.log("[factory.js] loading");

                $('#loader-wrapper').css('display', '');
            },
            loadingEndWait: function() {
                console.log("[factory.js] loading");

                $('#loader-wrapper').css('display', 'none');
            },
            loadingWaitTime: function(x) {
                console.log("[factory.js] loading");

                $('#loader-wrapper').css('display', '');
                setTimeout(function() {
                    $('#loader-wrapper').css('display', 'none');
                }, x);
            },
            sumaArray: function(data, indice) {
                console.log("[functions][sumaArray]");

                var sumaTotal = 0;

                for (var x = 0; x < data.length; x++) {

                    console.log("Suma: " + data[x][indice]);

                    sumaTotal = parseFloat(sumaTotal) + parseFloat(data[x][indice]);

                }

                return sumaTotal;

            },
            generarGraficaPieChart: function(data) {

                console.log("[functions][generarGraficaBarras]");

                console.log(data);

                //instrumentos
                var labels = Array();

                //titulos
                var dataPie = Array();

                for (var x = 0; x < data.length; x++) {

                    labels[x] = data[x].instrumento;
                    dataPie[x] = data[x].titulos;

                }

                console.log(labels);
                console.log(dataPie);

                /* pie chart */
                var pieChart = function() {
                        var config = {
                            type: 'pie',
                            data: {
                                datasets: [{
                                    data: dataPie,
                                    backgroundColor: [
                                        primary_100,
                                        danger_500,
                                        success_100,
                                        info_100,
                                        success_500,
                                        danger_100,
                                        success_500,
                                        info_500,
                                        primary_500
                                    ],
                                    label: 'My dataset' // for legend
                                }],
                                labels: labels
                            },
                            options: {
                                responsive: true,
                                legend: {
                                    display: true,
                                    position: 'bottom',
                                }
                            }
                        };
                        new Chart($("#pieChart > canvas").get(0).getContext("2d"), config);
                    }
                    /* pie chart -- end */

                pieChart();

            },
            generarGraficaBarras: function(data) {

                console.log("[functions][generarGraficaBarras]");

                console.log(data);

                var dataTargetProfit = Array();
                var dataProfit = Array();

                var max = 0;
                var y = 0;

                var sum = 0;

                for (var x = 0; x < data.length; x++) {

                    console.log("unix: " + moment(data[x].fecha_valuacion).unix());

                    if (data[x][0] == 1) {

                        console.log("fecha: " + moment(data[x][1]).format('YYYY-MM-DD HH:mm:ss'));
                        console.log("valueOf: " + moment(data[x][1]).valueOf());
                        console.log("resultado: " + data[x][4]);
                        console.log("valor_en_libros: " + data[x][5]);
                        console.log("val_costo: " + data[x][6]);
                        console.log("precio_mercado: " + data[x][7]);

                        //número límites de la gráfica
                        //if(data[x][4]>-100000 && data[x][4]<100000){

                        console.log("Genera");

                        dataTargetProfit[y] = Array();
                        dataProfit[y] = Array();

                        dataTargetProfit[y][0] = moment(data[x][1]).valueOf();
                        dataTargetProfit[y][1] = parseFloat(data[x][4]) + parseFloat(sum);
                        dataProfit[y][0] = moment(data[x][1]).valueOf();
                        dataProfit[y][1] = parseFloat(data[x][7]);
                        sum = sum + parseFloat(data[x][4]);

                        y++;

                        //maximo de la gráfica
                        if (data[x][4] > max) {
                            max = data[x][4];
                        }

                        //} else {
                        //  console.log("No Genera");
                        //}

                    }

                }

                console.log(dataTargetProfit);

                /*
                var dataTargetProfit = [
                ]
                */




                //var dataProfit = []
                var dataSignups = []

                /* flot toggle example */
                var flot_toggle = function() {

                    var data = [{
                            label: "P&L",
                            data: dataTargetProfit,
                            color: info_400,
                            bars: {
                                show: true,
                                align: "center",
                                barWidth: 100000000,
                                lineWidth: 0,
                                /*fillColor: {
                                  colors: [color.primary._500, color.primary._900]
                                },*/
                                fillColor: {
                                    colors: [{
                                            opacity: 0.9
                                        },
                                        {
                                            opacity: 0.1
                                        }
                                    ]
                                }
                            },
                            highlightColor: 'rgba(255,255,255,0.3)',
                            shadowSize: 1
                        },
                        {
                            label: "Líneas 1",
                            data: [],
                            color: warning_500,
                            lines: {
                                show: true,
                                lineWidth: 2,
                                fill: true
                            },
                            shadowSize: 0,
                            points: {
                                show: true
                            }
                        },
                        {
                            label: "Líneas 2",
                            data: dataSignups,
                            color: success_500,
                            lines: {
                                show: true,
                                lineWidth: 2,
                                fill: true
                            },
                            shadowSize: 0,
                            points: {
                                show: true
                            }
                        }
                    ]

                    var options = {
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: '#f2f2f2',
                            borderWidth: 1,
                            borderColor: '#f2f2f2'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            cssClass: 'tooltip-inner',
                            defaultTheme: false
                        },
                        xaxis: {
                            mode: "time"
                        },
                        yaxes: {
                            tickFormatter: function(val, axis) {
                                return "$" + val;
                            },
                            max: 1200
                        }

                    };

                    var plot2 = null;

                    function plotNow() {
                        var d = [];
                        $("#js-checkbox-toggles").find(':checkbox').each(function() {
                            if ($(this).is(':checked')) {
                                d.push(data[$(this).attr("name").substr(4, 1)]);
                            }
                        });
                        if (d.length > 0) {
                            if (plot2) {
                                plot2.setData(d);
                                plot2.draw();
                            } else {
                                plot2 = $.plot($("#flot-toggles"), d, options);
                            }
                        }

                    };

                    $("#js-checkbox-toggles").find(':checkbox').on('change', function() {
                        plotNow();
                    });
                    plotNow()
                }
                flot_toggle();
                /* flot toggle example -- end Barras*/

                /* lienas

                var data = [
                  {
                      label: "P&L",
                      data: [],
                      color: info_400,
                      bars:
                      {
                          show: true,
                          align: "center",
                          barWidth: 30 * 30 * 60 * 1000 * 80,
                          lineWidth: 0,
                          //fillColor: {
                          //    colors: [color.primary._500, color.primary._900]
                          //},
                          fillColor:
                          {
                              colors: [
                              {
                                  opacity: 0.9
                              },
                              {
                                  opacity: 0.1
                              }]
                          }
                      },
                      highlightColor: 'rgba(255,255,255,0.3)',
                      shadowSize: 1
                  },
                  {
                      label: "Líneas",
                      data: dataProfit,
                      color: warning_500,
                      lines:
                      {
                          show: true,
                          lineWidth: 2,
                          fill: true
                      },
                      shadowSize: 0,
                      points:
                      {
                          show: true
                      }
                  },
                  {
                      label: "Líneas 2",
                      data: dataSignups,
                      color: success_500,
                      lines:
                      {
                          show: true,
                          lineWidth: 2,
                          fill: true
                      },
                      shadowSize: 0,
                      points:
                      {
                          show: true
                      }
                  }]

                  var options = {
                      grid:
                      {
                          hoverable: true,
                          clickable: true,
                          tickColor: '#f2f2f2',
                          borderWidth: 1,
                          borderColor: '#f2f2f2'
                      },
                      tooltip: true,
                      tooltipOpts:
                      {
                          cssClass: 'tooltip-inner',
                          defaultTheme: false
                      },
                      xaxis:
                      {
                          mode: "time"
                      },
                      yaxes:
                      {
                          tickFormatter: function(val, axis)
                          {
                              return "$" + val;
                          },
                          max: 1200
                      }

                  };

                  var plot3 = null;

                  function plotNow2()
                      {
                          var d = [];
                          $("#js-checkbox-toggles").find(':checkbox').each(function()
                          {
                              if ($(this).is(':checked'))
                              {
                                  d.push(data[$(this).attr("name").substr(4, 1)]);
                              }
                          });
                          if (d.length > 0)
                          {
                              if (plot3)
                              {
                                  plot3.setData(d);
                                  plot3.draw();
                              }
                              else
                              {
                                  plot3 = $.plot($("#flot-toggles-lineas"), d, options);
                              }
                          }

                      };

                      $("#js-checkbox-toggles").find(':checkbox').on('change', function()
                      {
                          plotNow2();
                      });

                      plotNow2();
                  fin líneas */

            },
            generateAddKeyResult: function(contabilidad) {

                for (var x = 0; x < contabilidad.length; x++) {

                    contabilidad[x]["resultado"] = parseFloat((parseFloat(contabilidad[x].no_hay_titulo) + parseFloat(contabilidad[x].caja)).toFixed(2));

                }

                return contabilidad;

            },
            postIngresar: function(correo, contPass) {

                console.log("[factory][postIngresar]");

                console.log("correo: " + correo + " contPass: " + contPass);

                var url = '/api/usuarios/ingresar';
                return $http.get(url, {
                    params: { cache: false, correo: correo, contPass: contPass },
                    cache: false
                });

            },
            getUsuario: function(id_usuarios) {

                console.log("[factory][getUsuario]");

                var url = '/api/usuarios/obtener';
                return $http.get(url, {
                    params: { cache: false, id_usuarios: id_usuarios },
                    cache: false
                });

            },
            getAllContaduria: function() {

                console.log("[factory][getAllContaduria]");

                var url = '/api/mesa-de-dinero/posicion/global/obtenerAll';
                return $http.get(url, {
                    params: { cache: false },
                    cache: false
                });

            },
            getContaduriaByMaxDate: function() {

                console.log("[factory][getContaduriaByMaxDate]");

                var url = '/api/mesa-de-dinero/posicion/global/obtenerByMaxDate';
                return $http.get(url, {
                    params: { cache: false },
                    cache: false
                });

            },
            getMesaDeDinero: function(start, end, instrumento) {

                console.log("[factory][getMesaDeDinero]");

                var url = '/api/mesa-de-dinero/obtener';
                return $http.get(url, {
                    params: { cache: false, start: start, end: end, instrumento: instrumento },
                    cache: false
                });

            },
            getPosicionPorInstrumentoObtenerInstrumentos: function(start, end) {

                console.log("[factory][getPosicionPorInstrumentoObtenerInstrumentos]");

                var url = '/api/mesa-de-dinero/posicion/porInstrumento/obtenerInstrumentos';
                return $http.get(url, {
                    params: { cache: false, start: start, end: end },
                    cache: false
                });

            },
            getOperacionesDirectoObtenerInstrumentos: function(start, end) {

                console.log("[factory][getOperacionesDirectoObtenerInstrumentos]");

                var url = '/api/mesa-de-dinero/operacion/directo/obtenerInstrumentos';
                return $http.get(url, {
                    params: { cache: false, start: start, end: end },
                    cache: false
                });

            },
            postLogout: function() {

                console.log("[factory][postLogout]");

                var url = '/api/usuarios/logout';
                return $http.get(url, {
                    params: { cache: false },
                    cache: false
                });

            },
            getZonaHoraria: function(id_usuarios) {

                console.log("[factory][getZonasHoraria]");

                var url = '/api/usuarios/zonaHoraria/obtener';
                return $http.get(url, {
                    params: { cache: false, id_usuarios: id_usuarios },
                    cache: false
                });

            },
            postOperacionDirecta: function(fecha_de_operacion, operacion, instrumento, montoNominal, precio,
                tasaSobreTasa, numeroDeTitulos, montoLiquidacion, fechaLiquidacion,
                contraparte) {

                var url = '/api/mesa-de-dinero/operacion/directo/nueva';
                return $http.post(url, {
                    cache: false,
                    fecha_de_operacion: fecha_de_operacion,
                    operacion: operacion,
                    instrumento: instrumento,
                    montoNominal: montoNominal,
                    precio: precio,
                    tasaSobreTasa: tasaSobreTasa,
                    numeroDeTitulos: numeroDeTitulos,
                    montoLiquidacion: montoLiquidacion,
                    fechaLiquidacion: fechaLiquidacion,
                    contraparte: contraparte
                });
            },
            postLimitesLineas: function(token, tipoEnvio) {
                var url = 'http://localhost:'+PORT+'/app/limiteslineas/lista/' + tipoEnvio;
                //var url = 'http://localhost:'+PORT+'/app/limiteslineas/lista/' + tipoEnvio;


                console.log(token)

                return $http.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                });
            },

            deleteMercado: function(token, id) {
                var url = 'http://localhost:'+PORT+'/app/limitesMercado/' + id;
                return $http.delete(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                });
            },
            deletelimiteVar: function(token, id) {
                var url = 'http://localhost:'+PORT+'/app/limitesVarMd/' + id;
                return $http.delete(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                });
            },

            addLimites: function(token, data) {

                var url = 'http://localhost:'+PORT+'/app/limiteslineas/';

                console.log(token)

                return $http.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                });
            },
            addLimitesVarMd: function(token, data) {

                //var url = 'http://localhost:'+PORT+'/app/limitesVarMd/';
                var url = 'http://localhost:'+PORT+'/app/limitesVarMd/';

                console.log(token)

                return $http.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                });
            },
            addLimitesMercado: function(token, data) {

                //var url = 'http://localhost:'+PORT+'/app/limitesMercado/';
                var url = 'http://localhost:'+PORT+'/app/limitesMercado/';

                console.log(token)

                return $http.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                });
            },


            updateLimites: function(token, data, id) {

                var url = 'http://localhost:'+PORT+'/app/limiteslineas/' + id;

                console.log(token)

                return $http.put(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                });
            },

            updateLimitesMercado: function(token, data, id) {
                var url = 'http://localhost:'+PORT+'/app/limitesMercado/' + id;
                return $http.put(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                });
            },

            updateLimitesVarMd: function(token, data, id) {

                //var url = 'http://localhost:'+PORT+'/app/limiteslineas/' + id;
                //var url = 'http://localhost:'+PORT+'/app/limitesVarMd/' + id;
                var url = 'http://localhost:'+PORT+'/app/limitesVarMd/' + id;

                console.log(token)

                return $http.put(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                });
            },

            deleteLimites: function(token, id) {

                var url = 'http://localhost:'+PORT+'/app/limiteslineas/' + id;

                console.log(token)

                return $http.delete(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                });

            },
            getHistoricoVarMercado: function(token) {
                var url = 'http://localhost:'+PORT+'/app/semaforosalertas/historicoVarMercado/';
                return $http.get(url, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            getSemaforoContraParte: function(token) {
                var url = 'http://localhost:'+PORT+'/app/semaforosalertas/contraParte/';
                return $http.get(url, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            getSemaforos: function(token, tipoEnvio) {
                var url = 'http://localhost:'+PORT+'/app/semaforosalertas/lista/' + tipoEnvio;
                //var url = 'http://localhost:'+PORT+'/app/semaforosalertas/lista/' + tipoEnvio;


                console.log(token)
                console.log(tipoEnvio)

                return $http.get(url, {

                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            getListaSemaforosOperaciones: function(token) {
                var url = 'http://localhost:'+PORT+'/app/semaforosalertas/listaSegundaTabla';
                //var url = 'http://localhost:'+PORT+'/app/semaforosalertas/listaSegundaTabla';


                console.log(token)

                return $http.get(url, {

                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            getLimitesVarMd: function(token) {
                var url = 'http://localhost:'+PORT+'/app/limitesVarMd/findAllVar';
                //var url = 'http://localhost:'+PORT+'/applimitesVarMd/findAllVar';


                console.log(token)

                return $http.get(url, {

                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            getLimitesVarMercado: function(token) {
                var url = 'http://localhost:'+PORT+'/app/limitesMercado/findAll';
                return $http.get(url, {

                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            getLogaritmo: function(token, data) {
                var url = 'http://localhost:'+PORT+'/app/logaritmo/log';

                console.log(token)

                return $http.post(url, data, {

                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },

            mesaDeDinero(token) {
                const uri = 'http://localhost:'+PORT+'/app/logaritmo/mesaDinero/';

                return $http.get(uri, {

                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }


                });
            },

            mesaDeDerivados(token, data) {
                const uri = 'http://localhost:'+PORT+'/app/logaritmo/mesaDerivados/';
                //const uri = 'http://localhost:'+PORT+'/app/logaritmo/mesaDerivados/';

                return $http.post(uri,data, {

                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }


                });
            },
            getProductosVar(token, data) {
                const uri = 'http://localhost:'+PORT+'/app/logaritmo/getProductos/';

                return $http.post(uri,data, {

                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }


                });
            },
            getTransaccionesVar(token, data) {
                return $http.post('http://localhost:'+PORT+'/app/logaritmo/getTransacciones/',
                    data, {
                        headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                        }
                    }
                );
            },

            generarGraficaSemaforos: function(arrayContraparte, idGrafica, arrayLimiteGlobal) {

                /* pie chart */
                var pieChart = function() {
                    var config = {
                        type: 'pie',
                        data: {
                            datasets: [{
                                data: arrayLimiteGlobal,
                                backgroundColor: [
                                    primary_100,
                                    danger_500,
                                    success_100,
                                    info_100,
                                    success_500,
                                    danger_100,
                                    success_500,
                                    info_500,
                                    primary_500
                                ],
                                label: 'My dataset' // for legend
                            }],
                            labels: arrayContraparte
                        },
                        options: {
                            responsive: true,
                            legend: {
                                display: true,
                                position: 'bottom',
                            }
                        }
                    };
                    new Chart($("#" + idGrafica).get(0).getContext("2d"), config);
                }
                pieChart();
            },

            generarGraficaBarra: function(idGrafica, labelsChart, dataChart, title) {
                var barChart = function() {
                    var config = {
                        type: 'bar',
                        data: {
                            datasets: [{
                                label: title,
                                data: dataChart,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 205, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(201, 203, 207, 0.2)'
                                ],
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)',
                                    'rgb(201, 203, 207)'
                                  ],
                                borderWidth: 1,
                            }],
                            labels: labelsChart
                        },
                        options: {
                            responsive: true,
                        }
                    };
                    new Chart($("#" + idGrafica).get(0).getContext("2d"), config); 
                }
                barChart();
            },

            generarGraficaHistoricoVaR: function(idGrafica, dataChart, title) {
                var barChart = function() {
                    var config = {
                        type: 'bar',
                        data: dataChart,
                        options: {
                            plugins: {
                              title: {
                                text: title,
                                display: true
                              }
                            }
                        }
                    };
                    new Chart($("#" + idGrafica).get(0).getContext("2d"), config); 
                }
                barChart();
            },

            iniciarProcesoVar: function(token) {
                var url = 'http://localhost:'+PORT+'/app/logaritmo/log2';
                //var url = 'http://localhost:'+PORT+'/app/logaritmo/log2';
                console.log(token)

                return $http.post(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                });
            },

            csv: function(token, data, url) {
                console.log("entro factory");
                const uri = 'http://localhost:'+PORT+'/app/archivos/' + url;
                console.log(uri);
                console.log(data);
                var x = $http.post(uri, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
                return x;
            },

            existenDatos: function(token, data) {
                console.log("entro factory");
                const uri = 'http://localhost:'+PORT+'/app/archivos/existenDotos';
                console.log(uri);
                console.log(data);
                return $http.post(uri, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            deleteSwapData: function(token, url) {
                console.log("entro factory");
                //const uri = 'http://localhost:'+PORT+'/app/archivos/deleteSwap';
                const uri = 'http://localhost:'+PORT+'/app/archivos/deleteSwap';

                console.log(uri);
                return $http.post(uri, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            deleteExistenteFecha: function(token, data) {
                console.log("entro factory");
                //const uri = 'http://localhost:'+PORT+'/app/archivos/deleteCurvas';
                const uri = 'http://localhost:'+PORT+'/app/archivos/deleteExisteFecha';
                console.log(uri);
                console.log(data);
                return $http.post(uri, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            insertaLn: function(token, data) {
                console.log("entro factory");
                //const uri = 'http://localhost:'+PORT+'/app/archivos/deleteCurvas';
                const uri = 'http://localhost:'+PORT+'/app/archivos/insertaLn';
                console.log(uri);
                console.log(data);
                return $http.post(uri, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            getParametros: function(token) {
                var url = 'http://localhost:'+PORT+'/app/archivos/Column/';
                //var url = 'http://localhost:'+PORT+'/app/semaforosalertas/lista/' + tipoEnvio;
                return $http.post(url, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },

            validaGenerarVarFactory(token, data) {
                var uri = 'http://localhost:'+PORT+'/app/mercadoDeDerivadoss/validaGenerarVarFactory';
                return $http.post(uri, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            generarVarFactory(token, data) {
                var uri = 'http://localhost:'+PORT+'/app/mercadoDeDerivadoss/generarVarFactory';
                return $http.post(uri, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf8',
                        Authorization: token
                    }
                });
            },
            generarGraficaDona: function(idGrafica, labels, data, color, limite) {
                
                document.getElementById(idGrafica).remove();
                var canvas = document.createElement("canvas");
                canvas.id = idGrafica; 
                canvas.height=280; 
                document.getElementById("contenedorChart").appendChild(canvas);

                var color1 = '#EAECEE';
                if (undefined!= color && null!= color){
                    if(color==0){
                        color1 ='#18fd03';
                    } else if (color==2) {
                        color1 = 'orange'
                    } else {
                        color1 ='red';
                    }
                }
                
                var ctx = document.getElementById(idGrafica).getContext("2d");
                var chart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [{
                            backgroundColor: [
                                color1,
                                '#34495E',
                                '#808B96',
                                '#154360',
                                '#95A5A6',
                                '#7D6608',
                                '#17202A',
                                '#512E5F',
                                '#090249 ',
                                '#641E16',
                                '#abc8f8',
                                '#d7abf8',
                                '#f88e86',
                                '#92ddea',
                                '#d1ebff',
                                '#be9ddf',
                                '#f9ffc9',
                                '#d3ffd4',
                                '#d6d8b2',
                                '#ffd2d9',
                                '#a7d2c4',
                                '#dbb8b8',
                                '#ffa5d8',
                                '#d3ffd4',
                                '#9579d1',
                                '#ffe7c9',
                                '#f8abde'
                            ],
                            data: data
                        }]
                    },
                    plugins: [{
                            id: 'prueba',
                            beforeDraw: function(chart){
                                var w = chart.width;
                                var h = chart.height;
                                var c = chart.ctx;
                                var c1 = chart.ctx;
                                var c2 = chart.ctx;
                                c.restore();
                                var f = (h/200).toFixed(2);
                                c.font = 'bold ' + f + 'em sans-serif';
                                c.textBaseline = 'midle';
                                var t='Hola';
                                var a = Math.round((w-3.5*c.measureText(t).width)/2);
                                t='Nivel de Límite de VaR: '
                                if(color==0){
                                    var imagen = document.getElementById("botonVerde");
                                    var t1='Estable';
                                    color1= 'green'
                                }else if(color==1) {
                                    var imagen = document.getElementById("botonRojo");
                                    var t1='Excedido';
                                    
                                }else if(color==2) {
                                    var imagen = document.getElementById("botonNaranja");
                                    var t1='Alerta';
                                    
                                };
                                c.fillText(t,a*1.7,h/1.3);
                                c.save();
                                c2.drawImage(imagen,a/1.18,h/2.4,50,50);
                                c2.save();
                                var f = (h/190).toFixed(2);
                                c1.font = 'bold ' + f + 'em sans-serif';
                                c1.fillStyle = color1;
                                c1.fillText(t1,a+a*.9,h/1.1,150,150);
                            }
                    }],
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,    
                        legend: {
                            display: true,
                            fontSize:30,
                            position: 'right'
                        },
                        animation :{
                          animateScale: true,
                          animateRotate: true  
                        },
                        tooltips: {
                            enabled: true,
                            mode: 'single',
                            labelAlign:'left',
                            afterLabelAlign:'left',
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var label = data.datasets[0].data[tooltipItem.index];
                                    var titulo = data.labels[tooltipItem.index];
                                    var dataset = data['datasets'][0];
                                    var percent = dosDecimales((dataset['data'][tooltipItem['index']] / limite) * 100)
                                    if(titulo!="Límite Disponible"){
                                        label = Math.abs(label);
                                    }
                                    label = comas(dosDecimales(label));
                                    return " " +titulo + ": " + label  ;
                                },
                                afterLabel: function(tooltipItem, data) {
                                    var label = data.datasets[0].data[tooltipItem.index];
                                    var titulo = data.labels[tooltipItem.index];
                                    var dataset = data['datasets'][0];
                                    var percent = dosDecimales((dataset['data'][tooltipItem['index']] / limite) * 100)
                                    percent = Math.abs(percent);
                                    
                                    if(titulo=="Límite Disponible"){
                                        if(color==0){
                                            return "Límite de VaR Dispible " +   comas(dosDecimales(percent)) + '%';
                                        }else if(color==1) {
                                            return "Límite de VaR Excedido en " +  comas(dosDecimales(percent)) + '%';
                                        }else if(color==2) {
                                            return "Límite de VaR Disponible en Nivel de Alerta: " +   comas(dosDecimales(percent)) + '%';
                                        };
                                    }
                                    else if(label>=0){
                                        return "P&L de " + titulo +"  Negativo, Consume Límite en " +   comas(dosDecimales(percent)) + '%';
                                    }else {
                                        return "P&L de " + titulo +" Positivo, Aporta a Límite en " +   comas(dosDecimales(percent)) + '%';
                                    };
                                   
                                },
                                
                            }
                        }
                    }
                });
                chart.update();
                comas = function numberWithCommas(x) {
                    x = x.toString();
                    var pattern = /(-?\d+)(\d{3})/;
                    while (pattern.test(x))
                        x = x.replace(pattern, "$1,$2");
                    return x;
                };
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
                };
            },
            generarGraficaDonaBasic: function(idGrafica, labels, data) {
                
                /* pie chart */
                var doughnutChart = function() {
                    var config = {
                        type: 'doughnut',
                        data: {
                            datasets: [{
                                data: data,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(255, 205, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(201, 203, 207, 0.2)'
                                ],
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(255, 159, 64)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)',
                                    'rgb(201, 203, 207)'
                                ],
                                borderWidth: 1
                            }],
                        
                            // These labels appear in the legend and in the tooltips when hovering different arcs
                            labels: labels
                        },
                        
                    };
                    new Chart($("#" + idGrafica).get(0).getContext("2d"), config);
                }
                doughnutChart();
                
            },
        };
    });

}).call(this);
