{
    let view = {
        el: '#player',
        template: `
    <div class="player-close">
    <svg class="icon player-arrow" aria-hidden="true" id="close">
      <use xlink:href="#icon-arrow-down"></use>
    </svg>
    </div>
  <div id="playerCover" class="player-cover" style="background-image: url(./img/girl.jpeg)"> </div>
  <div class="player-information">
    <h2 class='name'>Name</h2>
    <div class='artist'>Singer</div>
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
  <div id="songContainer">
   
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
        bindEvents() {
            $(this.view.el).on('click', '#playButton', (e) => {
                $('#player').addClass('playing')
                beActive('#currentPause')
                document.querySelector('#songContainer audio').play()
            })

            $(this.view.el).on('click', '#pauseButton', (e) => {
                $('#player').removeClass('playing')
                beActive('#currentPlay')
                document.querySelector('#songContainer audio').pause()
                
            })

            this.view.$el.on('click', '#close', () => {
                disActive('#player')
                location.hash = location.hash.replace('-y', '-n')
            })

        },
        bindEventHub() {
            window.eventHub.on('playSong', (data) => {
                this.initSong(data)
            })
        },
        initSong({url, cover, name, artist}) {
            this.view.$el.find('#songContainer').removeAttr('src')
            this.view.$el.find('#songContainer').attr('src', url)

            $('#songContainer').empty()
            let audio = `<audio src=${url} style="display: none"></audio>`
            $('#songContainer').html(audio)
            document.querySelector('#songContainer audio').play()
            $('#player').addClass('playing')
            beActive('#currentPause')
            this.view.$el.find('#playerCover').css({
                'background-image': `url(${cover})`
            })

            this.view.$el.find('.player-information .name').html(name)
            this.view.$el.find('.player-information .artist').html(artist)
        }
    }

    controller.init(view, model)
}