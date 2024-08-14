<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
    </div>
    <input
      type="file"
      ref="excelUploadInput"
      class="excel-upload-input"
      accept=".xlsx,.xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon class="el-icon-upload">
        <UploadFilled />
      </el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import XLSX from 'xlsx'
import { ref } from 'vue'
import { getHeaderRow, isExcel } from './utils'
import { ElMessage } from 'element-plus'
const props = defineProps({
  // 上传之前的回调
  beforeUpload: Function,
  // 上传成功的回调
  onSuccess: Function
})

const loading = ref(false)
const excelUploadInput = ref(null)
const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}

// 拖拽上传
const handleDrop = (e) => {
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('必须是 .xlsx,.xls,.csx 文件')
    return
  }
  upload(rawFile)
}
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}

// 触发上传事件
const upload = (rawFile) => {
  excelUploadInput.value.value = null
  // 如果没有指定上传前回调的话
  if (!props.beforeUpload) {
    renderData(rawFile)
    return
  }
  // 如果用户指定了上传前的回调，那么只有返回true时，才会执行对应的后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    renderData(rawFile)
  }
}
// 读取数据（异步）
const renderData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 读取操作完成时触发
    reader.onload = (e) => {
      // 1. 获取到解析后的数据
      const data = e.target.result
      // 2. 利用xlsx对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 读取 sheet1 的数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(workSheet)
      // 6. 解析数据库
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. 处理loading
      loading.value = false
      // 9. 成功回调
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}

// 根据导入内容，生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>
<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;

  .excel-upload-input {
    display: none;
    z-index: -9999;
  }

  .btn-upload,
  .drop {
    border: 1px solid #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }

  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    align-items: center;

    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
