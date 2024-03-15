<script setup lang="ts">
import { ref } from 'vue'
import { getMonthlyVisitorsService, addMonthlyVisitorsService } from "@/api/home.js"
import { useRouter } from 'vue-router'
const options = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push' // 可用的click模式有: "push", "remove", "repulse", "bubble"。
      },
      onHover: {
        enable: true,
        mode: 'grab' // 可用的hover模式有: "grab", "repulse", "bubble"。
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.5,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#dedede'
    },
    links: {
      color: '#dedede', // '#dedede'。线条颜色。
      distance: 140, // 线条长度
      enable: true, // 是否有线条
      opacity: 0.6, // 线条透明度。
      width: 1// 线条宽度。
    },
    collisions: {
      enable: false
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 2, // 粒子运动速度。
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 100// 粒子数量。
    },
    opacity: {
      value: 0.7// 粒子透明度。
    },
    shape: {
      type: 'circle' // 可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
}

const data = ref("")

const addVisitors = async () => {
  await addMonthlyVisitorsService()
}
addVisitors()

const getVisitors = async () => {
  let result = await getMonthlyVisitorsService()
  data.value = result.data.visitorsCount
}

getVisitors()

const router = useRouter()
const enterSystem = () => {
  router.push('/article')
}

</script>
<template>
  <Particles id="tsparticles" class="particles" :options="options" />
  <div class="container">
    <div class="box">
      <h1>
        <span class="title-text">
          访客统计:{{ data }}
        </span>
      </h1>
    </div>
    <el-button class="button" type="primary" auto-insert-space @click="enterSystem">进入系统</el-button>
  </div>
</template>

<style scoped>
.container {
  padding-top: 20%;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  border-radius: 10px;
  width: 400px;
  height: 10%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.particles {
  z-index: -1;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('/src/assets/beach.jpg');
  opacity: 0.9;
  position: fixed;
  pointer-events: none;
}
</style>