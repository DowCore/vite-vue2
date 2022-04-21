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
        <div class="page-editor-sidebar-layout margin-top--sm">
          <PagePanel
            @background-change="pageBackgroundChange"
            @spacing-change="pageSpacingChange"
            @gap-change="pageGapChange"
          />
        </div>
      </div>
      <div class="page-editor-content flex-1">
        <div class="page-editor-content__area">
          <ruler ref="myRuler">
            <template>
              <draggable
                :list="rows"
                group="people"
                class="page-area"
                :class="pageClass"
                :style="style"
                @change="log"
              >
                <div
                  v-for="element in rows"
                  :key="element.key"
                  class="page-area-row"
                >
                  {{ element.key }}
                </div>
              </draggable>
            </template>
          </ruler>
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
import { assign, omit } from 'lodash'
import draggable from 'vuedraggable'
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
const gap = ref<string>('md')
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
const rows = ref<Array<any>>([{ key: 1 }, { key: 2 }])
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
    &__area {
      position: relative;
      width: 100%;
      height: calc(100vh - 70px);
    }
  }
  &-panel {
    width: 272px;
  }

  .page-area {
    &-row {
      min-height: 24px;
      background-color: #fff;
      min-width: 100px;
    }
  }
}
</style>
