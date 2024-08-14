<template>
  <div class="user-info-container">
    <el-card>
      <el-button type="primary" :loading="printLoading" v-print="printObj">
        {{ $t('msg.userInfo.print') }}
      </el-button>
    </el-card>
    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
        <div class="header">
          <!-- 头部表格 -->
          <el-descriptions :column="2" :size="size" border class="descriptions">
            <el-descriptions-item :label="$t('msg.userInfo.name')">
              {{ userDetail.username }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">
              {{ userDetail.gender }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">
              {{ userDetail.nationality }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.province')">
              {{ userDetail.province }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">
              {{ $filters.dataFilter(userDetail.openTime) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
              <el-tag
                class="remark"
                size="small"
                v-for="(item, index) in userDetail.remark"
                :key="index"
                >{{ item }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.address')" :span="2">
              {{ userDetail.address }}
            </el-descriptions-item>
          </el-descriptions>
          <!-- 头像 -->
          <el-image class="avatar" :src="userDetail.avatar" fit="fill" />
        </div>
        <div class="body">
          <el-descriptions :column="1" border direction="vertical">
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in userDetail.experience" :key="index">
                  <span>
                    {{ $filters.dataFilter(item.startTime) }}----{{
                      $filters.dataFilter(item.endTime)
                    }}
                  </span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.description }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{ userDetail.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{ userDetail.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="footer">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { getUserDetailApi } from '@/api/userManage'
import { wacthSwitchLang } from '@/utils/i18n'
import type { ComponentSize } from 'element-plus'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const size = ref<ComponentSize>('default')
// 打印
const printLoading: Ref<boolean> = ref(false)
const printObj = {
  id: 'userInfoBox',
  popTitle: 'vue3-admin',
  beforeOpenCallback() {
    printLoading.value = true
  },
  openCallback() {
    printLoading.value = false
  }
}

const userDetail: Ref<any> = ref({})
const getUserDetail = async () => {
  userDetail.value = (await getUserDetailApi(props.id)).data
}
getUserDetail()
wacthSwitchLang(getUserDetail)
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;

  .descriptions {
    flex: 1;
  }
  .avatar {
    border: 1px solid #eee;
    padding: 29px 10px 30px;
  }
}
.footer {
  text-align: right;
  padding-top: 10px;
}
</style>
