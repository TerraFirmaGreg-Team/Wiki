import DefaultTheme from 'vitepress/theme'
import { inBrowser, type EnhanceAppContext } from 'vitepress'
import staticSitesConfig from '../../ci/static-sites.json'

const STATIC_SITE_PREFIXES = (staticSitesConfig.sites ?? []).map((site) => {
  const path = String(site.publicPath).replace(/\/$/, '')
  return `${path}/`
})

function isStaticSitePath(pathname: string): boolean {
  return STATIC_SITE_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

function installStaticSiteRouter(router: EnhanceAppContext['router']) {
  router.onBeforeRouteChange = (href) => {
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

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    installStaticSiteRouter(router)
  },
}
