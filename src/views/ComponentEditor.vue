<template>
  <div class="component-editor">
    <div class="flex">
      <div class="component-editor-preview border border-solid border-gray-200">
        <div style="font-size: 16px; width: 100%">
          <el-tooltip content="保存">
            <div
              class="component-editor__button component-editor__button--active"
              style="width: 36px; margin-left: auto"
            >
              <icon-carbon-save />
            </div>
          </el-tooltip>
        </div>
        <div>
          <component
            :is="customComponent"
            v-if="customComponent"
            class="border border-dotted border-blue-400"
            v-bind="options"
          />
        </div>
      </div>
      <div
        class="component-editor-api border-r border-l border-solid border-gray-200"
      >
        <div
          style="
            font-size: 14px;
            color: #464c5b;
            height: 36px;
            line-height: 36px;
          "
          class="border-b border-solid border-gray-200"
        >
          环境变量
        </div>
        <label-value
          label="系统时间"
          layout="ltr"
          :label-attribute="{
            width: '120px',
            fontSize: '12px',
            color: '#464c5b',
            height: '36px',
            lineHeight: '36px'
          }"
          :value-attribute="{
            fontSize: '14px',
            height: '36px',
            lineHeight: '36px'
          }"
          value="$date"
        />
        <label-value
          label="用户"
          layout="ltr"
          :label-attribute="{
            width: '120px',
            fontSize: '12px',
            color: '#464c5b',
            height: '36px',
            lineHeight: '36px'
          }"
          :value-attribute="{
            fontSize: '14px',
            height: '36px',
            lineHeight: '36px'
          }"
          value="$user"
        />
        <div
          style="
            font-size: 14px;
            color: #464c5b;
            height: 36px;
            line-height: 36px;
          "
          class="border-b border-solid border-gray-200 flex"
        >
          API
          <div style="margin-left: auto">
            <el-tooltip content="新增">
              <div
                class="component-editor__button component-editor__button--active"
                @click="onAdd"
              >
                <icon-carbon-bookmark-add />
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div v-if="current" class="component-editor-content">
        <el-collapse v-model="activeNames">
          <el-collapse-item :title="current.name" :name="current.key">
            <div class="attribute-panel">
              <div
                v-for="item in current.attrs"
                :key="item.key"
                class="attribute-panel-item"
              >
                <div class="attribute-panel-item__label">
                  {{ item.name }}
                </div>
                <attribute-item
                  :type="item.type"
                  :config="item.config"
                  :default-value="item.defaultValue"
                  :value-type="item.valueType"
                  @on-change="onChange($event, item)"
                  @on-attribute-change="onAttributeChange($event, item)"
                />
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item
            v-for="item in current.panels"
            :key="item.key"
            :title="item.name"
            :name="item.key"
          >
            <div class="attribute-panel">
              <div
                v-for="attr in item.attrs"
                :key="attr.key"
                class="attribute-panel-item"
              >
                <div class="attribute-panel-item__label">
                  {{ attr.name }}
                </div>
                <attribute-item
                  :type="attr.type"
                  :config="attr.config"
                  :default-value="attr.defaultValue"
                  :value-type="attr.valueType"
                  @on-change="onChange($event, attr)"
                />
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <el-dialog title="添加API" :visible.sync="dialogVisible" width="30%">
      <div>
        <div
          class="border-b border-solid border-gray-200"
          style="
            font-size: 16px;
            color: #464c5b;
            height: 36px;
            line-height: 36px;
          "
        >
          API
        </div>
        <div style="margin-top:16px;">
          <el-input
            v-model="api.name"
            placeholder="请输入内容"
            clearable
          />
        </div>
        <div
          class="flex"
          style="
            font-size: 12px;
            color: #464c5b;
            height: 22px;
            line-height: 22px;
            margin-top: 16px;
          "
        >
          参数
          <div style="margin-left: auto">
            <el-tooltip content="新增">
              <div
                class="component-editor__button component-editor__button--active"
                @click="onAdd"
              >
                <icon-carbon-bookmark-add />
              </div>
            </el-tooltip>
          </div>
        </div>
        <div>
          <el-input
            v-model="input"
            placeholder="请输入内容"
            clearable
          />
        </div>
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
<script lang="ts" setup>
import { buildAttributes } from '@/utils/attributeBuild'
import type { Api } from '@/types/Api'
const modules = import.meta.glob('../configs/*.json')
const maps = new Map()
const current = ref<any>(null)
const customComponent = ref<any>(null)
const activeNames = ref<Array<string>>(['base'])
const options = ref<any>(null)
const dialogVisible = ref<Boolean>(false)
onMounted(async() => {
  for (const path in modules) {
    const mod: any = await modules[path]()
    const key = path.replace(/(.*\/){0,}([^.]+).*/gi, '$2')
    const model = {
      name: mod.name,
      attrs: mod.attrs,
      panels: mod.panels,
      key: mod.key,
    }
    maps.set(key, model)
  }
  current.value = maps.get('label-value')
  customComponent.value = defineAsyncComponent(
    () => import(`../components/label-value/LabelValue.vue`),
  )
  options.value = buildAttributes(current.value)
})
const onChange = (val: any, item: any) => {
  item.value = val
  options.value = buildAttributes(current.value)
}
const onAttributeChange = (val: any, item: any) => {
  item.valueType = val.valueType
  item.format = val.format
  options.value = buildAttributes(current.value)
}
const onAdd = () => {
  dialogVisible.value = true
}
const api = ref<Api>({
  name: '',
  params: [],
})
</script>
<style lang="scss" scoped>
.component-editor {
  &-preview {
    flex: 1;
    margin: 16px 24px;
    padding: 16px;
    height: calc(100vh - 32px);
  }
  &-api {
    width: 336px;
    padding: 16px 24px;
    margin-right: 16px;
  }
  &-content {
    width: 440px;
    padding-right: 24px;
    height: calc(100vh - 8px);
    overflow: auto;
  }
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
.attribute-panel {
  display: grid;
  grid-template-columns: 100%;
  row-gap: 16px;
  &-item {
    padding: 0 16px;
    &__label {
      font-size: 12px;
      color: #464c5b;
    }
  }
}
</style>
