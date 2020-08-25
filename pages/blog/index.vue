<template>
  <div class="blog">
    <div class="article-title">
      <span>标题</span>
      <a-input class="title-input" v-model="articleTitle" />
      <span class="gap">分类</span>
      <a-select v-model="tagInput" placeholder="请选择">
      </a-select>
      <a-button @click="handleContentSaveByExternal">保存</a-button>
      <a-button @click="getArticleList">获取列表</a-button>
    </div>
    <div class="editor">
      <no-ssr>
        <mavon-editor
          ref="md"
          :ishljs="true"
          codeStyle="atom-one-dark"
          v-model="articleContent"
          @save="handleContentSave"
        >
        </mavon-editor>
      </no-ssr>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { createArticle, getArticleSummaryList } from '../../api/blog'

@Component
export default class Blog extends Vue {
  articleContent: string = ''
  tagInput: string = ''
  articleTitle: string = ''

  handleContentSave(value: string, render: string) {
    createArticle({
      tag: this.tagInput,
      title: this.articleTitle,
      renderContent: render,
      rawContent: this.articleContent,
      desc: '',
      createTime: new Date().getTime()
    })
  }

  getArticleList() {
    getArticleSummaryList()
  }

  handleContentSaveByExternal() {
    this.handleContentSave((this.$refs.md as any).d_value, (this.$refs.md as any).value)
  }
}
</script>

<style lang="less">
.blog {
  height: 100%;
}
.article-title {
  height: 50px;
  margin-bottom: 16px;
  span {
    font-size: 16px;
    color: @editor-font-color;
  }
  .gap {
    margin-left: 16px;
  }
  .title-input {
    width: 300px;
  }
}

.editor {
  height: 100%;
  min-height: 450px;
  position: relative;
  .markdown-body {
    height: 100%;
    overflow: auto;
    .v-note-op {
      background-color: @editor-bg-color !important;
    }

    .v-note-edit {
      background-color: @editor-bg-color;
      .content-input-wrapper {
        background-color: @editor-bg-color !important;
      }
    }

    textarea.auto-textarea-input {
      background-color: @editor-bg-color;
      color: @editor-font-color;
    }

    .auto-textarea-wrapper .auto-textarea-input {
      font-family: huanghuangti;
      font-size: 16px;
    }
  }
}
</style>
