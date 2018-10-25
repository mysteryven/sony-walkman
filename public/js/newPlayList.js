{
    let view ={
        el: '#newPlayList',
        template: `
        <h5>
            <span>最近音乐</span>
            <svg class="icon arrow" aria-hidden="true" id="controlSongList">
              <use xlink:href="#icon-rightarrow"></use>
            </svg>
        </h5>
        <ul>
        </ul> 
        `,
        init() {
            this.$el = $(this.el)
        },
        render(newSongList) {
            if (newSongList) {
                this.$el.find('ul').empty()
                newSongList.map((data) => {
                    let li = `
                    <li>
                        <img src=${data.cover || ''} width=113px height=113px>
                        <div>
                            <span class="hideOverflow">${data.name}</span>
                            <span class="hideOverflow">${data.artist}</span>
                        </div>
                    </li>
                    `
                    this.$el.find('ul').append(li)
                })
            } else {
                this.$el.html(this.template)
            }
        }
    }

    let model = {
        data: {
            newSongList: []
        },
        getNewSong() {
            return axios.get('/personalized/newsong?limit=8').then((response) => {
                console.log(response)
                let songItem = response.data.result.map((data, index) => {
                    return {
                        id: data.id,
                        name: data.name,
                        cover: data.song.album.picUrl,
                        artist: data.song.artists[0].name
                    }
                })
                songItem.splice(songItem.length-1)
                this.data.newSongList = songItem
            })
        }
    }

    let controller = {
        init(view, model) {
            this.view = view 
            this.model = model 
            this.view.init()
            this.view.render()
            this.model.getNewSong().then(() => {
                this.view.render(this.model.data.newSongList)
            })
            this.bindEvents()
        },
        bindEvents() {
           this.view.$el.on('click', 'ul > li', (e) => {
                let index = $(e.currentTarget).index()
                console.log(this.model.data.newSongList[index])
                let obj = this.model.data.newSongList[index] 
                axios.get('/song/url?id=' + obj.id).then((response) => {
                    console.log(response)
                    obj.url = response.data.data[0].url
                    window.eventHub.emit('playSong', obj)
                })
           }) 
        }
    }

    controller.init(view, model) 
}