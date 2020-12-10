import * as THREE from './resources/threejs/r119/build/three.module.js';
import {GLTFLoader} from './resources/threejs/r119/examples/jsm/loaders/GLTFLoader.js';
import {GLTFExporter} from  './resources/threejs/r119/examples/jsm/exporters/GLTFExporter.js';

//  does not work with latest three.js!!
// import * as THREE from '../build/three.module.js';
// import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { Phos } from './Phos/libphos.js';

export { main };

window.m = new Phos();

function main() {

  // window.S[0] = {}; // do not initialize here. init in libphos.js
  window.S[0].GLTFLoader = GLTFLoader;
  window.S[0].GLTFExporter = GLTFExporter;

  window.S[0].render = true;
  window.S[0].f_render = render;

  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setClearColor(0xAAAAAA);
  renderer.shadowMap.enabled = true;

  function makeCamera(fov = 40) {
    const aspect = 2;  // the canvas default
    const zNear = 0.1;
    const zFar = 1000;
    return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
  }
  const camera = makeCamera();
  camera.position.set(8, 4, 10).multiplyScalar(3);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
  window.scene = scene;

  {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 20, 0);
    scene.add(light);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    const d = 50;
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 50;
    light.shadow.bias = 0.001;
  }

  {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 2, 4);
    scene.add(light);
  }

  const groundGeometry = new THREE.PlaneBufferGeometry(50, 50);
  const groundMaterial = new THREE.MeshPhongMaterial({color: 0xCC8866});
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = Math.PI * -.5;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  const carWidth = 4;
  const carHeight = 1;
  const carLength = 8;
  
  window.tank = [ carWidth, carHeight, carLength ];


// We dont need to change all code to Phos
// only use Phos to add new objects, 
// with more copact RPN

// instead of new variable tank
// add object to array, with name as key

// add tank 1 with Phos ??



  const tank = new THREE.Object3D();
  scene.add(tank);

  const bodyGeometry = new THREE.BoxBufferGeometry(carWidth, carHeight, carLength);
  const bodyMaterial = new THREE.MeshPhongMaterial({color: 0x6688AA});
  const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
  bodyMesh.position.y = 1.4;
  bodyMesh.castShadow = true;
  tank.add(bodyMesh);
  
  
  const tank1 = new THREE.Object3D();
  scene.add(tank1);
  
  f_tank(tank1, carWidth, carHeight, carLength)

  const tankCameraFov = 75;
  const tankCamera = makeCamera(tankCameraFov);
  tankCamera.position.y = 3;
  tankCamera.position.z = -6;
  tankCamera.rotation.y = Math.PI;
  bodyMesh.add(tankCamera);

  const wheelRadius = 1;
  const wheelThickness = .5;
  const wheelSegments = 6;
  const wheelGeometry = new THREE.CylinderBufferGeometry(
      wheelRadius,     // top radius
      wheelRadius,     // bottom radius
      wheelThickness,  // height of cylinder
      wheelSegments);
  const wheelMaterial = new THREE.MeshPhongMaterial({color: 0x888888});
  const wheelPositions = [
    [-carWidth / 2 - wheelThickness / 2, -carHeight / 2,  carLength / 3],
    [ carWidth / 2 + wheelThickness / 2, -carHeight / 2,  carLength / 3],
    [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, 0],
    [ carWidth / 2 + wheelThickness / 2, -carHeight / 2, 0],
    [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, -carLength / 3],
    [ carWidth / 2 + wheelThickness / 2, -carHeight / 2, -carLength / 3],
  ];
  const wheelMeshes = wheelPositions.map((position) => {
    const mesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
    mesh.position.set(...position);
    mesh.rotation.z = Math.PI * .5;
    mesh.castShadow = true;
    bodyMesh.add(mesh);
    return mesh;
  });

  const domeRadius = 2;
  const domeWidthSubdivisions = 12;
  const domeHeightSubdivisions = 12;
  const domePhiStart = 0;
  const domePhiEnd = Math.PI * 2;
  const domeThetaStart = 0;
  const domeThetaEnd = Math.PI * .5;
  const domeGeometry = new THREE.SphereBufferGeometry(
    domeRadius, domeWidthSubdivisions, domeHeightSubdivisions,
    domePhiStart, domePhiEnd, domeThetaStart, domeThetaEnd);
  const domeMesh = new THREE.Mesh(domeGeometry, bodyMaterial);
  domeMesh.castShadow = true;
  bodyMesh.add(domeMesh);
  domeMesh.position.y = .5;

  const turretWidth = .1;
  const turretHeight = .1;
  const turretLength = carLength * .75 * .2;
  const turretGeometry = new THREE.BoxBufferGeometry(
      turretWidth, turretHeight, turretLength);
  const turretMesh = new THREE.Mesh(turretGeometry, bodyMaterial);
  const turretPivot = new THREE.Object3D();
  turretMesh.castShadow = true;
  turretPivot.scale.set(5, 5, 5);
  turretPivot.position.y = .5;
  turretMesh.position.z = turretLength * .5;
  turretPivot.add(turretMesh);
  bodyMesh.add(turretPivot);

  const turretCamera = makeCamera();
  turretCamera.position.y = .75 * .2;
  turretMesh.add(turretCamera);

  const targetGeometry = new THREE.SphereBufferGeometry(.5, 6, 3);
  const targetMaterial = new THREE.MeshPhongMaterial({color: 0x00FF00, flatShading: true});
  const targetMesh = new THREE.Mesh(targetGeometry, targetMaterial);
  const targetOrbit = new THREE.Object3D();
  const targetElevation = new THREE.Object3D();
  const targetBob = new THREE.Object3D();
  targetMesh.castShadow = true;
  scene.add(targetOrbit);
  targetOrbit.add(targetElevation);
  targetElevation.position.z = carLength * 2;
  targetElevation.position.y = 8;
  targetElevation.add(targetBob);
  targetBob.add(targetMesh);

  const targetCamera = makeCamera();
  const targetCameraPivot = new THREE.Object3D();
  targetCamera.position.y = 1;
  targetCamera.position.z = -2;
  targetCamera.rotation.y = Math.PI;
  targetBob.add(targetCameraPivot);
  targetCameraPivot.add(targetCamera);

  const target = {}
  f_target(scene, target, carLength)


  // Create a sine-like wave
  const curve = new THREE.SplineCurve( [
    new THREE.Vector2( -10, 0 ),
    new THREE.Vector2( -5, 5 ),
    new THREE.Vector2( 0, 0 ),
    new THREE.Vector2( 5, -5 ),
    new THREE.Vector2( 10, 0 ),
    new THREE.Vector2( 5, 10 ),
    new THREE.Vector2( -5, 10 ),
    new THREE.Vector2( -10, -10 ),
    new THREE.Vector2( -15, -8 ),
    new THREE.Vector2( -10, 0 ),
  ] );

  const points = curve.getPoints( 50 );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
  const splineObject = new THREE.Line( geometry, material );
  splineObject.rotation.x = Math.PI * .5;
  splineObject.position.y = 0.05;
  scene.add(splineObject);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  const targetPosition = new THREE.Vector3();
  const tankPosition = new THREE.Vector2();
  const tankTarget = new THREE.Vector2();

  const cameras = [
    { cam: camera, desc: 'detached camera', },
    { cam: turretCamera, desc: 'on turret looking at target', },
    { cam: targetCamera, desc: 'near target looking at tank', },
    { cam: tankCamera, desc: 'above back of tank', },
  ];

  const infoElem = document.querySelector('#info');
  
  window.M  = []; // stack for tank
  window.Mt = []; // stack for target

  var DEBUG=0;
  var t_arr = [];

  function render(time) {
    if (DEBUG==1) { if (time%100 > 80) console.log(time); 
        
        t_arr.push([time, scene.children[3].position, Date.now()]);
        if (t_arr.length > 100) {
        
            DEBUG=0;
            console.log(t_arr);
        }
        
    }
    
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      cameras.forEach((cameraInfo) => {
        const camera = cameraInfo.cam;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      });
    }

if (window.S[0].render) {
// if (true) 
// {
    // move target
    targetOrbit.rotation.y = time * .27;
    targetBob.position.y = Math.sin(time * 2) * 4;
    targetMesh.rotation.x = time * 7;
    targetMesh.rotation.y = time * 13;

    // f_move(target, time + 0.5)
    f_move(time + 0.5, target);

    targetMaterial.emissive.setHSL(time * 10 % 1, 1, .25);
    targetMaterial.color.setHSL(time * 10 % 1, 1, .25);

    // move tank
    const tankTime = time * .05;
    curve.getPointAt(tankTime % 1, tankPosition);
    curve.getPointAt((tankTime + 0.01) % 1, tankTarget);
    tank.position.set(tankPosition.x, 0, tankPosition.y);
    tank.lookAt(tankTarget.x, 0, tankTarget.y);
    
    if (typeof window.M[0] !== "undefined") {
        // console.log( Object.keys( window.M[0] ) );
        if (window.M[0].t == 'tank') {
            // console.log( "  M[0] is tank " );
            window.M[0].p.push( curve );
            window.M[0].p.push( tankPosition );
            window.M[0].p.push( tankTarget );
                    
        }
    }
    
    f_move_tank(time - 2, tank1, curve, tankPosition, tankTarget)
    
    // window.M.forEach( f_move_i );
    for (var m of window.M) f_move_i( m, time );
    for (var m of window.Mt) f_move_i( m, time );

    // face turret at target
    targetMesh.getWorldPosition(targetPosition);
    turretPivot.lookAt(targetPosition);

    // make the turretCamera look at target
    turretCamera.lookAt(targetPosition);

    // make the targetCameraPivot look at the at the tank
    tank.getWorldPosition(targetPosition);
    targetCameraPivot.lookAt(targetPosition);

    wheelMeshes.forEach((obj) => {
      obj.rotation.x = time * 3;
    });
}
    // const camera = cameras[time * .25 % cameras.length | 0];
    const camera = cameras[0];
    infoElem.textContent = camera.desc;
// }    
    
  if ( S[0].ws_msg ) {
  
    S[0].ws_msg = false;
    
    // console.log( "  WebSocket message available "+ Date.now() +" "+ S);
    
    
    var sj = S.pop();
    if ( sj.substring(0,1)=='[' ) {
      S.push( JSON.parse( sj ) );
      S[0].has_ca_pos = true;    // ca: children array
      
      S[0].ca_pos_n   = S[ S.length-1 ][2].length;
	                                    //[2] is index of [position,rotation]; [1] is list of children
	    
	    S[0].ca_pos = S.length - 1;	    

    }
    
    console.log( "  WebSocket message available "+ Date.now() +" "+ S);
    console.log( "  WebSocket message available " );
    
  }

  if ( S[0].has_ca_pos ) {
  
    var n_cp = S[0].ca_pos;
    var CP   = S[ n_cp ][2];
    var L    = S[ n_cp ][2].length;
    var n    = S[0].ca_pos_n;
    
    var CA   = S[ n_cp ][1];
    var CN;
    var i;
    
    // var CP0  = JSON.parse(CP[L-n]);
    var CP0; 
    
    // console.log( Date.now() +" "+ CP[L-n] );    

    /*    
    camera.position.x = CP0.x; // camera.position is read only, but x y z are not!!
    camera.position.y = CP0.y;
    camera.position.z = CP0.z;
    */
for (i = 0; i < CA.length; i++) {    
    n    = S[0].ca_pos_n;
    CP0  = JSON.parse(CP[L-n]);
    console.log( Date.now() +" "+ JSON.stringify(CP0) );    


    CN = CA[i];
    
    var T;
    
    if (typeof CN === "number") 
        T = scene.children[CN]; // store list of children in S[0] ?? decided in source ??
    else if (CN.length==4) {
        T = scene.children[ CN[0] ].children[ CN[1] ].children[ CN[2] ].children[ CN[3] ];
    }
    else
        T = scene.children[ CN[0] ].children[ CN[1] ].children[ CN[2] ];
    /*
    T.position.x = CP0.x; // camera.position is read only, but x y z are not!!
    T.position.y = CP0.y;
    T.position.z = CP0.z;
    */
    
    T.position.x = CP0[0].x; // camera.position is read only, but x y z are not!!
    T.position.y = CP0[0].y;
    T.position.z = CP0[0].z;

    T.rotation.x = CP0[1]._x; // camera.position is read only, but x y z are not!!
    T.rotation.y = CP0[1]._y;
    T.rotation.z = CP0[1]._z;
    
    S[0].ca_pos_n   = S[0].ca_pos_n - 1;
}
    /*
    T.quaternion._x = CP0[2]._x; // camera.position is read only, but x y z are not!!
    T.quaternion._y = CP0[2]._y;
    T.quaternion._z = CP0[2]._z;
    T.quaternion._w = CP0[2]._w;
    */
    
        
    if ( S[0].ca_pos_n < 1 ) S[0].has_ca_pos=false;
    
    t_arr.push(["before render", Date.now()]);
    renderer.render(scene, camera.cam);
    t_arr.push(["after render", Date.now()]);
    
    requestAnimationFrame(render); // render only websocket objects, while S[0].render=false disables other objects
 
    
  }

    
    

    t_arr.push(["before render", Date.now()]);

    renderer.render(scene, camera.cam);
    
    t_arr.push(["after render", Date.now()]);

    if (window.S[0].render) requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();

function f_curve()
{
  // Create a sine-like wave
  const curve = new THREE.SplineCurve( [
    new THREE.Vector2( -10, 0 ),
    new THREE.Vector2( -5, 5 ),
    new THREE.Vector2( 0, 0 ),
    new THREE.Vector2( 5, -5 ),
    new THREE.Vector2( 10, 0 ),
    new THREE.Vector2( 5, 10 ),
    new THREE.Vector2( -5, 10 ),
    new THREE.Vector2( -10, -10 ),
    new THREE.Vector2( -15, -8 ),
    new THREE.Vector2( -10, 0 ),
  ] );

  const points = curve.getPoints( 50 );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  const material = new THREE.LineBasicMaterial( { color : 0xffff00 } );
  const splineObject = new THREE.Line( geometry, material );
  splineObject.rotation.x = Math.PI * .5;
  splineObject.position.y = 0.05;
  scene.add(splineObject);
}

function f_geom()
{
  // Create a sine-like wave
  const curve = new THREE.SplineCurve( [
    new THREE.Vector2( -10, 0 ),   // -10 0 THREE.Vector2
    new THREE.Vector2( -5, 5 ),
    new THREE.Vector2( 0, 0 ),
    new THREE.Vector2( 5, -5 ),
    new THREE.Vector2( 10, 0 ),
    new THREE.Vector2( 5, 10 ),
    new THREE.Vector2( -5, 10 ),
    new THREE.Vector2( -10, -10 ),
    new THREE.Vector2( -15, -8 ),
    new THREE.Vector2( -10, 0 ),
  ] );

  const points = curve.getPoints( 50 ); // 50 getPoints curve:
  const geometry = new THREE.BufferGeometry().setFromPoints( points ); // points setFromPoints THREE.BufferGeometry
  const material = new THREE.LineBasicMaterial( { color : 0x00ff00 } ); // color THREE.LineBasicMaterial
  const splineObject = new THREE.Line( geometry, material ); // geometry material THREE.Line
  splineObject.rotation.x = Math.PI * .5; // Math.PI 5 * rotation.x splineObject
  splineObject.position.y = 0.05;         // 0.05 position.y splineObject

  scene.add(splineObject);  // splineObject add scene
}

function f_splcurve() // THREE.BufferGeometry
{ var S = window.S;
  S.push( new THREE.SplineCurve( S.pop() ) ); }


function f_vec2() // THREE.BufferGeometry
{ var S = window.S;
  var Y = S.pop();
  var X = S.pop();
  S.push( new THREE.Vector2( X, Y ) ); }



function f_points() // 50 curve: points:
{ var S = window.S;
  var geom = S.pop()
  S.push( geom.Points( S.pop() ) ); }


function f_buffgeom() // THREE.BufferGeometry
{ var S=window.S;
  S.push( new THREE.BufferGeometry.setFromPoints( S.pop() ) ); }


function f_material() // THREE.line
{ var S=window.S;
  S.push( new THREE.LineBasicMaterial( S.pop() ) ); }


function f_line() // THREE.line
{ var S=window.S;
  S.push( new THREE.line( S.pop(), S.pop() ) ); }


function f_sc_add() // scene.add
{ scene.add(window.S.pop()); }

function f_move_i(m, time)
{
    // for (var k of Object.keys(m)) console.log( "  f_move_i "+ k +"  time "+ time);
    // m.f( time, m.p[0], m.p[1], m.p[2], m.p[3]);
    m.f( time, m );
    
    // function f_move_tank(time, tank, curve, tankPosition, tankTarget)
}


// function f_move(target, time)
function f_move(time, target)
{

if (typeof target.f === "function") { // called from Phos    


      var m = target;
      var N = m.p[0][1];
      if (time > (4+2*N)) time -= (4+2*N);
      
      target = m.p[0][0];  // push the original variables to window.M when animation starts
      

}
    target.Orbit.rotation.y = time * .27;
    target.Bob.position.y = Math.sin(time * 2) * 4;
    target.Mesh.rotation.x = time * 7;
    target.Mesh.rotation.y = time * 13;
}

  function makeCamera(fov = 40) {
    const aspect = 2;  // the canvas default
    const zNear = 0.1;
    const zFar = 1000;
    return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
  }


function f_target(scene, target, carLength)
{
  if (typeof scene === "undefined") { // called from Phos
      console.log( "  f_target from Phos " );
      
      var target = {};
      var carLength = 8;
      
      target.Geometry = new THREE.SphereBufferGeometry(.5, 6, 3);
      target.Material = new THREE.MeshPhongMaterial({color: 0x00FF00, flatShading: true});
      target.Mesh = new THREE.Mesh(target.Geometry, target.Material);
      target.Orbit = new THREE.Object3D();
      target.Elevation = new THREE.Object3D();
      target.Bob = new THREE.Object3D();
      target.Mesh.castShadow = true;
      
      window.scene.add(target.Orbit);
      
        target.Orbit.add(target.Elevation);
  
      target.Elevation.position.z = carLength * 2;
      target.Elevation.position.y = 8;
      target.Elevation.add(target.Bob);
  
      target.Bob.add(target.Mesh);

      // Mt stack for target
      var L = window.Mt.length;
      window.Mt.push( { p: [ [target, L] ], f: f_move, t: 'target' } );
      
      console.log( "  end f_target from Phos " );
      
      return;
  }

  // const target = {};
  target.Geometry = new THREE.SphereBufferGeometry(.5, 6, 3);
  target.Material = new THREE.MeshPhongMaterial({color: 0x00FF00, flatShading: true});
  target.Mesh = new THREE.Mesh(target.Geometry, target.Material);
  target.Orbit = new THREE.Object3D();
  target.Elevation = new THREE.Object3D();
  target.Bob = new THREE.Object3D();
  target.Mesh.castShadow = true;
  
  scene.add(target.Orbit);
  
  target.Orbit.add(target.Elevation);
  
  target.Elevation.position.z = carLength * 2;
  target.Elevation.position.y = 8;
  target.Elevation.add(target.Bob);
  
  target.Bob.add(target.Mesh);

  target.Camera = makeCamera();
  target.CameraPivot = new THREE.Object3D();
  target.Camera.position.y = 1;
  target.Camera.position.z = -2;
  target.Camera.rotation.y = Math.PI;
  target.Bob.add(target.CameraPivot);
  target.CameraPivot.add(target.Camera);

}

function f_move_tank(time, tank, curve, tankPosition, tankTarget)
{

    if (time<0) time=0;    
    
  if (typeof tank.f === "function") { // called from Phos
      // console.log( "  f_move_tank m " );
      // return;

      var m = tank;
      var N = m.p[0][1];
      if (time > (4+2*N)) time -= (4+2*N);
      
      tank = m.p[0][0];  // push the original variables to window.M when animation starts
      
      /*
      curve = m.p[1];
      tankPosition = m.p[2];
      tankTarget = m.p[3];
      */
      
      curve = window.M[0].p[1];
      tankPosition = window.M[0].p[2];
      tankTarget = window.M[0].p[3];


      // move tank
      const tankTime = time * .05;
      curve.getPointAt(tankTime % 1, tankPosition);
      curve.getPointAt((tankTime + 0.01) % 1, tankTarget);
      tank.position.set(tankPosition.x, 0, tankPosition.y);
      tank.lookAt(tankTarget.x, 0, tankTarget.y);        

      return;
  }


    
    // move tank
    const tankTime = time * .05;
    curve.getPointAt(tankTime % 1, tankPosition);
    curve.getPointAt((tankTime + 0.01) % 1, tankTarget);
    tank.position.set(tankPosition.x, 0, tankPosition.y);
    tank.lookAt(tankTarget.x, 0, tankTarget.y);
}

// can start adding objects LIVE in browser console now?
// { car: [ W, H, L ] } { mat: {color: ....} } // can check obj key, replace default values  
// export function f_tank(tank, carWidth, carHeight, carLength)
function f_tank(tank, carWidth, carHeight, carLength)
{

  if (typeof tank === "undefined") { // called from Phos
      var tank;
      // var scene = window.S.pop();
      var scene = window.scene;
        
      tank = new THREE.Object3D();
      scene.add(tank);
      console.log("f_tank from Phos() typeof tank "+typeof tank);
      var carWidth = window.tank[0];
      var carHeight = window.tank[1];
      var carLength = window.tank[2];
      // return;
      
      var L = window.M.length;
      window.M.push( { p: [ [tank, L] ], f: f_move_tank, t: 'tank' } );
  }
  const bodyGeometry = new THREE.BoxBufferGeometry(carWidth, carHeight, carLength);
  const bodyMaterial = new THREE.MeshPhongMaterial({color: 0x6688AA});
  const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
  bodyMesh.position.y = 1.4;
  bodyMesh.castShadow = true;
  tank.add(bodyMesh);
}

window.THREE = THREE;

export { f_tank, f_target, f_curve, f_geom, f_vec2 };
// window.tank = main;
