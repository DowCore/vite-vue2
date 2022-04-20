import Guides from '@scena/guides'
import { useEventListener } from '@vueuse/core'
interface Ruler {
  size: number
  width: number
  height: number
  horizontal: HTMLElement
  vertical: HTMLElement
  zoom: {
    x: number
    y: number
  }
  unit?: number
  backgroundColor?: string
  lineColor?: string
}
export function useRuler(ruler: Ruler) {
  const horizontal = new Guides(
    ruler.horizontal,
    {
      type: 'horizontal',
      rulerStyle: { left: `${ruler.size}px`, width: 'calc(100% - 30px)', height: '100%' },
      lockGuides: true,
      zoom: ruler.zoom.x,
      unit: ruler.unit || 100,
      backgroundColor: ruler.backgroundColor ?? '#5cadff',
      lineColor: ruler.lineColor ?? '#fff',
      range: [0, ruler.width],
    },
  )
  const vertical = new Guides(
    ruler.vertical,
    {
      type: 'vertical',
      rulerStyle: { height: '100%', width: '100%' },
      lockGuides: true,
      zoom: ruler.zoom.y,
      unit: ruler.unit || 100,
      backgroundColor: ruler.backgroundColor ?? '#5cadff',
      lineColor: ruler.lineColor ?? '#fff',
      range: [0, ruler.height],
    },
  )
  const reset = () => {
    horizontal.scroll(0)
    vertical.scroll(0)
  }
  useEventListener(window, 'resize', () => {
    reset()
    horizontal.resize()
    vertical.resize()
  })
  onUnmounted(() => {
    horizontal.destroy()
  })
  const resize = (width: number, height: number, zoomX: number, zoomY: number) => {
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
  }
}
