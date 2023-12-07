import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Logo = () => {
  const logoRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      logoRef.current.clientWidth / logoRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(logoRef.current.clientWidth, logoRef.current.clientHeight);
    logoRef.current.appendChild(renderer.domElement);

    const mtlLoader = new MTLLoader();
    mtlLoader.load("/spider.mtl", (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load("/spider.obj", (object) => {
        scene.add(object);
        object.position.set(0, 0, 0);
        object.scale.set(0.1, 0.1, 0.1);
        camera.position.z = 5;
      });
    });

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (logoRef.current) {
        logoRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={logoRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default Logo;
