<template>
  <div class="page-editor">
    <div class="page-editor-tool flex space-x-md">
      <el-tooltip content="预览">
        <icon-carbon-accessibility-color class="page-editor-tool__button" />
      </el-tooltip>
      <el-tooltip content="保存">
        <icon-carbon-save class="page-editor-tool__button" />
      </el-tooltip>
      <el-tooltip content="新增">
        <div
          class="page-editor-tool__button page-editor-tool__button--active"
          @click="onAdd"
        >
          <icon-carbon-bookmark-add />
        </div>
      </el-tooltip>
    </div>
    <div class="flex space-x-md relative">
      <div class="page-editor-sidebar relative">
        <div class="page-editor-sidebar-group">
          <el-button-group>
            <el-button
              size="medium"
              class="page-editor-sidebar-group__button"
              :class="
                activeSiderbar === 'layout'
                  ? 'page-editor-sidebar-group__button--active'
                  : ''
              "
              @click="sidbarChange('layout')"
            >
              布局
            </el-button>
            <el-button
              size="medium"
              class="page-editor-sidebar-group__button"
              :class="
                activeSiderbar === 'component'
                  ? 'page-editor-sidebar-group__button--active'
                  : ''
              "
              @click="sidbarChange('component')"
            >
              组件
            </el-button>
          </el-button-group>
        </div>
        <div class="page-editor-sidebar-layout margin-top--sm flex-1">
          <div v-show="activeSiderbar === 'layout'">
            <div class="margin-bottom--md">
              <div class="panel-title">
                设计大小（单位：px）
              </div>
              <div class="flex">
                <div class="panel-attribute">
                  宽
                </div>
                <div class="panel-value">
                  <el-input-number
                    v-model="designWidth"
                    controls-position="right"
                    :min="1280"
                    :step="80"
                    :max="3840"
                  />
                </div>
              </div>
              <div class="flex">
                <div class="panel-attribute">
                  高
                </div>
                <div class="panel-value">
                  <el-input-number
                    v-model="designHeight"
                    controls-position="right"
                    :min="720"
                    :step="80"
                    :max="2160"
                  />
                </div>
              </div>
            </div>
            <PagePanel
              @background-change="pageBackgroundChange"
              @spacing-change="pageSpacingChange"
              @gap-change="pageGapChange"
            />
          </div>
        </div>
      </div>
      <div class="page-editor-content flex-1">
        <div class="ruler">
          <div class="ruler__horizontal relative" />
          <div class="flex flex-1 ruler-area">
            <div class="ruler__vertical" />
            <div class="ruler__content flex-1">
              <div :style="rulerStyle" class="relative">
                <draggable
                  :list="rows"
                  group="layouts"
                  class="page-area"
                  :class="pageClass"
                  :style="style"
                >
                  <div
                    v-for="element in rows"
                    :key="element.key"
                    class="page-area-row relative divide-x divide-dotted divide-blue-400 flex layouts-item border border-dotted border-blue-400"
                  >
                    <div
                      v-for="column in element.columns"
                      :key="column"
                      v-right-click:[{row:element.key,column:column}]="menuOptions"
                      class="flex-1"
                    />
                  </div>
                </draggable>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-editor-panel relative">
        <div class="page-editor-sidebar-group">
          <el-button-group>
            <el-button
              size="medium"
              class="page-editor-sidebar-group__button"
              :class="
                activeSiderbar === 'layout'
                  ? 'page-editor-sidebar-group__button--active'
                  : ''
              "
              @click="sidbarChange('layout')"
            >
              布局
            </el-button>
            <el-button
              size="medium"
              class="page-editor-sidebar-group__button"
              :class="
                activeSiderbar === 'component'
                  ? 'page-editor-sidebar-group__button--active'
                  : ''
              "
              @click="sidbarChange('component')"
            >
              组件
            </el-button>
          </el-button-group>
        </div>
        <div class="page-editor-sidebar-layout margin-top--sm">
          <div>grid</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { assign, debounce, omit } from 'lodash'
import draggable from 'vuedraggable'
import useRuler from '@/utils/uses/useRuler'
const activeSiderbar = ref('layout')
const style = ref<any>({
  'background-color': '#f5f7f9',
  'padding-top': '24px',
  'padding-left': '24px',
  'padding-right': '24px',
  'padding-bottom': '24px',
  'minWidth': '1920px',
  'minHeight': '1080px',
  'display': 'grid',
  'row-gap': '16px',
})
const designWidth = ref<number>(1920)
const designHeight = ref<number>(1080)
const gap = ref<string>('md')
const menuOptions = ref<any>({
  text: [
    '编辑列',
    '编辑行',
  ],
  handler: {
    checkingData(parameter: any) {
      console.log(parameter)
      console.log('查看资料点击事件')
    },
    removeItem() {
      console.log('移除会话点击事件')
    },
  },
})
const pageClass = computed(() => {
  // 这样写是为了 tailwindcss 识别出class，切换时生效
  let spaceY = 'space-y-md'
  switch (gap.value) {
    case 'md':
      spaceY = 'space-y-md'
      break
    case 'sm':
      spaceY = 'space-y-sm'
      break
    case 'lg':
      spaceY = 'space-y-lg'
      break
  }
  return style.value.display === 'flex' ? `flex-col ${spaceY}` : ''
})
const rows = ref<Array<any>>([{ key: 'row-1', columns: 1 }])
useEventBus('page-design-change').on((data: any) => {
  style.value.minWidth = `${data.width}px`
  style.value.minHeight = `${data.height}px`
})
const sidbarChange = (type: string) => {
  activeSiderbar.value = type
}
const onAdd = () => {
  const myBus = useEventBus('reset-ruler')
  myBus.emit()
}
const pageBackgroundChange = (color: string) => {
  style.value['background-color'] = color
}
const pageSpacingChange = (padding: any) => {
  const obj = Object.keys(padding).reduce((pre: any, cur: string) => {
    pre[`padding-${cur}`] = `${padding[cur]}px`
    return pre
  }, {})
  style.value = assign(style.value, obj)
}
const rulerStyle = ref<object>({})
onMounted(() => {
  const box: HTMLElement = document.querySelector(
    '.ruler__content',
  ) as HTMLElement
  const zoomX = box.clientWidth / designWidth.value
  rulerStyle.value = {
    'transform-origin': '0 0',
    'transform': `scale(${zoomX},1)`,
  }
  let ruler: any = null
  nextTick(() => {
    ruler = useRuler(
      document.querySelector('.ruler__horizontal') as HTMLElement,
      document.querySelector('.ruler__vertical') as HTMLElement,
      box,
      document.querySelector('.page-area') as HTMLElement,
    )
  })
  watch([() => designWidth.value, () => designHeight.value], () => {
    const zoomX = box.clientWidth / designWidth.value
    rulerStyle.value = {
      'transform-origin': '0 0',
      'transform': `scale(${zoomX},1)`,
    }
    debounce(() => {
      nextTick(() => {
        ruler.resetDesign(designWidth.value, designHeight.value)
      })
    }, 500)()
  })
})
const pageGapChange = (rowGap: any) => {
  const maps = new Map([
    ['md', '16px'],
    ['lg', '24px'],
    ['sm', '8px'],
  ])
  let obj: any = { ...rowGap }
  obj = assign(style.value, { display: rowGap.display })
  gap.value = rowGap.gap
  if (rowGap.display === 'flex') {
    obj = omit(obj, 'row-gap')
  }
  else {
    obj['row-gap'] = maps.get(rowGap.gap)
  }
  style.value = obj
}
</script>
<style lang="scss" scoped>
.page-editor {
  position: relative;
  background-color: #f5f7f9;
  &-tool {
    background-color: #fff;
    border-bottom: 1px solid #eaeefb;
    font-size: 16px;
    padding: 16px 16px;
    &__button {
      cursor: pointer;
      &:hover {
        color: #5cadff;
      }
      @include modifier('active') {
        color: #3091f2;
      }
    }
  }
  &-sidebar {
    width: 272px;
    height: calc(100vh - 70px);
    background-color: #fff;
    border-right: 1px solid #eaeefb;
    padding: 16px 16px;
    &-group {
      &__button {
        width: 104px;
        @include modifier('active') {
          background: #3091f2 !important;
          color: #fff !important;
        }
      }
    }
  }
  &-content {
    position: relative;
    width: 100%;
    height: calc(100vh - 70px);
  }
  &-panel {
    width: 272px;
  }

  .page-area {
    position: relative;
    &-row {
      min-height: 24px;
      background-color: #fff;
      min-width: 100px;
    }
  }

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

  .panel-title {
    font-size: 12px;
    color: #464c5b;
    height: 20px;
    line-height: 20px;
    margin-bottom: 8px;
  }
  .panel-attribute {
    font-size: 14px;
    width: 60px;
    margin-right: 8px;
    text-align: right;
    line-height: 36px;
    height: 36px;
  }
  .panel-value {
    font-size: 14px;
    line-height: 36px;
    height: 36px;
  }
}
</style>
