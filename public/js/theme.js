{
    let view = {
        el: '#theme',
        template: `
        <h4>切换主题</h4>
        <div class="themes" id="topBarTheme">
          <div class="red active"></div>
          <div class="pink"></div>
          <div class="green"></div>
        </div>
        <div class="partTwo">
            <h4 class="shellTheme" id="shellTheme">切换外壳</h4>
            <div class="themes" id="shell">
                <div class="black active"></div>
                <div class="gold"></div>
            </div>
        </div> 
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
            this.bindEvents()
        },
        bindEvents() {
            $(this.view.el).find('#topBarTheme > div').on('click', (e) => {
                $(e.currentTarget).addClass('active')
                    .siblings('.active').removeClass('active')
            })
            $(this.view.el).find('#shell > div').on('click', (e) => {
                $(e.currentTarget).addClass('active')
                    .siblings('.active').removeClass('active')
            })
        }
    }

    controller.init(view, model)
}