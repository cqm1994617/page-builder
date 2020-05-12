import { defaultValue as bannerDefaultValue } from './banner'
import { defaultValue as paragraphDefaultValue } from './paragraph'
import { defaultValue as textDefaultValue } from './text'

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
  }
]

export default componentList
