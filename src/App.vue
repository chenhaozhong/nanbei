<!-- App.vue -->
<template>
  <a-config-provider>
    <div class="app-container">
      <header class="glass-header" :class="{ 'header-scrolled': isScrolled }">
        <div class="header-content">
          <div class="logo">
            <img src="./assets/logo2.png" alt="Logo" />
          </div>
          <a-menu mode="horizontal" :selected-keys="[currentRoute]">
            <a-menu-item key="/" @click="navigateTo('/')">首页</a-menu-item>
            <a-sub-menu key="/products" @click="navigateTo('/products')">
              <template #title>
                <span>产品中心</span>
                <icon-down />
              </template>
              <a-menu-item key="/products/building" @click="navigateTo('/products?category=building')">
                <icon-apps />
                钢化玻璃
              </a-menu-item>
              <a-menu-item key="/products/decoration" @click="navigateTo('/products?category=decoration')">
                <icon-palette />
                艺术玻璃
              </a-menu-item>
              <a-menu-item key="/products/special" @click="navigateTo('/products?category=special')">
                <icon-settings />
                防火玻璃
              </a-menu-item>
              <a-menu-item key="/products/custom" @click="navigateTo('/products?category=custom')">
                <icon-tools />
                尺寸定制
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="/news" @click="navigateTo('/news')">新闻资讯</a-menu-item>
            <a-menu-item key="/about" @click="navigateTo('/about')">关于我们</a-menu-item>
            <a-menu-item key="/technology" @click="navigateTo('/technology')">技术实力</a-menu-item>
            <a-menu-item key="/cases" @click="navigateTo('/cases')">工程案例</a-menu-item>
            <a-menu-item key="/contact" @click="navigateTo('/contact')">联系我们</a-menu-item>
          </a-menu>
          
          <!-- 语言切换组件 -->
          <div class="language-switcher">
            <div class="lang-toggle" @click="toggleLanguageDropdown">
              <div class="current-lang">
                <span class="lang-flag">🇨🇳</span>
                <span class="lang-text">{{ currentLanguage === 'zh' ? '中文' : 'English' }}</span>
                <icon-down :class="{ 'rotate': showLanguageDropdown }" />
              </div>
            </div>
            
            <!-- 语言下拉菜单 -->
            <div class="lang-dropdown" v-show="showLanguageDropdown">
              <div class="lang-option" @click="switchLanguage('zh')" :class="{ 'active': currentLanguage === 'zh' }">
                <span class="lang-flag">🇨🇳</span>
                <span class="lang-text">中文</span>
                <icon-check v-if="currentLanguage === 'zh'" />
              </div>
              <div class="lang-option" @click="switchLanguage('en')" :class="{ 'active': currentLanguage === 'en' }">
                <span class="lang-flag">🇺🇸</span>
                <span class="lang-text">English</span>
                <icon-check v-if="currentLanguage === 'en'" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <footer class="glass-footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>联系方式</h3>
            <p>电话：+86 XXX-XXXX-XXXX</p>
            <p>邮箱：contact@example.com</p>
            <p>地址：XX省XX市XX区XX路XX号</p>
          </div>
          <div class="footer-section">
            <h3>快速链接</h3>
            <a-space direction="vertical">
              <a @click="navigateTo('/products')">产品中心</a>
              <a @click="navigateTo('/about')">关于我们</a>
              <a @click="navigateTo('/contact')">联系我们</a>
            </a-space>
          </div>
          <div class="footer-section">
            <h3>关注我们</h3>
            <div class="qr-code">
              <!-- 替换为实际的二维码图片 -->
              <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=120&fit=crop" alt="QR Code" />
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 玻璃制品公司. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </a-config-provider>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IconDown, IconCheck } from '@arco-design/web-vue/es/icon'

const router = useRouter()
const route = useRoute()
const isScrolled = ref(false)
const currentRoute = ref(route.path)

// 语言切换相关状态
const currentLanguage = ref('zh')
const showLanguageDropdown = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const navigateTo = (path) => {
  router.push(path)
  currentRoute.value = path
}

// 切换语言下拉菜单显示状态
const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value
}

// 切换语言
const switchLanguage = (lang) => {
  currentLanguage.value = lang
  showLanguageDropdown.value = false
  // TODO: 这里后续可以添加实际的语言切换逻辑
  console.log('切换到语言:', lang)
}

// 点击外部关闭语言下拉菜单
const handleClickOutside = (event) => {
  const languageSwitcher = document.querySelector('.language-switcher')
  if (languageSwitcher && !languageSwitcher.contains(event.target)) {
    showLanguageDropdown.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
@import '@arco-design/web-vue/dist/arco.css';
@import 'animate.css';

:root {
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body main{
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.glass-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.header-scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo img {
  height: 45px;
  border-radius: 4px;
}

/* 导航菜单样式优化 */
:deep(.arco-menu) {
  background: transparent !important;
  border: none !important;
}

:deep(.arco-menu-item),
:deep(.arco-sub-menu-title) {
  color: #333 !important;
  font-weight: 500 !important;
  font-size: 15px !important;
  padding: 0 20px !important;
  height: 70px !important;
  line-height: 70px !important;
  transition: all 0.3s ease !important;
}

:deep(.arco-menu-item:hover),
:deep(.arco-sub-menu-title:hover) {
  color: #1890ff !important;
  background: rgba(24, 144, 255, 0.1) !important;
}

:deep(.arco-menu-item-selected) {
  color: #1890ff !important;
  background: rgba(24, 144, 255, 0.1) !important;
  border-bottom: 2px solid #1890ff !important;
}

:deep(.arco-sub-menu) {
  background: transparent !important;
}

:deep(.arco-sub-menu-popup) {
  background: white !important;
  border-radius: 8px !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
}

:deep(.arco-sub-menu-popup .arco-menu-item) {
  height: 50px !important;
  line-height: 50px !important;
  padding: 0 20px !important;
  color: #333 !important;
  font-size: 14px !important;
}

:deep(.arco-sub-menu-popup .arco-menu-item:hover) {
  background: #f5f5f5 !important;
  color: #1890ff !important;
}

:deep(.arco-sub-menu-popup .arco-menu-item-selected) {
  background: rgba(24, 144, 255, 0.1) !important;
  color: #1890ff !important;
  border-bottom: none !important;
}

:deep(.arco-sub-menu-title .arco-icon) {
  margin-left: 4px !important;
  font-size: 12px !important;
  transition: transform 0.3s ease !important;
}

:deep(.arco-sub-menu-open .arco-sub-menu-title .arco-icon) {
  transform: rotate(180deg) !important;
}

/* 语言切换组件样式 */
.language-switcher {
  position: relative;
  margin-left: 20px;
}

.lang-toggle {
  cursor: pointer;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.lang-toggle:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.current-lang {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.lang-flag {
  font-size: 16px;
}

.lang-text {
  min-width: 40px;
  text-align: center;
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 1001;
  min-width: 140px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.lang-option:last-child {
  border-bottom: none;
}

.lang-option:hover {
  background: rgba(24, 144, 255, 0.05);
}

.lang-option.active {
  background: rgba(24, 144, 255, 0.1);
  color: #1890ff;
}

.lang-option .lang-flag {
  font-size: 18px;
}

.lang-option .lang-text {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.lang-option .arco-icon {
  color: #1890ff;
  font-size: 16px;
}

.rotate {
  transform: rotate(180deg);
}

main {
  flex: 1;
  margin-top: 70px; /* 修复：与固定头部高度匹配 */
  padding: 20px;
}

.glass-footer {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 40px 0 20px;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-section h3 {
  margin-bottom: 20px;
  color: #333;
}

.footer-section a {
  color: #666;
  text-decoration: none;
  cursor: pointer;
}

.footer-section a:hover {
  color: #1890ff;
}

.qr-code img {
  width: 120px;
  height: 120px;
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
