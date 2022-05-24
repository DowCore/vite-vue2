<template>
  <div class="lable-value" :class="layout === 'ltr' ? 'flex' : ''">
    <div class="lable-value__label" />
    <div class="lable-value__value" />
  </div>
</template>
<script lang="ts" setup>
defineProps({
  label: { type: String },
  value: { type: String || Number, required: true },
  layout: { type: String, required: true },
  lableAttribute: { type: Object },
  valueAttribute: { type: Object },
})
</script>
