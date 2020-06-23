const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')
const uuid = require('uuid')
const glob = require('glob')
const config = require('./config')

function getPageHTML(title, componentList, packageList, cssList) {
  return `
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${
      cssList.map(item => {
        return `<link href="${config.prefix}/preview/package/static/css/${item}" rel="stylesheet">`
      })
    }
    <title>${title}</title>
    <style>
      *{
        margin: 0;
        padding: 0;
      }
      
      #app {
        margin: 100px auto;
        width: 375px;
        height: 667px;
        overflow-y: auto;
        border: 4px solid #ccc;
        border-radius: 10px;
      }
      #app::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      #app::-webkit-scrollbar-track {
        border-radius: 3px;
        background: rgba(0,0,0,0.06);
      }
    
      #app::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: rgba(0,0,0,0.12);
      }
    </style>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.0.0-beta.3/babel.min.js"></script>
    <script src="${config.prefix}/preview/package/MyComponent.common.js"></script>
    ${
      packageList.filter(item => item !== 'MyComponent.common.js').map(item => {
        return `<script src="${config.prefix}/preview/package/${item}"></script>`
      }).join('\n')
    }
  </head>
  
  <body>
    <div id="app"></div>
    <script type="text/babel">
  
      const componentMap = {
        'banner': (item) => <MyComponent.banner.default key={item.key} {...item.props} />,
        'paragraph': (item) => <MyComponent.paragraph.default key={item.key} {...item.props} />,
        'text': (item) => <MyComponent.text.default key={item.key} {...item.props} />,
        'image': (item) => <MyComponent.image.default key={item.key} {...item.props} />,
        'article': (item) => <MyComponent.article.default key={item.key} {...item.props} />,
        'tab': (item) => <MyComponent.tab.default key={item.key} {...item.props} />,
        'blank': (item) => <MyComponent.blank.default key={item.key} {...item.props} />
      }
  
      function App() {
        return <div>
          ${
            componentList.map(item => {
              const data = JSON.stringify(item)
              return `{componentMap["${item.type}"](${data})}`
            }).join('\n')
          }
        </div>
      }
  
      ReactDOM.render(
        <App />,
        document.getElementById('app')
      )
    </script>
  </body>
  
  </html>
  `
}

async function createPreview(list) {

  const folderId = uuid.v4()

  if (!fs.existsSync(path.resolve(__dirname, './preview-page'))) {
    fs.mkdirSync(path.resolve(__dirname, './preview-page'))
  }

  fs.mkdirSync(path.resolve(__dirname, `./preview-page/${folderId}`))

  const packageList = glob.sync(path.resolve(__dirname, './preview-page/package/*.js')).map(item => {
    const pathList = item.split('/')
    return pathList[pathList.length - 1]
  })
  const cssList = glob.sync(path.resolve(__dirname, './preview-page/package/static/css/*.css')).map(item => {
    const pathList = item.split('/')
    return pathList[pathList.length - 1]
  })

  list.forEach(item => {
    fs.writeFileSync(path.resolve(__dirname, `./preview-page/${folderId}/${item.path}.html`), getPageHTML(item.title, item.componentList, packageList, cssList), 'utf8')
  })

  return folderId

}



module.exports = createPreview