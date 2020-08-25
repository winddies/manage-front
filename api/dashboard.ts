import axios from 'axios'
import { generalPrefix } from '../constants/api'

export interface IArticleList {
  // id: string
  related_id: string
  post_id: string
  tag: string[]
  title: string
  // desc: string
  createTime: number
  putTime: string
}

export function getArticleList(): Promise<IArticleList[]> {
  return axios.get(`${generalPrefix}/article/list`)
}
