<template>
  <div ref="root" class="ruler">
    <div class="ruler__horizontal" />
    <div class="flex flex-1 ruler-area">
      <div class="ruler__vertical" />
      <div class="ruler__content flex-1">
        <div :style="style">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Gesto from 'gesto'
import { debounce } from 'lodash'
import { useRuler } from './useRuler'
const _designWidth = 1920
const _designHeight = 1080
let _scrollX = 0
let _scrollY = 0
let _scrollWidth = 0
let _scrollHeight = 0
let _scrollZoomY = 1
const _designChange = useEventBus('page-design-change')
const root = ref<null | Element>(null)
const style = ref<null | object>(null)

onMounted(() => {
  const { offsetWidth: rootWidth, offsetHeight: rootHeight } =
    root.value as HTMLElement
  const zoomX = (rootWidth - 30) / _designWidth
  const zoomY = (rootHeight - 30) / _designHeight
  const ruler = useRuler({
    size: 30,
    width: _designWidth,
    height: _designHeight,
    horizontal: document.querySelector('.ruler__horizontal') as HTMLElement,
    vertical: document.querySelector('.ruler__vertical') as HTMLElement,
    zoom: {
      x: zoomX,
      y: zoomY,
    },
  })
  const box: HTMLElement = document.querySelector(
    '.ruler__content',
  ) as HTMLElement
  const scrollTo = debounce((element: HTMLElement, x: number, y: number) => {
    element.scrollTo(x, y)
  }, 30)
  useEventListener(box, 'mousewheel', (e) => {
    e.preventDefault()
  })
  const init = () => {
    style.value = {
      'transform-origin': 'top left',
      'transform': `scale(${zoomX},${zoomY})`,
    }
    _scrollWidth = box.scrollWidth
    _scrollHeight = box.scrollHeight
    _scrollZoomY =
      (_scrollHeight - box.clientHeight) / (_scrollHeight - _designHeight)
  }
  init()
  useEventListener(window, 'resize', () => {
    init()
  })
  _designChange.on((data: any) => {
    debounce(() => {
      ruler.resize(
        data.width,
        data.height,
        box.clientWidth / data.width,
        box.clientHeight / data.height,
      )
    }, 500)()
  })
  new Gesto(box).on('drag', (e) => {
    _scrollX += e.deltaX
    _scrollY += e.deltaY
    if (e.deltaX > 0) {
      _scrollX = Math.min(_scrollX, _scrollWidth - _designWidth)
      if (_scrollX > _scrollWidth - _designWidth) {
        _scrollX = _scrollWidth - _designWidth
      }
    }
    if (e.clientX < 0) {
      _scrollX = Math.min(_scrollX, 0)
      if (_scrollX < 0) {
        _scrollX = 0
      }
    }
    // 向上
    if (e.deltaY < 0) {
      _scrollY = Math.min(_scrollY, 0)
      if (_scrollY < 0) {
        _scrollY = 0
      }
    }
    if (e.deltaY > 0) {
      _scrollY = Math.min(_scrollY, _scrollHeight - _designHeight)
      if (_scrollY > _scrollHeight - _designHeight) {
        _scrollY = _scrollHeight - _designHeight
      }
    }
    ruler.scroll(_scrollX, _scrollY)
    scrollTo(box, _scrollX, _scrollY * _scrollZoomY)
  })
})
</script>
<style lang="scss" scoped>
.ruler {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__horizontal {
    height: 30px;
  }

  &-area {
    position: relative;
    height: calc(100% - 30px);
  }

  &__vertical {
    width: 30px;
    height: 100%;
  }

  &__content {
    position: relative;
    overflow: auto;
    max-width: calc(100vw - 606px);
    min-width: 1280px;
    min-height: 720px;

    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }
}
</style>
