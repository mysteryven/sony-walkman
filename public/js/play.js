let view = {
    el: '#player',
    template: `
    <div class="player-close">
    <svg class="icon player-arrow" aria-hidden="true" id="close">
      <use xlink:href="#icon-arrow-down"></use>
    </svg>
    </div>
  <div class="player-cover" style="background-image: url(./img/girl.jpeg)"> </div>
  <div class="player-information">
    <h2>Name</h2>
    <div>Singer</div>
  </div>
  <div class="player-controllers">
    <svg class="icon player-arrow" aria-hidden="true">
      <use xlink:href="#icon-right-arrow-copy"></use>
    </svg>
    <div>
      <svg class="icon player-play" aria-hidden="true" id="playButton">
        <use xlink:href="#icon-play1"></use>
      </svg>
      <svg class="icon player-play" aria-hidden="true" id="pauseButton">
        <use xlink:href="#icon-pause"></use>
      </svg>
    </div>
    <svg class="icon player-arrow" aria-hidden="true">
      <use xlink:href="#icon-icverticleright-copy"></use>
    </svg>
  </div>
    `,
    render() {
        $(this.el).html(this.template)
    },
    init() {
        this.$el = $(this.el)
    }
}

let model = {
    data: {
        song: {},
        audio: {}
    }
}

let controller = {
    init(view, model) {
        this.view = view
        this.model = model
        this.view.render()
        this.view.init()
        this.bindEvents()
        this.bindEventHub()
    },
    bindEvents(){
        $(this.view.el).on('click', '#playButton', (e) => {
            $('#player').addClass('playing')
            beActive('#currentPause')
            this.model.data.audio.play()
        })

        $(this.view.el).on('click', '#pauseButton', (e) => {
            $('#player').removeClass('playing')
            beActive('#currentPlay')
            this.model.data.audio.pause()
        })

        this.view.$el.on('click', '#close', () => {
            disActive('#player')
            location.hash = location.hash.replace('-y', '-n')
        })
    
    
    },
    bindEventHub() {
        window.eventHub.on('playSong', (data) => {
            console.log(data)
            let songUrl = data
            this.model.data.audio = new Audio(songUrl)
            $('#player').addClass('playing')
            beActive('#currentPause')
            this.model.data.audio.play()
        }) 
    }
}

controller.init(view, model)