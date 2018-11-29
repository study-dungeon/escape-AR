/*global THREE THREEx*/

import React, { Component } from 'react';
import { initializeArToolkit } from '../utils/arToolkit';

export default class Camera extends Component {
  constructor() {
    super();
    this.state = {
      marker_lock: false,
      marker_letter: false,
      marker_clock: false,
      marker_chest: false,
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

    const marker_lock = new ArMarkerControls(arToolkitContext, markerRoot, {
      type: 'pattern',
      patternUrl: '../../assets/marker_lock.hiro',
    });

    const marker_lock2 = new ArMarkerControls(arToolkitContext, markerRoot, {
      type: 'pattern',
      patternUrl: '../../assets/marker_lock2.hiro',
    });

    //const loader = new GLTFLoader();
    const loader = new THREE.GLTFLoader();

    //load models
    loader.load(
      '../../assets/lock/scene.gltf',
      function(gltf) {
        gltf.scene.traverse(function(child) {
          if (child.isMesh) {
            child.position.z = -1;
            child.scale.x = 0.03;
            child.scale.y = 0.03;
            child.scale.z = 0.03;
            window.lock = child;
          }
        });
      },
      console.log('loading..'),
      e => console.error(e)
    );

    loader.load(
      '../../assets/lock2/scene.gltf',
      function(gltf) {
        gltf.scene.traverse(function(child) {
          if (child.isMesh) {
            child.position.z = -1;
            child.scale.x = 0.25;
            child.scale.y = 0.25;
            child.scale.z = 0.25;
            window.lock2 = child;
          }
        });
      },
      console.log('loading..'),
      e => console.error(e)
    );

    //throttling function to handle multi-markerFound
    function throttled(delay, fn) {
      let lastCall = 0;
      return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return fn(...args);
      };
    }

    //multi-marker handling
    marker_lock.addEventListener(
      'marker_lock',
      throttled(3000, () => {
        if (!this.state.marker_lock) {
          console.log('lock found');
          this.setState({ marker_lock: true });
          markerRoot.add(lock);
          setTimeout(() => {
            console.log('lock removed');
            markerRoot.remove(lock);
            this.setState({ marker_letter: false });
          }, 3000);
        }
      })
    );

    marker_lock2.addEventListener(
      'marker_lock2',
      throttled(3000, () => {
        if (!this.state.marker_lock) {
          console.log('lock2 found');
          this.setState({ marker_lock: true });
          markerRoot.add(lock2);
          setTimeout(() => {
            console.log('lock2 removed');
            markerRoot.remove(lock2);
            this.setState({ marker_letter: false });
          }, 3000);
        }
      })
    );

    // init 3d object rotation

    onRenderFcts.push(() => {
      lock.rotation.x -= 0.02;
      lock.rotation.y -= 0.02;
      lock2.rotation.x += 0.02;
      lock2.rotation.y += 0.02;
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
