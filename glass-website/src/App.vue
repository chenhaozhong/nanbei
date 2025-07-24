<!-- App.vue -->
<template>
  <a-config-provider>
    <div class="app-container">
      <header class="glass-header" :class="{ 'header-scrolled': isScrolled }">
        <div class="header-content">
          <div class="logo">
            <img src="./assets/logo.png" alt="Logo" />
          </div>
          <a-menu mode="horizontal" :selected-keys="[currentRoute]">
            <a-menu-item key="/" @click="navigateTo('/')">首页</a-menu-item>
            <a-menu-item key="/products" @click="navigateTo('/products')">产品中心</a-menu-item>
            <a-menu-item key="/news" @click="navigateTo('/news')">新闻资讯</a-menu-item>
            <a-menu-item key="/about" @click="navigateTo('/about')">关于我们</a-menu-item>
            <a-menu-item key="/technology" @click="navigateTo('/technology')">技术实力</a-menu-item>
            <a-menu-item key="/cases" @click="navigateTo('/cases')">工程案例</a-menu-item>
            <a-menu-item key="/contact" @click="navigateTo('/contact')">联系我们</a-menu-item>
          </a-menu>
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
              <img src="./assets/qrcode.png" alt="QR Code" />
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

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isScrolled = ref(false)
const currentRoute = ref(route.path)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const navigateTo = (path: string) => {
  router.push(path)
  currentRoute.value = path
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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

body {
  margin: 0;
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
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: var(--glass-bg);
  border-bottom: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

.header-scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo img {
  height: 40px;
}

main {
  flex: 1;
  margin-top: 64px;
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
