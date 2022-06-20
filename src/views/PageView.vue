<script lang="ts" setup>
import type {
  Row,
} from '@/types/PageEdit'
import { toColumnStyle, toRowClass, toRowStyle } from '@/utils/PageEdit'
const style = ref<any>({
  'background-color': '#f5f7f9',
  'padding-top': '24px',
  'padding-left': '24px',
  'padding-right': '24px',
  'padding-bottom': '24px',
  'display': 'flex',
})
const route = getCurrentInstance()?.proxy.$route
console.log(route, '路由信息')
const rows = ref<Array<Row>>([
  {
    key: 'row1',
    fixed: 1,
    columns: [
      {
        key: 'column1',
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
        component: {
          name: 'Test',
          path: 'Test.vue',
          component: defineAsyncComponent(() => import('../components/Test.vue')),
        },
      },
    ],
    attributes: {
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
    },
  },
])
</script>

<template>
  <div class="page-area flex flex-col" :style="style">
    <div
      v-for="element in rows"
      :key="element.key"
      class="page-area-row relative divide-x divide-dotted divide-blue-400 flex layouts-item"
      :style="toRowStyle(element)"
      :class="toRowClass(element)"
    >
      <div
        v-for="column in element.columns"
        :key="column.key"
        class="page-area-column"
        :style="toColumnStyle(element, column)"
      >
        <component :is="column.component.component" v-if="column.component" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-area {
  position: relative;
}
</style>
