import qs from 'qs'

export function queryBugList(data, options) {
  return this.$axios('/dev/bug/num', data, options)
}
