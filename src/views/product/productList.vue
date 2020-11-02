<template>
  <panel>
    <template #header>
      <span>商品列表</span>
    </template>
    <template #body>
      <div>
        <!-- 表格渲染数据 -->
        <el-table :data="tableData" style="width: 100%" size="mini">
          <el-table-column type="expand">
            <template v-slot="{ row }">
              <ul class="inner-box">
                <li>
                  <strong>商品ID:</strong>
                  <span>{{ row.id }}</span>
                </li>
                <li>
                  <strong>商品名称:</strong>
                  <span>{{ row.name }}</span>
                </li>
                <li>
                  <strong>所属分类:</strong>
                  <span>{{ row.category }}</span>
                </li>
                <li>
                  <strong>商品价格:</strong>
                  <span>{{ row.price }}</span>
                </li>
                <li>
                  <strong>商品图片:</strong>
                  <span>{{ row.imgUrl }}</span>
                </li>
                <li>
                  <strong>创建时间:</strong>
                  <span>{{ row.ctime }}</span>
                </li>
                <li>
                  <strong>商品评价:</strong>
                  <span>{{ row.rating }}</span>
                </li>
                <li>
                  <strong>商品销量:</strong>
                  <span>{{ row.sellCount }}</span>
                </li>
                <li>
                  <strong>商品描述:</strong>
                  <span>{{ row.goodsDesc }}</span>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name" width="180">
          </el-table-column>
          <el-table-column label="所属分类" prop="category"> </el-table-column>
          <el-table-column label="商品价格" prop="price"> </el-table-column>
          <el-table-column label="商品图片">
            <template v-slot="{ row }">
              <img
                :src="
                  'http://127.0.0.1:5000/upload/imgs/goods_img/' + row.imgUrl
                "
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column label="商品描述" prop="goodsDesc" width="200">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template>
              <el-button type="primary" size="mini">编辑</el-button>
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页渲染 -->
      </div>
    </template>
  </panel>
</template>

<script>
import moment from 'moment'
import panel from '../../components/panel/index.vue'
import { getAllgoods } from '../../api/goods.js'

export default {
  components: { panel },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      tableData: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const res = await getAllgoods({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      // console.log(res)
      // console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
      res.data.forEach(item => {
        item.ctime = moment(item.ctime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.tableData = res.data
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 60px;
}

.inner-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  li {
    font-size: 14px;
    margin: 5px 0;
    width: 50%;

    strong {
      margin-right: 10px;
    }
  }
}
</style>
