<template>
  <a-table :columns="columns" :data-source="list">

  </a-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { columns } from '../../constants/dashboard'
import { IArticleList } from 'api/dashboard'

@Component
export default class ArticleList extends Vue {
  list: IArticleList[] = [{ title: 'test', post_id: '123', related_id: '345', tag: ['fda', 'fasdf'], createTime: 123234, putTime: '23423423' }]
  columns = columns
  // mounted() {
  //   this.list = [{ title: 'test', post_id: '123', related_id: '345', tag: ['fda', 'fasdf'] }]
  // }

}

</script>

<style lang="less" scoped>

</style>
