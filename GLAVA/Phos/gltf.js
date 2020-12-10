      GLTFLoader = S[0].GLTFLoader;
						const loader = new GLTFLoader().setPath( 'models/gltf/DamagedHelmet/glTF/' );
						loader.setPath( 'models/gltf/DamagedHelmet/glTF/' );
						loader.load( 'DamagedHelmet.gltf', function ( gltf ) {
					  // loader.load( 'SimpleSkinning.gltf', function ( gltf ) {						
					  // loader.load( 'scene.gltf', function ( gltf ) {						
					  // loader.load( 'sphere.gltf', function ( gltf ) {						

							gltf.scene.traverse( function ( child ) {

								if ( child.isMesh ) {

									// TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
									// roughnessMipmapper.generateMipmaps( child.material );

								}

							} );

							// scene.add( gltf.scene );
							scene1.add( gltf.scene );

							// roughnessMipmapper.dispose();

							// render();

						} );
						
						
						
						

      GLTFExporter = S[0].GLTFExporter;

			function exportGLTF( input ) {

				const gltfExporter = new GLTFExporter();

        /*
				const options = {
					trs: document.getElementById( 'option_trs' ).checked,
					onlyVisible: document.getElementById( 'option_visible' ).checked,
					truncateDrawRange: document.getElementById( 'option_drawrange' ).checked,
					binary: document.getElementById( 'option_binary' ).checked,
					maxTextureSize: Number( document.getElementById( 'option_maxsize' ).value ) || Infinity // To prevent NaN value
				};
				*/
				
				const options =	{ trs: false, onlyVisible: true, truncateDrawRange: true, binary: false, maxTextureSize: 4096 }
				
				gltfExporter.parse( input, function ( result ) {

					if ( result instanceof ArrayBuffer ) {

						saveArrayBuffer( result, 'scene.glb' );

					} else {

						const output = JSON.stringify( result, null, 2 );
						console.log( output );
						saveString( output, 'scene.gltf' );

					}

				}, options );

			}


function saveString( text, filename ) {

				save( new Blob( [ text ], { type: 'text/plain' } ), filename );

			}
			
			
			const link = document.createElement( 'a' );
			link.style.display = 'none';
			document.body.appendChild( link ); // Firefox workaround, see #6594

			
			function save( blob, filename ) {

				link.href = URL.createObjectURL( blob );
				link.download = filename;
				link.click();

				// URL.revokeObjectURL( url ); breaks Firefox...

			}
			
			
			
			
			document.onmousedown = myMouseDownHandler;

    function myMouseDownHandler() {
      alert("A mouse down event took place within the document!");
    }
    
    
    
    
    



<!-- begin snippet: js hide: false console: true babel: null -->

<!-- language: lang-js -->

    var direction = "";
        var oldx = 0;
        var oldy = 0;
        mousemovemethod = function (e) {
        
     if (e.pageX > oldx && e.pageY == oldy) {
                    direction="East";
                }
                else if (e.pageX == oldx && e.pageY > oldy) {
                    direction="South";
                }
                else if (e.pageX == oldx && e.pageY < oldy) {
                    direction="North";
                }
                else if (e.pageX < oldx && e.pageY == oldy) {
                    direction="West";
                }
            
            document.body.innerHTML = direction;
            
            oldx = e.pageX;
             oldy = e.pageY;
            
    }

    document.addEventListener('mousemove', mousemovemethod);

<!-- end snippet -->



https://jsfiddle.net/f2Lommf5/951/


