

            
        <script>
            $(document).ready(function()
            {

                $(".mesaDeDinero").unbind().click(function(){

                    console.log("[mesaDeDinero]");

                    
                    $(".mainMenu").css("display","none");
                    $(".mesaDeDineroMenu").css("display","");
                    $(".UAIR").css("display","none");
                    $(".contabilidad").css("display","none");
                    $(".bOffice").css("display","none");
                    $(".contratos").css("display","none");

                });

                $(".uair2").unbind().click(function(){

                    console.log("[UAIR]");

                    
                    $(".mainMenu").css("display","none");
                    $(".mesaDeDineroMenu").css("display","none");
                    $(".UAIR").css("display","");
                    $(".contabilidad").css("display","none");
                    $(".bOffice").css("display","none");
                    $(".contratos").css("display","none");

                });

                $(".contabilidad2").unbind().click(function(){

                    console.log("[contabilidad]");

                    $(".mainMenu").css("display","none");
                    $(".mesaDeDineroMenu").css("display","none");
                    $(".UAIR").css("display","none");
                    $(".contabilidad").css("display","");
                    $(".bOffice").css("display","none");
                    $(".contratos").css("display","none");

                });

                $(".backOffice").unbind().click(function(){

                    console.log("[backOffice]");

                    $(".mainMenu").css("display","none");
                    $(".mesaDeDineroMenu").css("display","none");
                    $(".UAIR").css("display","none");
                    $(".contabilidad").css("display","none");
                    $(".bOffice").css("display","");
                    $(".contratos").css("display","none");

                });

                $(".contratos2").unbind().click(function(){

                    console.log("[contratos2]");

                    $(".mainMenu").css("display","none");
                    $(".mesaDeDineroMenu").css("display","none");
                    $(".UAIR").css("display","none");
                    $(".contabilidad").css("display","none");
                    $(".bOffice").css("display","none");
                    $(".contratos").css("display","");

                });

                $(".desarrollo").unbind().click(function(){

                    console.log("[desarrollo]");

                    alert("Módulo no Habilitado, contacte al Administrador");

                });

                $(".UAIRPos").unbind().click(function(){

                    console.log("[UAIRPos]");

                    alert("Módulo no Habilitado, contacte al Administrador");

                });

                $(".reportesRegulatorios").unbind().click(function(){

                    console.log("[reportesRegulatorios]");

                    alert("Módulo no Habilitado, contacte al Administrador");

                });

            });
        </script>
     

    </body>
</html>