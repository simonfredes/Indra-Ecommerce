/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.daisyui.com',
          port: '',
          pathname: '/images/stock/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  