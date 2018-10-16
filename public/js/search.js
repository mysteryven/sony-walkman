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
                <li>
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
    init(){
        this.$el = $(this.el)
    }
}

let model = {
    data: {
        songs: []
    },
    getSongs(songName) {
        return axios.get('/search?keywords='+ songName).then((response) => {
            this.data.songs = response.data.result.songs
            return this.songs 
        })
    }
}

let controller = {
    init (view, model) {
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
            this.model.getSongs(songName).then( () => {
                console.log(this.model.data.songs)
                this.view.render(this.model.data.songs)
            })
        })
    }

}

controller.init(view, model)



