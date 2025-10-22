import React, { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import './GlobeVisualization.css';

const GlobeVisualization = () => {
  const [globeData, setGlobeData] = useState({
    arcs: [],
    points: []
  });

  useEffect(() => {
    // Andhra Pradesh coordinates (center of the state)
    const andhraPradeshCoords = {
      lat: 15.9129,
      lng: 79.7400
    };

    // Selected 25 global destinations
    const globalDestinations = [
      // Major cities
      { lat: 40.7128, lng: -74.0060, name: 'New York, USA' },
      { lat: 25.2048, lng: 55.2708, name: 'Dubai, UAE' },
      { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
      { lat: 51.5074, lng: -0.1278, name: 'London, UK' },
      { lat: 35.6762, lng: 139.6503, name: 'Tokyo, Japan' },
      { lat: 22.3193, lng: 114.1694, name: 'Hong Kong' },
      { lat: 48.8566, lng: 2.3522, name: 'Paris, France' },
      { lat: 52.5200, lng: 13.4050, name: 'Berlin, Germany' },
      { lat: 37.7749, lng: -122.4194, name: 'San Francisco, USA' },
      { lat: 19.0760, lng: 72.8777, name: 'Mumbai, India' },
      { lat: 12.9716, lng: 77.5946, name: 'Bangalore, India' },
      
      // Additional key destinations
      { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, USA' },
      { lat: 41.8781, lng: -87.6298, name: 'Chicago, USA' },
      { lat: 25.7617, lng: -80.1918, name: 'Miami, USA' },
      { lat: 55.7558, lng: 37.6176, name: 'Moscow, Russia' },
      { lat: 41.9028, lng: 12.4964, name: 'Rome, Italy' },
      { lat: 40.4168, lng: -3.7038, name: 'Madrid, Spain' },
      { lat: 52.3676, lng: 4.9041, name: 'Amsterdam, Netherlands' },
      { lat: 39.9042, lng: 116.4074, name: 'Beijing, China' },
      { lat: 31.2304, lng: 121.4737, name: 'Shanghai, China' },
      { lat: 37.5665, lng: 126.9780, name: 'Seoul, South Korea' },
      { lat: 13.7563, lng: 100.5018, name: 'Bangkok, Thailand' },
      { lat: 3.1390, lng: 101.6869, name: 'Kuala Lumpur, Malaysia' },
      { lat: 24.7136, lng: 46.6753, name: 'Riyadh, Saudi Arabia' },
      { lat: 30.0444, lng: 31.2357, name: 'Cairo, Egypt' },
      { lat: -26.2041, lng: 28.0473, name: 'Johannesburg, South Africa' }
    ];

    // Generate enhanced arcs with colors and properties
    const arcColors = ['#4A90E2', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];
    const arcs = globalDestinations.map((destination, index) => ({
      startLat: andhraPradeshCoords.lat,
      startLng: andhraPradeshCoords.lng,
      endLat: destination.lat,
      endLng: destination.lng,
      color: arcColors[index % arcColors.length],
      stroke: arcColors[index % arcColors.length],
      strokeWidth: 2 + (index % 3)
    }));

    // Generate enhanced connection points
    const pointColors = ['#4A90E2', '#8B5CF6', '#10B981', '#F59E0B'];
    const points = [
      { 
        lat: andhraPradeshCoords.lat, 
        lng: andhraPradeshCoords.lng, 
        size: 12, 
        color: '#4A90E2',
        label: 'Andhra Pradesh'
      },
      ...globalDestinations.map((point, index) => ({
        lat: point.lat,
        lng: point.lng,
        size: 4 + (index % 4),
        color: pointColors[index % pointColors.length],
        label: point.name
      }))
    ];

    setGlobeData({ arcs, points });
  }, []);

  return (
    <div className="globe-container relative w-full h-full">
      {/* Enhanced CSS animations overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="data-flow-overlay">
          {globeData.arcs.slice(0, 15).map((arc, index) => (
            <div
              key={index}
              className="data-flow-enhanced"
              style={{
                animationDelay: `${index * 0.3}s`,
                animationDuration: `${2.5 + (index % 2)}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating particles effect */}
        <div className="floating-particles">
          {[...Array(20)].map((_, index) => (
            <div
              key={index}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <Globe
        width={window.innerWidth}
        height={window.innerHeight}
        backgroundImageUrl={null}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        showAtmosphere={true}
        atmosphereColor="#4A90E2"
        atmosphereAltitude={0.2}
        enablePointerInteraction={true}
        rendererConfig={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        arcsData={globeData.arcs}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        pointsData={globeData.points}
        pointColor="color"
        pointSize="size"
        pointAltitude={0.01}
        pointResolution={6}
        onGlobeReady={(globe) => {
          if (globe) {
            // Set initial camera position to focus on India
            globe.pointOfView({ lat: 20.5937, lng: 78.9629, altitude: 2.2 });
            
            // Auto-rotate the globe slowly
            globe.controls().autoRotate = true;
            globe.controls().autoRotateSpeed = 0.5;
            globe.controls().enableZoom = true;
            globe.controls().enablePan = false;
          }
        }}
      />
      
      {/* Enhanced overlay gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-export-primary/10" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-export-dark via-export-dark/80 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-export-dark to-transparent" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-export-primary/20 to-transparent" />
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-export-primary/20 to-transparent" />
      </div>
    </div>
  );
};

export default GlobeVisualization;
