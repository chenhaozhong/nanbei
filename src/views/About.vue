<!-- About.vue -->
<template>
  <div class="about">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>关于我们</h1>
      <p>专注玻璃制品二十余年，品质铸就未来</p>
    </div>

    <!-- 公司简介 -->
    <section class="company-intro section-block">
      <a-row align="center" :gutter="40">
        <a-col :span="12">
          <div class="section-content">
            <h2>公司简介</h2>
            <p>我们是一家专业从事玻璃制品研发、生产和销售的现代化企业，成立于2000年。二十余年来，公司始终秉承"质量第一、客户至上"的经营理念，致力于为客户提供高品质的玻璃产品和专业的技术服务。</p>
            <p>公司拥有先进的生产设备和专业的技术团队，产品涵盖建筑玻璃、装饰玻璃、特种玻璃等多个领域。我们的产品广泛应用于商业建筑、住宅工程、城市基础设施等项目中。</p>
            <a-row :gutter="16" class="company-stats">
              <a-col :span="8">
                <div class="stat-item">
                  <h3>20+</h3>
                  <p>年行业经验</p>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="stat-item">
                  <h3>1000+</h3>
                  <p>合作客户</p>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="stat-item">
                  <h3>50+</h3>
                  <p>技术专利</p>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="section-image">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop" alt="公司简介" />
          </div>
        </a-col>
      </a-row>
    </section>

    <!-- 发展历程 -->
    <section class="history section-block">
      <h2 class="section-title">发展历程</h2>
      <a-timeline>
        <a-timeline-item v-for="(item, index) in historyData" :key="index">
          <div class="history-item">
            <h3>{{ item.year }}</h3>
            <p>{{ item.content }}</p>
            <img v-if="item.image" :src="item.image" :alt="item.year" />
          </div>
        </a-timeline-item>
      </a-timeline>
    </section>

    <!-- 企业文化 -->
    <section class="culture section-block">
      <h2 class="section-title">企业文化</h2>
      <a-row :gutter="[24, 24]">
        <a-col :span="8" v-for="(item, index) in cultureData" :key="index">
          <a-card class="culture-card">
            <template #cover>
              <div class="culture-icon">
                <img :src="item.icon" :alt="item.title" />
              </div>
            </template>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </a-card>
        </a-col>
      </a-row>
    </section>

    <!-- 荣誉资质 -->
    <section class="certificates section-block">
      <h2 class="section-title">荣誉资质</h2>
      <a-carousel :auto-play="true" animation-name="card" show-arrow="hover" :style="{ width: '100%', height: '300px' }">
        <a-carousel-item v-for="(cert, index) in certificatesData" :key="index">
          <div class="certificate-item">
            <img :src="cert.image" :alt="cert.name" />
            <h4>{{ cert.name }}</h4>
          </div>
        </a-carousel-item>
      </a-carousel>
    </section>

    <!-- 合作伙伴 -->
    <section class="partners section-block">
      <h2 class="section-title">合作伙伴</h2>
      <div class="partners-grid">
        <div v-for="(partner, index) in partnersData" :key="index" class="partner-item">
          <img :src="partner.logo" :alt="partner.name" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const historyData = ref([
  {
    year: '2000年',
    content: '公司成立，开始玻璃制品生产',
    image: 'https://www.deli1996.com/uploadfile/202505/37648c780d6eef.jpg'
  },
  {
    year: '2005年',
    content: '引进德国先进生产线，扩大生产规模',
    image: 'https://www.deli1996.com/uploadfile/202308/245f5cfc1716294.jpg'
  },
  {
    year: '2010年',
    content: '获得国家高新技术企业认证',
    image: 'https://www.deli1996.com/uploadfile/202308/8a6e3f939faeec9.jpg'
  },
  {
    year: '2015年',
    content: '成立研发中心，加大技术创新投入',
    image: 'https://www.deli1996.com/uploadfile/202308/7344dd3eb2538a.jpg'
  },
  {
    year: '2020年',
    content: '智能化工厂建成投产',
    image: 'https://www.deli1996.com/uploadfile/202505/37648c780d6eef.jpg'
  },
  {
    year: '2024年',
    content: '推出新一代环保节能玻璃产品',
    image: 'https://www.deli1996.com/uploadfile/202308/245f5cfc1716294.jpg'
  }
])

const cultureData = ref([
  {
    icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop',
    title: '质量至上',
    description: '严格把控每一个生产环节，确保产品品质'
  },
  {
    icon: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=80&fit=crop',
    title: '创新驱动',
    description: '持续投入研发，推动技术创新'
  },
  {
    icon: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=80&h=80&fit=crop',
    title: '服务为本',
    description: '以客户需求为导向，提供专业解决方案'
  }
])

const certificatesData = ref([
  {
    name: 'ISO9001质量管理体系认证',
    image: 'https://www.deli1996.com/uploadfile/202308/7344dd3eb2538a.jpg'
  },
  {
    name: '国家高新技术企业证书',
    image: 'https://www.deli1996.com/uploadfile/202308/245f5cfc1716294.jpg'
  },
  {
    name: '中国玻璃行业优秀企业',
    image: 'https://www.deli1996.com/uploadfile/202308/8a6e3f939faeec9.jpg'
  }
])

const partnersData = ref([
  {
    name: '合作伙伴1',
    logo: 'https://www.deli1996.com/uploadfile/202505/37648c780d6eef.jpg'
  },
  {
    name: '合作伙伴2',
    logo: 'https://www.deli1996.com/uploadfile/202308/245f5cfc1716294.jpg'
  },
  {
    name: '合作伙伴3',
    logo: 'https://www.deli1996.com/uploadfile/202308/8a6e3f939faeec9.jpg'
  },
  {
    name: '合作伙伴4',
    logo: 'https://www.deli1996.com/uploadfile/202308/7344dd3eb2538a.jpg'
  }
])
</script>

<style scoped>
.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 120px; /* 调整顶部间距为120px */
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-header h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 18px;
  color: #666;
}

.section-block {
  margin-bottom: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 40px;
}

.section-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 40px;
}

.section-content h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.section-content p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
}

.section-image {
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
}

.section-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.company-stats {
  margin-top: 40px;
}

.stat-item {
  text-align: center;
  padding: 20px;
}

.stat-item h3 {
  font-size: 36px;
  color: #1890ff;
  margin-bottom: 10px;
}

.stat-item p {
  color: #666;
  margin: 0;
}

.history-item {
  padding: 20px;
}

.history-item h3 {
  font-size: 20px;
  color: #1890ff;
  margin-bottom: 10px;
}

.history-item p {
  color: #666;
  margin-bottom: 10px;
}

.history-item img {
  width: 100%;
  max-width: 300px;
  border-radius: 4px;
}

.culture-card {
  height: 100%;
  text-align: center;
}

.culture-icon {
  padding: 30px;
}

.culture-icon img {
  width: 80px;
  height: 80px;
}

.culture-card h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.culture-card p {
  color: #666;
}

.certificate-item {
  text-align: center;
  padding: 20px;
}

.certificate-item img {
  height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
}

.certificate-item h4 {
  color: #333;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
  align-items: center;
}

.partner-item {
  text-align: center;
  padding: 20px;
}

.partner-item img {
  max-width: 120px;
  height: auto;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.partner-item:hover img {
  filter: grayscale(0%);
}

@media (max-width: 768px) {
  .section-block {
    padding: 20px;
  }

  .section-image {
    height: 300px;
    margin-top: 20px;
  }

  .partners-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}
</style> 