{
    let view = {
        el: '#searchPage',
        template: `
    <form>
        <div>
        <input type="text" placeholder="歌名" id="songName">
        </div>
        <div>
        <button type="submit">
            <svg class="icon search-icon" aria-hidden="true">
            <use xlink:href="#icon-search"></use>
            </svg>
        </button>
        </div>
    </form>
    <p id="playingAudio">
        <audio autoplay controls></audio>
    </p>
    <ul class="playList" id="playList">
        <li>
            <div class="item">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </li>
    </ul>
    
    `,
        render(songs) {
            if (!songs) {
                $(this.el).html(this.template)
            } else {
                $('#playList').empty()
                songs.map((data) => {
                    let songName = data.name
                    let artist = data.artists[0].name || ''
                    let album = data.album.name || ''
                    let li = `
                <li id="${data.id}">
                    <div class="item">
                        <span>${songName}</span>
                        <span>${artist}</span>
                        <span>${album}</span>
                    </div>
                </li> 
                `
                    $('#playList').append(li)
                })
            }

        },
        init() {
            this.$el = $(this.el)
        }
    }

    let model = {
        data: {
            songs: [],
            currentSong: ''
        },
        getSongs(songName) {
            return axios.get('/search?keywords=' + songName).then((response) => {
                this.data.songs = response.data.result.songs
                return this.songs
            })
        },
        getCurrentSong(songId) {
            return axios.get('/song/url?id=' + songId).then((response) => {
                console.log(response)
                this.data.currentSong = response.data.data[0].url
            })
        }

    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render()
            this.view.init()
            this.bindEvent()
        },
        bindEvent() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault()
                let songName = $('#songName').val()
                this.model.getSongs(songName).then(() => {
                    console.log(this.model.data.songs)
                    this.view.render(this.model.data.songs)
                })
            })
            this.view.$el.on('click', 'ul#playList > li', (e) => {
                console.log(e.currentTarget)
                let songId = $(e.currentTarget).attr('id')
                this.model.getCurrentSong(songId)
                    .then(() => {
                        window.eventHub.emit('playSong', this.model.data.currentSong)
                    })
            })
        }

    }

    controller.init(view, model)

    window.eventHub.on('playSong', (data) => {
        console.log(data)
        let songUrl = data
        $(`#playingAudio`).empty().append(`
            <audio src='${songUrl}' controls></audio>
        `)
    }) 
}