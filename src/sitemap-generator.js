require('babel-register')({
  presets: ['es2015', 'react'],
});

const router = require('./sitemap-routes').default;
const Sitemap = require('react-router-sitemap').default;
const buildURL = `${process.env.PUBLIC_URL}`;
function generateSitemap() {
  return new Sitemap(router).build(buildURL).save('./public/sitemap.xml');
}

generateSitemap();
