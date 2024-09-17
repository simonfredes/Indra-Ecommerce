'use client';
// pages/inicio.tsx
import Carousel from '@/components/Carousel';

export default function Inicio() {
  const images = [
    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
    "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg",
    "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg",
    "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg",
    "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg",
    "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg",
    "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg",
  ];

  return (
    <div className="w-full h-screen flex">
      <Carousel />
      <div className="w-full h-screen bg-gray-100">
        <p className="text-3xl font-bold text-center pt-20">Hola Mundo</p>
      </div>
    </div>

  );
}
