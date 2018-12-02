/*global THREE THREEx*/

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Sound from 'react-sound';
import { Link } from 'react-router-dom';
import { initializeArToolkit } from '../utils/arToolkit';
import moment from 'moment';
import Escaped from './Escaped';
import Inventory from './Inventory';
import Stopwatch from './Stopwatch';
import Lock from './Lock';
import Clock from './Clock';

export default class Camera extends Component {
  constructor() {
    super();
    this.state = {
      startTime: moment(),
      // marker_[item] field determine if call-to-action buttons show
      lock: false,
      clock: false,
      letter: false,
      door: false,
      codeAnswer: '1234',
      hasKey: false,
      hasLetter: false,
      hasNote: false,
      hasLockPick: false,
      hasBrokenLockPick: false,
      showLock: false,
      showClock: false,
      playBangingSound: false,
      playKnockingSound: false,
      bang: false,
      playCreakingSound: false,
      alreadyLookedBehindClock: false
    };
    this.removeCamera = this.removeCamera.bind(this);
    this.lookBehindClock = this.lookBehindClock.bind(this);
    this.useLockPick = this.useLockPick.bind(this);
    this.bangDoor = this.bangDoor.bind(this);
    this.receiveKey = this.receiveKey.bind(this);
    this.testing = this.testing.bind(this);
    this.stopPlayingKnockingSound = this.stopPlayingKnockingSound.bind(this);
    this.stopPlayingBangingSound = this.stopPlayingBangingSound.bind(this);
    this.stopPlayingCreakingSound = this.stopPlayingCreakingSound.bind(this);
    this.openDoor = this.openDoor.bind(this);
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

    // init camera//
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

    // load custom markers
    const mLock = new ArMarkerControls(arToolkitContext, markerRoot, {
      type: 'pattern',
      patternUrl: '../../assets/mCrown.hiro',
    });
    const mClock = new ArMarkerControls(arToolkitContext, markerRoot, {
      type: 'pattern',
      patternUrl: '../../assets/mMoon.hiro',
    });
    const mLetter = new ArMarkerControls(arToolkitContext, markerRoot, {
      type: 'pattern',
      patternUrl: '../../assets/mRadioactive.hiro',
    });
    const mDoor = new ArMarkerControls(arToolkitContext, markerRoot, {
      type: 'pattern',
      patternUrl: '../../assets/mSatellite.hiro',
    });

    // load .. loaders?
    const loader = new THREE.GLTFLoader();

    // load lock
    loader.load(
      '../../assets/lock1/scene.gltf',
      function(gltf) {
        gltf.scene.traverse(function(lock) {
          if (lock.isMesh) {
            lock.position.z = -1;
            lock.scale.x = 0.05;
            lock.scale.y = 0.05;
            lock.scale.z = 0.05;
            window.lock = lock;
          }
        });
        onRenderFcts.push(() => {
          lock.rotation.x -= 0.02;
          lock.rotation.y -= 0.02;
        });
        console.log('lock loaded.');
      },
      console.log('lock loading..'),
      e => console.error(e)
    );

    // load clock
    loader.load(
      '../../assets/clock/scene.gltf',
      function(gltf) {
        window.clockArr = [];
        gltf.scene.traverse(function(clock) {
          if (clock.isMesh) {
            clock.scale.x = 3;
            clock.scale.y = 3;
            clock.scale.z = -3;
            window.clockArr.push(clock);
          }
        });
        onRenderFcts.push(() => {
          window.clockArr.map(clock => {
            clock.rotation.x = -Math.PI / 2;
          });
        });
        console.log('clock loaded.');
      },
      console.log('clock loading..'),
      e => console.error(e)
    );

    // load letter
    loader.load(
      '../../assets/letter2/scene.gltf',
      function(gltf) {
        gltf.scene.traverse(function(letter) {
          if (letter.isMesh) {
            letter.scale.x = 15;
            letter.scale.y = 15;
            letter.scale.z = 15;
            window.letter = letter;
          }
        });
        onRenderFcts.push(() => {
          letter.rotation.x = -Math.PI / 2;
        });
        console.log('letter loaded.');
      },
      console.log('letter oading..'),
      e => console.error(e)
    );

    // load door
    loader.load(
      '../../assets/chest/scene.gltf',
      function(gltf) {
        window.doorArr = [];
        gltf.scene.traverse(function(door) {
          if (door.isMesh) {
            door.scale.x = 3;
            door.scale.y = 3;
            door.scale.z = 3;
            window.doorArr.push(door);
          }
        });
        onRenderFcts.push(() => {
          window.doorArr.map(door => {
            door.rotation.x = -Math.PI / 2;
            door.rotation.y = Math.PI;
          });
        });
        console.log('door loaded.');
      },
      console.log('door loading..'),
      e => console.error(e)
    );

    // throttling function to handle frequent event firing
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

    // toggle display lock
    mLock.addEventListener(
      'mCrown',
      throttled(500, () => {
        if (!this.state.lock) {
          console.log('lock found');
          this.setState({ lock: true });
          markerRoot.add(lock);
          setTimeout(() => {
            console.log('lock removed');
            markerRoot.remove(lock);
            this.setState({ lock: false });
          }, 3000);
        }
      })
    );

    // toggle display clock
    mClock.addEventListener(
      'mMoon',
      throttled(500, () => {
        if (!this.state.clock) {
          console.log('clock found');
          this.setState({ clock: true });
          window.clockArr.map(m => markerRoot.add(m));
          setTimeout(() => {
            console.log('clock removed');
            window.clockArr.map(m => markerRoot.remove(m));
            this.setState({ clock: false });
          }, 3000);
        }
      })
    );

    // toggle display letter
    mLetter.addEventListener(
      'mRadioactive',
      throttled(500, () => {
        if (!this.state.letter) {
          console.log('letter found');
          this.setState({ letter: true });
          markerRoot.add(letter);
          setTimeout(() => {
            console.log('clock removed');
            markerRoot.remove(letter);
            this.setState({ letter: false });
          }, 3000);
        }
      })
    );

    // toggle display door
    mDoor.addEventListener(
      'mSatellite',
      throttled(500, () => {
        if (!this.state.door) {
          console.log('door found');
          this.setState({ door: true });
          window.doorArr.map(m => markerRoot.add(m));
          setTimeout(() => {
            console.log('door removed');
            window.doorArr.map(m => markerRoot.remove(m));
            this.setState({ door: false });
          }, 3000);
        }
      })
    );

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

  removeCamera() {
    let videoSource = document.getElementById('videoSource');
    videoSource.hidden = true;
    videoSource.remove();
  }

  lookBehindClock() {
    this.setState({ playCreakingSound: true });
    if (this.state.hasKey) {
      return alert('hmm, nothing there');
    } else {
      alert(
        "You move the clock away from the wall and find an old lock pick. It could be useful, but it's not in great shape..."
      );
      this.setState({ hasLockPick: true });
    }
  }

  useLockPick() {
    if (this.state.hasBrokenLockPick) {
      return alert(
        'You desperately try to pick the lock again. Moments pass and it dawns on you --- you have no idea how to pick locks. Especially with a broken pick.'
      );
    } else {
      alert(
        'You bend down and carefully insert the lockpick into the keyhole. A careful turn left, a small jiggle right. Did I just hear a click? Pushing a bit harder then suddenly - snap - the lock pick breaks, oh no!'
      );
      this.setState({ hasLockPick: false, hasBrokenLockPick: true });
    }
  }

  bangDoor() {
    if (this.state.bang) {
      alert(
        'you bang again, this time even louder! silence, bitter silence. Lets keep looking around.'
      );
      this.setState({ playBangingSound: true });
    } else {
      alert(
        `Brute force has worked before - why not now? You raised your fists and begin knocking on the door. A small folded note slips out from the crack in the hinge. It reads: "This is a red herring."`
      );
      this.setState({ hasNote: true, playKnockingSound: true, bang: true });
    }
  }

  receiveKey() {
    this.setState({
      hasKey: true
    });
  }

  testing() {
    this.setState({
      clock: true,
      lock: true,
      door: true,
      letter: true
    })
  }

  stopPlayingKnockingSound(){
    this.setState({
      playKnockingSound: false
    });
  }

  stopPlayingBangingSound(){
    this.setState({
      playBangingSound: false
    });
  }

  stopPlayingCreakingSound(){
    this.setState({
      playCreakingSound: false
    });
  }

  openDoor(){
    if(this.state.hasKey){
      return <Escaped startTime={this.state.startTime} endTime={moment()} />
    } else {
      alert('You need a key!')
    }
  }

  render() {
    const {
      lock,
      clock,
      letter,
      door,
      hasKey,
      hasLetter,
      hasNote,
      hasLockPick,
      hasBrokenLockPick,
      startTime,
      showLock,
      showClock
    } = this.state;

    return (
      <div className="button-grid-container">
        <div className="button-grid-item">
          {clock && (
            <div>
              <button className="welcome-btn" onClick={() => this.setState({ showClock: true })}>Check the time</button>
              <button className="welcome-btn" onClick={this.lookBehindClock}>
                Look behind clock
              </button>
            </div>
          )}
          {showClock && (
            <Clock />
          )}
          {letter && (
            <Link to="/room/letter">
              <button
                className="welcome-btn"
                onClick={() => this.setState({ hasLetter: true })}
              >
                Read me
              </button>
            </Link>
          )}
          {lock && (
            <button
              className="welcome-btn"
              onClick={() => this.setState({ showLock: true })}
            >
              Unlock Me
            </button>
          )}
          {showLock && (
            <Lock receiveKey={this.receiveKey} />
          )}
          {door && (
            <div>
              <button
                className="welcome-btn"
                onClick={() => {
                  this.openDoor();
                  this.removeCamera();
                }}
              >
                {hasKey ? 'Use the key' : 'Open the door'}
              </button>
                
              <button className="welcome-btn" onClick={this.bangDoor}>
                {this.state.playKnockingSound && (
                    <Sound
                      url={'knocking.mp3'}
                      playStatus={Sound.status.PLAYING}
                      onFinishedPlaying={this.stopPlayingKnockingSound}
                    />
                  )}
                  {this.state.playBangingSound && (
                    <Sound
                      url={'banging.mp3'}
                      playStatus={Sound.status.PLAYING}
                      onFinishedPlaying={this.stopPlayingBangingSound}
                    />
                  )}
                  {this.state.playCreakingSound && (
                    <Sound
                      url={'creaking.mp3'}
                      playStatus={Sound.status.PLAYING}
                      onFinishedPlaying={this.stopPlayingCreakingSound}
                    />
                  )}
                {hasNote ? 'Bang louder' : 'Bang against the door'}
              </button>
            </div>
          )}

          {door && hasLockPick && (
            <button className="welcome-btn" onClick={this.useLockPick}>
              Use Lock Pick
            </button>
          )}
        </div>
        <Stopwatch/>
        <Inventory
          hasKey={hasKey}
          hasLetter={hasLetter}
          hasNote={hasNote}
          hasLockPick={hasLockPick}
          hasBrokenLockPick={hasBrokenLockPick}
        />

      
        <button onClick={this.testing}>Testing</button>
      </div>
    );
  }
}


