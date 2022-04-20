<template>
  <div class="page-editor">
    <div class="page-editor-tool flex space-x-md">
      <el-tooltip content="预览">
        <icon-carbon-accessibility-color class="page-editor-tool__button" />
      </el-tooltip>
      <el-tooltip content="保存">
        <icon-carbon-save class="page-editor-tool__button" />
      </el-tooltip>
      <el-tooltip content="新增">
        <div
          class="page-editor-tool__button page-editor-tool__button--active"
          @click="onAdd"
        >
          <icon-carbon-bookmark-add />
        </div>
      </el-tooltip>
    </div>
    <div class="flex space-x-md relative">
      <div class="page-editor-sidebar relative">
        <div class="page-editor-sidebar-group">
          <el-button-group>
            <el-button
              size="medium"
              class="page-editor-sidebar-group__button"
              :class="
                activeSiderbar === 'layout'
                  ? 'page-editor-sidebar-group__button--active'
                  : ''
              "
              @click="sidbarChange('layout')"
            >
              布局
            </el-button>
            <el-button
              size="medium"
              class="page-editor-sidebar-group__button"
              :class="
                activeSiderbar === 'component'
                  ? 'page-editor-sidebar-group__button--active'
                  : ''
              "
              @click="sidbarChange('component')"
            >
              组件
            </el-button>
          </el-button-group>
        </div>
        <div class="page-editor-sidebar-layout margin-top--sm">
          <PagePanel />
        </div>
      </div>
      <div class="page-editor-content flex-1">
        <div class="page-editor-content__area">
          <ruler>
            <template>
              <div style="width: 2500px; height: 1280px">
                这里可以显示内容
              </div>
            </template>
          </ruler>
        </div>
      </div>
      <div class="page-editor-panel relative">
        <div class="page-editor-sidebar-group">
          <el-button-group>
            <el-button
              size="medium"
              class="page-editor-sidebar-group__button"
              :class="
                activeSiderbar === 'layout'
                  ? 'page-editor-sidebar-group__button--active'
                  : ''
              "
              @click="sidbarChange('layout')"
            >
              布局
            </el-button>
            <el-button
              size="medium"
              class="page-editor-sidebar-group__button"
              :class="
                activeSiderbar === 'component'
                  ? 'page-editor-sidebar-group__button--active'
                  : ''
              "
              @click="sidbarChange('component')"
            >
              组件
            </el-button>
          </el-button-group>
        </div>
        <div class="page-editor-sidebar-layout margin-top--sm">
          <div>grid</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const activeSiderbar = ref('layout')
const sidbarChange = (type: string) => {
  activeSiderbar.value = type
}
const onAdd = () => {
  const myBus = useEventBus('reset-ruler')
  myBus.emit()
}
</script>
<style lang="scss" scoped>
.page-editor {
  position: relative;
  background-color: #f5f7f9;
  &-tool {
    background-color: #fff;
    border-bottom: 1px solid #eaeefb;
    font-size: 16px;
    padding: 16px 16px;
    &__button {
      cursor: pointer;
      &:hover {
        color: #5cadff;
      }
      @include modifier("active") {
        color: #3091f2;
      }
    }
  }
  &-sidebar {
    width: 272px;
    height: calc(100vh - 70px);
    background-color: #fff;
    border-right: 1px solid #eaeefb;
    padding: 16px 16px;
    &-group {
      &__button {
        width: 104px;
        @include modifier("active") {
          background: #3091f2 !important;
          color: #fff !important;
        }
      }
    }
  }
  &-content {
    &__area {
      position: relative;
      width: 100%;
      height: calc(100vh - 70px);
    }
  }
  &-panel {
    width: 272px;
  }
}
</style>
