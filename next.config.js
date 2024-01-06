/** @type {import('next').NextConfig} */
const nextConfig = {
  // * below is to combat Avatar not displaying
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'referrer-policy',
  //           value: 'no-referrer',
  //         },
  //       ],
  //     },
  //   ]
  // },
}

module.exports = nextConfig
