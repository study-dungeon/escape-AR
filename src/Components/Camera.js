import React, { Component } from 'react';
import { initializeArToolkit } from '../utils/arToolkit';

export default class Camera extends Component {
  constructor() {
    super();
    this.state = {
      m1: false,
      m2: false,
    };
  }

  componentDidMount() {
    // init webGL renderer with canvas element
    const renderer = (this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas: this.canvas,
    }));
    renderer.setClearColor(new THREE.Color('lightgrey'), 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

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

    const marker = new ArMarkerControls(arToolkitContext, markerRoot, {
      type: 'pattern',
      patternUrl: '../../assets/patt.hiro',
    });

    const marker2 = new ArMarkerControls(arToolkitContext, markerRoot, {
      type: 'pattern',
      patternUrl: '../../assets/arjs.hiro',
    });

    // init 3d sphere & torusKnot
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1, 0.2, 30, 16),
      new THREE.MeshStandardMaterial({
        color: 0xff0051,
        wireframe: true,
      })
    );
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 8, 8),
      new THREE.MeshNormalMaterial()
    );
    sphere.material.shading = THREE.FlatShading;

    //marker found event listener
    marker.addEventListener('../../assets/patt.hiro', () => {
      if (!this.state.m1) {
        console.log('m1found');
        markerRoot.add(sphere);
        this.setState({ m1: true });
        setTimeout(function() {
          console.log('m1removed');
          markerRoot.remove(sphere);
          this.setState({ m1: false });
        }, 1000);
      }
    });
    marker2.addEventListener('../../assets/arjs.hiro', () => {
      if (!this.state.m2) {
        console.log('m2found');
        markerRoot.add(torusKnot);
        this.setState({ m2: true });
        setTimeout(function() {
          console.log('m2removed');
          markerRoot.remove(torusKnot);
          this.setState({ m2: false });
        }, 1000);
      }
    });

    // init 3d object rotation
    onRenderFcts.push(() => {
      torusKnot.rotation.x += 0.02;
      torusKnot.rotation.y += 0.02;
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
