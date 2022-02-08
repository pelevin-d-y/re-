const logInLink =
  'https://strata.auth.us-east-1.amazoncognito.com/login?client_id=4i8sdfh90s4gutrec91couh6e5&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://app.strata.cc'

const LS_ID_TOKEN = 'strata_id_token'
const getAvatarUrl = (id: string): string =>
  `https://d1vi0xe0gbvwgr.cloudfront.net/contact_images/${id}.jpg`

export { logInLink, LS_ID_TOKEN, getAvatarUrl }
