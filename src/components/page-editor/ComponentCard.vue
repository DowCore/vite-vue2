<script lang="ts" setup>
defineProps({
  title: { type: String, required: true },
  name: { type: String, required: true },
  path: { type: String, required: true },
  image: { type: String, required: true },
})
const dialogVisible = ref<Boolean>(false)
const props: any = getCurrentInstance()?.props
const componentCard = ref<any>(defineAsyncComponent(() => import(`../${props.path}`)))
const onPreview = () => {
  dialogVisible.value = true
}
</script>

<template>
  <div class="component-card">
    <div class="flex" style="padding: 4px 16px">
      <div class="component-card-title">
        {{ title }}
      </div>
      <div class="component-card-tool" @click="onPreview">
        <el-tooltip content="预览">
          <icon-carbon-accessibility-color
            class="component-card-tool__button"
          />
        </el-tooltip>
      </div>
    </div>
    <div class="component-card-image">
      <img :src="image" style="width: 100%; height: 100%">
    </div>
    <el-dialog
      :title="`预览${name}`"
      :visible.sync="dialogVisible"
      :fullscreen="true"
    >
      <div class="component-card-preview">
        <component :is="componentCard" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.component-card {
  width: 100%;
  &-tool {
    margin-left: auto;
    &__button {
      cursor: pointer;
      &:hover {
        color: #5cadff;
      }
      @include modifier('active') {
        color: #3091f2;
      }
    }
  }
  &-image {
    border-top: 1px solid #d7dde4;
    width: 100%;
    height: 80px;
  }
  &-preview{
    height:calc(100vh - 172px);
  }
}
</style>
