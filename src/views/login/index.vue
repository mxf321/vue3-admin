<template>
  <div class="login-container">
    <div class="title-container">
      <h3>用户登录</h3>
    </div>
    <el-form
      ref="loginFormRef"
      :rules="loginRules"
      :model="loginForm"
      label-width="auto"
      class="login-form"
    >
      <!-- 需加prop，el-form-item仅校验是否必填即空值时的提示，不能过滤trim -->
      <el-form-item
        :rules="[
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ]"
        prop="username"
      >
        <el-input
          v-model="loginForm.username"
          placeholder="请输入账号"
          clearable
          prefix-icon="User"
        />
      </el-form-item>
      <el-form-item
        :rules="[
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]"
        prop="password"
      >
        <el-input
          :type="flagType"
          placeholder="请输入密码"
          clearable
          v-model="loginForm.password"
          show-password
          prefix-icon="Lock"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(loginFormRef)"
          >登录</el-button
        >
        <el-button @click="resetForm(loginFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { type Ref, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'
import { validatePassword } from '@/utils/rules'
import i18n from '@/i18n'
import { LoginFormParams } from '@/types/api'

const userStore = useUserStore()
const flagType: Ref<string> = ref('password')
const loginForm: Ref<LoginFormParams> = ref({
  username: 'super-admin',
  password: '123456'
})

const loginRules = ref<FormRules<typeof loginForm>>({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.global.t('msg.login.usernameRule')
    }
  ],
  password: [
    {
      validator: validatePassword(),
      trigger: 'blur'
    }
  ]
})
// 处理登录
const loading: Ref<boolean> = ref(false)
const loginFormRef = ref<FormInstance>()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // 1.进行表单校验
  try {
    formEl.validate((valid: boolean) => {
      if (!valid) return
      // 2.触发登录动作
      loading.value = true
      userStore
        .login({ username: loginForm.value.username, password: '123' })
        .then(() => {
          loading.value = false
          ElMessage({
            message: '登录成功',
            type: 'success'
          })
        })
        .catch((error) => {
          loading.value = false
          console.log(error)
        })
    })
  } catch (error) {
    ElMessage.error('登录失败')
  }
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title-container {
    padding-bottom: 10px;
  }
  .login-form {
    min-width: 400px;
  }
}
</style>
