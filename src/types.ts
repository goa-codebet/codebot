export interface ISlashRequestBody {
  token: string
  team_id: string
  team_domain: string
  channel_id: string
  channel_name: string
  user_id: string
  user_name: string
  command: string
  text: string
  response_url: string
  trigger_id: string
}

export interface ISlashResponseBody {
  text: string
  response_type: 'in_channel' | 'ephemeral'
  attachments?: { text: string }[]
}

export interface ITask {
  name: string
  function: (instructions: string) => [string, boolean]
  guide: string
}
