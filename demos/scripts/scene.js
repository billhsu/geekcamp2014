var demo = new CANNON.Demo();

demo.addScene("quadcopter", function() {
    var world = setupWorld(demo);
    var shape = new CANNON.Box(new CANNON.Vec3(10, 1, 0.5));
    var mass = 10;
    var body = new CANNON.Body({
        mass: mass
    });
    body.position.set(0, 0, 6);
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 32);

    body.addShape(shape);
    demo.addVisual(body);
});

function setupWorld(demo) {
    var world = demo.getWorld();
    world.gravity.set(0, 0, -9.8);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    // ground plane
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({
        mass: 0
    });
    groundBody.addShape(groundShape);
    world.add(groundBody);
    demo.addVisual(groundBody);

    return world;
};

demo.start();