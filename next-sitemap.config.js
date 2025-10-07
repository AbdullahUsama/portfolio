/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://abdullahusama.site',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  additionalPaths: async (config) => [
    await config.transform(config, '/#about'),
    await config.transform(config, '/#experience'),
    await config.transform(config, '/#projects'),
    await config.transform(config, '/#skills'),
    await config.transform(config, '/#contact'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/#about',
      },
      {
        userAgent: '*',
        allow: '/#experience',
      },
      {
        userAgent: '*',
        allow: '/#projects',
      },
      {
        userAgent: '*',
        allow: '/#skills',
      },
      {
        userAgent: '*',
        allow: '/#contact',
      },
      {
        userAgent: '*',
        allow: '/Abdullah_Usama_CV.pdf',
      },
    ],
    additionalSitemaps: [
      'https://abdullahusama.site/sitemap.xml',
    ],
  },
}