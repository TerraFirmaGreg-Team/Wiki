import DefaultTheme from 'vitepress/theme'
import { inBrowser, type EnhanceAppContext } from 'vitepress'
import 'vitepress-plugin-mermaid-diagram/diagram-dark.css'
import DiagramPreview from 'vitepress-plugin-mermaid-diagram/DiagramPreview.vue'
import Layout from './components/Layout.vue'
import Recipe from './components/Recipe.vue'
import { persistLocaleFromPath } from './locale'
import { isStaticSitePathname } from './static-site'

function installStaticSiteRouter(router: EnhanceAppContext['router']) {
  let initialNavigation = true

  const previousOnBeforeRouteChange = router.onBeforeRouteChange
  router.onBeforeRouteChange = (href) => {
    if (previousOnBeforeRouteChange?.(href) === false) {
      return false
    }

    if (!inBrowser) {
      return
    }

    const { pathname } = new URL(href, window.location.origin)
    if (!isStaticSitePathname(pathname)) {
      return
    }

    if (initialNavigation) {
      return
    }

    window.location.assign(href)
    return false
  }

  const previousOnAfterRouteChange = router.onAfterRouteChange
  router.onAfterRouteChange = (to) => {
    initialNavigation = false
    previousOnAfterRouteChange?.(to)
  }
}

function installLocalePersistence(router: EnhanceAppContext['router']) {
  if (!inBrowser) {
    return
  }

  persistLocaleFromPath(window.location.pathname)

  const previousOnAfterRouteChange = router.onAfterRouteChange
  router.onAfterRouteChange = (to) => {
    previousOnAfterRouteChange?.(to)
    const { pathname } = new URL(to, window.location.origin)
    persistLocaleFromPath(pathname)
  }
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    app.component('Recipe', Recipe)
    app.component('DiagramPreview', DiagramPreview)
    installStaticSiteRouter(router)
    installLocalePersistence(router)
  },
}
