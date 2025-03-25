// import React from 'react';

// const CompletePaletteCollection = () => {
//   const palettes = [
//     {
//       name: "Vibrant Professional",
//       colors: [
//         { name: "Trusted Blue", hex: "#2563EB", usage: "Primary brand color" },
//         { name: "Vibrant Coral", hex: "#FF5757", usage: "Primary CTAs" },
//         { name: "Electric Purple", hex: "#6366F1", usage: "Interactive elements" },
//         { name: "Success Green", hex: "#10B981", usage: "Success states" },
//         { name: "Pure White", hex: "#FFFFFF", usage: "Backgrounds" },
//         { name: "Bright Cyan", hex: "#00D8FF", usage: "Highlights" },
//         { name: "Solar Yellow", hex: "#FFD700", usage: "Attention grabbers" },
//       ],
//     },
//     {
//       name: "Executive Suite",
//       colors: [
//         { name: "Oxford Blue", hex: "#14213D", usage: "Primary elements" },
//         { name: "Gold Accent", hex: "#E6B655", usage: "CTAs" },
//         { name: "Slate Gray", hex: "#3D5A80", usage: "Secondary elements" },
//         { name: "Pearl White", hex: "#F8F9FA", usage: "Backgrounds" },
//         { name: "Charcoal", hex: "#2B2D42", usage: "Text" },
//         { name: "Steel Blue", hex: "#4682B4", usage: "Trust-building elements" },
//         { name: "Emerald Glow", hex: "#50C878", usage: "Growth indicators" },
//       ],
//     },
//     {
//       name: "Digital Impact",
//       colors: [
//         { name: "Gradient Blue", hex: "#0062FF", usage: "Primary brand" },
//         { name: "Living Coral", hex: "#FF6B6B", usage: "CTAs" },
//         { name: "Fresh Mint", hex: "#00D2B5", usage: "Success states" },
//         { name: "Bright Purple", hex: "#6C63FF", usage: "Interactive" },
//         { name: "Snow", hex: "#FFFFFF", usage: "Backgrounds" },
//         { name: "Neon Pink", hex: "#FF1493", usage: "Youthful energy" },
//         { name: "Sky Blue", hex: "#87CEEB", usage: "Trust elements" },
//       ],
//     },
//     {
//       name: "Tech Innovation",
//       colors: [
//         { name: "Royal Purple", hex: "#6B4DE6", usage: "Primary brand" },
//         { name: "Electric Blue", hex: "#4361EE", usage: "Interactive" },
//         { name: "Coral Pink", hex: "#F72585", usage: "CTAs" },
//         { name: "Light Lavender", hex: "#F3F1FF", usage: "Backgrounds" },
//         { name: "Deep Charcoal", hex: "#2B2D42", usage: "Text" },
//         { name: "Cyber Lime", hex: "#DFFF00", usage: "Highlights" },
//         { name: "Aqua Glow", hex: "#7FFFD4", usage: "Energy and balance" },
//       ],
//     },
//     {
//       name: "Dynamic Growth",
//       colors: [
//         { name: "Emerald", hex: "#06D6A0", usage: "Primary brand" },
//         { name: "Blazing Orange", hex: "#FF6B6B", usage: "CTAs" },
//         { name: "Electric Violet", hex: "#7371FC", usage: "Interactive" },
//         { name: "Sunny Yellow", hex: "#FFD93D", usage: "Highlights" },
//         { name: "Arctic White", hex: "#FAFAFA", usage: "Backgrounds" },
//         { name: "Forest Green", hex: "#228B22", usage: "Stability and growth" },
//         { name: "Cherry Red", hex: "#FF0033", usage: "Attention grabbers" },
//       ],
//     },
//     {
//       name: "Modern Fusion",
//       colors: [
//         { name: "Royal Indigo", hex: "#5B5BFF", usage: "Primary elements" },
//         { name: "Sunset Orange", hex: "#FF7557", usage: "CTAs" },
//         { name: "Spring Green", hex: "#12D8A0", usage: "Success" },
//         { name: "Bright Yellow", hex: "#FFD93D", usage: "Achievements" },
//         { name: "Pure White", hex: "#FFFFFF", usage: "Backgrounds" },
//         { name: "Turquoise", hex: "#40E0D0", usage: "Fresh and vibrant" },
//         { name: "Amber Glow", hex: "#FFBF00", usage: "Trustworthy accents" },
//       ],
//     },
//     {
//       name: "Creative Edge",
//       colors: [
//         { name: "Vivid Blue", hex: "#246FFF", usage: "Primary elements" },
//         { name: "Flamingo", hex: "#FF4E63", usage: "CTAs" },
//         { name: "Jade", hex: "#22DDAA", usage: "Progress" },
//         { name: "Royal Purple", hex: "#7B5AFF", usage: "Special states" },
//         { name: "Cloud White", hex: "#F8FAFF", usage: "Backgrounds" },
//         { name: "Candy Pink", hex: "#FFB6C1", usage: "Fun and energetic" },
//         { name: "Ocean Blue", hex: "#1E90FF", usage: "Trust and reliability" },
//       ],
//     },
//   ];

//   return (
//     <div className="w-full max-w-4xl space-y-6 p-6">
//       <h2 className="text-2xl font-bold mb-6">Complete Professional & Energetic Color Systems</h2>
//       {palettes.map((palette) => (
//         <div key={palette.name} className="mb-8 border rounded-lg p-4 shadow-sm">
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold">{palette.name}</h3>
//           </div>
//           <div className="space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//               {palette.colors.map((color) => (
//                 <div
//                   key={color.hex}
//                   className="group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
//                 >
//                   <div className="h-24 w-full" style={{ backgroundColor: color.hex }} />
//                   <div className="p-4 bg-white">
//                     <h3 className="font-semibold text-sm">{color.name}</h3>
//                     <p className="text-xs text-gray-600">{color.hex}</p>
//                     <p className="text-xs text-gray-500 mt-1">{color.usage}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CompletePaletteCollection;



import React from "react";

const CompletePaletteCollection = () => {
  const colors = [
    { name: "Primary", hex: "#1e40af" },
    { name: "Light Blue", hex: "#3b82f6" },
    { name: "Dark Blue", hex: "#1e3a8a" },
    { name: "Sky Blue", hex: "#0ea5e9" },
    { name: "Navy Blue", hex: "#1e293b" },
    { name: "Soft Gray", hex: "#6b7280" },
 
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <h2 className="text-xl font-bold">Colors Related to #1e40af</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {colors.map((color, index) => (
          <div key={index} className="space-y-2 text-center">
            <div
              style={{ backgroundColor: color.hex }}
              className="w-16 h-16 mx-auto rounded shadow-md"
            ></div>
            <div className="text-sm">
              <p>{color.name}</p>
              <p>{color.hex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletePaletteCollection;
