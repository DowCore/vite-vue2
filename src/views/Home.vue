<template>
  <div>
    <Hero />
    <component :is="'icon-carbon-accessibility'" />
    <icon-svg-yintao />
    <el-button type="success">
      成功按钮
    </el-button>
    <Features />
  </div>
</template>
