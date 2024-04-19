<template>
  <div class="main">
    <div class="user">
    <el-avatar class="avater" :size="100" :src="circleUrl" />
    
    <div style="display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */">
      <span>你好，{{user}}</span>
      <p>{{ computedValue }}</p>
    </div>
    

    <el-row class="user-info" type="flex" justify="middle">
    <el-col class="user-info-item":span="6">
      <el-statistic title="会议总数" :value="6" />
    </el-col>
    <el-col class="user-info-item" :span="6">
      <el-statistic :value="6">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            待办会议
          </div>
        </template>
      </el-statistic>
    </el-col>
    <el-col class="user-info-item" :span="6">
      <el-statistic title="已完成会议" :value="6" />
    </el-col>
    <el-col class="user-info-item" :span="6">
      <el-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            消息
            <el-icon style="margin-left: 4px" :size="12">
              <ChatLineRound />
            </el-icon>
          </div>
        </template>
      </el-statistic>
    </el-col>
  </el-row>
  </div>

  
    <el-row style="box-shadow:rgba(0, 0, 0, 0.15) 0px 2px 15px;padding: 10px;">
      <el-col :span="12">
      <div class="statistic-card">
        <div class="el-statistic__head" style="display: inline-flex; align-items: center;">
         当前时间
        </div>
        <timeshow></timeshow>
        <div class="countdown-footer">{{ value.format('YYYY-MM-DD') }}</div>
      </div>
    </el-col>
    
    <el-col :span="12">
      <el-countdown format="DD [天] HH:mm:ss" :value="value2">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            <el-icon style="margin-right: 4px" :size="12">
              <Calendar />
            </el-icon>
            距离下一场会议开始时间
          </div>
        </template>
      </el-countdown>
      <div class="countdown-footer">{{ value2.format('YYYY-MM-DD') }}</div>
    </el-col>
  </el-row>

  </div>
  
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ChatLineRound } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { Calendar } from '@element-plus/icons-vue'
import timeshow from './componments/timeshow.vue'
import Service from '@/utils/axios'
import { toRaw } from 'vue';
const props = defineProps(['id'])
const s=props.id
const user = ref()
const getuser = () => {
  Service.get("/getoneuser/"+s,{
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    user.value = res.data.name
  }).catch(err => {
    console.log(err);
  });
};

onMounted(getuser)


const value = ref(dayjs())

const value2 = ref(dayjs().add(1, 'month').startOf('month'))


</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap:20px
}
.user {
  box-shadow:rgba(0, 0, 0, 0.15) 0px 2px 15px;
  display: flex;
}
.time{
  box-shadow:rgba(0, 0, 0, 0.15) 0px 2px 15px;
  display: flex;
  justify-self: center;
}
.avater {
  margin: 10px;
}
.el-col {
  text-align: center;
  height: auto;
}
.user-info {
  margin-left: auto;
  justify-items: center;
}
.user-info-item {
  display: flex; justify-content: center; flex-direction: column;
  width: 100px;
}
.countdown-footer {
  margin-top: 8px;
}
.el-statistic__head {
    font-weight: var(--el-statistic-title-font-weight);
    font-size: 12px;
    color: gray;
    line-height: 20px;
    margin-bottom: 4px;
}
</style>