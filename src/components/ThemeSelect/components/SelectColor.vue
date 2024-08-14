<template>
  <el-dialog title="提示" width="22%" :model-value="modelValue">
    <div class="content">
      <div>主题色更换</div>
      <el-color-picker
        v-model="mColor"
        show-alpha
        :predefine="predefineColors"
      />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

import { appStore } from '@/store'
import { storeToRefs } from 'pinia'

const { mainColor } = storeToRefs(appStore.useThemeStore)
const { setMainColor } = appStore.useThemeStore

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const predefineColors: Ref<string[]> = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])

// 默认色值
const mColor: Ref<string> = ref(mainColor)
const closed: () => void = () => {
  emits('update:modelValue', false)
}
// 确定按钮点击事件
const confirm: () => Promise<void> = async () => {
  const newStyle = await generateNewStyle(mColor.value)
  writeNewStyle(newStyle)
  setMainColor(mColor.value)
  closed()
}
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
