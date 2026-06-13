import DefaultTheme from 'vitepress/theme'
import { inBrowser, type EnhanceAppContext } from 'vitepress'
import staticSitesConfig from '../../ci/static-sites.json'
import { persistLocaleFromPath, rewritePathToContentLocale } from './locale'

const STATIC_SITE_PREFIXES = (staticSitesConfig.sites ?? []).map((site) => {
  const path = String(site.publicPath).replace(/\/$/, '')
  return `${path}/`
})

function isStaticSitePath(pathname: string): boolean {
  return STATIC_SITE_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

function installStaticSiteRouter(router: EnhanceAppContext['router']) {
  const previousOnBeforeRouteChange = router.onBeforeRouteChange
  router.onBeforeRouteChange = (href) => {
    if (previousOnBeforeRouteChange?.(href) === false) {
      return false
    }

    if (!inBrowser) {
      return
    }

    const { pathname } = new URL(href, window.location.origin)
    if (isStaticSitePath(pathname)) {
      window.location.assign(href)
      return false
    }
  }
}

function redirectToContentLocale(pathname: string): boolean {
  const rewritten = rewritePathToContentLocale(pathname)
  if (rewritten === pathname) {
    return false
  }

  window.location.replace(`${rewritten}${window.location.search}${window.location.hash}`)
  return true
}

function installContentLocaleFallback(router: EnhanceAppContext['router']) {
  if (!inBrowser) {
    return
  }

  if (redirectToContentLocale(window.location.pathname)) {
    return
  }

  const previousOnBeforeRouteChange = router.onBeforeRouteChange
  router.onBeforeRouteChange = (href) => {
    if (previousOnBeforeRouteChange?.(href) === false) {
      return false
    }

    const { pathname } = new URL(href, window.location.origin)
    if (redirectToContentLocale(pathname)) {
      return false
    }
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
  enhanceApp({ router }) {
    installStaticSiteRouter(router)
    installContentLocaleFallback(router)
    installLocalePersistence(router)
  },
}
