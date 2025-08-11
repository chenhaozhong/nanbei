<!-- Products.vue -->
<template>
  <div class="products">
    <!-- 页面头部 -->
    <div class="page_header">
      <h1>产品中心</h1>
      <p>专业玻璃制品解决方案，满足各类建筑需求</p>
    </div>
    <!-- 产品展示区域 -->
    <div class="products_section">
      <!-- 分类标题 -->
      <div class="section_header">
        <h2>{{ currentCategoryInfo.name }}</h2>
        <p>{{ currentCategoryInfo.description }}</p>
      </div>

      <!-- 产品网格 -->
      <div class="products_grid">
        <div v-if="currentProducts.length === 0" class="empty_state">
          <div class="empty_icon">📦</div>
          <h3>暂无产品</h3>
          <p>该分类下暂无产品信息，请选择其他分类或联系客服咨询</p>
        </div>
        <div v-else
             v-for="product in currentProducts" 
             :key="product.id" 
             class="product_card"
             @click="showProductDetail(product)">
          <div class="product_image">
            <img :src="product.image" :alt="product.name" />
            <div class="product_overlay">
              <a-button type="primary" shape="round">
                查看详情
              </a-button>
            </div>
          </div>
          <div class="product_info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.shortDescription }}</p>
            <div class="product_features">
              <span v-for="feature in product.keyFeatures" 
                    :key="feature" 
                    class="feature_tag">
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="currentProducts.length > 0" class="pagination_wrapper">
        <a-pagination 
          v-model:current="currentPage" 
          :total="totalProducts" 
          :page-size="pageSize"
          show-quick-jumper
          @change="handlePageChange" />
      </div>
    </div>

    <!-- 产品详情弹窗 -->
    <a-modal
      v-model:visible="detailModalVisible"
      :title="selectedProduct?.name"
      @cancel="closeProductDetail"
      :footer="null"
      width="900px"
      class="product_detail_modal">
      <div v-if="selectedProduct" class="product_detail">
        <div class="detail_gallery">
          <a-carousel class="product_carousel" :auto-play="true">
          <a-carousel-item v-for="(image, index) in selectedProduct.images" :key="index">
            <img :src="image" :alt="selectedProduct.name" />
          </a-carousel-item>
        </a-carousel>
        </div>
        
        <div class="detail_content">
          <div class="detail_header">
            <h2>{{ selectedProduct.name }}</h2>
            <p class="product_category">{{ getCategoryName(selectedProduct.category) }}</p>
          </div>
          
          <div class="detail_description">
            <h3>产品描述</h3>
            <p>{{ selectedProduct.description }}</p>
          </div>
          
          <div class="detail_features">
          <h3>产品特点</h3>
          <ul>
            <li v-for="(feature, index) in selectedProduct.features" :key="index">
              {{ feature }}
            </li>
          </ul>
          </div>
          
          <div class="detail_specs">
          <h3>技术参数</h3>
            <a-descriptions :column="2" bordered>
            <a-descriptions-item v-for="(spec, key) in selectedProduct.specifications" :key="key" :label="key">
              {{ spec }}
            </a-descriptions-item>
          </a-descriptions>
          </div>
          
          <div class="detail_actions">
            <a-button type="primary" size="large" @click="handleInquiry">
              <template #icon><icon-message /></template>
              立即咨询
            </a-button>
            <a-button size="large" @click="downloadProductInfo">
              <template #icon><icon-download /></template>
              下载产品资料
            </a-button>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Message } from '@arco-design/web-vue'

const router = useRouter()
const route = useRoute()
const currentPage = ref(1)
const pageSize = ref(12)
const detailModalVisible = ref(false)
const selectedProduct = ref(null)

// 产品分类数据
const categories = ref([
  {
    key: 'building',
    name: '建筑玻璃',
    description: '高性能建筑玻璃，满足各类建筑需求',
    subCategories: [
      {
        key: 'tempered',
        name: '钢化玻璃',
        description: '高强度安全玻璃',
        icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop'
      },
      {
        key: 'insulated',
        name: '中空玻璃',
        description: '节能隔热玻璃',
        icon: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=60&h=60&fit=crop'
      },
      {
        key: 'laminated',
        name: '夹层玻璃',
        description: '安全防护玻璃',
        icon: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=60&h=60&fit=crop'
      },
      {
        key: 'curtain_wall',
        name: '幕墙玻璃',
        description: '建筑外立面玻璃',
        icon: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop'
      }
    ]
  },
  {
    key: 'decoration',
    name: '装饰玻璃',
    description: '美观实用的装饰玻璃，提升空间品质',
    subCategories: [
      {
        key: 'artistic',
        name: '艺术玻璃',
        description: '精美艺术图案',
        icon: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=60&h=60&fit=crop'
      },
      {
        key: 'colored',
        name: '彩绘玻璃',
        description: '丰富色彩选择',
        icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop'
      },
      {
        key: 'frosted',
        name: '磨砂玻璃',
        description: '隐私保护玻璃',
        icon: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=60&h=60&fit=crop'
      },
      {
        key: 'patterned',
        name: '压花玻璃',
        description: '立体纹理效果',
        icon: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop'
      }
    ]
  },
  {
    key: 'special',
    name: '特种玻璃',
    description: '特殊用途玻璃，性能卓越',
    subCategories: [
      {
        key: 'fireproof',
        name: '防火玻璃',
        description: '安全防护玻璃',
        icon: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop'
      },
      {
        key: 'bulletproof',
        name: '防弹玻璃',
        description: '高强度防护',
        icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop'
      },
      {
        key: 'smart',
        name: '智能调光玻璃',
        description: '可控制透明度',
        icon: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=60&h=60&fit=crop'
      },
      {
        key: 'soundproof',
        name: '隔音玻璃',
        description: '降噪隔音效果',
        icon: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=60&h=60&fit=crop'
      }
    ]
  },
  {
    key: 'custom',
    name: '定制玻璃',
    description: '根据需求定制，提供独特解决方案',
    subCategories: [
      {
        key: 'size_custom',
        name: '尺寸定制',
        description: '特殊规格定制',
        icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop'
      },
      {
        key: 'color_custom',
        name: '颜色定制',
        description: '个性化色彩',
        icon: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=60&h=60&fit=crop'
      },
      {
        key: 'pattern_custom',
        name: '图案定制',
        description: '专属图案设计',
        icon: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=60&h=60&fit=crop'
      },
      {
        key: 'function_custom',
        name: '功能定制',
        description: '特殊功能需求',
        icon: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop'
      }
    ]
  }
])

// 产品统计信息（用于调试）
const productStats = computed(() => {
  const stats = {}
  categories.value.forEach(cat => {
    stats[cat.key] = {
      name: cat.name,
      count: productsData.value.filter(p => p.category === cat.key).length,
      products: productsData.value.filter(p => p.category === cat.key).map(p => p.name)
    }
  })
  return stats
})

// 当前选中的分类
const currentCategory = ref('building')
const currentSubCategory = ref('tempered')

// 产品数据
const productsData = ref([
  // 钢化玻璃产品
  {
    id: 1,
    category: 'building',
    subCategory: 'tempered',
    name: '钢化安全玻璃',
    shortDescription: '高强度钢化玻璃，安全性能优越',
    description: '高强度钢化玻璃，安全性能优越，适用于建筑外墙、门窗等。经过特殊热处理工艺，强度是普通玻璃的3-5倍，破碎后呈颗粒状，不易划伤人体。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['高强度', '安全性能', '耐温差'],
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
  {
    id: 2,
    category: 'building',
    subCategory: 'tempered',
    name: '超白钢化玻璃',
    shortDescription: '高透光率，视觉效果极佳',
    description: '超白钢化玻璃具有极高的透光率和优异的视觉效果，适用于高端建筑和展示空间。',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['高透光', '超白', '视觉效果'],
    features: [
      '透光率≥91%',
      '超白效果',
      '视觉效果极佳',
      '适用于高端建筑'
    ],
    specifications: {
      '厚度范围': '5-19mm',
      '透光率': '≥91%',
      '铁含量': '≤0.015%',
      '应用': '高端建筑、展示空间'
    }
  },
  // 中空玻璃产品
  {
    id: 3,
    category: 'building',
    subCategory: 'insulated',
    name: '节能中空玻璃',
    shortDescription: '优异的隔热保温性能',
    description: '节能环保的中空玻璃，具有良好的隔热、隔音效果，是绿色建筑的理想选择。',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['节能', '隔热', '隔音'],
    features: [
      '优异的隔热保温性能',
      '良好的隔音效果',
      '防结露功能',
      '节能环保'
    ],
    specifications: {
      '玻璃厚度': '5-12mm',
      '空气层厚度': '6-20mm',
      '传热系数': '≤2.8W/(m²·K)',
      '隔音量': '≥30dB',
      '标准': 'GB/T 11944-2012'
    }
  },
  // 装饰玻璃产品
  {
    id: 4,
    category: 'decoration',
    subCategory: 'artistic',
    name: '艺术彩绘玻璃',
    shortDescription: '精美的艺术图案，为空间增添艺术气息',
    description: '精美的艺术彩绘玻璃，为空间增添艺术气息，适用于室内装饰、隔断等。',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['艺术图案', '丰富色彩', '装饰效果'],
    features: [
      '精美的艺术图案',
      '丰富的色彩选择',
      '透光性好',
      '装饰效果突出'
    ],
    specifications: {
      '玻璃厚度': '3-12mm',
      '图案类型': '定制设计',
      '色彩': '多种可选',
      '透光率': '≥70%',
      '应用': '室内装饰、隔断'
    }
  },
  {
    id: 11,
    category: 'decoration',
    subCategory: 'colored',
    name: '彩色装饰玻璃',
    shortDescription: '丰富的色彩选择，打造个性化装饰效果',
    description: '彩色装饰玻璃提供丰富的色彩选择，可根据设计需求定制不同颜色，适用于室内装饰、艺术装置等。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['丰富色彩', '个性化', '装饰效果'],
    features: [
      '丰富的色彩选择',
      '个性化定制',
      '装饰效果突出',
      '透光性好'
    ],
    specifications: {
      '玻璃厚度': '3-19mm',
      '色彩种类': '50+种可选',
      '透光率': '≥60%',
      '应用': '室内装饰、艺术装置'
    }
  },
  {
    id: 12,
    category: 'decoration',
    subCategory: 'frosted',
    name: '磨砂装饰玻璃',
    shortDescription: '优雅的磨砂效果，提供隐私保护',
    description: '磨砂装饰玻璃具有优雅的磨砂效果，既能提供隐私保护，又能保持透光性，适用于浴室、办公室等场所。',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['磨砂效果', '隐私保护', '透光性'],
    features: [
      '优雅的磨砂效果',
      '提供隐私保护',
      '保持透光性',
      '易于清洁'
    ],
    specifications: {
      '玻璃厚度': '3-19mm',
      '磨砂程度': '可调节',
      '透光率': '≥50%',
      '应用': '浴室、办公室、隔断'
    }
  },
  {
    id: 13,
    category: 'decoration',
    subCategory: 'patterned',
    name: '压花装饰玻璃',
    shortDescription: '立体纹理效果，增强空间层次感',
    description: '压花装饰玻璃具有立体纹理效果，能够增强空间的层次感和艺术感，适用于门窗、隔断等装饰应用。',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['立体纹理', '层次感', '艺术效果'],
    features: [
      '立体纹理效果',
      '增强空间层次感',
      '艺术效果突出',
      '透光性好'
    ],
    specifications: {
      '玻璃厚度': '3-19mm',
      '纹理类型': '多种可选',
      '透光率': '≥65%',
      '应用': '门窗、隔断、装饰'
    }
  },
  // 特种玻璃产品
  {
    id: 5,
    category: 'special',
    subCategory: 'fireproof',
    name: '防火玻璃',
    shortDescription: '专业防火玻璃，提供安全防护',
    description: '专业防火玻璃，提供安全防护，适用于防火分区，具有优异的防火性能。',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['防火性能', '透明性好', '安全可靠'],
    features: [
      '优异的防火性能',
      '透明性好',
      '强度高',
      '安全可靠'
    ],
    specifications: {
      '防火等级': 'A级、B级、C级',
      '耐火时间': '0.5-3小时',
      '玻璃厚度': '6-25mm',
      '透光率': '≥75%',
      '标准': 'GB 15763.1-2009'
    }
  },
  {
    id: 14,
    category: 'special',
    subCategory: 'bulletproof',
    name: '防弹玻璃',
    shortDescription: '高强度防弹玻璃，提供顶级安全防护',
    description: '高强度防弹玻璃，采用多层复合结构，能够有效阻挡子弹冲击，适用于银行、政府机构等安全要求极高的场所。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['防弹性能', '高强度', '安全防护'],
    features: [
      '多层复合结构',
      '有效阻挡子弹冲击',
      '高强度安全防护',
      '适用于高安全场所'
    ],
    specifications: {
      '防弹等级': 'F54-F79',
      '玻璃厚度': '25-50mm',
      '透光率': '≥70%',
      '应用': '银行、政府机构、高安全场所'
    }
  },
  {
    id: 6,
    category: 'special',
    subCategory: 'smart',
    name: '智能调光玻璃',
    shortDescription: '高科技智能调光玻璃，可控制透明度',
    description: '高科技智能调光玻璃，可控制透明度，实现隐私保护，应用广泛。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['智能控制', '一键切换', '节能环保'],
    features: [
      '智能控制透明度',
      '一键切换模式',
      '节能环保',
      '应用广泛'
    ],
    specifications: {
      '玻璃厚度': '6-25mm',
      '调光时间': '≤3秒',
      '透光率': '5%-75%可调',
      '电压': '65V AC',
      '应用': '办公、酒店、住宅'
    }
  },
  {
    id: 15,
    category: 'special',
    subCategory: 'soundproof',
    name: '隔音玻璃',
    shortDescription: '专业隔音玻璃，有效降低噪音干扰',
    description: '专业隔音玻璃，采用特殊结构和材料，能够有效降低外界噪音干扰，适用于机场、高速公路等噪音环境。',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['隔音性能', '降噪效果', '安静环境'],
    features: [
      '专业隔音结构',
      '有效降低噪音',
      '创造安静环境',
      '适用于噪音环境'
    ],
    specifications: {
      '隔音量': '≥35dB',
      '玻璃厚度': '8-25mm',
      '透光率': '≥70%',
      '应用': '机场、高速公路、住宅'
    }
  },
  // 定制玻璃产品
  {
    id: 7,
    category: 'custom',
    subCategory: 'size_custom',
    name: '超大尺寸定制玻璃',
    shortDescription: '根据需求定制超大尺寸玻璃，满足特殊项目需求',
    description: '超大尺寸定制玻璃，可根据项目需求定制特殊规格，适用于大型建筑项目、展览馆等特殊场所。',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['超大尺寸', '定制规格', '特殊需求'],
    features: [
      '可定制超大尺寸',
      '满足特殊项目需求',
      '专业技术支持',
      '质量保证'
    ],
    specifications: {
      '最大尺寸': '6000×12000mm',
      '厚度范围': '3-25mm',
      '定制周期': '15-30天',
      '应用': '大型建筑、展览馆'
    }
  },
  {
    id: 8,
    category: 'custom',
    subCategory: 'color_custom',
    name: '个性化色彩定制玻璃',
    shortDescription: '提供丰富的色彩选择，满足个性化装饰需求',
    description: '个性化色彩定制玻璃，提供丰富的色彩选择，可根据客户需求定制专属色彩，适用于个性化装饰项目。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['色彩丰富', '个性化', '装饰效果'],
    features: [
      '丰富的色彩选择',
      '个性化定制',
      '装饰效果突出',
      '质量稳定'
    ],
    specifications: {
      '色彩种类': '100+种可选',
      '玻璃厚度': '3-19mm',
      '定制周期': '7-15天',
      '应用': '个性化装饰'
    }
  },
  {
    id: 9,
    category: 'custom',
    subCategory: 'pattern_custom',
    name: '专属图案定制玻璃',
    shortDescription: '根据客户需求设计专属图案，打造独特视觉效果',
    description: '专属图案定制玻璃，可根据客户需求设计专属图案，打造独特的视觉效果，适用于品牌展示、艺术装饰等。',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['专属图案', '独特设计', '品牌展示'],
    features: [
      '专属图案设计',
      '独特视觉效果',
      '品牌展示效果',
      '专业设计团队'
    ],
    specifications: {
      '图案类型': '定制设计',
      '制作工艺': '丝印/UV打印',
      '定制周期': '10-20天',
      '应用': '品牌展示、艺术装饰'
    }
  },
  {
    id: 10,
    category: 'custom',
    subCategory: 'function_custom',
    name: '多功能定制玻璃',
    shortDescription: '集成多种功能，满足复杂应用需求',
    description: '多功能定制玻璃，可集成多种功能于一体，如调光、隔热、隔音等，满足复杂的应用需求。',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ],
    keyFeatures: ['多功能集成', '定制功能', '复杂应用'],
    features: [
      '多功能集成',
      '定制功能组合',
      '满足复杂需求',
      '技术领先'
    ],
    specifications: {
      '功能组合': '可定制',
      '玻璃厚度': '6-25mm',
      '定制周期': '20-40天',
      '应用': '高端建筑、特殊场所'
    }
  }
])

// 计算属性
const currentCategoryInfo = computed(() => {
  const category = categories.value.find(c => c.key === currentCategory.value)
  const subCategory = category?.subCategories.find(s => s.key === currentSubCategory.value)
  return {
    name: subCategory?.name || category?.name || '',
    description: subCategory?.description || category?.description || ''
  }
})

const currentProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  
  // 根据当前分类筛选产品
  let filtered = productsData.value.filter(product => {
    if (currentCategory.value === 'custom') {
      // 对于定制玻璃，显示所有custom分类的产品
      return product.category === 'custom'
    } else {
      // 对于其他分类，显示对应分类的产品
      return product.category === currentCategory.value
    }
  })
  
  return filtered.slice(startIndex, endIndex)
})

const totalProducts = computed(() => {
  // 根据当前分类计算总产品数
  let filtered = productsData.value.filter(product => {
    if (currentCategory.value === 'custom') {
      return product.category === 'custom'
    } else {
      return product.category === currentCategory.value
    }
  })
  
  return filtered.length
})

// 方法
const handleCategoryChange = (value) => {
  currentCategory.value = value
  
  // 根据选择的分类设置默认子分类
  if (value === 'custom') {
    currentSubCategory.value = 'size_custom'
  } else {
    // 对于其他分类，设置第一个子分类
    const category = categories.value.find(c => c.key === value)
    currentSubCategory.value = category?.subCategories[0]?.key || 'tempered'
  }
  
  // 重置分页
  currentPage.value = 1
  
  // 更新URL参数，但不刷新页面
  router.replace({
    query: { 
      ...route.query,
      category: value 
    }
  })
}

const showProductDetail = (product) => {
  selectedProduct.value = product
  detailModalVisible.value = true
}

const closeProductDetail = () => {
  detailModalVisible.value = false
  selectedProduct.value = null
}

const handlePageChange = (page) => {
  currentPage.value = page
}

const getCategoryName = (category) => {
  const categoryMap = {
    building: '建筑玻璃',
    decoration: '装饰玻璃',
    special: '特种玻璃',
    custom: '定制玻璃'
  }
  return categoryMap[category] || category
}

const handleInquiry = () => {
  router.push({
    path: '/contact',
    query: { product: selectedProduct.value?.id }
  })
  closeProductDetail()
}

const downloadProductInfo = () => {
  Message.success('产品资料下载中...')
}

// 监听路由参数变化
watchEffect(() => {
  const category = route.query.category
  
  if (category && categories.value.find(c => c.key === category)) {
    // 只有当分类真正改变时才更新
    if (currentCategory.value !== category) {
      console.log('分类变化:', currentCategory.value, '->', category)
      currentCategory.value = category
      
      // 根据分类设置默认子分类
      if (category === 'custom') {
        currentSubCategory.value = 'size_custom'
      } else {
        const categoryObj = categories.value.find(c => c.key === category)
        currentSubCategory.value = categoryObj?.subCategories[0]?.key || 'tempered'
      }
      
      // 重置分页
      currentPage.value = 1
    }
  } else if (!category && currentCategory.value !== 'building') {
    // 如果没有category参数，默认显示第一个分类
    console.log('设置默认分类: building')
    currentCategory.value = 'building'
    currentSubCategory.value = 'tempered'
    currentPage.value = 1
  }
})

onMounted(() => {
  // watchEffect 已经处理了初始化和参数变化
  // 这里可以添加其他初始化逻辑
})
</script>

<style scoped>
.products {
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px; /* 调整顶部间距为120px */
}

.page_header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 80px 20px 60px;
  margin-bottom: 0;
}

.page_header h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.page_header p {
  font-size: 20px;
  opacity: 0.9;
}

/* 分类筛选 */
.category_filter {
  background: white;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}

.filter_container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

/* 调试信息 */
.debug_info {
  max-width: 1200px;
  margin: 20px auto;
  padding: 15px 20px;
  background-color: #f0f8ff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  font-size: 14px;
  color: #333;
}

.debug_item {
  display: flex;
  align-items: center;
}

.debug_label {
  font-weight: bold;
  margin-right: 5px;
}

.debug_count {
  color: #1890ff;
  font-weight: 500;
}

/* 产品展示区域 */
.products_section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.section_header {
  text-align: center;
  margin-bottom: 50px;
}

.section_header h2 {
  font-size: 36px;
  color: #333;
  margin-bottom: 16px;
}

.section_header p {
  font-size: 18px;
  color: #666;
}

.products_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.product_card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product_card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product_image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.product_image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product_card:hover .product_image img {
  transform: scale(1.05);
}

.product_overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product_card:hover .product_overlay {
  opacity: 1;
}

.product_info {
  padding: 25px;
}

.product_info h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.product_info p {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
}

.product_features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature_tag {
  background: #f0f8ff;
  color: #1890ff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.pagination_wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

/* 产品详情弹窗 */
.product_detail_modal :deep(.arco-modal-body) {
  padding: 0;
}

.product_detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.detail_gallery {
  background: #f8f9fa;
}

.product_carousel {
  height: 400px;
}

.product_carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail_content {
  padding: 30px;
  overflow-y: auto;
  max-height: 600px;
}

.detail_header h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 8px;
}

.product_category {
  color: #1890ff;
  font-weight: 500;
  margin-bottom: 20px;
}

.detail_description,
.detail_features,
.detail_specs {
  margin-bottom: 25px;
}

.detail_description h3,
.detail_features h3,
.detail_specs h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 12px;
}

.detail_description p {
  color: #666;
  line-height: 1.6;
}

.detail_features ul {
  list-style: none;
  padding: 0;
}

.detail_features li {
  color: #666;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  padding-left: 20px;
}

.detail_features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #1890ff;
  font-weight: bold;
}

.detail_actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.empty_state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
  color: #999;
}

.empty_icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.empty_state h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.empty_state p {
  font-size: 16px;
}

@media (max-width: 768px) {
  .page_header h1 {
    font-size: 36px;
  }
  
  .products_grid {
    grid-template-columns: 1fr;
  }
  
  .product_detail {
    grid-template-columns: 1fr;
  }
  
  .detail_actions {
    flex-direction: column;
  }
}
</style> 