var views, scene, camera, renderer;
var geometry, material, rotMesh, gyroMesh;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 200), 1, 10000);
    camera.position.z = 500;

    var cubeTexture = new THREE.Texture(cubeTextureData);
    cubeTexture.wrapS = THREE.RepeatWrapping;
    cubeTexture.wrapT = THREE.RepeatWrapping;
    cubeTexture.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial({
        map: cubeTexture
    });

    geometry = new THREE.BoxGeometry(200, 100, 350);

    rotMesh = new THREE.Mesh(geometry, material);
    scene.add(rotMesh);
    rotMesh.position.set(-125, 0, 0);

    gyroMesh = new THREE.Mesh(geometry, material);
    scene.add(gyroMesh);
    gyroMesh.position.set(125, 0, 0);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, (window.innerHeight - 200));

    renderer.domElement.style.position = 'absolute';
    document.getElementById('webGLView').appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / (window.innerHeight - 200);
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, (window.innerHeight - 200));

}

function animate() {

    requestAnimationFrame(animate);

    rotMesh.rotation.x = -rotY;
    rotMesh.rotation.y = 0;
    rotMesh.rotation.z = -rotZ;

    gyroMesh.rotation.x = gyroRotX;
    gyroMesh.rotation.y = 0;
    gyroMesh.rotation.z = -gyroRotY;

    renderer.render(scene, camera);

}