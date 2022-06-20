<template>
  <div class="page-editor">
    <div class="page-editor-tool flex space-x-md">
      <el-tooltip content="预览">
        <div
          class="page-editor-tool__button page-editor-tool__button--active"
          @click="onPreview"
        >
          <icon-carbon-accessibility-color />
        </div>
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
              @row-gap-change="pageRowGapChange"
            />
          </div>
          <div v-show="activeSiderbar === 'component'">
            <component-list @on-drage-end="onDragEnd" />
          </div>
        </div>
      </div>
      <div class="page-editor-content flex-1">
        <div ref="editor" class="ruler">
          <div class="ruler__horizontal relative" />
          <div class="flex flex-1 ruler-area">
            <div class="ruler__vertical" />
            <div class="ruler__content flex-1">
              <div :style="rulerStyle" class="relative">
                <draggable
                  :list="rows"
                  group="layouts"
                  class="page-area flex flex-col"
                  :style="style"
                >
                  <div
                    v-for="element in rows"
                    :key="element.key"
                    class="page-area-row relative divide-x divide-dotted divide-blue-400 flex layouts-item border border-dotted border-blue-400"
                    :style="toRowStyle(element)"
                    :class="toRowClass(element)"
                  >
                    <div
                      v-for="column in element.columns"
                      :key="column.key"
                      v-right-click:[{row:element.key,column:column.key}]="
                        menuOptions
                      "
                      class="page-area-column"
                      :style="toColumnStyle(element, column)"
                    >
                      <component :is="column.component.component" v-if="column.component" />
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" direction="rtl">
      <div class="page-editor-panel relative">
        <div class="page-editor-panel-group">
          <el-button-group>
            <el-button
              size="medium"
              class="page-editor-sidebar-group__button"
              :class="
                activePanel === 'attribute'
                  ? 'page-editor-sidebar-group__button--active'
                  : ''
              "
              @click="panelChange('attribute')"
            >
              属性
            </el-button>
          </el-button-group>
        </div>
        <div class="page-editor-panel-layout margin-top--sm">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="行设计" name="row">
              <div class="margin-bottom--md" style="padding-left: 16px">
                <div>
                  <div class="panel-title">
                    行高
                  </div>
                  <div class="flex margin-left--md">
                    <el-input-number
                      v-model="rowAttribute.height"
                      controls-position="right"
                      :min="16"
                      :step="16"
                      :max="designHeight"
                    />
                  </div>
                </div>
                <div class="margin-top--md">
                  <div class="panel-title">
                    背景色
                  </div>
                  <div class="flex margin-left--md">
                    <div class="flex">
                      <div class="panel-color-picker">
                        <color-picker
                          v-model="rowAttribute.backgroundColor"
                          default-color="#fffff"
                        />
                      </div>
                      <div class="margin-left--lg">
                        {{ rowAttribute.backgroundColor }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="margin-top--md">
                  <div class="panel-title">
                    布局方式
                  </div>
                  <div class="flex margin-left--md">
                    <el-radio v-model="rowAttribute.display" label="grid">
                      Grid
                    </el-radio>
                    <el-radio v-model="rowAttribute.display" label="flex">
                      Flex
                    </el-radio>
                  </div>
                </div>
                <div class="margin-top--md">
                  <div class="panel-title">
                    列间距
                  </div>
                  <div class="flex margin-left--md">
                    <el-radio v-model="rowAttribute.space" label="lg">
                      24px
                    </el-radio>
                    <el-radio v-model="rowAttribute.space" label="md">
                      16px
                    </el-radio>
                    <el-radio v-model="rowAttribute.space" label="sm">
                      8px
                    </el-radio>
                  </div>
                </div>
                <div class="margin-top--md">
                  <div class="panel-title">
                    外间距（单位：px）
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      左间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="rowAttribute.marginLeft"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      上间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="rowAttribute.marginTop"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      右间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="rowAttribute.marginRight"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      下间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="rowAttribute.marginBottom"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                </div>
                <div class="margin-top--md">
                  <div class="panel-title">
                    内间距（单位：px）
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      左间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="rowAttribute.paddingLeft"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      上间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="rowAttribute.paddingTop"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      右间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="rowAttribute.paddingRight"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      下间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="rowAttribute.paddingBottom"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="列设计" name="column">
              <div style="padding-left: 16px">
                <div>
                  <div class="panel-title">
                    列宽
                  </div>
                  <div class="margin-left--md">
                    <el-radio
                      v-model="columnAttribute.distribution"
                      label="equal"
                    >
                      均分
                    </el-radio>
                    <el-radio
                      v-model="columnAttribute.distribution"
                      label="fixed"
                    >
                      定值
                    </el-radio>
                    <el-radio
                      v-model="columnAttribute.distribution"
                      label="scale"
                    >
                      比例
                    </el-radio>
                  </div>
                  <div
                    v-show="columnAttribute.distribution !== 'equal'"
                    class="flex margin-left--md margin-top--md"
                  >
                    <el-input-number
                      v-model="columnAttribute.width"
                      controls-position="right"
                      :min="columnAttribute.distribution === 'fixed' ? 16 : 1"
                      :step="1"
                      :max="designHeight"
                    />
                  </div>
                </div>
                <div class="margin-top--md">
                  <div class="panel-title">
                    背景色
                  </div>
                  <div class="flex margin-left--md">
                    <div class="flex">
                      <div class="panel-color-picker">
                        <color-picker
                          v-model="columnAttribute.backgroundColor"
                          default-color="#fffff"
                        />
                      </div>
                      <div class="margin-left--lg">
                        {{ columnAttribute.backgroundColor }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="margin-top--md">
                  <div class="panel-title">
                    外间距（单位：px）
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      左间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="columnAttribute.marginLeft"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      上间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="columnAttribute.marginTop"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      右间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="columnAttribute.marginRight"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      下间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="columnAttribute.marginBottom"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                </div>
                <div class="margin-top--md">
                  <div class="panel-title">
                    内间距（单位：px）
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      左间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="columnAttribute.paddingLeft"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      上间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="columnAttribute.paddingTop"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      右间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="columnAttribute.paddingRight"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                  <div class="flex">
                    <div class="panel-attribute">
                      下间距
                    </div>
                    <div class="panel-value">
                      <el-input-number
                        v-model="columnAttribute.paddingBottom"
                        controls-position="right"
                        :min="0"
                        :step="4"
                        :max="24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { assign, cloneDeep, debounce, uniqueId } from 'lodash'
import draggable from 'vuedraggable'
import { useEventListener } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import { Message } from 'element-ui'
import useRuler from '@/utils/uses/useRuler'
import type {
  Column,
  ColumnAttribute,
  Row,
  RowAttribute,
} from '@/types/PageEdit'
import { toColumnStyle, toRowClass, toRowStyle } from '@/utils/PageEdit'
const style = ref<any>({
  'background-color': '#f5f7f9',
  'padding-top': '24px',
  'padding-left': '24px',
  'padding-right': '24px',
  'padding-bottom': '24px',
  'minWidth': '1920px',
  'minHeight': '1080px',
  'display': 'flex',
})
const cookie = useCookies(['locale'])
console.log(cookie.get('locale'), 'cookie信息')
const rowAttribute = ref<RowAttribute>({
  height: 128,
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
  display: 'grid',
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  space: 'md',
  backgroundColor: '#ffffff',
})
const rows = ref<Array<Row>>([
  {
    key: uniqueId('page_editor-row'),
    fixed: 1,
    columns: [
      {
        key: uniqueId('page_edit-column'),
        attributes: {
          distribution: 'equal',
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          backgroundColor: '#fffff',
        },
      },
    ],
    attributes: { ...rowAttribute.value },
  },
])
const columnAttribute = ref<ColumnAttribute>({
  distribution: 'equal',
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
  backgroundColor: '#ffffff',
})
const designWidth = ref<number>(1920)
const designHeight = ref<number>(1080)
const drawer = ref<Boolean>(false)
const editor = ref<HTMLElement>()
let current: any = ''
const activeSiderbar = ref('layout')
const menuOptions = ref<any>({
  text: ['编辑列', '新增列', '删除列', '设置组件', '删除行'],
  handler: {
    editColumn(data: any) {
      current = data
      drawer.value = true
      const row = rows.value.find((t) => {
        return t.key === current.row
      }) as Row
      rows.value.forEach((t) => {
        t.isSelected = false
        t.columns.forEach((c) => {
          c.isSelected = false
        })
      })
      rowAttribute.value = { ...row.attributes }
      row.isSelected = true
      const col = row.columns.find((t) => {
        return t.key === current.column
      }) as Column
      columnAttribute.value = { ...col.attributes }
      col.isSelected = true
    },
    addColumn(data: any) {
      current = data
      const row = rows.value.find((t) => {
        return t.key === current.row
      }) as Row
      rows.value.forEach((t) => {
        t.isSelected = false
        t.columns.forEach((c) => {
          c.isSelected = false
        })
      })
      rowAttribute.value = { ...row.attributes }
      row.isSelected = true
      const col: Column = {
        key: uniqueId('page_edit-column'),
        attributes: {
          distribution: 'equal',
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          backgroundColor: '#ffffff',
        },
      }
      columnAttribute.value = { ...col.attributes }
      col.isSelected = true
      current.column = col.key
      row.columns.push(col)
      drawer.value = true
    },
    deleteColumn(data: any) {
      const row = rows.value.find((t) => {
        return t.key === data.row
      }) as Row
      if (row.columns.length > 1) {
        const index = row.columns.findIndex((t) => {
          return t.key === current.column
        })
        row.columns.splice(index, 1)
      }
      else {
        Message.error('不能删除唯一的单元格')
      }
    },
    setComponent() {
      activeSiderbar.value = 'component'
    },
    deleteRow(data: any) {
      const index = rows.value.findIndex((t) => {
        return t.key === data.row
      })
      rows.value.splice(index, 1)
    },
  },
})
const maps = new Map([
  ['md', '16px'],
  ['lg', '24px'],
  ['sm', '8px'],
])
useEventBus('page-design-change').on((data: any) => {
  style.value.minWidth = `${data.width}px`
  style.value.minHeight = `${data.height}px`
})
const sidbarChange = (type: string) => {
  activeSiderbar.value = type
}
const activePanel = ref<string>('attribute')
const panelChange = (panel: string) => {
  // i
}
const activeName = ref<string>('row')
const onAdd = () => {
  /* const myBus = useEventBus('reset-ruler')
  myBus.emit()*/
  rows.value.push({
    key: uniqueId('page_editor-row'),
    fixed: 1,
    columns: [
      {
        key: uniqueId('page_edit-column'),
        attributes: {
          distribution: 'equal',
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          backgroundColor: '#fffff',
        },
      },
    ],
    attributes: { ...rowAttribute.value },
  })
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
  useEventListener(editor, 'mouseup', () => {
    rows.value.forEach((t) => {
      t.isSelected = false
      t.columns.forEach((c) => {
        c.isSelected = false
      })
    })
    rows.value = cloneDeep(rows.value)
  })
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
let rowGap = 'md'
const setRowGap = (gap: string) => {
  rows.value.forEach((item, index) => {
    if (index !== 0) {
      item.attributes.marginTop = parseInt(gap)
    }
    else {
      item.attributes.marginTop = 0
    }
  })
}
const pageRowGapChange = (gap: any) => {
  rowGap = gap
  setRowGap(maps.get(rowGap) as string)
}
watch(
  () => rows.value,
  () => {
    setRowGap(maps.get(rowGap) as string)
  },
)
watch(
  () => columnAttribute.value.distribution,
  () => {
    switch (columnAttribute.value.distribution) {
      case 'fixed':
        columnAttribute.value.width = 128
        break
      case 'scale':
        columnAttribute.value.width = 1
        break
      default:
        columnAttribute.value.width = undefined
        break
    }
  },
)
watch(
  () => columnAttribute.value,
  () => {
    const row = rows.value.find((t) => {
      return t.key === current.row
    }) as Row
    const col = row.columns.find((t) => {
      return t.key === current.column
    }) as Column
    col.attributes = { ...columnAttribute.value }
  },
  { deep: true },
)
watch(
  () => rowAttribute.value,
  () => {
    const row = rows.value.find((t) => {
      return t.key === current.row
    }) as Row
    row.attributes = { ...rowAttribute.value }
  },
  { deep: true },
)
const onDragEnd = (data: any) => {
  const row = rows.value[data.row]
  row.columns[data.column].component = data.component
  rows.value = cloneDeep(rows.value)
}
const router = getCurrentInstance()?.proxy?.$router
const onPreview = () => {
  router?.push({ path: '/page-view/page1' })
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
    height: calc(100vh - 70px);
    padding-right: 24px;
  }
  &-panel {
    padding: 16px 24px;
    background-color: #fff;
    border-left: 1px solid #eaeefb;
    &-group {
      &__button {
        width: 104px;
        @include modifier('active') {
          background: #3091f2 !important;
          color: #fff !important;
        }
      }
    }
    .panel-color-picker {
      height: 24px;
      width: 24px;
      border: 1px dashed #5cadff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .page-area {
    position: relative;
    &-row {
      min-height: 24px;
      background-color: #fff;
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
      max-width: calc(100vw - 368px);
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
  ::v-deep .el-radio {
    margin-right: 16px;
  }

  .row-active {
    border: 1px solid #3091f2 !important;
  }
}
</style>
