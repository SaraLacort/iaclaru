import { hydrateRoot } from 'react-dom/client'
import { App } from './App'

const root = document.getElementById('root')
if (!root) throw new Error('Expected #root in the generated HTML shell.')

hydrateRoot(root, <App pathname={window.location.pathname} />)
