var views, scene, camera, renderer;
var geometry, material, rotMesh, gyroMesh;

init();
animate();

function init() {

    scene = new THREE.Scene();
    var width = window.innerWidth;
    var height = window.innerHeight * 0.8;
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
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
    renderer.setClearColorHex(0xc5c5c5, 1);
    renderer.setSize(width, height);

    renderer.domElement.style.position = 'absolute';
    document.getElementById('webGLView').appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    var width = window.innerWidth;
    var height = window.innerHeight * 0.8;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

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