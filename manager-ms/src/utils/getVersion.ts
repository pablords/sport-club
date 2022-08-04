import { version } from "../../package.json"

const getVersionApi = () => {
  return `v${version.substring(0, 1)}`
}

export const apiVersion = getVersionApi()
