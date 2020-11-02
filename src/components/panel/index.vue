<template>
  <el-card>
    <div class="slot-h">
      <slot name="header"></slot>
    </div>
    <div class="slot-b">
      <slot name="body"> </slot>
    </div>
  </el-card>
</template>
<script>
export default {}
</script>

<style lang="less" scoped>
.slot-h {
  padding: 20px;
  border-bottom: 1px solid #e4e4e4;
  font-size: 24px;
  font-family: consolas;
}
.slot-b {
  padding: 20px;
}
/deep/ .el-card__body {
  padding: 0;
}
</style>
