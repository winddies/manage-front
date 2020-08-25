<template>
  <div class="container">
    <article-list />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getArticleList, IArticleList } from '../api/dashboard'
import ArticleList from '../components/dashboard/ArticleList.vue'

@Component({
  components: { ArticleList }
})
export default class Dashboard extends Vue {
  // list: IArticleList[] = []

  // fetchArticleList() {
  //   this.list = [{ title: 'test', post_id: '123', related_id: '345', tag: ['fda', 'fasdf'] }]
  // }

  // mounted() {
  //   this.fetchArticleList()
  // }
}
</script>

<style>
.container {
  margin: 0 auto;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
