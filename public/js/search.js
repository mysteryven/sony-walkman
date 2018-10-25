{
    let view = {
        el: '#searchPage',
        template: `
        <form>
            <div>
            <input type="text" placeholder="搜索音乐, 歌手" id="songName">
            </div>
            <div>
            <button type="submit">
                <svg class="icon search-icon" aria-hidden="true">
                <use xlink:href="#icon-search"></use>
                </svg>
            </button>
            </div>
        </form>
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
                    <li id="${data.id}"
                        data-name="${songName}"
                        data-artist="${artist}"
                        data-albumId="${data.album.id}">
                        <div class="item">
                            <span class="hideOverflow">${songName}</span>
                            <span class="hideOverflow">${artist}</span>
                            <span class="hideOverflow">${album}</span>
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
            currentSong: {}
        },
        getSongs(songName) {
            return axios.get('/search?keywords=' + songName).then((response) => {
                this.data.songs = response.data.result.songs
                return this.data.songs
            })
        },
        getCurrentSong(songId) {
            if (songId) { 
                return axios.get('/song/url?id=' + songId).then((response) => {
                        this.data.currentSong.url = response.data.data[0].url
                    })
            }
        },
        getCurrentCover(albumId) {
            if (albumId) {
                return axios.get('/album?id=' + albumId).then((response) => {
                    console.log(response)
                    this.data.currentSong.cover = response.data.album.picUrl
                })
            }
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render()
            this.view.init()
            this.bindEvents()
        },
        bindEvents() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault()
                let songName = $('#songName').val()
                this.model.getSongs(songName).then(() => {
                    this.view.render(this.model.data.songs)
                })
            })

            this.view.$el.on('click', 'ul#playList > li', (e) => {
                let songId = $(e.currentTarget).attr('id')
                this.initCurrentSong(e)
                
                this.model.getCurrentSong(songId)
                    .then(() => {
                        this.model.getCurrentCover(this.model.data.currentSong.albumId).then(() => {
                            window.eventHub.emit('playSong', this.model.data.currentSong)
                    })
                })
            })
        },
        initCurrentSong(e) {
            this.model.data.currentSong.albumId = $(e.currentTarget).attr('data-albumid')
            this.model.data.currentSong.name = $(e.currentTarget).attr('data-name')
            this.model.data.currentSong.artist = $(e.currentTarget).attr('data-artist')
        }

    }

    controller.init(view, model)
}