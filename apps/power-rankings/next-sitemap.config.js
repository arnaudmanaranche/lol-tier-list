/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lol-power-ranking.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml', '/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://lol-power-ranking.vercel.app/server-sitemap-index.xml',
      'https://lol-power-ranking.vercel.app/server-sitemap.xml'
    ]
  }
}
