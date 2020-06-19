# page-builder

这是一个页面构建平台demo，通过在平台上进行相关组件的选择，即可构建出想要的页面。


## 运行项目

```
npm install  //安装依赖

npm run package  //对组件打包，使预览功能能正常使用

npm start  //启动服务
```

## 注意事项

该项目以展示思路为主，只有打包和预览部分运用了node吗，并未使用数据库，项目列表等其它部分的数据均保存在``localStorage``与``sessionStorage``中。

## 实现思路


### 页面数据结构介绍

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

