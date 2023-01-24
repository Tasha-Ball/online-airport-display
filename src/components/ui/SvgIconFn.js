import { h } from 'vue'

const SVGIcon = (props) => {
  if (props.name) {
    return h(
      'svg',
      {
        class: ['icon', `icon-${props.name}`],
        xmlns: 'http://www.w3.org/2000/svg'
      },
      [
        h('use', {
          href: `#icon-${props.name}`,
          xmlns: 'http://www.w3.org/1999/xlink'
        })
      ]
    )
  }
  return ''
}

SVGIcon.props = {
  name: {
    required: true
  }
}

export default SVGIcon
