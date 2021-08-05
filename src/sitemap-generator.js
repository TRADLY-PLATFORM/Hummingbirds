require('babel-register')({
  presets: ['es2015', 'react'],
});
require('custom-env').env('sitemap');
 
const router = require('./sitemap-routes').default;
const Sitemap = require('react-router-sitemap').default;

function generateSitemap() {
  return new Sitemap(router)
    .build(`${process.env.REACT_APP_DOMAIN_URL}`)
    .save('./public/sitemap.xml');
}

generateSitemap();
