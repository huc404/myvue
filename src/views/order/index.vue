<template>
  <router-view />
</template>

<script>
import { orderDataLink } from '../../api/order.js'
export default {
  data() {
    return {}
  },
  created() {
    this.getOrderDataLink(this.$route.params.id)
  },
  methods: {
    async getOrderDataLink(id) {
      const data = await orderDataLink({ id })
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped></style>
