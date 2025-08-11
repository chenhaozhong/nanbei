<!-- Home.vue -->
<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
      <a-carousel class="hero-carousel" animation-name="fade" show-arrow="hover" :auto-play="true">
        <a-carousel-item v-for="(slide, index) in heroSlides" :key="index">
          <div class="carousel-content" :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.image})` }">
            <div class="carousel-text animate__animated" :class="activeSlideAnimation">
              <h1>{{ slide.title }}</h1>
              <p>{{ slide.description }}</p>
              <a-button type="primary" size="large" shape="round" @click="navigateTo(slide.link)">
                了解更多
                <template #icon>
                  <icon-right />
                </template>
              </a-button>
            </div>
          </div>
        </a-carousel-item>
      </a-carousel>
    </section>

    <!-- Product Categories -->
    <section class="product-categories section-block">
      <div class="section-header">
        <h2 class="section-title">产品中心</h2>
        <p class="section-subtitle">专业定制，品质保证</p>
      </div>
      <div class="categories-grid">
        <div v-for="category in productCategories" :key="category.id" 
             class="category-card glass-effect" 
             @click="navigateTo(`/products#${category.id}`)"
             @mouseenter="animateCard">
          <div class="category-image">
            <img :src="category.image" :alt="category.name" />
          </div>
          <div class="category-content">
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
            <a-button type="text">
              查看详情
              <template #icon>
                <icon-right />
              </template>
            </a-button>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Intro -->
    <section class="company-intro section-block">
      <div class="intro-content">
        <div class="intro-text">
          <h2>关于我们</h2>
          <div class="divider"></div>
          <p>我们是专业的玻璃制品制造商，拥有二十余年的行业经验。专注于建筑玻璃、装饰玻璃、特种玻璃等产品的研发、生产与销售。</p>
          <div class="intro-features">
            <div class="feature-item">
              <icon-check-circle />
              <span>专业定制</span>
            </div>
            <div class="feature-item">
              <icon-check-circle />
              <span>品质保证</span>
            </div>
            <div class="feature-item">
              <icon-check-circle />
              <span>快速交付</span>
            </div>
          </div>
          <a-button type="outline" size="large" shape="round" @click="navigateTo('/about')">
            了解更多
          </a-button>
        </div>
        <div class="intro-image glass-effect">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop" alt="Company" />
        </div>
      </div>
    </section>

    <!-- Latest News -->
    <section class="latest-news section-block">
      <div class="section-header">
        <h2 class="section-title">新闻资讯</h2>
        <p class="section-subtitle">了解最新公司动态和行业资讯</p>
      </div>
      <div class="news-grid">
        <a-card v-for="news in latestNews" :key="news.id" 
                class="news-card glass-effect" 
                @click="navigateTo(`/news/${news.id}`)">
          <div class="news-image">
            <img :src="news.image" :alt="news.title" />
            <div class="news-date">
              <span class="day">{{ formatDate(news.date).day }}</span>
              <span class="month">{{ formatDate(news.date).month }}</span>
            </div>
          </div>
          <div class="news-content">
            <h3>{{ news.title }}</h3>
            <p>{{ news.summary }}</p>
            <div class="news-footer">
              <a-tag>{{ news.category }}</a-tag>
              <span class="news-more">阅读更多</span>
            </div>
          </div>
        </a-card>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="contact-overlay"></div>
      <div class="contact-content">
        <h2>寻找专业的玻璃解决方案？</h2>
        <p>我们的专家团队随时为您提供支持</p>
        <a-button type="primary" size="large" shape="round" @click="navigateTo('/contact')">
          立即咨询
          <template #icon>
            <icon-right />
          </template>
        </a-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { IconRight, IconCheckCircle } from '@arco-design/web-vue/es/icon'
import gsap from 'gsap'
import 'animate.css'

const router = useRouter()
const activeSlideAnimation = ref('animate__fadeIn')

const heroSlides = ref([
  {
    image: 'https://www.deli1996.com/uploadfile/202505/37648c780d6eef.jpg',
    title: '创新玻璃解决方案',
    description: '为您的建筑项目提供高品质玻璃产品',
    link: '/products'
  },
  {
    image: 'https://www.deli1996.com/uploadfile/202308/245f5cfc1716294.jpg',
    title: '专业技术支持',
    description: '二十余年玻璃制造经验，品质保证',
    link: '/technology'
  },
  {
    image: 'https://www.deli1996.com/uploadfile/202308/8a6e3f939faeec9.jpg',
    title: '定制化服务',
    description: '根据您的需求，提供个性化玻璃解决方案',
    link: '/contact'
  }
])

const productCategories = ref([
  {
    id: 'building',
    name: '建筑玻璃',
    description: '高性能建筑玻璃，满足各类建筑需求',
    image: 'https://www.deli1996.com/uploadfile/202308/7344dd3eb2538a.jpg'
  },
  {
    id: 'decoration',
    name: '装饰玻璃',
    description: '美观实用的装饰玻璃，提升空间品质',
    image: 'https://www.deli1996.com/uploadfile/202308/245f5cfc1716294.jpg'
  },
  {
    id: 'special',
    name: '特种玻璃',
    description: '特殊用途玻璃，性能卓越',
    image: 'https://www.deli1996.com/uploadfile/202308/8a6e3f939faeec9.jpg'
  },
  {
    id: 'custom',
    name: '定制玻璃',
    description: '根据需求定制，独特解决方案',
    image: 'https://www.deli1996.com/uploadfile/202505/37648c780d6eef.jpg'
  }
])

const latestNews = ref([
  {
    id: 1,
    title: '公司参加2024国际玻璃展览会',
    summary: '我司携最新产品亮相国际玻璃展览会，展示创新技术与解决方案...',
    date: '2024-03-15',
    image: 'https://www.deli1996.com/uploadfile/202505/37648c780d6eef.jpg',
    category: '公司动态'
  },
  {
    id: 2,
    title: '新型环保玻璃产品发布',
    summary: '推出新一代环保节能玻璃，助力绿色建筑发展...',
    date: '2024-03-10',
    image: 'https://www.deli1996.com/uploadfile/202308/245f5cfc1716294.jpg',
    category: '产品创新'
  },
  {
    id: 3,
    title: '荣获行业技术创新奖',
    summary: '公司研发团队凭借创新技术获得行业权威奖项...',
    date: '2024-03-05',
    image: 'https://www.deli1996.com/uploadfile/202308/8a6e3f939faeec9.jpg',
    category: '企业荣誉'
  }
])

const navigateTo = (path) => {
  router.push(path)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return {
    day: date.getDate(),
    month: date.toLocaleString('zh-CN', { month: 'short' })
  }
}

const animateCard = (event) => {
  const card = event.currentTarget
  gsap.to(card, {
    scale: 1.02,
    duration: 0.3,
    ease: 'power2.out'
  })
}

onMounted(() => {
  // 添加滚动动画
  gsap.from('.section-block', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.section-block',
      start: 'top 80%'
    }
  })
})
</script>

<style scoped>
.home {
  overflow: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  padding-top: 120px; /* 调整顶部间距为120px */
}

.hero-carousel {
  height: 100%;
}

.carousel-content {
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0 10%;
}

.carousel-text {
  max-width: 600px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.carousel-text h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.carousel-text p {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
}

/* Section Blocks */
.section-block {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 36px;
  color: #333;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: #666;
}

/* Glass Effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
}

/* Product Categories */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.category-card {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-image {
  height: 200px;
  overflow: hidden;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-card:hover .category-image img {
  transform: scale(1.1);
}

.category-content {
  padding: 24px;
}

.category-content h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 12px;
}

.category-content p {
  color: #666;
  margin-bottom: 16px;
}

/* Company Intro */
.intro-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.intro-text h2 {
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
}

.divider {
  width: 60px;
  height: 4px;
  background: #1890ff;
  margin-bottom: 20px;
}

.intro-features {
  margin: 30px 0;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: #333;
}

.feature-item :deep(.arco-icon) {
  color: #1890ff;
  margin-right: 12px;
}

.intro-image {
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
}

.intro-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* News Section */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.news-card {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.news-image {
  position: relative;
  height: 240px;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-date {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.news-date .day {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.news-date .month {
  display: block;
  font-size: 14px;
  color: #666;
}

.news-content {
  padding: 24px;
}

.news-content h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 12px;
}

.news-content p {
  color: #666;
  margin-bottom: 16px;
  line-height: 1.6;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-more {
  color: #1890ff;
  font-size: 14px;
}

/* Contact Section */
.contact-section {
  position: relative;
  height: 300px;
  background-image: url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200&h=300&fit=crop');
  background-size: cover;
  background-position: center;
  margin-top: 80px;
}

.contact-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.contact-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
}

.contact-content h2 {
  font-size: 36px;
  margin-bottom: 16px;
}

.contact-content p {
  font-size: 18px;
  margin-bottom: 30px;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .carousel-text h1 {
    font-size: 32px;
  }

  .carousel-text p {
    font-size: 16px;
  }

  .intro-content {
    grid-template-columns: 1fr;
  }

  .intro-image {
    height: 300px;
    margin-top: 20px;
  }

  .section-block {
    padding: 40px 20px;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style> 