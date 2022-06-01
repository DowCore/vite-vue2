<template>
  <div class="component-editor">
    <div class="flex">
      <div class="component-editor-preview border border-solid border-gray-200">
        <div
          style="font-size: 16px; width: 100%; margin-bottom: 16px"
          class="flex"
        >
          <div
            style="
              font-size: 14px;
              color: #464c5b;
              height: 28px;
              line-height: 28px;
              margin-right: 16px;
            "
          >
            选择组件
          </div>
          <div>
            <el-select
              v-model="currentComponent"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in components"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div
            style="width: 36px; margin-left: auto; padding-top: 8px"
            @click="onSave"
          >
            <el-tooltip content="保存">
              <div
                class="component-editor__button component-editor__button--active"
              >
                <icon-carbon-save />
              </div>
            </el-tooltip>
          </div>
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
          :label-style="{
            width: '120px',
            fontSize: '12px',
            color: '#464c5b',
            height: '36px',
            lineHeight: '36px'
          }"
          :value-style="{
            fontSize: '14px',
            height: '36px',
            lineHeight: '36px'
          }"
          value="$date"
        />
        <label-value
          label="用户"
          layout="ltr"
          :label-style="{
            width: '120px',
            fontSize: '12px',
            color: '#464c5b',
            height: '36px',
            lineHeight: '36px'
          }"
          :value-style="{
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
        <div>
          <div v-for="item in apis" :key="item.name">
            <div class="flex border-b border-solid border-blue-200">
              <div style="font-size: 14px; height: 28px; line-height: 28px">
                {{ item.name }}
              </div>
              <div
                style="
                  font-size: 12px;
                  height: 28px;
                  line-height: 28px;
                  margin-left: 8px;
                "
              >
                {{ item.alias }}
              </div>
            </div>
            <div
              v-for="field in item.fields"
              :key="field.code"
              class="flex border-b border-dotted border-indigo-200 margin-left--md"
            >
              <div
                style="
                  font-size: 12px;
                  height: 36px;
                  line-height: 36px;
                  width: 120px;
                "
              >
                {{ field.label }}
              </div>
              <div
                style="
                  font-size: 14px;
                  height: 36px;
                  line-height: 36px;
                  margin-left: 8px;
                "
              >
                <el-input v-model="field.alias" />
              </div>
            </div>
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
            v-for="item in current.styles"
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
          <el-collapse-item
            v-if="current.type === 'list'"
            :title="current.columnTemplate.name"
            :name="current.columnTemplate.key"
          >
            <div class="margin-left--md">
              <el-collapse accordion>
                <el-collapse-item
                  v-for="(item, index) in options.list"
                  :key="index"
                  :title="'第' + (index + 1) + '列'"
                  :name="index"
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
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <el-dialog
      title="添加API"
      :visible.sync="dialogVisible"
      width="600px"
      @open="onOpen"
    >
      <ValidationObserver ref="myform">
        <form>
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
            <div style="margin-top: 4px; margin-left: 16px">
              <div
                class="flex"
                style="
                  font-size: 12px;
                  color: #464c5b;
                  height: 22px;
                  line-height: 22px;
                "
              >
                名称
                <div style="color: #ff3300; margin-left: 4px">
                  *
                </div>
              </div>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <el-input v-model="api.name" placeholder="API名称" clearable />
                <div
                  style="
                    height: 22px;
                    line-height: 22px;
                    color: #ff3300;
                    font-size: 12px;
                  "
                >
                  {{ errors[0] ? 'API名称不能为空' : '' }}
                </div>
              </ValidationProvider>
              <div
                style="
                  font-size: 12px;
                  color: #464c5b;
                  height: 22px;
                  line-height: 22px;
                "
              >
                别名
              </div>
              <el-input v-model="api.alias" placeholder="别名" clearable />
            </div>
            <div
              class="flex border-b border-solid border-gray-200"
              style="
                font-size: 16px;
                color: #464c5b;
                height: 36px;
                line-height: 36px;
                margin-top: 16px;
                margin-bottom: 16px;
              "
            >
              调用参数
              <div style="margin-left: auto">
                <el-tooltip content="新增">
                  <div
                    class="component-editor__button component-editor__button--active"
                    @click="onAddParam"
                  >
                    <icon-carbon-bookmark-add />
                  </div>
                </el-tooltip>
              </div>
            </div>
            <div
              v-for="(item, index) in api.params"
              :key="index"
              style="margin-left: 16px"
            >
              <div class="flex">
                <div
                  style="
                    width: 48px;
                    height: 28px;
                    line-height: 28px;
                    font-size: 12px;
                    color: #464c5b;
                  "
                  class="flex"
                >
                  名称
                  <div style="color: #ff3300; margin-left: 4px">
                    *
                  </div>
                </div>
                <div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <el-input
                      v-model="item.name"
                      placeholder="参数名称"
                      clearable
                    />
                    <div
                      style="
                        height: 22px;
                        line-height: 22px;
                        color: #ff3300;
                        font-size: 12px;
                      "
                    >
                      {{ errors[0] ? '参数名称不能为空' : '' }}
                    </div>
                  </ValidationProvider>
                </div>
                <div
                  style="
                    width: 30px;
                    margin-left: 24px;
                    height: 28px;
                    line-height: 28px;
                    font-size: 12px;
                    color: #464c5b;
                  "
                  class="flex"
                >
                  值
                  <div style="color: #ff3300; margin-left: 4px">
                    *
                  </div>
                </div>
                <div>
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <el-input
                      v-model="item.name"
                      placeholder="参数值"
                      clearable
                    />
                    <div
                      style="
                        height: 22px;
                        line-height: 22px;
                        color: #ff3300;
                        font-size: 12px;
                      "
                    >
                      {{ errors[0] ? '参数值不能为空' : '' }}
                    </div>
                  </ValidationProvider>
                </div>
                <div
                  style="margin-left: 16px; height: 28px; line-height: 28px"
                  @click="deleteParam(item)"
                >
                  <i class="el-icon-close component-editor__icon" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { cloneDeep } from 'lodash'
import { buildAttributes } from '@/utils/attributeBuild'
import type { Api } from '@/types/Api'
const modules = import.meta.glob('../configs/*.json')
const maps = new Map()
const current = ref<any>(null)
const customComponent = ref<any>(null)
const activeNames = ref<Array<string>>(['base'])
const options = ref<any>(null)
const dialogVisible = ref<Boolean>(false)
const myform = ref<HTMLElement>()
const components = ref<any>()
const currentComponent = ref<string>('')
onMounted(async() => {
  for (const path in modules) {
    const mod: any = await modules[path]()
    const key = path.replace(/(.*\/){0,}([^.]+).*/gi, '$2')
    const model = {
      name: mod.name,
      attrs: mod.attrs,
      styles: mod.styles,
      key: mod.key,
      path: mod.path,
      type: mod.type,
      columnTemplate: mod.columnTemplate,
    }
    maps.set(key, model)
  }
  components.value = []
  for (const [key] of maps) {
    components.value.push({
      value: key,
      label: maps.get(key).name,
    })
  }
  currentComponent.value = components.value[0].value
})
const onChange = (val: any, item: any) => {
  item.value = val
  const list = options.value.list
  options.value = { ...buildAttributes(current.value), list }
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
  alias: '',
})
const onOpen = () => {
  api.value = {
    name: '',
    params: [],
    alias: '',
  }
}
const onAddParam = () => {
  api.value.params.push({
    name: '',
    value: '',
  })
}
const deleteParam = (item: any) => {
  const index = api.value.params.indexOf(item)
  api.value.params.splice(index, 1)
}
const apis = ref<any>([
  {
    alias: 'api1',
    name: 'UNVS00002',
    params: [],
    fields: [
      {
        code: 'code',
        label: '编码',
        alias: '$api1.code',
      },
    ],
  },
])
extend('required', {
  validate(value: any) {
    return {
      required: true,
      valid: !['', null, undefined].includes(value),
    }
  },
  computesRequired: true,
})
const handleSubmit = () => {
  (myform.value as any).validate().then((success: Boolean) => {
    alert(success)
    if (!success) {
      //
      return true
    }
    else {
      //
      return false
    }
  })
}
const onSave = () => {
  console.log(apis.value, '结果')
}
watch(
  () => currentComponent.value,
  () => {
    current.value = maps.get(currentComponent.value)
    customComponent.value = defineAsyncComponent(
      () => import(`../components/${current.value.path}`),
    )
    const _options = { ...buildAttributes(current.value) }
    if (['list', 'table'].includes(current.value.type)) {
      _options.list = []
      for (let i = 0; i < _options.columns; i++) {
        _options.list.push(cloneDeep(current.value.columnTemplate))
      }
    }
    options.value = _options
  },
)
</script>

<style lang="scss" scoped>
.component-editor {
  width: 100%;

  &-preview {
    flex: 1;
    margin: 16px 24px;
    padding: 16px;
    height: calc(100vh - 32px);
  }

  &-api {
    width: 440px;
    padding: 4px 24px;
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

  &__icon {
    cursor: pointer;

    &:hover {
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
