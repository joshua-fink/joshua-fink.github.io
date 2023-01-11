import * as THREE from "three";

const canvas = document.querySelector(".webgl")

const scene = new THREE.Scene();

const aspect = window.innerWidth / window.innerHeight
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100)
camera.position.set(50,50,50)
camera.lookAt(0,0,0)
scene.add(camera)


const light2 = new THREE.PointLight(0xFFffff, 5, 200 );
light2.position.set(0, 100, 0);
scene.add( light2 );

const light3 = new THREE.PointLight(0xFFffff, 3, 200 );
light3.position.set(100, 0, 0);
scene.add( light3 );


const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient)

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setClearColor(0x222222)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

let sphereArray = [];

for (var i = 0; i < 500; i++) {
    const geometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshStandardMaterial({ color: 0x00274C })
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(
        Math.random() * 80,
        Math.random() * 80,
        Math.random() * 80,
    );

    sphereArray.push(mesh)
    scene.add(mesh)
}

/*
for (var i = 0; i < 200; i++) {
    var closest = []
    const p1 = sphereArray[i].position.clone();
    for (var j = 0; j < 200; j++) {
        const p2 = sphereArray[j].position.clone();
        if(!(p1==p2)) {

        }
    }
}
*/



renderer.render(scene, camera)

var count = 0
function animate() {
    
    for (var i = 0; i < 200; i++) {
        if (i == count) {
            min = -20
            max = 20
    
            const newPos = sphereArray[i].position.clone();
            
            newPos.x += Math.random() * (max - min) + min;
            newPos.y += Math.random() * (max - min) + min;
            newPos.z += Math.random() * (max - min) + min;
    
            sphereArray[i].position.lerp(newPos, .05)
        }
    }

    count = count + 1
    count = count % 100
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}
    
animate()
