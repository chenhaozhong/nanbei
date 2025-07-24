<!-- Technology.vue -->
<template>
  <div class="technology">
    <div class="page-header">
      <h1>技术实力</h1>
      <p>持续创新，追求卓越</p>
    </div>

    <!-- 核心技术 -->
    <section class="core-tech section-block">
      <h2 class="section-title">核心技术</h2>
      <a-row :gutter="[24, 24]">
        <a-col :span="8" v-for="(tech, index) in coreTechnologies" :key="index">
          <div class="tech-card" @mouseenter="animateTechCard($event)">
            <div class="tech-icon">
              <img :src="tech.icon" :alt="tech.title" />
            </div>
            <h3>{{ tech.title }}</h3>
            <p>{{ tech.description }}</p>
          </div>
        </a-col>
      </a-row>
    </section>

    <!-- 研发设备 -->
    <section class="equipment section-block">
      <h2 class="section-title">先进设备</h2>
      <a-carousel class="equipment-carousel" :autoPlay="true">
        <a-carousel-item v-for="(item, index) in equipment" :key="index">
          <div class="equipment-item">
            <img :src="item.image" :alt="item.name" />
            <div class="equipment-info">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </a-carousel-item>
      </a-carousel>
    </section>

    <!-- 质量控制 -->
    <section class="quality-control section-block">
      <h2 class="section-title">质量控制</h2>
      <div class="process-flow">
        <a-steps>
          <a-step v-for="(step, index) in qualitySteps" :key="index" :title="step.title">
            <template #description>
              <p>{{ step.description }}</p>
            </template>
          </a-step>
        </a-steps>
      </div>
    </section>

    <!-- 研发团队 -->
    <section class="rd-team section-block">
      <h2 class="section-title">研发团队</h2>
      <div class="team-stats">
        <a-row :gutter="[24, 24]">
          <a-col :span="8" v-for="(stat, index) in teamStats" :key="index">
            <div class="stat-card">
              <h3>{{ stat.number }}</h3>
              <p>{{ stat.label }}</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </section>

    <!-- 技术认证 -->
    <section class="certifications section-block">
      <h2 class="section-title">技术认证</h2>
      <div class="cert-grid">
        <div v-for="(cert, index) in certifications" :key="index" class="cert-item">
          <img :src="cert.image" :alt="cert.name" />
          <h4>{{ cert.name }}</h4>
          <p>{{ cert.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'

// 核心技术数据
const coreTechnologies = ref([
  {
    icon: '../assets/tech/tech-icon1.svg',
    title: '钢化技术',
    description: '采用先进的钢化工艺，提高玻璃强度和安全性能'
  },
  {
    icon: '../assets/tech/tech-icon2.svg',
    title: '镀膜技术',
    description: '精密镀膜技术，实现玻璃的节能、防紫外线等特殊功能'
  },
  {
    icon: '../assets/tech/tech-icon3.svg',
    title: '智能调光',
    description: '创新调光技术，实现玻璃透明度的智能控制'
  }
])

// 设备数据
const equipment = ref([
  {
    image: 'https://www.deli1996.com/uploadfile/202505/37648c780d6eef.jpg',
    name: '全自动钢化生产线',
    description: '德国进口设备，精确控制钢化过程，确保产品质量'
  },
  {
    image: 'https://www.deli1996.com/uploadfile/202308/245f5cfc1716294.jpg',
    name: '镀膜设备',
    description: '先进的真空镀膜设备，提供高品质镀膜玻璃'
  },
  {
    image: 'https://www.deli1996.com/uploadfile/202308/8a6e3f939faeec9.jpg',
    name: '智能检测系统',
    description: 'AI辅助质量检测，确保每片玻璃的完美品质'
  }
])

// 质量控制步骤
const qualitySteps = ref([
  {
    title: '原材料检验',
    description: '严格筛选供应商，确保原材料品质'
  },
  {
    title: '生产过程控制',
    description: '全程监控生产参数，实时调整工艺'
  },
  {
    title: '成品检验',
    description: '多重检测标准，确保产品合格'
  },
  {
    title: '包装运输',
    description: '专业包装，确保产品安全送达'
  }
])

// 团队统计
const teamStats = ref([
  {
    number: '50+',
    label: '研发人员'
  },
  {
    number: '20+',
    label: '技术专利'
  },
  {
    number: '15+',
    label: '行业经验'
  }
])

// 技术认证
const certifications = ref([
  {
    image: '../assets/tech/cert1.jpg',
    name: 'ISO9001认证',
    description: '国际质量管理体系认证'
  },
  {
    image: '../assets/tech/cert2.jpg',
    name: '国家高新技术企业',
    description: '技术创新能力认证'
  },
  {
    image: '../assets/tech/cert3.jpg',
    name: '产品质量认证',
    description: '产品性能和安全认证'
  }
])

// 技术卡片动画
const animateTechCard = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement
  gsap.to(card, {
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.out'
  })
}
</script>

<style scoped>
.technology {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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

/* 核心技术卡片 */
.tech-card {
  text-align: center;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.tech-icon {
  margin-bottom: 20px;
}

.tech-icon img {
  width: 64px;
  height: 64px;
}

.tech-card h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.tech-card p {
  color: #666;
  line-height: 1.6;
}

/* 设备展示 */
.equipment-carousel {
  height: 400px;
}

.equipment-item {
  position: relative;
  height: 100%;
}

.equipment-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.equipment-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  border-radius: 0 0 8px 8px;
}

.equipment-info h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

/* 质量控制流程 */
.process-flow {
  padding: 20px 0;
}

/* 团队统计 */
.stat-card {
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 8px;
}

.stat-card h3 {
  font-size: 36px;
  color: #1890ff;
  margin-bottom: 10px;
}

.stat-card p {
  color: #666;
  font-size: 16px;
}

/* 技术认证 */
.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.cert-item {
  text-align: center;
  padding: 20px;
}

.cert-item img {
  width: 200px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 15px;
}

.cert-item h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.cert-item p {
  color: #666;
}

@media (max-width: 768px) {
  .section-block {
    padding: 20px;
  }

  .equipment-carousel {
    height: 300px;
  }

  .cert-grid {
    grid-template-columns: 1fr;
  }
}
</style> 