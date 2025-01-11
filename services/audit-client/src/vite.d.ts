declare module '*?url' {
  const url: string
  export default url
}

declare module '*?raw' {
  const raw: string
  export default raw
}

declare module '*?component' {
  import type { Component } from 'vue'

  const component: Component
  export default component
}

declare module '*.svg' {
  import type { Component } from 'vue'

  const component: Component
  export default component
}

declare module '*.json' {
  const json: Record<string, any>
  export default json
}
