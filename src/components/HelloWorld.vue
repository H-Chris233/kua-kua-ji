<template>
  <div class="praise-machine">
    <h1 class="title">今日夸夸机</h1>
    <div class="praise-container">
      <transition name="fade" mode="out-in">
        <p class="praise-text" :key="currentPraise" v-html="displayPraise" @click="handlePraiseClick"></p>
      </transition>
    </div>
    
    <!-- Hug Image Modal -->
    <div v-if="showHugModal" class="modal-overlay" @click="showHugModal = false">
      <div class="modal-content" @click.stop>
        <h2>真人拥抱券</h2>
        <p>有效期：见面后立刻兑现</p>
        <div class="hug-image-container">
          <img src="../assets/mua.png" alt="Hug Image" class="hug-image">
        </div>
        <button class="close-modal" @click="showHugModal = false">关闭</button>
      </div>
    </div>
    <div class="counter">已查看 {{ counter }} 条夸夸</div>
    <button class="praise-button" @click="getNewPraise">
      <span class="button-text">点击刷新夸夸</span>
    </button>
    <div class="hearts">
      <span class="heart">💖</span>
      <span class="heart">💗</span>
      <span class="heart">💓</span>
      <span class="heart">💞</span>
    </div>
    <div v-if="showNewHearts" class="new-hearts">
      <span v-for="n in 8" :key="n" class="new-heart">💖</span>
    </div>
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
        '你笑起来比奶茶还甜',
        '你的笑容像春天的阳光一样温暖',
        '你的眼睛里有星星',
        '你的声音比音乐还动听',
        '你是我见过最温柔的人',
        '你的努力让我特别感动',
        '你今天也很美哦',
        '和你在一起的每分每秒都值得珍惜',
        '你身上有独特的光芒',
        '你的善良让我着迷',
        '你比我想象的更勇敢',
        '你比我画的更美',
        '你的一举一动都让人心动',
        '你的温柔是治愈一切的良药',
        '你认真工作的样子特别迷人',
        '你的小脾气也让我觉得可爱',
        '你比我最爱的甜点还要甜',
        '你的拥抱比任何安慰都管用',
        '你让我相信了爱情最美好的样子',
        '点击领取真人拥抱券（有效期：见面后立刻兑现）'
      ],
      showHugModal: false
    }
  },
  computed: {
    displayPraise() {
      if (this.currentPraise === this.hugCouponText) {
        return `<span class="hug-coupon" @click="showHugImage">${this.hugCouponText}</span>`;
      }
      return this.currentPraise;
    }
  },
  mounted() {
    // Display a random praise when the component mounts (page loads)
    this.getNewPraise();
  },
  methods: {
    getNewPraise() {
      // Get a random praise from the array, ensuring it's different from the previous one
      let randomIndex;
      let attempts = 0;
      const maxAttempts = this.praises.length; // Max attempts to avoid infinite loop
      
      do {
        randomIndex = Math.floor(Math.random() * this.praises.length);
        attempts++;
      } while (this.praises[randomIndex] === this.previousPraise && attempts < maxAttempts);
      
      this.previousPraise = this.praises[randomIndex];
      this.currentPraise = this.praises[randomIndex];
      this.counter++;
      
      // Show floating hearts animation
      this.showNewHearts = true;
      setTimeout(() => {
        this.showNewHearts = false;
      }, 1000);
    },
    showHugImage() {
      this.showHugModal = true;
    },
    handlePraiseClick(event) {
      if (event.target.classList.contains('hug-coupon')) {
        this.showHugImage();
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
}

.hug-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
