import './App.css';

import Typewriter from 'typewriter-effect';
import { useEffect } from 'react';

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function App() {

  useEffect(()=> {

    const renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#me"), antialias: true});
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100)
    camera.position.set(.5,1.5,1.5)
    camera.lookAt(0,1,0)
    scene.add(camera)
    
    const ambient = new THREE.AmbientLight(0xffffff, 2); // 2
    scene.add(ambient)

    const light2 = new THREE.PointLight(0xFFffff, 4, 10);
    light2.position.set(5, 5, 5);
    scene.add(light2);

    const gltfLoader = new GLTFLoader()
    
    var mixer;
    gltfLoader.load(
        'mewaving.glb',
        (gltf) => {
            mixer = new THREE.AnimationMixer(gltf.scene);
            const clip = mixer.clipAction(gltf.animations[0]);
            clip.play();
            scene.add(gltf.scene);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )
    
    function animate() {
        if (mixer != undefined) {
          mixer.update(1/60);
        }
        
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }
    
    window.addEventListener('resize', resizeCanvasToDisplaySize, false)
    function resizeCanvasToDisplaySize() {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width ||canvas.height !== height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    }

    resizeCanvasToDisplaySize()
    animate()
  });

  return (
    <>
      <div id="bkg">
        <div id="welcome">
          <div id="welcome-content">
            <h1>Joshua Fink</h1>
            <h2><Typewriter options={{
              strings: [
                'Software Engineer', 
                'International Entrepeneur',
                'Consultant',
                'Instructor',
                'University of Michigan Alumnus'
              ],
              autoStart: true,
              loop: true,
              changeDelay: 50,
              changeDeleteSpeed: 50,
            }}/></h2>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <a href="https://joshfink.substack.com/"><p>Blog</p></a>
            <a href="https://github.com/joshua-fink"><p>GitHub</p></a>
            <a href="https://www.linkedin.com/in/joshfinkumich"><p>LinkedIn</p></a>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <p>joshfink@umich.edu</p>
          </div>
        </div>
        <canvas id="me"/>
      </div>
    </>
  );
}

export default App;
