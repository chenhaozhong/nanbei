<!-- Products.vue -->
<template>
  <div class="products">
    <div class="page-header">
      <h1>产品中心</h1>
      <p>专业玻璃制品解决方案</p>
    </div>

    <!-- 产品分类导航 -->
    <div class="category-nav">
      <a-tabs :active-key="activeCategory" @tab-click="handleCategoryChange">
        <a-tab-pane key="building" title="建筑玻璃">
          <div class="category-description">
            <h2>建筑玻璃</h2>
            <p>高性能建筑玻璃，满足各类建筑需求，包括钢化玻璃、中空玻璃、夹层玻璃等。</p>
          </div>
        </a-tab-pane>
        <a-tab-pane key="decoration" title="装饰玻璃">
          <div class="category-description">
            <h2>装饰玻璃</h2>
            <p>美观实用的装饰玻璃，提升空间品质，包括艺术玻璃、彩绘玻璃、磨砂玻璃等。</p>
          </div>
        </a-tab-pane>
        <a-tab-pane key="special" title="特种玻璃">
          <div class="category-description">
            <h2>特种玻璃</h2>
            <p>特殊用途玻璃，性能卓越，包括防火玻璃、防弹玻璃、智能调光玻璃等。</p>
          </div>
        </a-tab-pane>
        <a-tab-pane key="custom" title="定制玻璃">
          <div class="category-description">
            <h2>定制玻璃</h2>
            <p>根据需求定制，提供独特解决方案，满足特殊规格和性能要求。</p>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

    <!-- 产品列表 -->
    <div class="products-grid">
      <a-card v-for="product in filteredProducts" :key="product.id" class="product-card">
        <template #cover>
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
        </template>
        <template #title>{{ product.name }}</template>
        <template #extra>
          <a-tag :color="product.category === activeCategory ? 'blue' : 'gray'">
            {{ getCategoryName(product.category) }}
          </a-tag>
        </template>
        <p class="product-description">{{ product.description }}</p>
        <template #actions>
          <a-button type="primary" @click="showProductDetails(product)">查看详情</a-button>
        </template>
      </a-card>
    </div>

    <!-- 产品详情弹窗 -->
    <a-modal
      v-model:visible="detailModalVisible"
      :title="selectedProduct?.name"
      @cancel="closeProductDetails"
      :footer="null"
      width="800px"
    >
      <div v-if="selectedProduct" class="product-details">
        <a-carousel class="product-carousel">
          <a-carousel-item v-for="(image, index) in selectedProduct.images" :key="index">
            <img :src="image" :alt="selectedProduct.name" />
          </a-carousel-item>
        </a-carousel>
        <div class="product-info">
          <h3>产品特点</h3>
          <ul>
            <li v-for="(feature, index) in selectedProduct.features" :key="index">
              {{ feature }}
            </li>
          </ul>
          <h3>技术参数</h3>
          <a-descriptions :column="1">
            <a-descriptions-item v-for="(spec, key) in selectedProduct.specifications" :key="key" :label="key">
              {{ spec }}
            </a-descriptions-item>
          </a-descriptions>
          <div class="product-actions">
            <a-button type="primary" size="large" @click="handleInquiry">立即咨询</a-button>
            <a-button size="large" @click="downloadProductInfo">下载产品资料</a-button>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'

const router = useRouter()
const activeCategory = ref('building')
const detailModalVisible = ref(false)
const selectedProduct = ref(null)

// 产品数据
const products = ref([
  {
    id: 1,
    category: 'building',
    name: '钢化安全玻璃',
    description: '高强度钢化玻璃，安全性能优越，适用于建筑外墙、门窗等',
    image: '../assets/products/tempered-glass.jpg',
    images: [
      '../assets/products/tempered-glass-1.jpg',
      '../assets/products/tempered-glass-2.jpg',
      '../assets/products/tempered-glass-3.jpg'
    ],
    features: [
      '强度是普通玻璃的3-5倍',
      '破碎后呈颗粒状，不易划伤人体',
      '耐温差性能优越',
      '可深加工制作中空、夹层玻璃'
    ],
    specifications: {
      '厚度范围': '4-19mm',
      '尺寸范围': '最大 3300×8000mm',
      '抗弯强度': '≥120MPa',
      '表面应力': '≥90MPa',
      '安全等级': 'GB 15763.2-2005'
    }
  },
  // 更多产品...
])

// 根据当前分类筛选产品
const filteredProducts = computed(() => {
  return products.value.filter(product => product.category === activeCategory.value)
})

// 获取分类名称
const getCategoryName = (category: string) => {
  const categoryMap = {
    building: '建筑玻璃',
    decoration: '装饰玻璃',
    special: '特种玻璃',
    custom: '定制玻璃'
  }
  return categoryMap[category] || category
}

// 切换分类
const handleCategoryChange = (key: string) => {
  activeCategory.value = key
}

// 显示产品详情
const showProductDetails = (product) => {
  selectedProduct.value = product
  detailModalVisible.value = true
}

// 关闭产品详情
const closeProductDetails = () => {
  detailModalVisible.value = false
  selectedProduct.value = null
}

// 咨询产品
const handleInquiry = () => {
  router.push({
    path: '/contact',
    query: { product: selectedProduct.value?.id }
  })
}

// 下载产品资料
const downloadProductInfo = () => {
  // 这里可以实现下载逻辑
  Message.success('产品资料下载中...')
}
</script>

<style scoped>
.products {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
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

.category-nav {
  margin-bottom: 40px;
}

.category-description {
  padding: 20px 0;
  text-align: center;
}

.category-description h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.category-description p {
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.product-card {
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-description {
  color: #666;
  margin: 16px 0;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.product-details {
  padding: 20px 0;
}

.product-carousel {
  margin-bottom: 30px;
}

.product-carousel img {
  width: 100%;
  height: 400px;
  object-fit: contain;
}

.product-info {
  padding: 0 20px;
}

.product-info h3 {
  font-size: 20px;
  color: #333;
  margin: 20px 0 10px;
}

.product-info ul {
  list-style: disc;
  padding-left: 20px;
  margin-bottom: 20px;
}

.product-info li {
  color: #666;
  margin-bottom: 8px;
}

.product-actions {
  margin-top: 30px;
  display: flex;
  gap: 20px;
  justify-content: center;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  .product-carousel img {
    height: 300px;
  }

  .product-actions {
    flex-direction: column;
  }
}
</style> 