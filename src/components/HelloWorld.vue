<template>
  <div class="praise-machine">
    <h1 class="title">今日夸夸机</h1>
    <div class="praise-container" role="region" aria-live="polite" aria-label="夸夸内容">
      <transition name="fade" mode="out-in">
        <p class="praise-text" :key="currentPraise">
          <template v-if="isHugCoupon">
            <span class="hug-coupon" role="button" tabindex="0" @click.stop="showHugImage" @keydown.enter.prevent="showHugImage" @keydown.space.prevent="showHugImage">{{ hugCouponText }}</span>
          </template>
          <template v-else>
            {{ currentPraise }}
          </template>
        </p>
      </transition>
    </div>
    
    <!-- Hug Image Modal -->
    <div v-if="showHugModal" class="modal-overlay" @click="showHugModal = false">
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="hug-title" aria-describedby="hug-desc" @click.stop>
        <h2 id="hug-title">真人拥抱券</h2>
        <p id="hug-desc">有效期：见面后立刻兑现</p>
        <div class="hug-image-container">
          <img src="../assets/mua.png" alt="拥抱券图片" class="hug-image">
          <div class="easter-egg-label">彩蛋！</div>
        </div>
        <button class="close-modal" @click="showHugModal = false">关闭</button>
      </div>
    </div>
    <div class="counter">已查看 {{ counter }} 条夸夸</div>
    <div class="actions">
      <button class="praise-button" :disabled="isRefreshing" @click="getNewPraise" aria-label="刷新夸夸">
        <span class="button-text">{{ isRefreshing ? '刷新中...' : '点击刷新夸夸' }}</span>
      </button>
      <button class="secondary-button" @click="copyPraise" aria-label="复制当前夸夸">
        复制夸夸
      </button>
    </div>
    <div class="hearts">
      <span class="heart">💖</span>
      <span class="heart">💗</span>
      <span class="heart">💓</span>
      <span class="heart">💞</span>
    </div>
    <div v-if="showNewHearts" class="new-hearts">
      <span v-for="n in 8" :key="n" class="new-heart">💖</span>
    </div>
    <div v-if="showToast" class="toast" aria-live="polite">{{ toastText }}</div>
    <footer class="footer">
      From Chris to Queena
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PraiseMachine',
  data() {
    return {
      currentPraise: '',
      previousPraise: '',
      counter: 0,
      showNewHearts: false,
      hugCouponText: '点击领取真人拥抱券（有效期：见面后立刻兑现）',
      praises: [
        '你笑起来比五仁月饼还甜(别打我)',
        '你的笑容像39度的制热空调一样温暖(犯贱别打)',
        '你的眼睛里有星星',
        '你的声音比音乐还动听',
        '你是我最最最最最最最最最喜欢的人',
        '你的努力让我特别感动(真的，给我卷怕了)',
        '你今天也很美哦(当然，每天都很美)',
        '和你在一起的每分每秒都值得珍惜',
        '你身上有独特的光芒',
        '你的味道让我着迷',
        '你比我想象的更有毅力',
        '你比我梦中的你更美',
        '你的一举一动都让人心动',
        '你是治愈我的良药',
        '你认真学习的样子特别迷人',
        '你的小脾气也让我觉得可爱',
        '你比我最爱的甜点还要甜(猜猜我最爱什么?)',
        '你的拥抱比任何安慰都管用',
        '你让我见到了爱情最美好的样子',
        '点击领取真人拥抱券（有效期：见面后立刻兑现）',
        '你的存在就是最好的礼物',
        '你有着让人安心的魔力',
        '你的每一个小动作都可爱到犯规',
        '你比你想象的更完美(真的！！！！)',
        '和你在一起的时间总是过得特别快(😭)',
        '你的温柔能融化冬日的冰雪(海南没有冬天...)',
        '你是我心中最亮的那颗星',
        '你的笑容能驱散所有阴霾',
        '你就像甜甜的布丁，让人忍不住想呵护(吃)',
        '你散发的光芒让周围都变得更明亮',
        '你是我人生中最美的风景',
        '你的每个小表情都值得珍藏(♥️晚♥️上♥️偷♥️偷♥️看)',
        '你拥有让世界都变美好的能力',
        '有你陪伴的日子才是好日子'
      ],
      showHugModal: false,
      isDebugMode: false,
      noHugCount: 0, // 没有出现拥抱券的连续次数计数器
      isRefreshing: false,
      showToast: false,
      toastText: ''
    }
  },
  computed: {
    isHugCoupon() {
      return this.currentPraise === this.hugCouponText
    }
  },
  mounted() {
    const saved = parseInt(localStorage.getItem('praiseCounter') || '0', 10)
    if (!isNaN(saved)) this.counter = saved

    // 键盘Esc关闭弹窗
    this._handleKeydown = e => {
      if (e.key === 'Escape' && this.showHugModal) this.showHugModal = false
    }
    window.addEventListener('keydown', this._handleKeydown)

    // 监听弹窗开关以控制滚动与聚焦
    this.$watch(() => this.showHugModal, val => {
      document.body.style.overflow = val ? 'hidden' : ''
      if (val) {
        this.$nextTick(() => {
          const btn = this.$el.querySelector('.close-modal')
          if (btn) btn.focus()
        })
      }
    })

    // 检查URL参数中是否包含debug
    const urlParams = new URLSearchParams(window.location.search)
    this.isDebugMode = urlParams.has('debug')
    
    if (this.isDebugMode) {
      this.showHugCoupon()
    } else {
      this.getNewPraise()
    }
  },
  unmounted() {
    if (this._handleKeydown) {
      window.removeEventListener('keydown', this._handleKeydown)
    }
  },
  methods: {
    getNewPraise() {
      if (this.isRefreshing) return
      this.isRefreshing = true

      if (this.noHugCount >= 9) {
        this.showHugCoupon()
        this.noHugCount = 0
        setTimeout(() => {
          this.isRefreshing = false
        }, 350)
        return
      }

      let randomIndex
      let attempts = 0
      const maxAttempts = this.praises.length
      
      do {
        randomIndex = Math.floor(Math.random() * this.praises.length)
        attempts++
      } while (this.praises[randomIndex] === this.previousPraise && attempts < maxAttempts)
      
      this.previousPraise = this.praises[randomIndex]
      this.currentPraise = this.praises[randomIndex]
      this.counter++
      this.persistCounter()
      
      if (this.currentPraise === this.hugCouponText) {
        this.noHugCount = 0
      } else {
        this.noHugCount++
      }
      
      this.showNewHearts = true
      setTimeout(() => {
        this.showNewHearts = false
      }, 1000)

      setTimeout(() => {
        this.isRefreshing = false
      }, 350)
    },
    showHugCoupon() {
      this.previousPraise = this.currentPraise
      this.currentPraise = this.hugCouponText
      this.counter++
      this.noHugCount = 0
      this.persistCounter()
      
      this.showNewHearts = true
      setTimeout(() => {
        this.showNewHearts = false
      }, 1000)
    },
    showHugImage() {
      this.showHugModal = true
    },
    copyPraise() {
      const text = this.isHugCoupon ? this.hugCouponText : (this.currentPraise || '')
      const clean = String(text)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(clean).then(() => {
          this.showToastMessage('已复制到剪贴板')
        }).catch(() => {
          this.fallbackCopyText(clean)
        })
      } else {
        this.fallbackCopyText(clean)
      }
    },
    fallbackCopyText(text) {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'absolute'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
        this.showToastMessage('已复制到剪贴板')
      } catch (e) {
        this.showToastMessage('复制失败，请手动复制')
      }
      document.body.removeChild(ta)
    },
    showToastMessage(msg) {
      this.toastText = msg
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 1500)
    },
    persistCounter() {
      try {
        localStorage.setItem('praiseCounter', String(this.counter))
      } catch (e) {
        return
      }
    }
  }
}
</script>

<style scoped>
.praise-machine {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 30%, #fce7f3 100%);
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
}

.title {
  font-size: 2.8rem;
  color: #ec4899;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  position: relative;
  z-index: 2;
  font-weight: bold;
}

.title::after {
  content: '';
  display: block;
  width: 150px;
  height: 4px;
  background: linear-gradient(to right, #ec4899, #a855f7);
  margin: 10px auto 0;
  border-radius: 2px;
}

.praise-container {
  background: white;
  border-radius: 30px;
  padding: 50px 40px;
  margin: 20px;
  box-shadow: 0 15px 40px rgba(236, 72, 153, 0.2);
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  max-width: 700px;
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
  border: 2px solid #fce7f3;
}

.praise-container:hover {
  transform: scale(1.03);
  box-shadow: 0 20px 50px rgba(236, 72, 153, 0.3);
}

.praise-text {
  font-size: 1.9rem;
  color: #be185d;
  text-align: center;
  line-height: 1.7;
  font-weight: 500;
  font-style: italic;
}

.praise-text .hug-coupon {
  color: #ec4899;
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
}

.praise-text .hug-coupon:hover {
  color: #be185d;
}

.counter {
  font-size: 1.1rem;
  color: #ec4899;
  margin: 15px 0;
  font-weight: bold;
  z-index: 2;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  max-width: 90%;
  width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
}

.hug-image-container {
  margin: 25px 0;
  padding: 15px;
  background: #fdf2f8;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* 添加相对定位，让子元素可以绝对定位 */
}

.hug-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.easter-egg-label {
  position: absolute;
  bottom: 25px;
  right: 20px;
  background-color: rgba(255, 215, 0, 0.9); /* 金色半透明背景 */
  color: #d4af37; /* 深金色文字 */
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
  z-index: 3; /* 确保标签在图片上方 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.close-modal {
  background: linear-gradient(to right, #ec4899, #a855f7);
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
  font-weight: bold;
}

.close-modal:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(236, 72, 153, 0.4);
}

.praise-button {
  background: linear-gradient(to right, #ec4899, #a855f7);
  color: white;
  border: none;
  padding: 16px 40px;
  font-size: 1.3rem;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
  font-weight: bold;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.praise-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(236, 72, 153, 0.6);
}

.praise-button:active {
  transform: translateY(2px);
}

.praise-button[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
}

.secondary-button {
  background: #ffffff;
  color: #ec4899;
  border: 2px solid #fce7f3;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.15);
}

.secondary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 22px rgba(236, 72, 153, 0.3);
}

.toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 10px 16px;
  border-radius: 9999px;
  font-size: 0.95rem;
  z-index: 1001;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.hearts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.heart {
  position: absolute;
  font-size: 2rem;
  animation: float 8s infinite ease-in-out;
}

.heart:nth-child(1) {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.heart:nth-child(2) {
  top: 25%;
  right: 15%;
  animation-delay: 1s;
}

.heart:nth-child(3) {
  bottom: 30%;
  left: 20%;
  animation-delay: 2s;
}

.heart:nth-child(4) {
  bottom: 20%;
  right: 25%;
  animation-delay: 3s;
}

.new-hearts {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: showNewHearts 1s forwards;
}

.new-heart {
  font-size: 2.5rem;
  margin: 5px;
  animation: newHeartFloat 1s ease-out forwards;
  opacity: 0;
}

.new-heart:nth-child(1) { animation-delay: 0.05s; }
.new-heart:nth-child(2) { animation-delay: 0.1s; }
.new-heart:nth-child(3) { animation-delay: 0.15s; }
.new-heart:nth-child(4) { animation-delay: 0.2s; }
.new-heart:nth-child(5) { animation-delay: 0.25s; }
.new-heart:nth-child(6) { animation-delay: 0.3s; }
.new-heart:nth-child(7) { animation-delay: 0.35s; }
.new-heart:nth-child(8) { animation-delay: 0.4s; }

.footer {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  color: #ec4899;
  font-weight: bold;
  z-index: 2;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
    opacity: 1;
  }
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
}

@keyframes showNewHearts {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes newHeartFloat {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.2rem;
  }
  
  .praise-text {
    font-size: 1.5rem;
  }
  
  .counter {
    font-size: 1rem;
  }
  
  .footer {
    font-size: 0.9rem;
    bottom: 15px;
  }
  
  .praise-container {
    padding: 30px 20px;
    width: 95%;
  }
  
  .praise-button {
    padding: 14px 30px;
    font-size: 1.1rem;
  }
}
</style>
