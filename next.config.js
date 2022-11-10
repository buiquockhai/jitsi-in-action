const withPlugins = require('next-compose-plugins');

const withImages = require('next-images')({
  images: {
    domains: [
      'api.droppii.com',
      'apistg.droppii.com',
      'cerebriti.b-cdn.net',
      'www.w3schools.com',
      'cdn.yeudulich.com',
      'salt.tikicdn.com',
      'img.icons8.com',
    ],
    minimumCacheTTL: 3650000,
  },
});

const nextConfig = {
  experimental: { esmExternals: true },
  devIndicators: {
    autoPrerender: false,
  },
};

module.exports = withPlugins([withImages], nextConfig);
