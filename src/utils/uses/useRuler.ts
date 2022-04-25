import Guides from '@scena/guides'
import { useEventListener } from '@vueuse/core'
import Gesto from 'gesto'
import { debounce } from 'lodash'
interface Ruler {
  size: number
  width: number
  height: number
  horizontal: HTMLElement
  vertical: HTMLElement
  zoom: number
  unit?: number
  backgroundColor?: string
  lineColor?: string
}
function createRuler(ruler: Ruler) {
  const horizontal = new Guides(ruler.horizontal, {
    type: 'horizontal',
    rulerStyle: {
      left: `${ruler.size}px`,
      width: 'calc(100% - 30px)',
      height: `${ruler.size}px`,
    },
    lockGuides: true,
    zoom: ruler.zoom,
    unit: ruler.unit || 100,
    backgroundColor: ruler.backgroundColor ?? '#5cadff',
    lineColor: ruler.lineColor ?? '#fff',
    range: [0, ruler.width],
  })
  const vertical = new Guides(ruler.vertical, {
    type: 'vertical',
    rulerStyle: { height: '100%', width: `${ruler.size}px` },
    lockGuides: true,
    zoom: 1,
    unit: ruler.unit || 100,
    backgroundColor: ruler.backgroundColor ?? '#5cadff',
    lineColor: ruler.lineColor ?? '#fff',
    range: [0, ruler.height],
  })
  const reset = () => {
    horizontal.scroll(0)
    vertical.scroll(0)
  }
  useEventListener(window, 'resize', () => {
    reset()
    horizontal.resize()
    vertical.resize()
  })
  const resize = (
    width: number,
    height: number,
    zoomX: number,
    zoomY: number,
  ) => {
    horizontal.setState({ range: [0, width], zoom: zoomX })
    vertical.setState({ range: [0, height], zoom: zoomY })
  }
  const scroll = (x: number, y: number) => {
    horizontal.scroll(x)
    horizontal.scrollGuides(x)
    vertical.scroll(y)
  }
  return {
    reset,
    scroll,
    resize,
    horizontal,
    vertical,
  }
}

export default function useRuler(
  horizontal: HTMLElement,
  vertical: HTMLElement,
  container: HTMLElement,
  content: HTMLElement,
  designWidth = 1920,
  designHeight = 1080,
) {
  let _designWidth = designWidth
  let _rulerHeight = designHeight
  let _scrollX = 0
  let _scrollY = 0
  let _scrollWidth = 0
  let _scrollHeight = 0
  let _scrollZoomX = 1
  let _zoomX = 1
  const scrollTo = debounce((element: HTMLElement, x: number, y: number) => {
    element.scrollTo(x, y)
  }, 50)
  useEventListener(container, 'mousewheel', (e) => {
    e.preventDefault()
  })
  const init = () => {
    _scrollWidth = content.scrollWidth
    _scrollHeight = content.scrollHeight
    _rulerHeight = container.offsetHeight
    _zoomX = container.offsetWidth / _designWidth
    if (_scrollWidth > _designWidth) {
      _scrollZoomX =
        (container.scrollWidth - container.offsetWidth) / (_scrollWidth - _designWidth)
    }
  }
  init()
  const ruler = createRuler({
    size: 30,
    width: _designWidth,
    height: _rulerHeight,
    horizontal,
    vertical,
    zoom: _zoomX,
  })
  useEventListener(window, 'resize', () => {
    init()
  })
  new Gesto(document.querySelector('.ruler__horizontal') as HTMLElement).on(
    'drag',
    (e) => {
      _scrollX += e.deltaX / _zoomX
      if (_scrollWidth > _designWidth) {
        if (e.deltaX > 0) {
          _scrollX = Math.min(_scrollX, _scrollWidth - _designWidth)
          if (_scrollX > _scrollWidth - _designWidth) {
            _scrollX = _scrollWidth - _designWidth
          }
        }
        else {
          _scrollX = Math.min(_scrollX, 0)
          if (_scrollX < 0) {
            _scrollX = 0
          }
        }
      }
      else {
        _scrollX = 0
      }
      ruler.scroll(_scrollX, _scrollY)
      scrollTo(container, _scrollX * _scrollZoomX, _scrollY)
    },
  )
  new Gesto(document.querySelector('.ruler__vertical') as HTMLElement).on(
    'drag',
    (e) => {
      _scrollY += e.deltaY
      if (_scrollHeight > _rulerHeight) {
        // 向上
        if (e.deltaY < 0) {
          _scrollY = Math.min(_scrollY, 0)
          if (_scrollY < 0) {
            _scrollY = 0
          }
        }
        else {
          _scrollY = Math.min(_scrollY, _scrollHeight - _rulerHeight)
          if (_scrollY > _scrollHeight - _rulerHeight) {
            _scrollY = _scrollHeight - _rulerHeight
          }
        }
      }
      else {
        _scrollY = 0
      }
      ruler.scroll(_scrollX, _scrollY)
      scrollTo(container, _scrollX * _scrollZoomX, _scrollY)
    },
  )
  const resetDesign = (designWidth: number, designHeight: number) => {
    _designWidth = designWidth
    _designWidth = designHeight
    ruler.reset()
  }
  const destroyed = () => {
    ruler.horizontal.destroy()
    ruler.vertical.destroy()
  }
  return {
    resetDesign,
    destroyed,
  }
}
