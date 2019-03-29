export interface ISlashRequest {
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

export interface ISlashResponse {
  text?: string
  response_type?: 'in_channel' | 'ephemeral'
  attachments?: { [key: string]: any }[]
}

export interface ITaskFunctionParams {
  parameters: string[]
  flags: { [key: string]: string }
}

export interface ITask {
  name: string
  function: (
    taskFunctionParams: ITaskFunctionParams,
    slashRequest: ISlashRequest,
  ) => ISlashResponse
  validate: (params: {
    parameters: string[]
    flags: { [key: string]: string }
  }) => string | null
  guide: string
}

export interface IInteractivityPayload {
  type: string
  actions: ({
    name: string
    type: string
    value: string
  })[]
  callback_id: string
  team: {
    id: string
    domain: string
  }
  channel: {
    id: string
    name: string
  }
  user: {
    id: string
    name: string
  }
  action_ts: string
  message_ts: string
  attachment_id: string
  token: string
  is_app_unfurl: boolean
  response_url: string
  trigger_id: string
}

export interface IInteractivityResponse {
  text: string
  replace_original?: boolean
  response_type?: 'in_channel' | 'ephemeral'
}
