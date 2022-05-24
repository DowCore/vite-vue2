<template>
  <div class="page-eidtor-components">
    <draggable
      :list="components"
      class="page-eidtor-components-list"
      :sort="false"
      @end="onEnd"
    >
      <div
        v-for="element in components"
        :key="element.key"
        class="divide-x divide-dotted divide-blue-400 flex border border-dotted border-blue-400"
      >
        <component-card v-bind="element" />
      </div>
    </draggable>
  </div>
</template>
<script lang="ts" setup>
import draggable from 'vuedraggable'
const components = ref<Array<any>>([
  {
    key: 'layout-column-1',
    title: '云化数仓测试组件',
    name: 'Test',
    path: 'Test.vue',
    image:
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjUyNjg2MDEwNzY1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwMzQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj5AZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGZlZWRiYWNrLWljb25mb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4X3U2OXc4eWh4ZHUud29mZjI/dD0xNjMwMDMzNzU5OTQ0IikgZm9ybWF0KCJ3b2ZmMiIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTAzMTE1OF91Njl3OHloeGR1LndvZmY/dD0xNjMwMDMzNzU5OTQ0IikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4X3U2OXc4eWh4ZHUudHRmP3Q9MTYzMDAzMzc1OTk0NCIpIGZvcm1hdCgidHJ1ZXR5cGUiKTsgfQo8L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDUxMm0tNDUwLjU2IDBhNDUwLjU2IDQ1MC41NiAwIDEgMCA5MDEuMTIgMCA0NTAuNTYgNDUwLjU2IDAgMSAwLTkwMS4xMiAwWiIgZmlsbD0iI0ZDQzYzMiIgcC1pZD0iMTAzNSI+PC9wYXRoPjxwYXRoIGQ9Ik0zMjMuNTYzNTIgMzA1LjE1MmgzNzQuODQ1NDR2MTg4LjkwNzUySDMyMy41NjM1MnpNMzAyLjIwMjg4IDY1MC4yMTk1Mmg0MjIuODA5NnY3OS42ODc2OEgzMDIuMjAyODh6IiBmaWxsPSIjNjFDOUVFIiBwLWlkPSIxMDM2Ij48L3BhdGg+PHBhdGggZD0iTTMyMy41ODQgNTA4LjM5NTUyYTE0LjMzNiAxNC4zMzYgMCAwIDEtMTQuMzM2LTE0LjMzNnYtMjUxLjY5OTJhMTQuMzM2IDE0LjMzNiAwIDAgMSAyOC42NzIgMHYyNTEuNjk5MmExNC4zMzYgMTQuMzM2IDAgMCAxLTE0LjMzNiAxNC4zMzZ6TTY5OC4zNjggNTA4LjM5NTUyYTE0LjMzNiAxNC4zMzYgMCAwIDEtMTQuMzM2LTE0LjMzNnYtMjUxLjY5OTJhMTQuMzM2IDE0LjMzNiAwIDAgMSAyOC42NzIgMHYyNTEuNjk5MmExNC4zMzYgMTQuMzM2IDAgMCAxLTE0LjMzNiAxNC4zMzZ6IiBwLWlkPSIxMDM3Ij48L3BhdGg+PHBhdGggZD0iTTY5OC4zNjggMzE5LjQ4OEgzMjMuNTg0YTE0LjMzNiAxNC4zMzYgMCAwIDEgMC0yOC42NzJoMzc0Ljc4NGExNC4zMzYgMTQuMzM2IDAgMCAxIDAgMjguNjcyeiIgcC1pZD0iMTAzOCI+PC9wYXRoPjxwYXRoIGQ9Ik03MjEuNzc2NjQgNjUyLjYzNjE2SDMwMi4yMjMzNmEyLjU2IDIuNTYgMCAwIDEtMi44MjYyNC0yLjYyMTQ0TDMyMy41ODQgNDk0LjA1OTUyaDM3NC43ODRsMjYuMTkzOTIgMTU1LjkzNDcyYTIuNTYgMi41NiAwIDAgMS0yLjc4NTI4IDIuNjQxOTJ6IiBmaWxsPSIjRkY1RTRDIiBwLWlkPSIxMDM5Ij48L3BhdGg+PHBhdGggZD0iTTcyMS43NzY2NCA2NjYuOTcyMTZIMzAyLjIyMzM2YTE3LjI0NDE2IDE3LjI0NDE2IDAgMCAxLTEzLjIwOTYtNi4wMDA2NCAxNi4zODQgMTYuMzg0IDAgMCAxLTMuNzg4OC0xMy4xNjg2NEwzMTEuMjk2IDQ3OS43MjM1MmgzOTkuMzZsMjguMTgwNDggMTY3LjkzNmExNi4zODQgMTYuMzg0IDAgMCAxLTMuNjY1OTIgMTMuMjcxMDQgMTcuMzI2MDggMTcuMzI2MDggMCAwIDEtMTMuMzkzOTIgNi4wNDE2eiBtLTExLjMyNTQ0LTE0LjYwMjI0eiBtLTM5NC43MzE1Mi0xNC4wNjk3NmgzOTIuMzc2MzJsLTIxLjgxMTItMTI5LjkwNDY0SDMzNS44NzJ6IiBwLWlkPSIxMDQwIj48L3BhdGg+PHBhdGggZD0iTTI5OS4wMDggNzk1Ljk3NTY4YTE0LjMzNiAxNC4zMzYgMCAwIDEtMTQuMzM2LTE0LjMzNlY2NTAuMjRhMTQuMzM2IDE0LjMzNiAwIDAgMSAyOC42NzIgMHYxMzEuMzk5NjhhMTQuMzM2IDE0LjMzNiAwIDAgMS0xNC4zMzYgMTQuMzM2ek03MjQuOTkyIDc5NS45NzU2OGExNC4zMzYgMTQuMzM2IDAgMCAxLTE0LjMzNi0xNC4zMzZWNjUwLjI0YTE0LjMzNiAxNC4zMzYgMCAwIDEgMjguNjcyIDB2MTMxLjM5OTY4YTE0LjMzNiAxNC4zMzYgMCAwIDEtMTQuMzM2IDE0LjMzNnoiIHAtaWQ9IjEwNDEiPjwvcGF0aD48cGF0aCBkPSJNNzE4Ljg0OCA3NTcuNzZIMzAyLjIwMjg4YTE0LjMzNiAxNC4zMzYgMCAwIDEgMC0yOC42NzJINzE4Ljg0OGExNC4zMzYgMTQuMzM2IDAgMCAxIDAgMjguNjcyek01NTMuOTg0IDcxMi4zMzUzNmgtODYuOTE3MTJhMTQuMzM2IDE0LjMzNiAwIDAgMSAwLTI4LjY3Mmg4Ni45MTcxMmExNC4zMzYgMTQuMzM2IDAgMCAxIDAgMjguNjcyeiIgcC1pZD0iMTA0MiI+PC9wYXRoPjxwYXRoIGQ9Ik00NjEuODAzNTIgMzgwLjkyOGgxMDAuMzUyYTQwLjk2IDQwLjk2IDAgMCAxIDQwLjk2IDQwLjk2djcyLjE3MTUyaC0xODIuMTY5NlY0MjEuODg4YTQwLjk2IDQwLjk2IDAgMCAxIDQwLjg1NzYtNDAuOTZ6IiBmaWxsPSIjRkZGRkZGIiBwLWlkPSIxMDQzIj48L3BhdGg+PHBhdGggZD0iTTYwMy4wNTQwOCA1MDguMzk1NTJoLTE4Mi4xMDgxNmExNC4zMzYgMTQuMzM2IDAgMCAxLTE0LjMzNi0xNC4zMzZWNDIxLjg4OGE1NS4yOTYgNTUuMjk2IDAgMCAxIDU1LjI5Ni01NS4yOTZoMTAwLjM1MmE1NS4yOTYgNTUuMjk2IDAgMCAxIDU1LjI5NiA1NS4yOTZ2NzIuMTcxNTJhMTQuMzM2IDE0LjMzNiAwIDAgMS0xNC40OTk4NCAxNC4zMzZ6IG0tMTY3Ljc3MjE2LTI4LjY3MmgxNTMuNDM2MTZWNDIxLjg4OGEyNi42MjQgMjYuNjI0IDAgMCAwLTI2LjYyNC0yNi42MjRoLTEwMC4zNTJhMjYuNjI0IDI2LjYyNCAwIDAgMC0yNi42MjQgMjYuNjI0eiIgcC1pZD0iMTA0NCI+PC9wYXRoPjwvc3ZnPg==',
  },
])
const _emit = defineEmits(['on-drage-end'])
const onEnd = (e: any) => {
  if (e.originalEvent && e.originalEvent.path) {
    const element = e.originalEvent.path.find((t: any) => {
      return t.classList.contains('page-area-column')
    })
    if (element) {
      const column = Array.prototype.indexOf.call(
        element.parentNode.children,
        element,
      )
      const row = Array.prototype.indexOf.call(
        element.parentNode.parentNode.children,
        element.parentNode,
      )
      const component = components.value[e.newIndex]
      _emit('on-drage-end', {
        row,
        column,
        component: { name: component.name, path: component.path, component: defineAsyncComponent(() => import(`../${component.path}`)) },
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-eidtor-components-list {
  display: grid;
  grid-template-columns: 100%;
  row-gap: 16px;
}
</style>
