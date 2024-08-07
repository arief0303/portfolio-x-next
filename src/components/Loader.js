import React from 'react';
import { useProgress } from '@react-three/drei';
import { a, useTransition } from '@react-spring/web';

export default function Loader() {
    const { active, progress } = useProgress();
    const transition = useTransition(active, {
      from: { opacity: 1, progress: 0 },
      leave: { opacity: 0 },
      update: { progress },
    });
    return transition(
      ({ progress, opacity }, active) =>
        active && (
          <>
            <a.div className='loading' style={{ opacity }}>
              <div className='loading-bar-container'>
                <a.div className='loading-bar' style={{ width: progress }}></a.div>
                <div className='text-center text-black'>loading</div>
              </div>
            </a.div>
          </>
        )
    );
  }