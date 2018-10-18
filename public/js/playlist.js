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
        render() {
            this.$el.html(this.template)
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
            this.data.songIds.map((data) => {
                axios.get('/song/url?id=' + data.id).then((response) => {
                    console.log(response)
                    let url = response.data.data[0].url
                    axios.get('')
                })
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
        },
        bindEventHub() {
            window.eventHub.on('openPlaylist', (data) => {
                this.model.getPlaylist(data).then(() => {
                    this.model.getSongs()
                })
            })
        }
    }

    controller.init(view, model)
}