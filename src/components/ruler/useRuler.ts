/*  import Guides from '@scena/guides'
interface Ruler {
  size?: number
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
}
export function useRuler(ruler: Ruler) {
  const horizontal = new Guides(
    ruler.horizontal,
    {
      type: 'horizontal',
      rulerStyle: { left: `${ruler.size}px`, width: 'calc(100% - 30px)', height: '100%' },
      lockGuides: true,
      zoom: ruler.unit,
      unit: ruler.unit || 100,
      backgroundColor: '#5cadff',
      lineColor: '#fff',
      range: [0, props.designWidth],
    }
  )
  const zoomV = ((root?.value as HTMLElement).clientHeight - 30) / designHeight
  const vGuides = new Guides(
    document.querySelector('.ruler__vertical') as HTMLElement,
    {
      type: 'vertical',
      rulerStyle: { height: '100%', width: '100%' },
      lockGuides: true,
      zoom: zoomV,
      backgroundColor: '#5cadff',
      lineColor: '#fff',
      unit: 100,
      range: [0, designHeight],
    }
  )
  const resize = () => {
    hGuides.resize()
    vGuides.resize()
  }
  let scrollX = 0
  let scrollY = 0

  const { scrollWidth, scrollHeight, offsetWidth } = box
  const scrollTo = debounce((element: HTMLElement, x: number, y: number) => {
    element.scrollTo(x, y)
  }, 50)

  window.addEventListener('resize', resize)
  onUnmounted(() => {
    horizontal.destroy()
  })
  const reset = () => {
    scrollX = 0
    scrollY = 0
    vGuides.scroll(0)
    vGuides.scrollGuides(0)
    hGuides.scroll(0)
    hGuides.scrollGuides(0)
    scrollTo(box, 0, 0)
  }
  useEventBus('reset-ruler').on((data) => {
    reset()
  })
} */
