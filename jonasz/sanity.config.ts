import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Jonasz',

  projectId: 'ituyeb7l',
  dataset: 'jonasz',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
