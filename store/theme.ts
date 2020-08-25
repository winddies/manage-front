import { ThemeType } from '../constants/theme'

export type ThemeState = () => { theme: ThemeType }

export const state: ThemeState = () => ({
  theme: ThemeType.Sunny
})

export const mutations = {
  switchTheme: (state: { theme: ThemeType }, theme: ThemeType) => {
    state.theme = theme
    document.body.id = theme
  }
}
