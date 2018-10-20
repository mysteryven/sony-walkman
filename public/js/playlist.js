{
    let view = {
        el: '#songList',
        template: `
        <div class="song-list-header">
            <svg class="icon arrow" aria-hidden="true" id="back">
                <use xlink:href="#icon-leftarrowpx"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="song-list-info">
            <div class="song-list-cover">
            <img src="./img/girl.jpeg" alt="" width=100 height=100>
            <div>
                <span>歌单名称</span>
            </div>
            </div>
            <ul>
            <li>
                <div class="index">1</div>
                <div class="song-info">
                <span>穿越时空的思念</span>
                <span>奏有</span>
                </div>  
            </li>
            </ul>
        </div>
        `,
        init() {
            this.$el = $(this.el)
        },
        render(songs) {
            if (!songs) {
                this.$el.html(this.template)
            } else {
                this.$el.find('ul').empty()
                songs.map((data, index) => {
                    let li = `
                    <li>
                        <div class="index">${index+1}</div>
                        <div class="song-info">
                            <span>${data.name}</span>
                            <span>${data.artists}</span>
                        </div>  
                    </li>
                    ` 
                    this.$el.find('ul').append(li)
                   
                })

               
            }
        }
    }

    let model = {
        data: {
            songIds: [],
            songs: []
        },
        getPlaylist(id) {
            return axios.get('/playlist/detail?id=' + id).then((response) => {
                this.data.songIds = response.data.playlist.trackIds
            })
        },
        getSongs() {
            this.data.songs = []
            console.log('clear')
            return new Promise((resolve, reject) => {
                let songIds = this.data.songIds
                for(let i = 0; i < songIds.length; i++) {
                    axios.get('/song/url?id=' + songIds[i].id).then((response) => {
                        let url = response.data.data[0].url
                        return axios.get('/song/detail?ids=' + songIds[i].id).then((res)=> {
                            let name = res.data.songs[0].name
                            let artists = ''
                            res.data.songs[0].ar.map((data, index) => {
                                if (index === 0) {
                                    artists = data.name
                                } else {
                                    artists +=  ('/' + data.name)
                                }
                            })
                            let item = {
                                url: url,
                                name: name,
                                artists: artists
                            }
                            this.data.songs.push(item)
                            if (i === songIds.length-1) {
                                resolve()
                            } 
                        })
                    })
                }
            })
        }
    }

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
            window.eventHub.on('openPlaylist', (data) => {
                this.model.getPlaylist(data).then(() => {
                    this.model.getSongs().then(()=> {
                        this.view.render(this.model.data.songs)
                        $('#songList').css({
                            'transform': 'translateX(-10px)',
                        })
                    })
                })
            })
        },
        bindEvents() {
            this.view.$el.on('click', '#back', () => {
                console.log(111)
                $('#songList').css({
                    'transform': 'translateX(370px)',
                })
            })
            
        }
    }

    controller.init(view, model)
}