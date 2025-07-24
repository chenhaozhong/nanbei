<!-- News.vue -->
<template>
  <div class="news">
    <div class="page-header">
      <h1>新闻资讯</h1>
      <p>了解最新公司动态和行业资讯</p>
    </div>

    <!-- 新闻分类 -->
    <div class="news-categories">
      <a-radio-group v-model="activeCategory" type="button" size="large">
        <a-radio value="all">全部</a-radio>
        <a-radio value="company">公司动态</a-radio>
        <a-radio value="industry">行业资讯</a-radio>
        <a-radio value="technology">技术创新</a-radio>
      </a-radio-group>
    </div>

    <!-- 新闻列表 -->
    <div class="news-list">
      <a-list :data="filteredNews" :bordered="false">
        <template #item="{ item }">
          <a-list-item class="news-item" @click="showNewsDetail(item)">
            <div class="news-content">
              <div class="news-image">
                <img :src="item.image" :alt="item.title" />
              </div>
              <div class="news-info">
                <h3>{{ item.title }}</h3>
                <p class="news-summary">{{ item.summary }}</p>
                <div class="news-meta">
                  <a-space>
                    <a-tag>{{ getCategoryName(item.category) }}</a-tag>
                    <span class="news-date">{{ item.date }}</span>
                    <span class="news-views">阅读量：{{ item.views }}</span>
                  </a-space>
                </div>
              </div>
            </div>
          </a-list-item>
        </template>
      </a-list>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <a-pagination
        :total="totalNews"
        :current="currentPage"
        :page-size="pageSize"
        show-total
        show-jumper
        @change="handlePageChange"
      />
    </div>

    <!-- 新闻详情弹窗 -->
    <a-modal
      v-model:visible="detailModalVisible"
      :title="selectedNews?.title"
      @cancel="closeNewsDetail"
      :footer="null"
      width="800px"
    >
      <div v-if="selectedNews" class="news-detail">
        <img :src="selectedNews.image" :alt="selectedNews.title" class="detail-image" />
        <div class="detail-meta">
          <a-space>
            <a-tag>{{ getCategoryName(selectedNews.category) }}</a-tag>
            <span>发布时间：{{ selectedNews.date }}</span>
            <span>阅读量：{{ selectedNews.views }}</span>
          </a-space>
        </div>
        <div class="detail-content" v-html="selectedNews.content"></div>
        <div class="detail-tags">
          <a-space>
            <span>标签：</span>
            <a-tag v-for="tag in selectedNews.tags" :key="tag">{{ tag }}</a-tag>
          </a-space>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeCategory = ref('all')
const currentPage = ref(1)
const pageSize = ref(10)
const detailModalVisible = ref(false)
const selectedNews = ref(null)

// 新闻数据
const newsData = ref([
  {
    id: 1,
    category: 'company',
    title: '公司参加2024国际玻璃展览会',
    summary: '我司携最新产品亮相国际玻璃展览会，展示创新技术与解决方案...',
    content: `
      <p>2024年3月15日，我司参加了在广州举办的2024国际玻璃展览会。本次展会上，我司展示了最新研发的智能调光玻璃、超大尺寸建筑玻璃等创新产品。</p>
      <p>展会期间，我司展台吸引了众多国内外客户驻足参观，对我司的产品表现出浓厚兴趣。通过此次展会，我司不仅展示了强大的研发实力和制造能力，还与多家企业达成了合作意向。</p>
      <p>未来，我司将继续加大研发投入，推动产品创新，为客户提供更优质的玻璃产品和解决方案。</p>
    `,
    image: 'https://www.deli1996.com/uploadfile/202505/37648c780d6eef.jpg',
    date: '2024-03-15',
    views: 1250,
    tags: ['展会', '新产品', '智能玻璃']
  },
  {
    id: 2,
    category: 'industry',
    title: '新型环保玻璃产品发布',
    summary: '推出新一代环保节能玻璃，助力绿色建筑发展...',
    content: `
      <p>我司最新研发的环保节能玻璃产品正式发布，该产品采用先进的Low-E镀膜技术，具有优异的隔热保温性能。</p>
      <p>新产品不仅能有效降低建筑能耗，还能为室内提供舒适的光环境，是绿色建筑的理想选择。</p>
    `,
    image: 'https://www.deli1996.com/uploadfile/202308/245f5cfc1716294.jpg',
    date: '2024-03-10',
    views: 986,
    tags: ['新产品', '环保', '节能']
  },
  {
    id: 3,
    category: 'technology',
    title: '荣获行业技术创新奖',
    summary: '公司研发团队凭借创新技术获得行业权威奖项...',
    content: `
      <p>在近日举办的2024玻璃行业技术创新大会上，我司研发的新一代智能调光玻璃技术荣获"年度技术创新奖"。</p>
      <p>该技术突破了传统调光玻璃的技术限制，实现了更快的响应速度和更均匀的调光效果，得到了行业专家的一致认可。</p>
    `,
    image: 'https://www.deli1996.com/uploadfile/202308/8a6e3f939faeec9.jpg',
    date: '2024-03-05',
    views: 1120,
    tags: ['技术创新', '智能玻璃', '行业认可']
  }
])

// 根据分类筛选新闻
const filteredNews = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  const filtered = activeCategory.value === 'all'
    ? newsData.value
    : newsData.value.filter(news => news.category === activeCategory.value)
  return filtered.slice(startIndex, endIndex)
})

// 总新闻数
const totalNews = computed(() => {
  return activeCategory.value === 'all'
    ? newsData.value.length
    : newsData.value.filter(news => news.category === activeCategory.value).length
})

// 获取分类名称
const getCategoryName = (category: string) => {
  const categoryMap = {
    company: '公司动态',
    industry: '行业资讯',
    technology: '技术创新'
  }
  return categoryMap[category] || category
}

// 显示新闻详情
const showNewsDetail = (news) => {
  selectedNews.value = news
  detailModalVisible.value = true
}

// 关闭新闻详情
const closeNewsDetail = () => {
  detailModalVisible.value = false
  selectedNews.value = null
}

// 切换页码
const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped>
.news {
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

.news-categories {
  text-align: center;
  margin-bottom: 40px;
}

.news-list {
  margin-bottom: 40px;
}

.news-item {
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.news-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.news-content {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 20px;
}

.news-image {
  width: 200px;
  height: 150px;
  overflow: hidden;
  border-radius: 4px;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-info h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.news-summary {
  color: #666;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  color: #999;
}

.pagination {
  text-align: center;
  margin-top: 40px;
}

.news-detail {
  padding: 20px 0;
}

.detail-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.detail-meta {
  margin-bottom: 20px;
  color: #666;
}

.detail-content {
  color: #333;
  line-height: 1.8;
}

.detail-content p {
  margin-bottom: 16px;
}

.detail-tags {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .news-content {
    grid-template-columns: 1fr;
  }

  .news-image {
    width: 100%;
    height: 200px;
  }
}
</style> 