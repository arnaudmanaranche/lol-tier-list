import '../styles/index.css'
import '../dist/output.css'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' }
  }
}

export default preview
