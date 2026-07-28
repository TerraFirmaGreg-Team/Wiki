---
layout: doc
title: TerraFirmaGreg Wiki
aside: false
outline: false
---

<div class="tfg-home-hero">
  <h1 class="tfg-hero-name">TerraFirmaGreg Wiki</h1>
  <p class="tfg-hero-tagline">Survival Modpack As It Should've Been</p>
  <div class="tfg-hero-actions">
    <a class="tfg-btn tfg-btn-brand" href="https://www.curseforge.com/members/terrafirmagreg/projects" target="_blank">CurseForge 下载</a>
    <a class="tfg-btn tfg-btn-alt" href="https://terrafirmagreg.team" target="_blank">访问官网</a>
  </div>
</div>

<div class="tfg-features">
  <a class="tfg-feature" href="/modern/zh_cn/upgrade-guides/from-0.12-to-0.13">
    <h3>升级指南</h3>
    <p>跨主版本升级存档的逐步操作说明。</p>
    <span class="tfg-feature-link">0.12 → 0.13 升级指南</span>
  </a>
  <a class="tfg-feature" href="/modern/zh_cn/major-changelogs/0.13">
    <h3>主版本更新日志</h3>
    <p>每个主版本的新内容、新机制与显著变化一览。</p>
    <span class="tfg-feature-link">查看 0.13 更新</span>
  </a>
  <a class="tfg-feature" href="/modern/zh_cn/modpack/optional-mods">
    <h3>推荐附加模组</h3>
    <p>默认未打包但与 TFG 兼容、值得一试的扩展模组。</p>
    <span class="tfg-feature-link">查看清单</span>
  </a>
  <a class="tfg-feature" href="/modern/zh_cn/developer/cheat-sheet">
    <h3>开发者文档</h3>
    <p>团队成员与贡献者的内部文档。</p>
    <span class="tfg-feature-link">打开 KubeJS 速查表</span>
  </a>
</div>

<p class="tfg-discord">想看更多内容、或者只是来玩玩？ 欢迎加入我们的 <a href="https://discord.com/invite/AEaCzCTUwQ" target="_blank">Discord</a>。</p>

<style>
.tfg-home-hero {
  text-align: center;
  padding: 16px 0 32px;
}

.tfg-hero-name {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.4px;
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

.tfg-hero-tagline {
  font-size: clamp(16px, 3vw, 20px);
  color: var(--vp-c-text-2);
  margin-top: 12px;
}

.tfg-hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.tfg-btn {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}
.tfg-btn:hover { text-decoration: none; }

.tfg-btn.tfg-btn-brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}
.tfg-btn.tfg-btn-brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}

.tfg-btn.tfg-btn-alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}
.tfg-btn.tfg-btn-alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.tfg-features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 32px 0;
}
@media (min-width: 640px) {
  .tfg-features {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tfg-feature {
  display: block;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  padding: 24px;
  text-decoration: none !important;
  color: inherit;
  transition: border-color 0.25s;
}
.tfg-feature:hover {
  border-color: var(--vp-c-brand);
  text-decoration: none !important;
}

.tfg-feature h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
}

.tfg-feature p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 12px;
  line-height: 1.5;
}

.tfg-feature-link {
  font-size: 13px;
  color: var(--vp-c-brand);
  font-weight: 500;
}

.tfg-discord {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-top: 24px;
}
</style>
