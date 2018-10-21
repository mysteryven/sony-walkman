{
    let view = {
        el: '#currentSong',
        template: `
        <div class="current-cover">
        <img class="songCover" src="./img/cover.jpeg" alt="" width=50 height=50>
        </div>
        <div class="current-info">
        <div class="song-info">
        <span class="songName hideOverflow">千本樱</span>
        <span class="songArtist hideOverflow">Animenzzz && Aayase</span>
        </div>
        <div>
        <svg class="icon current-play active" aria-hidden="true" id="currentPlay">
            <use xlink:href="#icon-play1"></use>
        </svg>
        <svg class="icon current-play" aria-hidden="true" id="currentPause">
            <use xlink:href="#icon-pause"></use>
        </svg>
        </div>
        </div>
    `,
        init() {
            this.$el = $(this.el)
        },
        render() {
            this.$el.html(this.template)
        }
    }

    let model = {}

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.view.render()
            this.bindEventHub()
            this.bindEvents()
        },
        bindEventHub() {
            window.eventHub.on('playSong', (data) => {
                this.initSong(data)
            })
        },
        bindEvents() {
            $('#currentPlay').on('click', (e) => {
                beActive('#currentPause')
                $('#player').addClass('playing')
                window.eventHub.emit('playClick')
                e.stopPropagation()
            })
            $('#currentPause').on('click', (e) => {
                beActive('#currentPlay')
                window.eventHub.emit('pauseClick')
                $('#player').removeClass('playing')
                e.stopPropagation()
            })
        },
        initSong(data) {
            this.view.$el.find('.songCover').attr('src', data.cover)
            this.view.$el.find('.songName').html(data.name)
            this.view.$el.find('.songArtist').html(data.artist)
        }

    }
    controller.init(view, model)
}