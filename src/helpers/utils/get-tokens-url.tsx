const ID_TOKEN = 'id_token'
const ACCESS_TOKEN = 'access_token'
const EXPIRES_IN = 'expires_in'
const TOKEN_TYPE = 'token_type'

type UrlData = {
  [ID_TOKEN]?: string
  [ACCESS_TOKEN]?: string
  [EXPIRES_IN]?: string
  [TOKEN_TYPE]?: string
}

const getTokensUrl = (str: string): UrlData =>
  str.split('&').reduce((_acc, urlData) => {
    const splitData = urlData.split('=')
    return { ..._acc, [splitData[0]]: splitData[1] }
  }, {})

export default getTokensUrl
