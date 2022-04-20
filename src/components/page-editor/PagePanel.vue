<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="页面设置" name="page">
        <div class="panel">
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
            <div>高</div>
            <div>
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
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts" setup>
const activeNames = ref<Array<string>>(['page'])
const width = ref<number>(1920)
const height = ref<number>(1080)
const eventBus = useEventBus('page-design-change')
watch([width.value, height.value], () => {
  eventBus.emit({ width: width.value, height: height.value })
})
</script>
<style lang="scss" scoped>
.panel {
  display: grid;
  grid-template-columns: 100%;
  row-gap: 16px;
}
</style>
