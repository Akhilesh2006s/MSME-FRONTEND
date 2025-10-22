import React, { useEffect, useState } from 'react';

const PerformanceOptimizer = ({ children }) => {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Detect low-end devices for performance optimization
    const checkDevicePerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setIsLowEndDevice(true);
        return;
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        const isIntegratedGPU = renderer.toLowerCase().includes('intel') || 
                                renderer.toLowerCase().includes('integrated');
        
        setIsLowEndDevice(isIntegratedGPU);
      }

      // Check for low memory devices
      if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        setIsLowEndDevice(true);
      }
    };

    checkDevicePerformance();
  }, []);

  return (
    <div className={isLowEndDevice ? 'performance-mode' : ''}>
      {children}
    </div>
  );
};

export default PerformanceOptimizer;




