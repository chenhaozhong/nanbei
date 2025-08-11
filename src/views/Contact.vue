<!-- Contact.vue -->
<template>
  <div class="contact">
    <!-- 页面头部 -->
    <div class="page_header">
      <h1>联系我们</h1>
      <p>随时为您提供专业的玻璃解决方案</p>
    </div>

    <div class="contact_content">
      <!-- 联系信息 -->
      <div class="contact_info">
        <h2>联系方式</h2>
        <div class="info_grid">
          <div class="info_item">
            <div class="info_icon">
              <icon-phone />
            </div>
            <div class="info_content">
              <h3>电话咨询</h3>
              <p>+86 400-888-8888</p>
              <p>+86 021-8888-8888</p>
            </div>
          </div> 
          
          <div class="info_item">
            <div class="info_icon">
              <icon-email />
            </div>
            <div class="info_content">
              <h3>邮箱联系</h3>
              <p>info@glasscompany.com</p>
              <p>service@glasscompany.com</p>
            </div>
          </div>
          
          <div class="info_item">
            <div class="info_icon">
              <icon-location />
            </div>
            <div class="info_content">
              <h3>公司地址</h3>
              <p>上海市浦东新区张江高科技园区</p>
              <p>科苑路123号玻璃大厦</p>
            </div>
          </div>
          
          <div class="info_item">
            <div class="info_icon">
              <icon-clock-circle />
            </div>
            <div class="info_content">
              <h3>工作时间</h3>
              <p>周一至周五：9:00-18:00</p>
              <p>周六：9:00-12:00</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系表单 -->
      <div class="contact_form">
        <h2>在线咨询</h2>
        <a-form :model="formData" layout="vertical" @finish="handleSubmit">
          <a-form-item label="姓名" name="name" :rules="[{ required: true, message: '请输入姓名' }]">
            <a-input v-model:value="formData.name" placeholder="请输入您的姓名" />
          </a-form-item>
          
          <a-form-item label="电话" name="phone" :rules="[{ required: true, message: '请输入电话' }]">
            <a-input v-model:value="formData.phone" placeholder="请输入您的联系电话" />
          </a-form-item>
          
          <a-form-item label="邮箱" name="email" :rules="[{ required: true, type: 'email', message: '请输入正确的邮箱地址' }]">
            <a-input v-model:value="formData.email" placeholder="请输入您的邮箱地址" />
          </a-form-item>
          
          <a-form-item label="公司" name="company">
            <a-input v-model:value="formData.company" placeholder="请输入您的公司名称（选填）" />
          </a-form-item>
          
          <a-form-item label="咨询类型" name="type" :rules="[{ required: true, message: '请选择咨询类型' }]">
            <a-select v-model:value="formData.type" placeholder="请选择咨询类型">
              <a-select-option value="building">建筑玻璃</a-select-option>
              <a-select-option value="decoration">装饰玻璃</a-select-option>
              <a-select-option value="special">特种玻璃</a-select-option>
              <a-select-option value="custom">定制玻璃</a-select-option>
              <a-select-option value="other">其他咨询</a-select-option>
            </a-select>
          </a-form-item>
          
          <a-form-item label="项目描述" name="description" :rules="[{ required: true, message: '请输入项目描述' }]">
            <a-textarea v-model:value="formData.description" 
                       placeholder="请详细描述您的项目需求"
                       :rows="4" />
          </a-form-item>
          
          <a-form-item>
            <a-button type="primary" html-type="submit" size="large" block>
              提交咨询
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>

    <!-- 地图区域 -->
    <div class="map_section">
      <h2>公司位置</h2>
      <div class="map_container">
        <div class="map_placeholder">
          <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&h=400&fit=crop" 
               alt="公司地图" />
          <div class="map_overlay">
            <div class="map_info">
              <h3>玻璃制品有限公司</h3>
              <p>📍 上海市浦东新区张江高科技园区科苑路123号</p>
              <p>🚇 地铁2号线张江高科站步行10分钟</p>
              <p>🚌 公交线路：大桥六线、大桥七线</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分支机构 -->
    <div class="branches_section">
      <h2>分支机构</h2>
      <div class="branches_grid">
        <div class="branch_card">
          <h3>北京分公司</h3>
          <p>📍 北京市朝阳区建国门外大街1号</p>
          <p>📞 010-8888-8888</p>
        </div>
        
        <div class="branch_card">
          <h3>深圳分公司</h3>
          <p>📍 深圳市南山区科技园南区</p>
          <p>📞 0755-8888-8888</p>
        </div>
        
        <div class="branch_card">
          <h3>成都分公司</h3>
          <p>📍 成都市高新区天府大道</p>
          <p>📞 028-8888-8888</p>
        </div>
        
        <div class="branch_card">
          <h3>杭州分公司</h3>
          <p>📍 杭州市滨江区江南大道</p>
          <p>📞 0571-8888-8888</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'

const formData = ref({
  name: '',
  phone: '',
  email: '',
  company: '',
  type: '',
  description: ''
})

const handleSubmit = (values) => {
  console.log('表单提交:', values)
  Message.success('感谢您的咨询，我们会尽快与您联系！')
  // 重置表单
  formData.value = {
    name: '',
    phone: '',
    email: '',
    company: '',
    type: '',
    description: ''
  }
}
</script>

<style scoped>
.contact {
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

.contact_content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

.contact_info h2,
.contact_form h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
}

.info_grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.info_item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info_icon {
  width: 40px;
  height: 40px;
  background: #1890ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  flex-shrink: 0;
}

.info_content h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.info_content p {
  color: #666;
  margin-bottom: 5px;
  font-size: 14px;
}

.contact_form {
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map_section {
  margin-bottom: 60px;
}

.map_section h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.map_container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map_placeholder {
  position: relative;
  height: 400px;
}

.map_placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map_overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.map_info {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 8px;
  text-align: center;
}

.map_info h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

.map_info p {
  color: #666;
  margin-bottom: 8px;
  font-size: 14px;
}

.branches_section {
  margin-bottom: 40px;
}

.branches_section h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.branches_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.branch_card {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.branch_card h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
}

.branch_card p {
  color: #666;
  margin-bottom: 8px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .contact_content {
    grid-template-columns: 1fr;
  }
  
  .info_grid {
    grid-template-columns: 1fr;
  }
  
  .branches_grid {
    grid-template-columns: 1fr;
  }
}
</style> 