{
    let view = {
        el: '#nav',
        template: `
        <div class="status-bar">
            <svg class="icon wifi" aria-hidden="true">
            <use xlink:href="#icon-wifi"></use>
            </svg>
            <svg class="icon battery" aria-hidden="true">
            <use xlink:href="#icon-tecbatterycha"></use>
            </svg>
            <span class="time" id="timer"></span>
        </div>
        <ul id="switchTab">
            <li class="active" id="my">
            <a href="/my">换肤</a>
            </li>
            <li id="find">
            <a href="/find">音乐库</a>
            </li>
            <li id="search">
            <a href="/search">搜索</a>
            </li>
        </ul>
    `,
        render() {
            $(this.el).html(this.template)
        }
    }

    let model = {}

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render()
            this.selectTab()
            this.bindEvents()
            this.bindEventHub()
        },
        bindEventHub() {
            eventHub.on('changeTabBarColor', (color) => {
                let c = $(this.view.el).find('ul').css('background-color', color)
            })
        },
        bindEvents() {
            $('.container').find('#switchTab > li > a').on('click', (e) => {
                e.preventDefault()

                location.hash = e.currentTarget.getAttribute('href') + '-n'
                this.selectTab()
            })
        },
        selectTab() {
            let str = location.hash
            let currentTab = str.substring(2, str.length - 2) || 'my'
            $('.container').find('#' + currentTab).addClass('active').siblings('.active').removeClass('active')

            let index = $('#' + currentTab).index()
            $('#pages').css({
                'transform': `translateX(${-index*390}px)`
            })

            let isPlaying = str.charAt(str.length - 1) === 'y' ? true : false
            if (isPlaying) {
                $('#player').addClass('active')
            } else {
                $('#player').removeClass('active')
            }
        }
    }

    controller.init(view, model)
}