module.exports = {
  prefix: process.env.NODE_ENV === 'development' ? '' : '/page-builder-server',
  host: process.env.NODE_ENV === 'development' ? 'http://localhost:9090' : 'https://cqmfe.club/page-builder-server'
}