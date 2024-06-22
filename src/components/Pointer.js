import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MarchingCube } from '@react-three/drei'
import { RigidBody, BallCollider } from '@react-three/rapier'

export default function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef();
    const { viewport } = useThree(); // Use useThree to get viewport
    useFrame(({ pointer, viewport }) => {
      const { width, height } = viewport.getCurrentViewport();
      const marginWidth = width * 0.15; // 15% margin on each side for width
      const marginHeight = height * 0.15; // 15% margin on each side for height
  
      // Calculate the effective width and height within the margins
      const effectiveWidth = width - 2 * marginWidth;
      const effectiveHeight = height - 2 * marginHeight;
  
      // Check if the pointer is within the center area with 25% margin on each side
      if (
        pointer.x >= -effectiveWidth / 2 &&
        pointer.x <= effectiveWidth / 2 &&
        pointer.y >= -effectiveHeight / 2 &&
        pointer.y <= effectiveHeight / 2
      ) {
        vec.set(pointer.x * (width / 2), pointer.y * (height / 2), 0);
        if (ref.current) {
          ref.current.setNextKinematicTranslation(vec);
        }
      }
    });
  
    useEffect(() => {
      const handleTouchMove = (event) => {
        // Check if the touch event's target is the canvas
        if (event.target.tagName === 'CANVAS') {
          event.preventDefault(); // Prevent scrolling/zooming on canvas touch
  
          const touch = event.touches[0];
          const { width, height } = viewport.getCurrentViewport();
          const marginWidth = width * 0.15;
          const marginHeight = height * 0.15;
          const effectiveWidth = width - 2 * marginWidth;
          const effectiveHeight = height - 2 * marginHeight;
  
          // Convert touch position to [-1, 1] range, considering margins
          const x = ((touch.clientX / window.innerWidth) * 2 - 1) * (width / effectiveWidth);
          const y = -((touch.clientY / window.innerHeight) * 2 - 1) * (height / effectiveHeight);
  
          // Apply the same margin logic to touch input
          if (
            x >= -effectiveWidth / 2 &&
            x <= effectiveWidth / 2 &&
            y >= -effectiveHeight / 2 &&
            y <= effectiveHeight / 2
          ) {
            vec.set(x * (width / 2), y * (height / 2), 0);
            if (ref.current) {
              ref.current.setNextKinematicTranslation(vec);
            }
          }
        }
      };
  
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
  
      return () => {
        window.removeEventListener('touchmove', handleTouchMove);
      };
    }, []);
  
    return (
      <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
        <MarchingCube strength={0.5} subtract={10} color="orange" />
        <BallCollider args={[0.1]} type="dynamic" />
      </RigidBody>
    );
  }