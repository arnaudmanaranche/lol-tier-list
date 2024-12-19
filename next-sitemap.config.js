const WEBSITE_URL = 'https://www.lol-tier-list.com'

const PATHS_TO_EXCLUDE = ['/my-account']

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  exclude: ['/server-sitemap-index.xml'],
  exclude: PATHS_TO_EXCLUDE,
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  siteUrl: WEBSITE_URL,
  robotsTxtOptions: {
    additionalSitemaps: [`${WEBSITE_URL}/server-sitemap.xml`],
    policies: [
      {
        userAgent: '*',
        disallow: PATHS_TO_EXCLUDE
      },
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  }
}
