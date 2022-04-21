<template>
  <div>
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
            v-model="width"
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
            v-model="height"
            controls-position="right"
            :min="720"
            :step="80"
            :max="2160"
          />
        </div>
      </div>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="页面设置" name="page">
        <div class="panel">
          <div>
            <div class="panel-title">
              背景色
            </div>
            <div class="flex margin-left--md">
              <div class="flex">
                <div class="panel-color-picker">
                  <color-picker v-model="color" default-color="#f5f7f9" />
                </div>
                <div class="margin-left--lg">
                  {{ color }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="panel-title">
              布局方式
            </div>
            <div class="flex margin-left--md">
              <el-radio v-model="layout" label="grid">
                Grid
              </el-radio>
              <el-radio v-model="layout" label="flex">
                Flex
              </el-radio>
            </div>
          </div>
          <div>
            <div class="panel-title">
              行间距
            </div>
            <div class="flex margin-left--md">
              <el-radio v-model="rowGap" label="lg">
                24px
              </el-radio>
              <el-radio v-model="rowGap" label="md">
                16px
              </el-radio>
              <el-radio v-model="rowGap" label="sm">
                8px
              </el-radio>
            </div>
          </div>
          <div>
            <div class="panel-title">
              页面间距（单位：px）
            </div>
            <div class="flex">
              <div class="panel-attribute">
                左间距
              </div>
              <div class="panel-value">
                <el-input-number
                  v-model="padding.left"
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
                  v-model="padding.top"
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
                  v-model="padding.right"
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
                  v-model="padding.bottom"
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
      <el-collapse-item title="布局" name="layout">
        <draggable
          :list="layouts"
          class="layouts"
          :group="{ name: 'layouts', pull: 'clone', put: false }"
          :clone="customClone"
        >
          <div
            v-for="element in layouts"
            :key="element.key"
            class="layouts-item"
          >
            {{ element.key }}
          </div>
        </draggable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts" setup>
import draggable from 'vuedraggable'
interface Spacing {
  top: number
  bottom: number
  left: number
  right: number
}
const activeNames = ref<Array<string>>(['page', 'layout'])
const width = ref<number>(1920)
const height = ref<number>(1080)
const layout = ref<string>('grid')
const rowGap = ref<string>('md')
const _designChange = useEventBus('page-design-change')
const padding = ref<Spacing>({ top: 24, left: 24, right: 24, bottom: 24 })
const color = ref<string>('#f5f7f9')
const layouts = ref<Array<any>>([
  {
    key: 'layout-column-1',
    columns: 1,
  },
  {
    key: 'layout-column-2',
    columns: 2,
  },
  {
    key: 'layout-column-3',
    columns: 3,
  },
])
watch([() => width.value, () => height.value], () => {
  _designChange.emit({ width: width.value, height: height.value })
})
const _emit = defineEmits(['background-change', 'spacing-change', 'gap-change'])
watch(
  () => color.value,
  () => {
    _emit('background-change', color.value)
  },
)
watch(
  () => padding.value,
  () => {
    _emit('spacing-change', padding.value)
  },
  { deep: true },
)
watch([() => layout.value, () => rowGap.value], () => {
  _emit('gap-change', { display: layout.value, gap: rowGap.value })
})
</script>
<style lang="scss" scoped>
.panel {
  display: grid;
  grid-template-columns: 100%;
  row-gap: 16px;
  &-title {
    font-size: 12px;
    color: #464c5b;
    height: 20px;
    line-height: 20px;
    margin-bottom: 8px;
  }
  &-attribute {
    font-size: 14px;
    width: 60px;
    margin-right: 8px;
    text-align: right;
    line-height: 36px;
    height: 36px;
  }
  &-value {
    font-size: 14px;
    line-height: 36px;
    height: 36px;
  }
  &-color-picker {
    height: 24px;
    width: 24px;
    border: 1px dashed #5cadff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ::v-deep .el-radio {
    margin-right: 16px;
  }
  .layouts{
    display: grid;
    grid-template-columns: 100%;
    padding: 16px 24px;
    &-item{
      height:22px;
    }
  }
}
</style>
