const del = require('del')

del.sync(['./src/server/build-page'])
del.sync(['./src/server/page-file'])
del.sync(['./src/server/preview-page'])