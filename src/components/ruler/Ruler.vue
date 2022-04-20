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
// import Gesto from 'gesto'
// import { debounce } from 'lodash'

// const designWidth = ref<number>(1920)
// const designHeight = ref<number>(1080)
// const root = ref<null | Element>(null)

const style: any = ref(null)

onMounted(() => {
  const box: HTMLElement = document.querySelector(
    '.ruler__content',
  ) as HTMLElement
  console.log(box)
  /* new Gesto(box).on('drag', (e) => {
    scrollX += e.deltaX
    scrollY += e.deltaY
    if (e.deltaX > 0) {
      hGuides.scroll(Math.min(scrollX, scrollWidth - props.designWidth))
      hGuides.scrollGuides(Math.min(scrollX, scrollWidth - props.designWidth))
      if (scrollX > scrollWidth - props.designWidth) {
        scrollX = scrollWidth - props.designWidth
      }
    } else {
      hGuides.scroll(Math.min(scrollX, 0))
      hGuides.scrollGuides(Math.min(scrollX, 0))
      if (scrollX < 0) {
        scrollX = 0
      }
    }
    // 向上
    if (e.deltaY < 0) {
      vGuides.scroll(Math.min(scrollY, 0))
      vGuides.scrollGuides(Math.min(scrollY, 0))
      if (scrollY < 0) {
        scrollY = 0
      }
    } else {
      vGuides.scroll(Math.min(scrollY, scrollHeight - designHeight))
      vGuides.scrollGuides(Math.min(scrollY, scrollHeight - designHeight))
      console.log(scrollY, scrollHeight, designHeight, '向下')
      if (scrollY > scrollHeight - designHeight) {
        scrollY = scrollHeight - designHeight
      }
    }
    scrollTo(box, scrollX, scrollY)
  })
  const prevent = (e: any) => {
    e.preventDefault()
  }
  box.addEventListener('mousewheel', prevent) */
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
