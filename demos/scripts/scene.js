// Shipeng Xu 2014
var demo = new CANNON.Demo();
var lastTime;
if (window.performance.now) {
    console.log("Using high performance timer");
    getTimestamp = function() {
        return window.performance.now();
    };
} else {
    if (window.performance.webkitNow) {
        console.log("Using webkit high performance timer");
        getTimestamp = function() {
            return window.performance.webkitNow();
        };
    } else {
        console.log("Using low performance timer");
        getTimestamp = function() {
            return new Date().getTime();
        };
    }
}

demo.addScene("P", function() {
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
    var length_wing = 5;
    var size_board = 2.5;
    var shape1 = new CANNON.Box(new CANNON.Vec3(length_wing, 0.5, 0.25));
    var shape2 = new CANNON.Box(new CANNON.Vec3(0.5, length_wing, 0.25));
    var shape3 = new CANNON.Box(new CANNON.Vec3(size_board, size_board, 0.25));
    var mass = 10;
    var body = new CANNON.Body({
        mass: mass
    });
    body.position.set(0, 0, 7);
    // body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 32);
    body.addShape(shape1, new CANNON.Vec3(-(length_wing + size_board), 0, 0));
    body.addShape(shape1, new CANNON.Vec3((length_wing + size_board), 0, 0));
    body.addShape(shape2, new CANNON.Vec3(0, -(length_wing + size_board), 0));
    body.addShape(shape2, new CANNON.Vec3(0, (length_wing + size_board), 0));
    body.addShape(shape3, new CANNON.Vec3(0, 0, 0));
    world.add(body);
    demo.addVisual(body);

    var bodyRef = new CANNON.Body();
    bodyRef.position.set(0, 0, 7);
    var constraints = [];
    bodyRef.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 32);
    world.add(bodyRef);

    constraints.push(new CANNON.PointToPointConstraint(body, new CANNON.Vec3(0, 5, 7), groundBody, new CANNON.Vec3(0, 5, 0)));
    constraints.push(new CANNON.PointToPointConstraint(body, new CANNON.Vec3(0, -5, 7), groundBody, new CANNON.Vec3(0, -5, 0)));
    for (var i = 0; i < constraints.length; i++)
        world.addConstraint(constraints[i]);
    setTimeout(function() {
        setInterval(function() {
            var eular = new CANNON.Vec3(0, 0, 0);
            body.quaternion.toEuler(eular);
            var angle = eular.y;
            if (angle < 0) angle = -(Math.PI + angle);
            else angle = Math.PI - angle;
            angle = angle * 180 / Math.PI;
            var error = 0 - angle;
            var thrust = 0.8 * error;
            // console.log(thrust);
            body.applyImpulse(new CANNON.Vec3(0, 0, thrust), new CANNON.Vec3(4, 0, 0));
        }, 100);
    }, 6000);


});


demo.addScene("I", function() {
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
    var length_wing = 5;
    var size_board = 2.5;
    var shape1 = new CANNON.Box(new CANNON.Vec3(length_wing, 0.5, 0.25));
    var shape2 = new CANNON.Box(new CANNON.Vec3(0.5, length_wing, 0.25));
    var shape3 = new CANNON.Box(new CANNON.Vec3(size_board, size_board, 0.25));
    var mass = 10;
    var body = new CANNON.Body({
        mass: mass
    });
    body.position.set(0, 0, 7);
    // body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 32);
    body.addShape(shape1, new CANNON.Vec3(-(length_wing + size_board), 0, 0));
    body.addShape(shape1, new CANNON.Vec3((length_wing + size_board), 0, 0));
    body.addShape(shape2, new CANNON.Vec3(0, -(length_wing + size_board), 0));
    body.addShape(shape2, new CANNON.Vec3(0, (length_wing + size_board), 0));
    body.addShape(shape3, new CANNON.Vec3(0, 0, 0));
    world.add(body);
    demo.addVisual(body);

    var bodyRef = new CANNON.Body();
    bodyRef.position.set(0, 0, 7);
    var constraints = [];
    bodyRef.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 32);
    world.add(bodyRef);

    constraints.push(new CANNON.PointToPointConstraint(body, new CANNON.Vec3(0, 5, 7), groundBody, new CANNON.Vec3(0, 5, 0)));
    constraints.push(new CANNON.PointToPointConstraint(body, new CANNON.Vec3(0, -5, 7), groundBody, new CANNON.Vec3(0, -5, 0)));
    for (var i = 0; i < constraints.length; i++)
        world.addConstraint(constraints[i]);

    lastTime = getTimestamp();
    var integral = 0.0;
    setTimeout(function() {
        setInterval(function() {
            var eular = new CANNON.Vec3(0, 0, 0);
            body.quaternion.toEuler(eular);
            var angle = eular.y;
            if (angle < 0) angle = -(Math.PI + angle);
            else angle = Math.PI - angle;
            angle = angle * 180 / Math.PI;
            var error = 0 - angle;
            var nowTime = getTimestamp();
            var dt = nowTime - lastTime;
            integral = integral + error * dt / 1000.0;
            lastTime = nowTime;
            body.applyImpulse(new CANNON.Vec3(0, 0, 0.5 * integral), new CANNON.Vec3(4, 0, 0));
        }, 100);
    }, 6000);


});

demo.addScene("D", function() {
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
    var length_wing = 5;
    var size_board = 2.5;
    var shape1 = new CANNON.Box(new CANNON.Vec3(length_wing, 0.5, 0.25));
    var shape2 = new CANNON.Box(new CANNON.Vec3(0.5, length_wing, 0.25));
    var shape3 = new CANNON.Box(new CANNON.Vec3(size_board, size_board, 0.25));
    var mass = 10;
    var body = new CANNON.Body({
        mass: mass
    });
    body.position.set(0, 0, 7);
    // body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 32);
    body.addShape(shape1, new CANNON.Vec3(-(length_wing + size_board), 0, 0));
    body.addShape(shape1, new CANNON.Vec3((length_wing + size_board), 0, 0));
    body.addShape(shape2, new CANNON.Vec3(0, -(length_wing + size_board), 0));
    body.addShape(shape2, new CANNON.Vec3(0, (length_wing + size_board), 0));
    body.addShape(shape3, new CANNON.Vec3(0, 0, 0));
    world.add(body);
    demo.addVisual(body);

    var bodyRef = new CANNON.Body();
    bodyRef.position.set(0, 0, 7);
    var constraints = [];
    bodyRef.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 32);
    world.add(bodyRef);

    constraints.push(new CANNON.PointToPointConstraint(body, new CANNON.Vec3(0, 5, 7), groundBody, new CANNON.Vec3(0, 5, 0)));
    constraints.push(new CANNON.PointToPointConstraint(body, new CANNON.Vec3(0, -5, 7), groundBody, new CANNON.Vec3(0, -5, 0)));
    for (var i = 0; i < constraints.length; i++)
        world.addConstraint(constraints[i]);

    lastTime = getTimestamp();
    var lastError = 0.0;
    setTimeout(function() {
        setInterval(function() {
            var eular = new CANNON.Vec3(0, 0, 0);
            body.quaternion.toEuler(eular);
            var angle = eular.y;
            if (angle < 0) angle = -(Math.PI + angle);
            else angle = Math.PI - angle;
            angle = angle * 180 / Math.PI;
            var error = 0 - angle;
            var nowTime = getTimestamp();
            var dt = nowTime - lastTime;
            var derivative = (error - lastError) / dt;
            lastError = error;
            lastTime = nowTime;
            body.applyImpulse(new CANNON.Vec3(0, 0, 500 * derivative), new CANNON.Vec3(4, 0, 0));
        }, 100);
    }, 3000);


});

demo.addScene("PD", function() {
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
    var length_wing = 5;
    var size_board = 2.5;
    var shape1 = new CANNON.Box(new CANNON.Vec3(length_wing, 0.5, 0.25));
    var shape2 = new CANNON.Box(new CANNON.Vec3(0.5, length_wing, 0.25));
    var shape3 = new CANNON.Box(new CANNON.Vec3(size_board, size_board, 0.25));
    var mass = 10;
    var body = new CANNON.Body({
        mass: mass
    });
    body.position.set(0, 0, 7);
    // body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 32);
    body.addShape(shape1, new CANNON.Vec3(-(length_wing + size_board), 0, 0));
    body.addShape(shape1, new CANNON.Vec3((length_wing + size_board), 0, 0));
    body.addShape(shape2, new CANNON.Vec3(0, -(length_wing + size_board), 0));
    body.addShape(shape2, new CANNON.Vec3(0, (length_wing + size_board), 0));
    body.addShape(shape3, new CANNON.Vec3(0, 0, 0));
    world.add(body);
    demo.addVisual(body);

    var bodyRef = new CANNON.Body();
    bodyRef.position.set(0, 0, 7);
    var constraints = [];
    bodyRef.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 32);
    world.add(bodyRef);

    constraints.push(new CANNON.PointToPointConstraint(body, new CANNON.Vec3(0, 5, 7), groundBody, new CANNON.Vec3(0, 5, 0)));
    constraints.push(new CANNON.PointToPointConstraint(body, new CANNON.Vec3(0, -5, 7), groundBody, new CANNON.Vec3(0, -5, 0)));
    for (var i = 0; i < constraints.length; i++)
        world.addConstraint(constraints[i]);

    lastTime = getTimestamp();
    var lastError = 0.0;
    setTimeout(function() {
        setInterval(function() {
            var eular = new CANNON.Vec3(0, 0, 0);
            body.quaternion.toEuler(eular);
            var angle = eular.y;
            if (angle < 0) angle = -(Math.PI + angle);
            else angle = Math.PI - angle;
            angle = angle * 180 / Math.PI;
            var error = 0 - angle;
            var nowTime = getTimestamp();
            var dt = nowTime - lastTime;
            var derivative = (error - lastError) / (dt + 0.0001);
            lastError = error;
            lastTime = nowTime;
            var thrust = 0.8 * error + 500 * derivative;
            // console.log(angle);
            body.applyImpulse(new CANNON.Vec3(0, 0, thrust), new CANNON.Vec3(4, 0, 0));
        }, 100);
    }, 6000);
});


demo.addScene("PID", function() {
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
    var length_wing = 5;
    var size_board = 2.5;
    var shape1 = new CANNON.Box(new CANNON.Vec3(length_wing, 0.5, 0.25));
    var shape2 = new CANNON.Box(new CANNON.Vec3(0.5, length_wing, 0.25));
    var shape3 = new CANNON.Box(new CANNON.Vec3(size_board, size_board, 0.25));
    var mass = 10;
    var body = new CANNON.Body({
        mass: mass
    });
    body.position.set(0, 0, 7);
    // body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 32);
    body.addShape(shape1, new CANNON.Vec3(-(length_wing + size_board), 0, 0));
    body.addShape(shape1, new CANNON.Vec3((length_wing + size_board), 0, 0));
    body.addShape(shape2, new CANNON.Vec3(0, -(length_wing + size_board), 0));
    body.addShape(shape2, new CANNON.Vec3(0, (length_wing + size_board), 0));
    body.addShape(shape3, new CANNON.Vec3(0, 0, 0));
    world.add(body);
    demo.addVisual(body);

    var bodyRef = new CANNON.Body();
    bodyRef.position.set(0, 0, 7);
    var constraints = [];
    bodyRef.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 32);
    world.add(bodyRef);

    constraints.push(new CANNON.PointToPointConstraint(body, new CANNON.Vec3(0, 5, 7), groundBody, new CANNON.Vec3(0, 5, 0)));
    constraints.push(new CANNON.PointToPointConstraint(body, new CANNON.Vec3(0, -5, 7), groundBody, new CANNON.Vec3(0, -5, 0)));
    for (var i = 0; i < constraints.length; i++)
        world.addConstraint(constraints[i]);

    lastTime = getTimestamp();
    var lastError = 0.0;
    var integral = 0.0;
    setTimeout(function() {
        setInterval(function() {
            var eular = new CANNON.Vec3(0, 0, 0);
            body.quaternion.toEuler(eular);
            var angle = eular.y;
            if (angle < 0) angle = -(Math.PI + angle);
            else angle = Math.PI - angle;
            angle = angle * 180 / Math.PI;
            var error = 0 - angle;
            var nowTime = getTimestamp();
            var dt = nowTime - lastTime;
            var derivative = (error - lastError) / (dt + 0.0001);
            integral = integral + error * dt / 1000.0;
            lastError = error;
            lastTime = nowTime;
            var thrust = 0.8 * error + 500 * derivative + 0.02 * integral;
            // console.log(angle);
            body.applyImpulse(new CANNON.Vec3(0, 0, thrust), new CANNON.Vec3(4, 0, 0));
        }, 100);
    }, 6000);
});


demo.start();