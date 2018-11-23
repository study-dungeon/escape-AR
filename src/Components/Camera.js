import React, { Component } from 'react';
import { initializeArToolkit } from '../utils/arToolkit';
// import hiro from '../../assets/patt.hiro';

export default class Camera extends Component {
  componentDidMount() {
    // init webGL renderer with canvas element
    const renderer = (this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas: this.canvas,
    }));
    renderer.setClearColor(new THREE.Color('lightgrey'), 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    // init scene
    const scene = new THREE.Scene();

    // init camera
    const camera = new THREE.Camera();
    scene.add(camera);

    // init lights
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[3] = new THREE.AmbientLight(0xffffff, 0.5);
    lights[0].position.set(0, 25, 0);
    lights[1].position.set(10, 25, 10);
    lights[2].position.set(-10, -25, -10);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
    scene.add(lights[3]);

    // array of functions for the rendering loop
    const onRenderFcts = [];

    // init arToolKit
    const arToolkitContext = initializeArToolkit(
      renderer,
      camera,
      onRenderFcts
    );

    // init marketRoot
    const markerRoot = new THREE.Group();
    scene.add(markerRoot);

    // init
    const { ArMarkerControls } = THREEx;
    const marker = ArMarkerControls(arToolkitContext, markerRoot, {
      type: 'pattern',
      patternUrl: '../../assets/camera_para.dat',
    });

    // init 3d sphere & torusKnot
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 8, 8),
      new THREE.MeshStandardMaterial()
    );
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1, 0.2, 30, 16),
      new THREE.MeshStandardMaterial({
        color: 0xff0051,
        wireframe: true,
      })
    );

    // toggle 3d objects in markerRoot
    let ball = true;
    markerRoot.add(ball);
    window.setInterval(() => {
      if (ball) {
        markerRoot.children.pop();
        markerRoot.add(torusKnot);
        ball = false;
      } else {
        markerRoot.children.pop();
        markerRoot.add(sphere);
        ball = true;
      }
    }, 5000);

    // init 3d object rotation
    onRenderFcts.push(() => {
      torusKnot.rotation.x += 0.02;
      torusKnot.rotation.y += 0.02;
      sphere.rotation.x -= 0.02;
      sphere.rotation.y -= 0.02;
      // details.position.y = 5 + 3 * Math.sin(1.2 * pulse);
    });

    // render the scene
    onRenderFcts.push(function() {
      renderer.render(scene, camera);
    });

    // run the animation loop
    let lastTimeMsec = null;

    function animate(nowMsec) {
      // keep looping
      requestAnimationFrame(animate);
      // measure time
      lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
      const deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
      lastTimeMsec = nowMsec;
      // const pulse = Date.now() * 0.0009;

      // call each update function
      onRenderFcts.forEach(function(onRenderFct) {
        onRenderFct(deltaMsec / 1000, nowMsec / 1000);
      });
    }
    animate();
  }
  componentWillUnmount() {
    this.renderer.dispose();
  }

  render() {
    return <canvas id="camera" />;
  }
}
