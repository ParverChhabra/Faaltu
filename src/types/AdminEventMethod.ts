export interface Parameter {
  name: string
  type: string
  required: boolean
  description?: string
}

export interface AdminEventMethod {
  name: string
  description: string
  httpMethod: string
  endpoint: string
  parameters?: Parameter[]
  exampleCode?: string
}