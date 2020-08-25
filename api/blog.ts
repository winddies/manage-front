import axios from 'axios'
import { authPrefix, generalPrefix } from '../constants/api'

export interface ArticleDetail {
  rawContent: string
  renderContent: string
  tag: string
  title: string
  desc: string
  createTime: number
  updateTime?: number
}

export function createArticle(options: ArticleDetail) {
  return axios.post(`${authPrefix}/article/new`, options)
}

export interface ArticleList {
  id: string
  tag: string
  title: string
  desc: string
  createTime: number
  updateTime?: number
}

export function getArticleSummaryList(): Promise<ArticleList[]> {
  return axios.get(`${generalPrefix}/article/list`)
}
