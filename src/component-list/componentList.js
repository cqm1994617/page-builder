import React from 'react'
import { defaultValue as bannerDefaultValue, BannerClient, ToolPanel as BannerToolPanel } from './banner'
import { defaultValue as paragraphDefaultValue, ParagraphClient, ToolPanel as ParagraphToolPanel } from './paragraph'
import { defaultValue as textDefaultValue, TextClient, ToolPanel as TextToolPanel } from './text'
import { defaultValue as imageDefaultValue, ImageClient, ToolPanel as ImageToolPanel } from './image'
import { defaultValue as articleDefaultValue, ArticleClient, ToolPanel as ArticleToolPanel } from './article'
import { defaultValue as tabDefaultValue, TabClient, ToolPanel as TabToolPanel } from './tab'
import { defaultValue as blankDefaultValue, BlankClient, ToolPanel as BlankToolPanel } from './blank'

const componentList = [
  {
    id: 'BANNER_COMPONENT',
    name: 'Banner',
    children: [
      { ...bannerDefaultValue }
    ]
  },
  {
    id: 'PARAGRAPH_COMPONENT',
    name: '段落',
    children: [
      { ...paragraphDefaultValue }
    ]
  },
  {
    id: 'TEXT_COMPONENT',
    name: '文本',
    children: [
      { ...textDefaultValue }
    ]
  },
  {
    id: 'IMAGE_COMPONENT',
    name: '图片',
    children: [
      { ...imageDefaultValue }
    ]
  },
  {
    id: 'ARTICLE_COMPONENT',
    name: '文章',
    children: [
      { ...articleDefaultValue }
    ]
  },
  {
    id: 'TAB_COMPONENT',
    name: 'TAB',
    children: [
      { ...tabDefaultValue }
    ]
  },
  {
    id: 'BLANK_COMPONENT',
    name: '分隔',
    children: [
      { ...blankDefaultValue }
    ]
  }
]

const componentClientMap = {
  'banner': (props, select) => <BannerClient onClick={select} {...props} />,
  'paragraph': (props, select) => <ParagraphClient onClick={select} {...props} />,
  'text': (props, select) => <TextClient onClick={select} {...props} />,
  'image': (props, select) => <ImageClient onClick={select} {...props} />,
  'article': (props, select) => <ArticleClient onClick={select} {...props} />,
  'tab': (props, select) => <TabClient onClick={select} {...props} />,
  'blank': (props, select) => <BlankClient onClick={select} {...props} />
}

const getPanelMap = (name) => {
  const panelMap = {
    'banner': () => <BannerToolPanel />,
    'paragraph': () => <ParagraphToolPanel />,
    'text': () => <TextToolPanel />,
    'image': () => <ImageToolPanel />,
    'article': () => <ArticleToolPanel />,
    'tab': () => <TabToolPanel />,
    'blank': () => <BlankToolPanel />
  }
  return panelMap[name]
}

export {
  componentList,
  componentClientMap,
  getPanelMap
}
