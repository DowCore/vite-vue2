<template>
  <div class="attribute-item">
    <el-input v-if="type === 'string'" v-model="model" />
  </div>
</template>
<script lang="ts" setup>
defineProps({
  type: { type: String, required: true },
  defaultValue: { type: String || Number },
})
// const _emit = defineEmits(['on-change'])
const current = getCurrentInstance()?.props
const model = ref<string | number>(current?.defaultValue as string | number)
</script>
