// -----------------------------------------------
// dat-guiの設定
// 右上にある、立方体の色や大きさを設定するGUI
// -----------------------------------------------
    // GUI上の初期パラメータ設定
    var sampleTarget = function() {
    this.color = "#ffffff";
    this.scale = 1;
    };

    //param で名前空間を作成
    var param = function() {
    this.box;
    }

    // guiボックス設置
    window.onload = function() {
    param.box = new sampleTarget();
    setValue();
    var gui = new dat.GUI();
    // domにonChangeトリガーを設定しておく
    gui.addColor(param.box, 'color').onChange(setValue);
    gui.add(param.box, 'scale', 0, 50).onChange(setValue);
    };

    // datGuiで使うsetValue
    function setValue() {
    cube.material.color.set(param.box.color);
    cube.scale.set(param.box.scale,param.box.scale,param.box.scale);
    }  

// ------------------------------------------------
// 基本の設定
// ------------------------------------------------

    // シーンを作成
    var scene = new THREE.Scene();

    // カメラを作成（カメラはperspectiveCamera）
    // 補足：perspectiveで透視投影（立体的に見える）、orthographicで正射影（平行投影）
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.z = 4;

    // rendererを作成（アンチエイリアスも指定）
    // 補足：アンチエイリアス=>物体の輪郭がギザギザになることを抑える処理
    var renderer = new THREE.WebGLRenderer({antialias:true});

    // レンダラーの色、サイズを指定
    renderer.setClearColor("#888");
    renderer.setSize( window.innerWidth, window.innerHeight );

    // DOMにrenderを追加する i.e. canvasタグ生成
    // 補足：canvasタグ=>HTML5で採用された、プラグインなしでグラフィクスを描画するタグ
    document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// mesh（部品）を作っていく
// ------------------------------------------------

    // phongMaterialで立方体を作っていく
    // 図形の形
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // 図形の素材（色を設定したり、物体をポリゴン調にしないようにできる）
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

    var cube = new THREE.Mesh( geometry, material );

    // cubeをシーンに追加
    scene.add( cube );
    // 周りで動くcubeの群れを作る
    var cubes = new THREE.Group();
    for ( var i = 0; i < 500; i ++ ) {
        var cube2 = new THREE.Mesh( geometry, material );
        cube2.position.x = ( Math.random() - 0.5 ) * 100;
        cube2.position.y = ( Math.random() - 0.5 ) * 100;
        cube2.position.z = ( Math.random() - 0.5 ) * 100;
        cube2.updateMatrix();
        cube2.matrixAutoUpdate = false;
        cubes.add(cube2);
    }
    // cubesをシーンに追加
    scene.add( cubes );  

    // lightを設置
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    var light = new THREE.DirectionalLight( 0x002288 );
    light.position.set( -1, -1, -1 );
    scene.add( light );

    var light = new THREE.AmbientLight( 0x444444 );
    scene.add( light );

    // アニメーションする
    var render = function () {
    // アニメーションを更新するための宣言
    requestAnimationFrame( render );

    cube.rotation.x += 0.006;
    cube.rotation.y += 0.01;

    cubes.rotation.x -= 0.001;
    cubes.rotation.y += 0.002;

    renderer.render(scene, camera);
    };

// -----------------------------------------------
// orbitControlsの設定
// 
// -----------------------------------------------
    var controls;
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.autoRotate = true;

    render();