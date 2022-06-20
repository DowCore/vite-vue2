<script lang="ts" setup>
defineProps({
  type: { type: String, required: true },
  defaultValue: { type: [String, Number] },
  config: { type: Object },
  valueType: { type: String },
})
const _emit = defineEmits(['on-change', 'on-attribute-change'])
const current = getCurrentInstance()?.props
const model = ref<string | number>(current?.defaultValue as string | number)
const selectedType = ref<string>(current?.valueType as string)
const format = ref<string | undefined>()
watch(
  () => model.value,
  () => {
    _emit('on-change', model.value)
  },
)
watch([() => selectedType.value, () => format.value], () => {
  _emit('on-attribute-change', {
    valueType: selectedType.value,
    format: format.value,
  })
})
</script>

<template>
  <div class="attribute-item">
    <el-input v-if="type === 'string'" v-model="model" />
    <div v-if="type === 'value'" class="grid grid-col-1 gap-y-4">
      <div class="flex">
        <el-input v-model="model" />
      </div>
      <div class="flex">
        <div class="attr-item-label">
          类型
        </div>
        <el-radio-group v-model="selectedType">
          <el-radio
            v-for="item in config.selectableType"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </div>
      <div v-if="selectedType !== 'string'" class="flex">
        <div class="attr-item-label">
          格式化
        </div>
        <el-input v-model="format" />
      </div>
    </div>
    <div v-if="type === 'radio'">
      <el-radio-group v-model="model">
        <el-radio
          v-for="item in config.options"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </div>
    <div v-if="type === 'number'">
      <el-input-number
        v-model="model"
        controls-position="right"
        v-bind="config"
      />
    </div>
    <div v-if="type === 'color'" class="flex">
      <div class="color-picker">
        <color-picker v-model="model" :default-color="defaultValue" />
      </div>
      <div class="margin-left--lg">
        {{ color }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.attr-item-label {
  width: 80px;
  margin-left: 24px;
  font-size: 12px;
  color: #657180;
}
::v-deep .color-picker .box {
  position: fixed;
  z-index: 100;
}
</style>
