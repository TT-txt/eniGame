<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>randoms</title>
    <script src="include/three/three.js"></script>
    <style>
        #scene-container{
            position: absolute;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div id="scene-container">
        <!-- This div will hold our scene-->
        <script>
            const container = document.querySelector('#scene-container');
            var scene = new THREE.Scene();
            scene.background = new THREE.Color('skyblue');
            var fov = 35;
            var aspect = container.clientWidth / container.clientHeight;
            var near = 0.1;
            var far = 100;
            var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            camera.position.set(0,0,10);
            var geometry = new THREE.BoxBufferGeometry(2,2,2);
            var material = new THREE.MeshStandardMaterial({color: 0x800080 });
            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            var light = new THREE.DirectionalLight(0xffffff, 5.0);
            light.position.set(10,10,10);
            scene.add(light);
            const renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);
            renderer.render(scene, camera);
            function animate(){
                requestAnimationFrame(animate);
                mesh.rotation.x +=0.05;
                mesh.rotation.y+=0.01;
                mesh.scale.x = Math.random() * 10;
                camera.position.z+=0.1;
                renderer.render(scene, camera);
            }
            animate();
        </script>
    </div>
</body>
</html>