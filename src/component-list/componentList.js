import { componentItem as bannerItem } from './banner'
import { componentItem as paragraphItem } from './paragraph'

const componentList = [
  {
    id: 'BANNER_COMPONENT',
    name: 'Banner',
    children: [
      { ...bannerItem }
    ]
  },
  {
    id: 'PARAGRAPH_COMPONENT',
    name: '段落',
    children: [
      { ...paragraphItem }
    ]
  }
]

export default componentList
