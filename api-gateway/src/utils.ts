import { version } from "../package.json"

export const getVersionApi = () => {
  return `v${version.substring(0, 1)}`
}