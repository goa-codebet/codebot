import { WebClient } from '@slack/web-api'
const token = process.env.SLACK_BOT_OAUTH_ACCESS_TOKEN
export default new WebClient(token)
