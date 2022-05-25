<template>
  <div class="component-editor flex">
    <div />
    <div v-if="current">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="current.name" :name="current.key">
          <attribute-item v-for="item in current.attrs" :key="item.key" :type="item.type" :value.sync="item.value" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts" setup>
const modules = import.meta.glob('../configs/*.json')
const maps = new Map()
const current = ref<any>(null)
onMounted(async() => {
  for (const path in modules) {
    const mod: any = await modules[path]()
    const key = path.replace(/(.*\/){0,}([^.]+).*/gi, '$2')
    const model = { name: mod.name, attrs: mod.attrs, panels: mod.panels }
    maps.set(key, model)
  }
  current.value = maps.get('label-value')
})
watch(() => current.value, () => {
  console.log(current.value, '活动')
}, { deep: true })
</script>
