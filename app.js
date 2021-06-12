const App = {
  data() {
    return {
      score: 0,
      intervalId: null,
      currentSnake: [2, 1, 0],
      boxes: null,
      currentIndex: 1,
      direction: 1,
      appleIndex: 250,
      direction: 1,
      width: 20,
      speed: 0.9,
      interval: 200,
      state: ""
    }
  },
  methods: {
    startGame() {
        if(this.state == "started") return
        this.state = "started"
        this.undrawSnake()
        this.score = 0 
        this.currentSnake = [2, 1, 0]
        this.speed = 0.9
        this.currentIndex = 1
        this.appleIndex= 250
        this.direction = 1
        this.interval = 500
        this.intervalId  = setInterval(this.moveSnake, this.interval)
        this.drawSnake()
        
    },
    loadGame() {
      const boxes = document.querySelectorAll('.container span')
      this.boxes = [...boxes]
      this.randomApple()
      this.drawSnake()
    },
    drawSnake() {
      this.currentSnake.map((box) => {
        this.boxes[box].classList.add('snake')
      })
    },
    undrawSnake() {
     this.boxes.map(box => {
      box.classList.remove("snake")
     })
    },
    drawApple () {
       this.boxes[this.appleIndex].classList.add('apple')
    },
    moveSnake() {
        if(((this.currentSnake[0] + this.width >= (this.width * this.width)) && this.direction == this.width) || (this.currentSnake[0] - this.width < 0 && this.direction == - this.width) || (this.boxes[this.currentSnake[0] + this.direction].classList.contains("snake")))  {
           this.state = 'ended'
           return clearInterval(this.intervalId)
        }

        let tail = this.currentSnake.pop()
        this.boxes[tail].classList.remove('snake')
        
        this.currentSnake.unshift(this.currentSnake[0] + this.direction)

        let head  = this.currentSnake[0]
         if (this.boxes[head].classList.contains('apple')) {
           this.boxes[head].classList.remove("apple")
           this.currentSnake.push(tail)
           this.score += 2
           clearInterval(this.intervalId)
           this.randomApple()
           this.interval = this.interval * this.speed
           this.intervalId = setInterval(this.moveSnake, this.interval)
           
         }


    this.boxes[this.currentSnake[0]].classList.add("snake")
        
    },
    loadControl() {
     document.addEventListener('keydown', (e) => {
       switch (e.key) {
         case 'ArrowUp':
          if(this.direction == this.width) return
           this.direction = -this.width
           break
         case 'ArrowDown':
          if (this.direction == -this.width) return
           this.direction = this.width
           break
         case 'ArrowLeft':
          if (this.direction == 1) return
           this.direction = -1
           break
         case 'ArrowRight':
          if (this.direction == -1) return
           this.direction = 1
           break
       }
     })
    },
    randomApple() {
      do {
        this.appleIndex = Math.floor(Math.random() * this.boxes.length)
        this.drawApple()
      } while (this.boxes[this.appleIndex].classList.contains("snake"));
    }
  },
  mounted() {
    this.loadGame()
    this.loadControl()
  }
}

const vm = Vue.createApp(App)

vm.mount('#app')
