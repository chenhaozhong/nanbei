<!-- Cases.vue -->
<template>
  <div class="cases">
    <!-- 页面头部 -->
    <div class="page_header">
      <h1>工程案例</h1>
      <p>展示我们的优秀工程案例，见证专业实力</p>
    </div>

    <!-- 案例分类 -->
    <div class="case_categories">
      <a-radio-group v-model="activeCategory" @change="handleCategoryChange">
        <a-radio-button value="all">全部案例</a-radio-button>
        <a-radio-button value="building">建筑玻璃</a-radio-button>
        <a-radio-button value="decoration">装饰玻璃</a-radio-button>
        <a-radio-button value="special">特种玻璃</a-radio-button>
      </a-radio-group>
    </div>

    <!-- 案例列表 -->
    <div class="cases_grid">
      <div v-for="case_item in filteredCases" :key="case_item.id" 
           class="case_card glass_effect" 
           @click="showCaseDetail(case_item)">
        <div class="case_image">
          <img :src="case_item.image" :alt="case_item.title" />
          <div class="case_overlay">
            <a-button type="primary" shape="round">
              查看详情
            </a-button>
          </div>
        </div>
        <div class="case_content">
          <h3>{{ case_item.title }}</h3>
          <p class="case_location">{{ case_item.location }}</p>
          <p class="case_description">{{ case_item.description }}</p>
          <div class="case_tags">
            <a-tag v-for="tag in case_item.tags" :key="tag" color="blue">
              {{ tag }}
            </a-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- 案例详情弹窗 -->
    <a-modal v-model:visible="detailModalVisible" 
             :title="selectedCase?.title" 
             width="800px"
             :footer="null">
      <div v-if="selectedCase" class="case_detail">
        <div class="detail_image">
          <img :src="selectedCase.image" :alt="selectedCase.title" />
        </div>
        <div class="detail_info">
          <h3>{{ selectedCase.title }}</h3>
          <p><strong>项目地点：</strong>{{ selectedCase.location }}</p>
          <p><strong>项目时间：</strong>{{ selectedCase.date }}</p>
          <p><strong>项目规模：</strong>{{ selectedCase.scale }}</p>
          <p><strong>技术特点：</strong>{{ selectedCase.features }}</p>
          <div class="detail_description">
            <h4>项目描述</h4>
            <p>{{ selectedCase.fullDescription }}</p>
          </div>
          <div class="detail_gallery">
            <h4>项目图片</h4>
            <div class="gallery_grid">
              <img v-for="(img, index) in selectedCase.gallery" 
                   :key="index" 
                   :src="img" 
                   @click="previewImage(img)" />
            </div>
          </div>
        </div>
      </div>
    </a-modal>

    <!-- 图片预览 -->
    <a-modal v-model:visible="imagePreviewVisible" 
             :footer="null" 
             :closable="true"
             width="auto">
      <img v-if="previewImageUrl" :src="previewImageUrl" style="max-width: 100%; height: auto;" />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')
const detailModalVisible = ref(false)
const imagePreviewVisible = ref(false)
const selectedCase = ref(null)
const previewImageUrl = ref('')

// 案例数据
const casesData = ref([
  {
    id: 1,
    title: '上海中心大厦玻璃幕墙工程',
    location: '上海市浦东新区',
    description: '超高层建筑玻璃幕墙系统，采用高性能中空玻璃',
    fullDescription: '该项目采用先进的玻璃幕墙技术，使用高性能中空玻璃，具有优异的保温隔热性能和视觉效果。整个幕墙系统经过严格的风压测试和抗震测试，确保在极端天气条件下的安全性。',
    date: '2023年',
    scale: '建筑面积约58万平方米',
    features: '高性能中空玻璃、智能遮阳系统、节能环保',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop'
    ],
    tags: ['建筑玻璃', '幕墙工程', '超高层'],
    category: 'building'
  },
  {
    id: 2,
    title: '北京国家大剧院装饰玻璃工程',
    location: '北京市西城区',
    description: '艺术建筑装饰玻璃，展现独特的艺术效果',
    fullDescription: '国家大剧院的装饰玻璃工程是艺术与技术的完美结合。我们为剧院定制了特殊的装饰玻璃，既保证了良好的声学效果，又营造了独特的艺术氛围。',
    date: '2022年',
    scale: '建筑面积约21万平方米',
    features: '艺术装饰玻璃、声学优化、定制设计',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop'
    ],
    tags: ['装饰玻璃', '艺术建筑', '定制设计'],
    category: 'decoration'
  },
  {
    id: 3,
    title: '深圳平安金融中心特种玻璃工程',
    location: '深圳市福田区',
    description: '超高层建筑特种玻璃，具备防火防爆功能',
    fullDescription: '平安金融中心采用我们提供的特种玻璃，具备防火、防爆、抗冲击等多重功能。这些玻璃在保证安全性的同时，还具有良好的透光性和美观性。',
    date: '2023年',
    scale: '建筑面积约46万平方米',
    features: '防火玻璃、防爆玻璃、安全防护',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop'
    ],
    tags: ['特种玻璃', '安全防护', '超高层'],
    category: 'special'
  },
  {
    id: 4,
    title: '广州塔观光电梯玻璃工程',
    location: '广州市海珠区',
    description: '观光电梯特种玻璃，360度全景视野',
    fullDescription: '广州塔观光电梯采用我们定制的特种玻璃，为游客提供360度全景视野。玻璃具备优异的强度和透明度，确保游客在享受美景的同时保证安全。',
    date: '2022年',
    scale: '塔高600米',
    features: '观光玻璃、高强度、全景视野',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop'
    ],
    tags: ['特种玻璃', '观光电梯', '定制设计'],
    category: 'special'
  },
  {
    id: 5,
    title: '杭州西湖文化广场装饰玻璃',
    location: '杭州市西湖区',
    description: '文化广场装饰玻璃，展现江南水乡韵味',
    fullDescription: '西湖文化广场的装饰玻璃设计融入了江南水乡的文化元素，通过特殊的玻璃工艺，营造出水波荡漾的视觉效果，与西湖的自然景观完美融合。',
    date: '2023年',
    scale: '广场面积约15万平方米',
    features: '文化装饰、水波效果、江南元素',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop'
    ],
    tags: ['装饰玻璃', '文化建筑', '江南元素'],
    category: 'decoration'
  },
  {
    id: 6,
    title: '成都天府国际机场玻璃工程',
    location: '成都市简阳市',
    description: '机场航站楼玻璃幕墙，大跨度结构设计',
    fullDescription: '天府国际机场采用大跨度玻璃幕墙设计，我们提供了高强度、大尺寸的玻璃产品，确保航站楼的采光和视觉效果，同时满足机场的特殊安全要求。',
    date: '2021年',
    scale: '航站楼面积约71万平方米',
    features: '大跨度玻璃、机场专用、高强度',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&h=400&fit=crop'
    ],
    tags: ['建筑玻璃', '机场工程', '大跨度'],
    category: 'building'
  }
])

// 过滤案例
const filteredCases = computed(() => {
  if (activeCategory.value === 'all') {
    return casesData.value
  }
  return casesData.value.filter(case_item => case_item.category === activeCategory.value)
})

// 切换分类
const handleCategoryChange = (value) => {
  activeCategory.value = value
}

// 显示案例详情
const showCaseDetail = (case_item) => {
  selectedCase.value = case_item
  detailModalVisible.value = true
}

// 预览图片
const previewImage = (imageUrl) => {
  previewImageUrl.value = imageUrl
  imagePreviewVisible.value = true
}
</script>

<style scoped>
.cases {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 120px; /* 调整顶部间距为120px */
}

.page_header {
  text-align: center;
  margin-bottom: 40px;
}

.page_header h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
}

.page_header p {
  font-size: 18px;
  color: #666;
}

.case_categories {
  text-align: center;
  margin-bottom: 40px;
}

.cases_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.case_card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.case_card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.case_image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.case_image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.case_card:hover .case_image img {
  transform: scale(1.05);
}

.case_overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.case_card:hover .case_overlay {
  opacity: 1;
}

.case_content {
  padding: 20px;
}

.case_content h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.case_location {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.case_description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.case_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* 案例详情样式 */
.case_detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.detail_image img {
  width: 100%;
  border-radius: 8px;
}

.detail_info h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.detail_info p {
  margin-bottom: 10px;
  color: #666;
}

.detail_description {
  margin-top: 20px;
}

.detail_description h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.detail_gallery {
  margin-top: 20px;
}

.detail_gallery h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
}

.gallery_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.gallery_grid img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.gallery_grid img:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .cases_grid {
    grid-template-columns: 1fr;
  }
  
  .case_detail {
    grid-template-columns: 1fr;
  }
  
  .gallery_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 