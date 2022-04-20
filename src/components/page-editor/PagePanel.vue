<template>
  <div>
    <color-picker v-model="color" />
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
                  v-model="height"
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
                  v-model="height"
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
                  v-model="height"
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
                  v-model="height"
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
</template>
<script lang="ts" setup>

const activeNames = ref<Array<string>>(['page'])
const width = ref<number>(1920)
const height = ref<number>(1080)
const layout = ref<string>('grid')
const rowGap = ref<string>('md')
const _eventBus = useEventBus('page-design-change')

const color = ref<string>('#000')
watch([() => width.value, () => height.value], () => {
  _eventBus.emit({ width: width.value, height: height.value })
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
}
</style>
