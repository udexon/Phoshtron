// import { f_tank, f_target, f_curve, f_geom, f_vec2 } from '../tank.js';
// import { startRecording, stopRecording, download } from './capture.js';
// export { Phos };



function Phos()
{

var $ = this;
// this.S = [];

window.S = [];

// $.S = [];
$.S = window.S;

var S = $.S;

S[0] = {}; // general purpose variable table

var S0 = S[0]; // alias
S0.skip = 0;
S0.CDW = [];
console.log( 'S[0] '+ JSON.stringify( S[0] ) );
console.log( 'S0 '+ JSON.stringify( S0 ) );

var $SL = {};  
// [] is PHP array or object; 
// JavaScript [] is array, {} is object

var $xk;


function f_scene()
{
  S.push( window.scene );
}

function f_gv() // get variable
{
  S.push( S[0][ S.pop() ] );
}

function f_sv() // set variable
{
  S[0][ S.pop() ] = S.pop();
}

function f_iza() // is zero, version a
{
  var z=S.pop();
  if (z==0) S.push(true);
  else S.push(false);
}

function f_typeof()
{
  S.push( typeof S.pop() )
}

function f_cmp()
{
  S.push( S.pop()==S.pop() )
}

function f_iz() // is zero, new version
{
  S.push( S.pop()==0 );
}

function f_not() // logic not
{
  S.push( !S.pop() );
}

function f_false()
{
  window.S.push( false );
}

function f_true()
{
  window.S.push( true );
}


this.fgl_ifen = function() // if else N blocks
{
    // global $S, $SB, $xk, $BV, $CDW;
    // var $cda = end($BV['CDW']);
    var S0 = window.S[0];
    var $S = window.S;
    var $CDW = this.$CDW;
    
    console.log( ' CDW '+  JSON.stringify(  $CDW ) );
    
    console.log( 'S0 '+ JSON.stringify( S0 ) );
    
    var $cda = end(S0.CDW); 
        
    var $tn = $cda[1];
    var $cdw = $cda[0];

    console.log( 'cda '+ JSON.stringify( $cda ) );
    console.log( ' $CDW[$cdw] '+ $CDW[$cdw] );


    
    // echo "\n\n" . __FILE__ . " " . __FUNCTION__ . "  " . $CDW[$cdw][$tn + 1] . " " . $CDW[$cdw][$tn + 2] . "   ";
    // echo var_src($BV);
    
    // if true pop; else no pop, let next ife evaluates, cascade ife; last else must pop ?
    
    if (array_pop($S)) {
    
console.log( ' if true '+    $CDW[$cdw][$tn + 1] );
    
        this.FGL($CDW[$cdw][$tn + 1]);
    } else {

        // 2020-12-05 
        // loop thorugh C A  C A  ... end:
        var C = $CDW[$cdw][$tn + 2];
        var A = $CDW[$cdw][$tn + 3];
        
        this.FGL(C);
        if (S.pop()) this.FGL(A);
        // if (C) this.FGL($CDW[$cdw][$tn + 2]);
    }
    // $BV['skip'] = 2;
    S0.skip = 4; // assume last token is end:
}



// 2020-12-01 cascade if else == nested ife CDW
// ife: do not pop if false, leave stack for evaluation by next ife, pop if true, before execution of true CDW

function fgl_ife()
// this.fgl_ife = function()
{
    // global $S, $SB, $xk, $BV, $CDW;
    // var $cda = end($BV['CDW']);
    var S0 = window.S[0];
    var $S = window.S;
    // var $CDW = this.$CDW;
    var $CDW = S0.$CDW;
    
    // console.log( ' CDW '+  JSON.stringify(  $CDW ) );
    
    // console.log( 'S0 '+ JSON.stringify( S0 ) );
    
    var $cda = end(S0.CDW); 
        
    var $tn = $cda[1];
    var $cdw = $cda[0];

    // console.log( 'cda '+ JSON.stringify( $cda ) );
    
    // 2020-12-06 in loop, cda is already initialized, but no new array is pushed
    
    // console.log( ' $CDW[$cdw] '+ $CDW[$cdw] );


    
    // echo "\n\n" . __FILE__ . " " . __FUNCTION__ . "  " . $CDW[$cdw][$tn + 1] . " " . $CDW[$cdw][$tn + 2] . "   ";
    // echo var_src($BV);
    
    // if true pop; else no pop, let next ife evaluates, cascade ife; last else must pop ?
    
    if (array_pop($S)) {
    
// console.log( ' if true '+    $CDW[$cdw][$tn + 1] );
    
        // this.FGL($CDW[$cdw][$tn + 1]);
        FGL($CDW[$cdw][$tn + 1]);
    } else {
        // this.FGL($CDW[$cdw][$tn + 2]);
        FGL($CDW[$cdw][$tn + 2]);
    }
    // $BV['skip'] = 2;
    S0.skip = 2;
}


function f_cx() // count no pop, length of array
{
  S.push( S[ S.length - 1 ].length );
}

function f_drop()
{
  S.pop();
}

function f_c() // count, length of array
{
  S.push( S.pop().length );
}



function f_a() //  a: init array
{ // console.log( "  in f_a " ); 
  window.S.push( [] ); }

function f_ap() // push to array
{ // console.log( "  in f_ap " ); 
  var S = window.S;
  var e = S.pop();
  var A = S.pop();
  A.push( e );
  S.push( A );
}

function f_apS() // push to array in S[0]
{ // console.log( "  in f_apS " ); 
  var S = window.S;
  var A = S.pop();
  var e = S.pop();
  // A.push( e );
  S[0][A].push( e );
}


function f_apn() // push N elements to array
{ console.log( "  in f_apn " ); 
  
  var S = window.S;
  var N = S.pop();
  var L = S.length;
  
  var A = S.splice(L-N,N);
  // var e = S.pop();
  // var A = S.pop();
  // A.push( e );
  S.push( A );
}

function f_pbot() // duplicate N-th item on stack from bottom (as array)
{
  S.push( S[ S.pop() ] );
}

function f_pick() // duplicate N-th item on stack from top (as stack)
{
  var n = S.pop();
  S.push( S[ S.length - 1 - n ] );
}

function f_an() // create array with N elements
{ console.log( "  in f_an " ); 
  
  var S = window.S;
  var N = S.pop();
  var L = S.length;
  
  var A = S.splice(L-N,N);

  S.push( A );
}

function f_splice()
{
  var L = S.pop();
  var n = S.pop();
  S.splice(n, L);
}

function f_ax() // pop array
{ // console.log( "  in f_ax " ); 
  var S = window.S;
  var A = S.pop();
  A.pop();
  S.push( A );
}

function f_pos()
{ 
  var x = S.pop();
  if ( typeof x !== "undefined" ) {
    if (typeof x.position !== "undefined" )
      S.push( x.position ); 
  }
  else S.push( "position_undefined" );
}

function f_rot()
{
  var x = S.pop();
  if ( typeof x !== "undefined" ) {
    if (typeof x.rotation !== "undefined" )
      S.push( x.rotation );
  }
  else S.push( "rotation_undefined" );
}

function f_get_pos()
{

S[0].get_pos = true;
S[0].pos_start   = true;

}

function f_get_children() // array get_children: use proper name; 
{
  S[0].children = S.pop();
  S[0].get_children = true;
  S[0].pos_start   = true;
}

function f_chld()
{
  S.push( S.pop().children );
}

function f_ch() // P n ch: P.children[n]
{ 
  var n = S.pop();
  var P = S.pop();
  S.push( P.children[n] );
}


function f_init_ws() {
  
  if ("WebSocket" in window) {
     alert("WebSocket is supported by your Browser!");
     
     // Let us open a web socket
     // var ws = new WebSocket("ws://localhost:9998/echo");
     var ws = new WebSocket("ws://localhost:8080");
     
     window.ws = ws;

     ws.onopen = function() {
        
        // Web Socket is connected, send data using send()
        ws.send("Message to send");
        alert("Message is sent...");
     };

     /*
     ws.onmessage = function (evt) { 
        var received_msg = evt.data;
        // alert("Message is received...");
        console.log( "Message is received  "+ Date.now() +"  "+ received_msg );
     };
     */

     ws.onmessage = function (evt) { 
        var received_msg = evt.data;
        // alert("Message is received...");
        // console.log( "Message is received  "+ Date.now() +"  "+ received_msg );
        
        S.push( received_msg );
        // console.log( "  S  "+ Date.now() +"  "+ S );
        
        S[0].ws_msg = true; // need to restart animation!!
     };



     ws.onclose = function() { 
        
        // websocket is closed.
        alert("Connection is closed..."); 
     };
  } else {
    
     // The browser doesn't support WebSocket
     alert("WebSocket NOT supported by your Browser!");
  }
}


function f_rec()
{
    var S = $.S;
    console.log(S);
    
    var t = S.pop();
    if (t==1) {
      console.log("Start recording");
      startRecording();
    }
    else if (t==0) {
      console.log("Stop recording");
      stopRecording();
    }
    else if (t==2) {
      console.log("download webm. S.length "+S.length);
      if ( S.length > 0 ) download( S.pop() );
      else download( 'test.webm' );
    }
}    
    
function fgl_cl() { // cell
    var RC=S.pop();
    S.push( document.getElementById( "c_"+RC  ).innerHTML );
}

function f_oe() // Object.entries()
{
    S.push( Object.entries( S.pop() ) );
}

function f_cells() // T cells: T.cells
{
    S.push( S.pop().cells );
}

function f_slice() // T cells: T.cells
{
    var j = S.pop();
    var i = S.pop();
    var A = S.pop()
    S.push( A.slice( i, j ) );
}



function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function fgl_gex() // getElementByXpath
{
    S.push( getElementByXpath( S.pop() ) );
}

function fgl_it() // innerText
{
    var E = S.pop();
    S.push( E.innerText );
}

function ROW(T, R)
{
// C=CL.charCodeAt(0)-65
// R=parseInt(CL.charAt(1))-1
return T.rows[R]
}

function f_row()
{
    var R = S.pop();
    var T = S.pop();
    S.push( T.rows[R] );
}

function fgl_sa() { // setAttribute
    
    var a = S.pop();
    var v = S.pop();
    var t = S.pop();
    t.setAttribute(a, v);
    S.push( t ); 
}



function fgl_ce() {
    // var tag = document.createElement("p");
    S.push( document.createElement( S.pop() ) ); 
}
   
function fgl_ctn() {
    S.push( document.createTextNode( S.pop() ) ); 
}   

function fgl_getn() {
    S.push( document.getElementsByTagName( S.pop() ) ); 
}   

function fgl_geid() {
    this.S.push( document.getElementById( S.pop() ) ); 
}   

this.fgl_geid = function () {

    // var S = this.S; // declare scope == PHP global $S;
    // var S = this.S;

    console.log("  in this.fgl_geid ");
    // this.S.push( document.getElementById( this.S.pop() ) );
    S.push( document.getElementById( S.pop() ) ); 
}   

$.f_geid = function() 
{

    // var S = this.S; // declare scope == PHP global $S;
    // var S = this.S;

    console.log("  in this.fgl_geid ");
    // this.S.push( document.getElementById( this.S.pop() ) );
    S.push( document.getElementById( S.pop() ) ); 
}   

$.f_gex = function() // getElementByXpath
{
    S.push( getElementByXpath( S.pop() ) );
}


function fgl_i()
{
    var a = S.pop();
    var b = S.pop();
    S.push( b[a] );
}


function fgl_ix() // i-th element of array, no pop
{
    var a = S.pop();
    var b = S[ S.length-1 ];
    S.push( b[a] );
}

   
function fgl_ac() {
    var child = S.pop();
    var parent = S.pop();
    parent.appendChild( child );
    S.push( parent );
}   


function count(a) {
    return a.length;
}
function fgl_explode() {
    S.push(explode(S.pop(), S.pop()));
}
function fgl_now() {
    var d = new Date();
    S.push(d.toISOString());
}
function fgl_colon() {
    S.push(':');
}
function fgl_timeout() {
    setTimeout(eval("fgl_now"), S.pop());
    console.log("2019 1217 1421");
}
function func_num_args() {
}

// 2020-09-12 B = Back End
function B() {
    console.log( arguments );

    F("nxhr: phos.php xo: xsqrh:")
    // sets up ajax connection

    F( arguments[0], "je: xsend:" )
    // sends Phos commands from browser front end to back end via ajax 

}

function CHAT(target, msg)
{

    var d = new Date();
    console.log(d.toISOString());
    // console.log( {msg: [ {target: target}, {msg: msg} ] } );
    // console.log( {target: target, msg: msg}  )
    var j = {to: target, msg: msg}
    // return JSON.stringify({msg: [ {target: target}, {msg: msg} ] })
    
    B(btoa(JSON.stringify(j)) +" chat")
    // return JSON.stringify({target: target, msg: msg}  )
}

function U(j) // Update, U of CRUD
{
    var d = new Date();
    console.log(d.toISOString());

    // var j = {msg: msg}
    
    B(btoa(JSON.stringify(j)) +" update")
}

// 2020-09-18 onreadystatechange
function BX() {
    console.log( arguments );

    F("nxhr: phos.php xo: xsqrh:")
    // sets up ajax connection

    F( arguments[0], "je: xsend:" )
    // sends Phos commands from browser front end to back end via ajax 

}

function B_AUTH(c) {
    console.log( arguments );

    F("nxhr: phos.php xo: xsqrh:")
    // sets up ajax connection

    t = S.length - 1;    
    ajax=S[t]
    S[t].onreadystatechange = function() {
        if (ajax.readyState==4 && ajax.status==200) {
            console.log(ajax.responseText);
            
            console.log(c.decrypt(ajax.responseText));
            
            B(c.decrypt(ajax.responseText)+" AUTH gsv: SP i: cmp: 0 ifeq: auth_pass b")
            
        }
    }
    
    F(btoa(c.getPublicKey()) +' req_auth', "je: xsend:" )

}



// 2020-09-12 F = Front End
// function F() {   // push args 0 .... [N-2] execute arguments[N-1] convenient for adding string

this.F = function() { 
    var e;
    var $count = 0;
    if (func_num_args() == 0) {
        return false;
    } else {
        for (var $i = 0; $i < arguments.length - 1; $i++) {
            e = arguments[$i];
            S.push(e);
        }
        this.FGL(arguments[$i]);
        
        // 2020-12-05 
        // S0.CDW[0] is initialized to arguments[]
        // need to pop S0.CDW when exit
        // so that next call to F() starts wtih S0.CDW[0] = []
        var S0 = S[0];
        S0.CDW.pop();
    }
}
function fgl_b64e() {
    S.push(btoa(S.pop()));
}
function fgl_je() {
    S.push(JSON.stringify(S.pop()));
}
function fgl_dup() {
    S.push(end(S));
}

function fgl_swap() {
    var a = S.pop();
    var b = S.pop();
    S.push(a);
    S.push(b);
}

function fgl_l() {
    // var $S = S;
    var L = S.pop();
    // $SL[array_pop($S)] = $xk;  // JavaScript $SL = {}, not [] !!
    
    // console.log( "  434 L "+ L +"  xk "+ $xk );
    
    // 2020-12-07 reentrant $SL
    var $SL = end( end( S0.CDW ) );
    
    $SL[ L ] = S[0].xk;
}
function end(a) {
    return a[a.length - 1];
}

//function function_exists(f) {   // in this.FGL calls function_exists() is global, not local, hence this is undefined?
this.function_exists = function(f) {
    return (eval("typeof " + f) === "function");
}
function is_array(f) {
    return (typeof f === "object");
}
function isset(f) {
    return (typeof f === "undefined");
}
function substr(s, n, l) {
    return s.substr(n, l);
}
function fgl_ne() {
    $S = S;
    $n = array_pop($S);
    if ($n == 0) {
        e = eval("return " + array_pop($S) + "();");
        S.push(e);
    } else {
        if (0) {
            $s = array_pop($S) + "(" + "array_pop(\$S)";
            while ($n-- > 1) {
                $s = $s + ", " + "array_pop(\$S)";
            }
            e = eval("return " + $s + ");");
            S.push(e);
        } else {
            $s = array_pop($S) + "(" + array_pop($S);
            while ($n-- > 1) {
                $s = $s + ", " + "array_pop(\$S)";
            }
            console.log($s);
            e = eval($s + ")");
            S.push(e);
        }
    }
}
function ord(n) {
    return n.charCodeAt(0);
}
function strlen(s) {
    return s.length;
}
function in_array(e, a) {
    return (a.indexOf(e) != -1);
}
function array_keys(a) {
    return Object.keys(a);
}
function array_pop(s) {
    return s.pop();
}
function explode(c, a) {
    var s;
    s = a.split(c);
    return s;
}
function preg_replace(p, r, a) {
    return a.replace(p, r);
}
function fgl_nxhr() {
    S.push(new XMLHttpRequest());
}
function fgl_xo() {
    var a = S.pop();
    var xmlhttp = end(S);
    xmlhttp.open("POST", a, true);
}
function fgl_xsrqh() {
    var xmlhttp = end(S);
    xmlhttp.setRequestHeader("Content-type", "application/json");
}
function fgl_xsend() {
    var a = S.pop();
    var xmlhttp = end(S);
    xmlhttp.send(a);
}
function trim(a) {
    return a.trim();
}
function fgl_cl() {
    console.log(S.pop());
}
function fgl_s() {
    console.log(S);
}
function preProc(str) {
    S.push(str);
    fgl_xs();
    sa = S.pop();
    str1 = JSON.stringify(sa);
    alert('preProc ' + str1 + ' sa ' + sa + ' str ' + str);
    if (str.length == 0) {
        document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("postProc_g() " + this.responseText);
                postProc_g(this.responseText);
            }
        };
        xmlhttp.open("POST", "fgl_ajax.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        id = "rpbox";
        xmlhttp.send(str1);
    }
}
var $CDW = {}, // $CDW=[], {} [] are different in JavaScript, same in PHP
    // S = [],
    $v, s0 = "";

this.$CDW = $CDW;
window.S[0].$CDW = $CDW;

// function FGL($a) { // when this function gets called, the scope is global, hence variable scope is also global, so it ignores this.S ??

this.FGL = function($a) { 

    // var S = this.S;
    var S = window.S;
    var S0 = S[0];
    
    // console.log(S);

    s0 = preg_replace('/\s+/', ' ', $a);
    var $a = explode(' ', trim(s0));
    var $SS = [],
        $xl = 0;
    var $xk = 0;
    var $xs = $a;
    var $xl = count($a);
    var $vk = $xk;
    var $Z = $xl;
    S.push($vk);
    var $t = array_pop(S);
    var $CC = $t[0];

    // console.log( ' $a '+ JSON.stringify( $a ) );
    
    // console.log( "  571 "+ $xs +" "+ typeof $xs +"  JSON "+ JSON.stringify($xs) );
    
    // console.log( "  573 xk "+ $xk +"  xs[xk] "+ $xs[$xk] );
    

    // phos.php calls FGLA($S[0]) immediately
    // it calls F() FGL() for setting up aliases
    // hence the following variables are initialized in phos.php FGLA
    
    var S0 = window.S[0];
    // S0.CDW = [];

    // console.log( ' S0 '+ JSON.stringify( S0 ) );
    
    // $BV[ 'skip' ] = 0;
    S0.skip = 0;

    // CDL: nesting level of CDW calls ??    
    // $CDL = count( $BV[ 'CDW' ] );
    S0.CDL = S0.CDW.length;
    
    // if ($CDL==0) {
    if (S0.CDL==0) {

       this.$CDW.phos = $a;

       // $BV[ 'CDW' ][0] = array( 'phos', 0 );
       // S0.CDW[0] = [ 'phos', 0 ];
       
       S0.CDW[0] = [ 'phos', 0, {} ];
       // $SL = cda[2]

       // $cda =& $BV[ 'CDW' ][ $CDL ];
       S0.cda = S0.CDW[ S0.CDL ];
       // JavaScript is call by ref by default
       
       // set cda by ref, used in ife
       // BV.CDW or S0.CDW is an array
       // CDL is the index of the element
       // ... also nest level of CDW call
       
    }
    else {
    // $CDN = $CDL -1; 
    S0.CDN = S0.CDL - 1 ;

    // $cda =& $BV[ 'CDW' ][ $CDN ];
    S0.cda = S0.CDW[ S0.CDN ];
    
    // echo "\n\n".__LINE__."  cda ".var_src( $cda );
    }
// }    

    var $SL = end( end( S0.CDW ) );

    
    do {
        $vk = $xk;
        S[0].xk = $xk;
        
        // console.log( "  578 xk "+ $xk +"  xs[xk] "+ $xs[$xk] );
        // console.log( "  579 vk "+ $vk +"  xl "+ $xl );
        
        S0.tn = $vk; // token index
        // $cda[1] = $vk;
        S0.cda[1] = $vk;
        
        // console.log( "  840 cda "+ S0.cda );
        
        $v = trim($xs[$xk]);
        if (in_array($v, array_keys($CDW))) {

            // 2020-12-05
            // JavaScript var is call by ref
            // PHP var is call by value
            // in PHP $WA copies from CDW defition, then pop semicolon, CDW def is unchanged
            // but in JavaScript, CDW def becomes shorter!!
            var $WA = $CDW[$v];
            // array_pop($WA);
            if (end($WA)==';')
              array_pop($WA);
            
            // 2020-12-04 Nested CDW
            // $BV[ 'CDW' ][] = array($v, $vk);
            
            // S0.CDW.push( [$v, $vk] );
            S0.CDW.push( [$v, $vk, {}] );
            
            FGLA($WA);
            
            // array_pop( $BV[ 'CDW' ] );
            S0.CDW.pop();
            S0.cda = end(S0.CDW);
            
        } else if ($v == ">:" || $v == "<:") {
            S.push($v);
        } else {
            var $l = strlen($v);
            if ($v[0] == ":" && $l == 1) {
            
                // 2020-09-29
                console.log("colon definition");
            
                $xk++;
                $vk = $xk;
                $v = trim($xs[$xk]);
                console.log("  v ", $v);
                
                $CDW[$v] = [];
                var $w0 = $v;
                $xk++;
                do {
                    $vk = $xk;
                    $v = trim($xs[$xk]);
                    $CDW[$w0].push($v);
                    $l = strlen($v);
                    if ($v[0] == ";" && $l == 1) {
                        break;
                    }
                    $xk++;
                } while (1);
            } else if ($v[$l - 1] == ":") {
                $l = strlen($v);
                var $fn = substr($v, 0, $l - 1);
                
                // console.log("typeof this "+typeof this);
                // console.log(eval("typeof this.fgl_" + $fn) + " function exists " + $fn +" "+ $.function_exists("this.fgl_" + $fn));
                if (eval("typeof this.fgl_" + $fn) === "function") {
                // if (function_exists("this.fgl_" + $fn)) {
                    // console.log("this.fgl_" + $fn + " function exists ");
                    eval("this.fgl_" + $fn + "()");
                }
                else if (eval("typeof this.f_" + $fn) === "function") {
                // if (function_exists("this.fgl_" + $fn)) {
                    console.log("this.f_" + $fn + " function exists ");
                    eval("this.f_" + $fn + "()");
                }
                else if ($.function_exists("f_" + $fn)) {
                    // console.log("f_" + $fn + " function exists ");
                    eval("f_" + $fn + "()");
                }                
                else if ($.function_exists("fgl_" + $fn)) {
                    eval("fgl_" + $fn + "()");
           
                    if (is_array(end(S))) {
                        var $va = end(S);
                        if (isset($va[0]))
                            if ($va[0] == "prg_ctr") {
                                $va = array_pop(S);
                                $vk = $va[1];
                                $xk = $vk;
                            }
                    }
                } else if (in_array($fn + ":", array_keys($CDW))) {
                    $WA = $CDW[$fn + ":"];
                    array_pop($WA);
                    FGLA($WA);
                } else if ($fn == "r") {
                    $s = array_pop(S);
                    S.push(implode(' ', array_slice($xs, $xk + 1)));
                    S.push('$S[]=$' + $s + '; ');
                    S.push(':r:');
                    fgl_s();
                } else if ($fn == "v") {
                    $sa = array_pop(S);
                    $sb = array_pop(S);
                    S.push(implode(' ', array_slice($xs, $xk + 1)));
                    S.push('$' + $sa + '=' + $sb + '; ');
                    S.push(':v:');
                    fgl_s();
                } else if ($fn == "a") {
                    $sa = array_pop(S);
                    $sc = count(S);
                    $se = S[$sc - $sa];
                    for ($si = 0; $si < $sa; $si++) {
                    }
                    $sb = array_pop(S);
                    S.push(implode(' ', array_slice($xs, $xk + 1)));
                    S.push('$' + $sa + '=' + $sb + '; ');
                    S.push(':v:');
                    fgl_s();
                } else if ($fn == "count") {
                    fgl_s();
                    S.push('$S[]=count(' + array_pop(S) + '); ');
                } else if ($fn == "bz") {
                    fgl_s();
                    var $bx = array_pop(S);
                    if (array_pop(S) == 0) $xk = $bx;
                    continue;
                } else if ($fn == "bnz") {
                
                    // console.log( "  682 bnz:  SL "+ JSON.stringify( $SL ) );
//                console.log( "  957 bnz:  S "+ JSON.stringify( S ) );
//                console.log( "  957 bnz:  S "+ S  );
fgl_s();                
                    var $bx = $SL[array_pop(S)];
                    // fgl_dup();
                    if (array_pop(S) != 0) {
// console.log( "  962 bnz:  S "+ ( S ) );
fgl_s();
                
                        $xk = $bx + 1;
                        continue;
                    }
                } else {}
            } else {
                if (ord($v) == 0);
                else
                if ($v[0] == '_') {
                    if ($v == '_') S.push($v);
                } else {
                    if ($v == '.s') {
                        fgl_s();
                    } else {
                        if ($v == '-') {
                            $sa = array_pop(S);
                            $sb = array_pop(S);
                            S.push($sb - $sa);
                        } else if ($v == '+') {
                            console.log(' < in + >');
                            var $sa = array_pop(S);
                            var $sb = array_pop(S);
                            console.log(' < in + > ' + $sa + ' ' + $sb + ' ' + ($sa + $sb));
                            S.push(parseInt($sb) + parseInt($sa));
                        } else if ($v == '.') {
                            array_pop(S);
                        } else {
                            if ($v == '===') {
                                S.push(array_pop(S) === array_pop(S));
                            } else {
                                S.push($v);
                            }
                        }
                    }
                }
            }
        }
        $xk++;
        
        // 2020-12-04 preserve $xk++ just add extra BV.skip
        /* if ( $BV[ 'skip' ] > 0 ) {
            $xk += $BV[ 'skip' ];
            $BV[ 'skip' ] = 0;    // reset, do it only once.
        }
        */
        if ( S0.skip  > 0 ) {
            $xk += S0.skip;
            S0.skip = 0;    // reset, do it only once.
        }
        
        if ($xk >= $xl) break;
    }
    while ($vk < $xl);
}

var FGL = this.FGL;

function FGLA($a) 
{
    // console.log($a);
    var $SS = [],
        $xk = 0,
        $xl = 0;
    var $xs = $a;
    // console.log($xs);
    $xl = count($a);
    var $vk = $xk;
    var $Z = $xl;
    S.push($vk);
    var $t = array_pop(S);
    var $CC = $t[0];
    
    // 2020-12-01 ife: related variables
    // $cda is also declared in libphos ife: ?? but local?
    
    // phos.php calls FGLA($S[0]) immediately
    // it calls F() FGL() for setting up aliases
    // hence the following variables are initialized in phos.php FGLA
    
    var S0 = window.S[0];
    // console.log( ' S0 '+ JSON.stringify( S0 ) );
    
    // $BV[ 'skip' ] = 0;
    S0.skip = 0;

    // CDL: nesting level of CDW calls ??    
    // $CDL = count( $BV[ 'CDW' ] );
    S0.CDL = S0.CDW.length;

    
    // if ($CDL==0) {
    if (S0.CDL==0) {
       // $BV[ 'CDW' ][0] = array( 'phos', 0 );
       S0.CDW[0] = [ 'phos', 0 ];

       // $cda =& $BV[ 'CDW' ][ $CDL ];
       S0.cda = S0.CDW[ S0.CDL ];
       // JavaScript is call by ref by default
       
       // set cda by ref, used in ife
       // BV.CDW or S0.CDW is an array
       // CDL is the index of the element
       // ... also nest level of CDW call
       
    }
    else {
    // $CDN = $CDL -1; 
    S0.CDN = S0.CDL - 1 ;

    // $cda =& $BV[ 'CDW' ][ $CDN ];
    S0.cda = S0.CDW[ S0.CDN ];
    
    // echo "\n\n".__LINE__."  cda ".var_src( $cda );
    }
// }    
    
    var $SL = end( end( S0.CDW ) );
    
    do {
        $vk = $xk; S[0].xk = $xk;

        // console.log('  vk ' + $vk + '  xk ' + $xk + '   xs ' + $xs);

        S[0].xk = $xk;        
        // console.log( "  578 xk "+ $xk +"  xs[xk] "+ $xs[$xk] );
        // console.log( "  579 vk "+ $vk +"  xl "+ $xl );
        
        S0.tn = $vk; // token index
        // $cda[1] = $vk;
        S0.cda[1] = $vk;

        

        $v = trim($xs[$xk]);
        
        // console.log( "  1105 cda "+ S0.cda +"  v "+ $v);

        // console.log($v + ' vk ' + $vk + ' xl ' + $xl + ' S ' + S);
        if (in_array($v, array_keys($CDW))) {
            var $WA = $CDW[$v];
            
            // 2020-12-05 JavaScript call by ref
            // must not shorten CDW
            if (end($WA)==';')
              array_pop($WA); 

            // 2020-12-04 Nested CDW
            // $BV[ 'CDW' ][] = array($v, $vk);

            // S0.CDW.push( [$v, $vk] );
            S0.CDW.push( [$v, $vk, {}] );

            // FGLA($WA);            
            FGLA($WA);
            
            // array_pop( $BV[ 'CDW' ] );
            S0.CDW.pop();
            S0.cda = end(S0.CDW);



        } else if ($v == ">:" || $v == "<:") {
            S.push($v);
        } else {
            var $l = strlen($v);
            if ($v[0] == ":" && $l == 1) {
                $xk++;
                $vk = $xk;
                $v = trim($xs[$xk]);
                $CDW[$v] = [];
                $w0 = $v;
                $xk++;
                do {
                    $vk = $xk;
                    $v = trim($xs[$xk]);
                    $CDW[$w0].push($v);
                    $l = strlen($v);
                    if ($v[0] == ";" && $l == 1) {
                        break;
                    }
                    $xk++;
                } while (1);
            } else if ($v[$l - 1] == ":") {
                $l = strlen($v);
                var $fn = substr($v, 0, $l - 1);
                // console.log(function_exists("fgl_" + $fn) + ' ' + ("fgl_" + $fn));
                // if (function_exists("fgl_" + $fn)) {
           
           // if (eval("typeof this.fgl_" + $fn) === "function") {
          /* if (eval("typeof this.fgl_" + $fn) === "function") {
                // if (function_exists("this.fgl_" + $fn)) {
                    console.log("this.fgl_" + $fn + " function exists ");
                    eval("this.fgl_" + $fn + "()");
                }
                else if (eval("typeof this.f_" + $fn) === "function") {
                // if (function_exists("this.fgl_" + $fn)) {
                    console.log("this.f_" + $fn + " function exists ");
                    eval("this.f_" + $fn + "()");
                } 
                else */ 
                // if ($.function_exists("f_" + $fn)) {
                
                // 2020-12-05 this is not defined because FGLA is not a this.function, in contrast to this.FGL
                
                if (eval("typeof f_" + $fn) === "function") {
                    // console.log("f_" + $fn + " function exists ");
                    eval("f_" + $fn + "()");
                }                
                else if ($.function_exists("fgl_" + $fn)) {
                    eval("fgl_" + $fn + "()");
                                
                
                    if (is_array(end(S))) {
                        var $va = end(S);
                        if (isset($va[0]))
                            if ($va[0] == "prg_ctr") {
                                $va = array_pop(S);
                                $vk = $va[1];
                                $xk = $vk;
                            }
                    }
                }
                 
                                              
                 else if (in_array($fn + ":", array_keys($CDW))) {
                    $WA = $CDW[$fn + ":"];
                    array_pop($WA);
                    FGLA($WA);
                } else if ($fn == "r") {
                    $s = array_pop(S);
                    S.push(implode(' ', array_slice($xs, $xk + 1)));
                    S.push('$S[]=$' + $s + '; ');
                    S.push(':r:');
                    fgl_s();
                } else if ($fn == "v") {
                    $sa = array_pop(S);
                    $sb = array_pop(S);
                    S.push(implode(' ', array_slice($xs, $xk + 1)));
                    S.push('$' + $sa + '=' + $sb + '; ');
                    S.push(':v:');
                    fgl_s();
                } else if ($fn == "a") {
                    $sa = array_pop(S);
                    $sc = count(S);
                    $se = S[$sc - $sa];
                    for ($si = 0; $si < $sa; $si++) {
                    }
                    $sb = array_pop(S);
                    S.push(implode(' ', array_slice($xs, $xk + 1)));
                    S.push('$' + $sa + '=' + $sb + '; ');
                    S.push(':v:');
                    fgl_s();
                } else if ($fn == "count") {
                    fgl_s();
                    S.push('$S[]=count(' + array_pop(S) + '); ');
                } else if ($fn == "bz") {
                    fgl_s();
                    $bx = array_pop(S);
                    if (array_pop(S) == 0) $xk = $bx;
                    continue;
                } else if ($fn == "bnz") {
                    // $bx = $SL[array_pop($S)];
                    
                    var $bx = $SL[array_pop(S)];
                    // fgl_dup();
                    if (array_pop(S) != 0) {
                        $xk = $bx + 1;
                        continue;
                    }
                    
                } else {}
            } else {
                if (ord($v) == 0);
                else
                if ($v[0] == '_') {
                    if ($v == '_') S.push($v);
                } else {
                    if ($v == '.s') {
                        fgl_s();
                    } else {
                        if ($v == '-') {
                            $sa = array_pop(S);
                            $sb = array_pop(S);
                            S.push($sb - $sa);
                        } else if ($v == '+') {
                            // console.log(' < in + >');
                            var $sa = array_pop(S);
                            var $sb = array_pop(S);
                            // console.log(' < in + > ' + $sa + ' ' + $sb + ' ' + ($sa + $sb));
                            S.push(parseInt($sb) + parseInt($sa));
                        } else if ($v == '.') {
                            array_pop(S);
                        } else {
                            if ($v == '===') {
                                S.push(array_pop(S) === array_pop(S));
                            } else {
                                S.push($v);
                            }
                        }
                    }
                }
            }
        }
        $xk++;
        
        if ( S0.skip  > 0 ) {
            $xk += S0.skip;
            S0.skip = 0;    // reset, do it only once.
        }

        
        
        if ($xk >= $xl) break;
    }
    while ($vk < $xl);
}



}

window.Phos = Phos;
export { Phos };
