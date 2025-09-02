import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'ituyeb7l',
  dataset: 'jonasz',
  apiVersion: '2025-09-02',
  useCdn: true,
})
