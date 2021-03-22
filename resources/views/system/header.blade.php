<!DOCTYPE html>
<html lang="@yield('lang')" ng-app="myApp">
        
<head>

{{-- Meta tags --}}


<?PHP Cache::forever('js_version_number', time()); ?>


        <title>@yield('title')</title>


        <meta http-equiv="Content-Type" content="@yield('Content-Type')">
        <meta http-equiv="x-ua-compatible" content="@yield('x-ua-compatible')">
        <meta name="keywords" content="@yield('keywords')"/>
        <meta name="description" content="@yield('description')">
        <meta name="viewport" content="@yield('viewport')">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="author" content="Manlio Emiliano Terán Ramos">

        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui">
        <!-- Call App Mode on ios devices -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <!-- Remove Tap Highlight on Windows Phone IE -->
        <meta name="msapplication-tap-highlight" content="no">

        <style>
        .activeTop{
            color: black !important;
        }
        .hoverTop:hover{
            color: black !important;
            cursor: pointer;
        }
        :root {

                @if (in_array("1", $user["permisos"]))

                    @php
                    $hex = "#5b5b5b";
                    list($r, $g, $b) = sscanf($hex, "#%02x%02x%02x");
                    @endphp

                    --main-bg-color: @php echo $hex; @endphp !important;
                    --main-bg-color-transparent-5: rgba(@php echo $r; @endphp,@php echo $g; @endphp,@php echo $b; @endphp,0.6) !important;
                    --main-bg-color-transparent-1: rgba(@php echo $r; @endphp,@php echo $g; @endphp,@php echo $b; @endphp,0.2) !important;
    
                @endif
                

                /*
                --main-bg-color: red !important;
                --main-bg-color-transparent-5: rgba(255,0,0,0.5) !important;
                */

                --main-color-text: #FFFFFF !important;

            }
        
        </style>

        <!-- base css -->
        <link rel="stylesheet" media="screen, print" href="{{ url('css/vendors.bundle.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" media="screen, print" href="{{ url('css/app.bundle.css?v='.cache("js_version_number").'') }}">

        <!-- Place favicon.ico in the root directory -->
        <link rel="apple-touch-icon" sizes="180x180" href="https://www.gotbootstrap.com/themes/smartadmin/4.0.1/img/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="https://www.gotbootstrap.com/themes/smartadmin/4.0.1/img/favicon/favicon-32x32.png">
        <link rel="shortcut icon" href="{{ url('img/icon.ico?v='.cache("js_version_number").'') }}" />
        <link id="mytheme" rel="stylesheet" href="{{ url('css/themes/cust-theme-'.$color.'.css?v='.cache("js_version_number").'') }}">

        <link rel="stylesheet" media="screen, print" href="{{ url('css/datatables.bundle.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" media="screen, print" href="{{ url('fonts/font-awesome-5-pro.css?v='.cache("js_version_number").'') }}">

        <link rel="stylesheet" media="screen, print" href="{{ url('css/reactions.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" media="screen, print" href="{{ url('css/fullcalendar.bundle.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" media="screen, print" href="{{ url('css/jqvmap.bundle.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" href="{{ url('css/loader.css?v='.cache("js_version_number").'') }}">
        <link rel="stylesheet" href="{{ url('css/clock.css?v='.cache("js_version_number").'') }}">
        <link href="{{ url('css/selects.css?v='.cache("js_version_number").'') }}" rel="stylesheet" />
        <link href="{{ url('css/datepicker.css?v='.cache("js_version_number").'') }}" rel="stylesheet" />
        <link href="{{ url('css/daterangepicker.css?v='.cache("js_version_number").'') }}" rel="stylesheet" />
        <link href="{{ url('css/map.css?v='.cache("js_version_number").'') }}" rel="stylesheet" />
        <link href="{{ url('css/slider.css?v='.cache("js_version_number").'') }}" rel="stylesheet" />
        <link href="{{ url('css/timepicker.css?v='.cache("js_version_number").'') }}" rel="stylesheet" />
        <link href="{{ url('css/piechart.css?v='.cache("js_version_number").'') }}" rel="stylesheet" />

        <!-- Toastr -->
        <link rel="stylesheet" href="{{ url('css/toastr.css?v='.cache("js_version_number").'') }}">

        <script>
        
        var primary_50 = "#ccbfdf",
            primary_100 = "#beaed7",
            primary_200 = "#b19dce",
            primary_300 = "#a38cc6",
            primary_400 = "#967bbd",
            primary_500 = "#886ab5",
            primary_600 = "#7a59ad",
            primary_700 = "#6e4e9e",
            primary_800 = "#62468d",
            primary_900 = "#563d7c",
            success_50 = "#7aece0",
            success_100 = "#63e9db",
            success_200 = "#4de5d5",
            success_300 = "#37e2d0",
            success_400 = "#21dfcb",
            success_500 = "#1dc9b7",
            success_600 = "#1ab3a3",
            success_700 = "#179c8e",
            success_800 = "#13867a",
            success_900 = "#107066",
            info_50 = "#9acffa",
            info_100 = "#82c4f8",
            info_200 = "#6ab8f7",
            info_300 = "#51adf6",
            info_400 = "#39a1f4",
            info_500 = "#2196F3",
            info_600 = "#0d8aee",
            info_700 = "#0c7cd5",
            info_800 = "#0a6ebd",
            info_900 = "#0960a5",
            warning_50 = "#ffebc1",
            warning_100 = "#ffe3a7",
            warning_200 = "#ffdb8e",
            warning_300 = "#ffd274",
            warning_400 = "#ffca5b",
            warning_500 = "#ffc241",
            warning_600 = "#ffba28",
            warning_700 = "#ffb20e",
            warning_800 = "#f4a500",
            warning_900 = "#da9400",
            danger_50 = "#feb7d9",
            danger_100 = "#fe9ecb",
            danger_200 = "#fe85be",
            danger_300 = "#fe6bb0",
            danger_400 = "#fd52a3",
            danger_500 = "#fd3995",
            danger_600 = "#fd2087",
            danger_700 = "#fc077a",
            danger_800 = "#e7026e",
            danger_900 = "#ce0262",
            fusion_50 = "#909090",
            fusion_100 = "#838383",
            fusion_200 = "#767676",
            fusion_300 = "#dimgray",
            fusion_400 = "#5d5d5d",
            fusion_500 = "#505050",
            fusion_600 = "#434343",
            fusion_700 = "#363636",
            fusion_800 = "#2a2a2a",
            fusion_900 = "#1d1d1d";

        </script>


    </head>
    <body class="mod-bg-1 " ng-controller="@yield('controller')">

        <!-- .page-loader-->
        <div id="loader-wrapper">
            <div id="loader"></div>
            <div class="loader-section"></div>
        </div>
        
        <!-- DOC: script to save and load page settings -->
        <script>
            /**
             *	This script should be placed right after the body tag for fast execution 
             *	Note: the script is written in pure javascript and does not depend on thirdparty library
             **/
            'use strict';

            var classHolder = document.getElementsByTagName("BODY")[0],
                /** 
                 * Load from localstorage
                 **/
                themeSettings = (localStorage.getItem('themeSettings')) ? JSON.parse(localStorage.getItem('themeSettings')) :
                {},
                themeURL = themeSettings.themeURL || '',
                themeOptions = themeSettings.themeOptions || '';
            /** 
             * Load theme options
             **/
            if (themeSettings.themeOptions)
            {
                classHolder.className = themeSettings.themeOptions;
                console.log("%c✔ Theme settings loaded", "color: #148f32");
            }
            else
            {
                console.log("Heads up! Theme settings is empty or does not exist, loading default settings...");
            }
            if (themeSettings.themeURL && !document.getElementById('mytheme'))
            {
                var cssfile = document.createElement('link');
                cssfile.id = 'mytheme';
                cssfile.rel = 'stylesheet';
                cssfile.href = themeURL;
                document.getElementsByTagName('head')[0].appendChild(cssfile);
            }
            /** 
             * Save to localstorage 
             **/
            var saveSettings = function()
            {
                themeSettings.themeOptions = String(classHolder.className).split(/[^\w-]+/).filter(function(item)
                {
                    return /^(nav|header|mod|display)-/i.test(item);
                }).join(' ');
                if (document.getElementById('mytheme'))
                {
                    themeSettings.themeURL = document.getElementById('mytheme').getAttribute("href");
                };
                localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
            }
            /** 
             * Reset settings
             **/
            var resetSettings = function()
            {
                localStorage.setItem("themeSettings", "");
            }

        </script>