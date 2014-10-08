var demo = new CANNON.Demo();

demo.addScene("quadcopter", function() {
    var world = setupWorld(demo);
    var shape1 = new CANNON.Box(new CANNON.Vec3(10, 1, 0.5));
    var shape2 = new CANNON.Box(new CANNON.Vec3(1, 10, 0.5));
    var shape3 = new CANNON.Box(new CANNON.Vec3(5, 5, 0.5));
    var mass = 10;
    var body = new CANNON.Body({
        mass: mass
    });
    body.position.set(0, 0, 6);
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 32);

    body.addShape(shape1, new CANNON.Vec3(-15, 0, 0));
    body.addShape(shape1, new CANNON.Vec3(15, 0, 0));
    body.addShape(shape2, new CANNON.Vec3(0, -15, 0));
    body.addShape(shape2, new CANNON.Vec3(0, 15, 0));
    body.addShape(shape3, new CANNON.Vec3(0, 0, 0));
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