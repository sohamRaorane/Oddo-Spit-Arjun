import React from 'react';

const BackgroundDoodles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Base Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#59598E] via-[#6E6E9D] to-[#2a2a4a] opacity-90"></div>

            {/* Large 3D Spheres */}
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#8383AD] to-[#59598E] opacity-40 blur-2xl"></div>
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#59598E] to-[#A3A3C0] opacity-30 blur-3xl"></div>

            {/* Floating Bubbles (Solid with Gradient for 3D effect) */}
            <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-gradient-to-b from-[#A3A3C0] to-[#59598E] opacity-50 shadow-xl backdrop-blur-sm"></div>
            <div className="absolute bottom-1/3 right-10 w-48 h-48 rounded-full bg-gradient-to-t from-[#6E6E9D] to-[#8383AD] opacity-40 shadow-2xl backdrop-blur-md"></div>
            <div className="absolute top-10 left-1/3 w-20 h-20 rounded-full bg-gradient-to-br from-[#D8D8E0] to-[#8383AD] opacity-30"></div>
            
            {/* Outlined Circles */}
            <div className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-[#A3A3C0] rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-20 right-1/3 w-24 h-24 border border-[#D8D8E0] rounded-full opacity-30"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 border-4 border-[#59598E] rounded-full opacity-10"></div>

            {/* Small Scattered Particles */}
            {[...Array(20)].map((_, i) => (
                <div 
                    key={`particle-${i}`}
                    className="absolute rounded-full bg-white opacity-20"
                    style={{
                        width: Math.random() * 10 + 5 + 'px',
                        height: Math.random() * 10 + 5 + 'px',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        animation: `pulse ${Math.random() * 3 + 2}s infinite`
                    }}
                ></div>
            ))}

            {/* Finance Doodles (Subtle Integration) */}
            <svg className="absolute top-20 right-20 w-32 h-32 opacity-20" viewBox="0 0 100 100" fill="none">
                <path d="M10 90 L 30 70 L 50 80 L 90 20" stroke="#D8D8E0" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <svg className="absolute bottom-20 left-20 w-24 h-24 opacity-20" viewBox="0 0 100 100" fill="none">
                <rect x="20" y="40" width="15" height="60" fill="#D8D8E0" />
                <rect x="45" y="20" width="15" height="80" fill="#D8D8E0" />
                <rect x="70" y="50" width="15" height="50" fill="#D8D8E0" />
            </svg>
        </div>
    );
};

export default BackgroundDoodles;
