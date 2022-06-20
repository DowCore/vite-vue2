<script lang="ts" setup>
defineProps({
  label: { type: String },
  value: { type: [String, Number], required: true },
  layout: { type: String, required: true },
  labelStyle: { type: Object },
  valueStyle: { type: Object },
})
</script>

<template>
  <div class="lable-value" :class="layout === 'ltr' ? 'flex' : ''">
    <div class="lable-value__label" :style="labelStyle">
      {{ label }}
    </div>
    <div class="lable-value__value" :style="valueStyle">
      {{ value }}
    </div>
  </div>
</template>
