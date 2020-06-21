# page-builder

这是一个页面构建平台demo，通过在平台上进行相关组件的选择，即可构建出想要的页面。

[demo点这里(服务器是最垃圾的，撑不太住较多人……)](https://cqmfe.club/page-builder/home)


## 运行项目

```
npm install  //安装依赖

npm run package  //对组件打包，使预览功能能正常使用

npm start  //启动服务
```

## 注意事项

该项目以展示思路为主，只有打包和预览部分运用了node吗，并未使用数据库，项目列表等其它部分的数据均保存在``localStorage``与``sessionStorage``中。

## 项目目录

src/client 下基本为页面生成平台的客户端部分，内部包含了页面平台web端操作的流程代码。

src/component-list 下为你所编写可添加到页面上的组件，也包括了一些开发组件的公共函数。

以article组件为例，在src/component-list/article下可以看到三个文件夹和两个文件。

src/component-list/article/client目录下编写的文件是显示在操作平台上的组件，并不是实际打包生成的组件。

src/component-list/article/tool目录下编写的文件是用于编辑自定义组件中数据的一个操作面板。

src/component-list/article/server目录下编写的文件是实际打包生成到页面上的组件代码。

src/component-list/article/defaultValue是组件中默认填充的数值

src/component-list/article/index是一个单纯的入口文件

其它组件的目录结构也同理。

---

src/server 中存放的是项目服务端的代码

src/server/app 中存放的是服务端的一些接口代码

src/server/createFile.js 根据客户端上传的页面状态json，动态生成React.js文件的逻辑代码

src/server/createPreview.js 用来创建预览的.html文件的逻辑代码

src/server/package-webpack-plugin.js 单独对src/component-list/**/server/index中文件打包的脚本，预览功能需要先单独对这些组件进行一次打包才可正常使用

src/server/webpack-dynamic.js 一个webpack配置文件，对createFile.js文件生成的js代码进行打包

src/server下动态生成的目录

src/server/build-page/ 存放最终打包完成生成的文件和压缩包

src/server/page-file/ 存放createFile.js文件生成的React.js代码

src/server/preview-page/ 存放createPreview文件生成的可供预览的``.html``文件


## 实现思路

### 页面数据结构和打包原理介绍

当前项目中所包含的页面以及页面中的组件和组件中的状态，均以json格式存在redux store当中。数据结构大致如下：

```
[
  {
    id: "519a2c84-d7db-4127-aac9-a0e5a101e9a7",
    path: "index",
    title: "首页",
    componentList: [
      {
        id: "7eeedba8-5e7c-4b14-b42f-81ff2c6be414",
        type: "banner",
        props: {
          bannerList: [
            ...滚动项的属性
          ],
          height: 200
        }
      },
      {
        id: "a86cec25-6db8-44e0-b60e-fbde838227b2",
        type: "text",
        props: {
          content: "这是一段文本"
        }
      }
    ]
  },
  {
    id: "662776d3-14d5-46e7-b258-9a6bd0d2e1df",
    path: "child",
    title: "子页面",
    componentList: [
      {
        id: "",
        type: "paragraph",
        props: {
          content: "<p>这是一段p标签中的文本</p>",
          title: "段落标题"
        }
      }
    ]
  }
]
```

数组中的每一个对象都代表了一个页面，页面项中的componentList属性则是该页面中所存在的数组。

对页面的新增和修改操作，均是对以上数据结构进行编辑和操作。

当点击提交时，会将这个json发送至服务端，服务端会使用Node的writeFile API来生成React.js文件(如页面有多个，则生成对个js文件)。生成的文件示例如下：

```
//引入React相关依赖包
import React from 'react'
import ReactDOM from 'react-dom'
//引入开发好的页面组件
import {BannerServer as Banner} from '@/component-list/banner'
import {ParagraphServer as Paragraph} from '@/component-list/paragraph'
//.....

const list = [...接收到的json数据]
document.title = 'xxx'

//根据type选择渲染不同的组件
const componentMap = {
  'banner': (item) => <Banner key={item.key} {...item.props} />,
  'paragraph': (item) => <Paragraph key={item.key} {...item.props} />,
  ...
}

function App() {
  return (
    <div style={{overflow: 'hidden'}}>
      {
        list.map((item) => {
          return componentMap[item.type](item)
        })
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
```

在React.js文件生成完成后，会运行一个webpack脚本对这些文件进行打包，之后就能够生成能够直接打开展示的结果页面。

### 预览功能

上文已经简要描述了打包生成实际页面的流程，那么预览功能相比于实际打包，又有什么区别呢？

相比于打包，预览需要能够在更短的时间将页面呈现给使用者。如果按照打包的思路，那么用户等待的实际会过长，所以我们需要换一种思路来实现这一功能。

首先在上线部署前，我们需要将我们编写好的组件进行一次单独的打包，在本项目中对应运行``npm run package``。打包完成后，组件如果未发生变化，是不需要进行重新执行该命令的。

在实际操作中，当用户点击预览功能后，也会将页面状态的json发送至服务端。
服务端会调用Node的writeFile API生成``.html``文件。

**注意这边是不去执行webpack的脚本的，生成的只有html文件**

为了使生成的html文件能方便快捷地展示出我们打包好的React组件，我们需要对html文件用一些比较古老的方式来引入React和Babel——使用script标签引入……因为预览页其实只是起一个参考的用处，所以有稍大一点的外部包引入体积亦或是稍慢几十或者百来毫秒的加载速度损失并不致命。

最终我们生成的html文件大概是如下的格式：

```
<html>
  ...
  <!--引入React和Babel-->
  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.0.0-beta.3/babel.min.js"></script>
  <!--引入之前打包好的组件-->
  <script src="/preview/package/MyComponent.common.js"></script>
  <script src="/preview/package/MyComponent.article.js"></script>
  <script src="/preview/package/MyComponent.banner.js"></script>
  ...

  <body>
    <div id="app"></div>
    <script type="text/babel">
      //打包好的组件会被挂载在MyComponent这一全局对象上
      const componentMap = {
        'banner': (item) => <MyComponent.banner.default key={item.key} {...item.props} />,
        'article': (item) => <MyComponent.article.default key={item.key} {...item.props} />,
        ...更多组件
      }

      function App() {
        return (
          <div>
            {
              /*代表一个banner组件*/
              componentMap["banner"]({
                "type": "banner",
                "key": "xxx",
                "props": {...组件展示内容}
              })
            }
            {
              /*代表一个article组件*/
              componentMap["article"]({
                "type": "article",
                "key": "xxxxx",
                "props": {...组件展示内容}
              })
            }
          </div>
        )
      }

      ReactDOM.render(
        <App />,
        document.getElementById("app")
      )
    </script>
  </body>
</html>
```

也就是说在预览过程中，我们是不执行任何webpack脚本的，ES6和React化代码是在外部引入了React.js和Babel的链接这一环境下执行的，可能会带来一些的性能问题，但这在“预览”这一场景下并不算致命，而且这种做法只需要node执行一个生成文件的api，执行速度非常快，的确达到了迅速反馈用户的这一要求。