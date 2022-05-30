<template>
  <div class="lable-value" :class="layout === 'ltr' ? 'flex' : ''">
    <div class="lable-value__label" :style="labelAttribute">
      {{ label }}
    </div>
    <div class="lable-value__value" :style="valueAttribute">
      {{ value }}
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  label: { type: String },
  value: { type: [String, Number], required: true },
  layout: { type: String, required: true },
  labelAttribute: { type: Object },
  valueAttribute: { type: Object },
})
</script>
