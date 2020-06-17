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

当前项目中所包含的页面以及页面中的组件和组件中的状态，均以json格式存在redux store当中。数据结构大致如下：

```
{

}
```
