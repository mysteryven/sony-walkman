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
                            <span>${data.name}</span>
                            <span>${data.artist}</span>
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
        }
    }

    controller.init(view, model) 
}