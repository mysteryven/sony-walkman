{
    let view = {
        el: '#theme',
        template: `

        <h4>作品介绍</h4>
        <div>
        <pre style="margin-left: 8px">
1. 接口使用的是 GitHub 上面开源的网易云 API 

2. 所有的代码部署在阿里云上

3. JS 文件使用了 MVC 的设计模式组织代码

4. 使用 eventhub 的机制来处理不同模块间的通讯

5. 使用锚点的方式来实现前端路由

6. 使用 Promise 来处理异步请求

7. 使用了原生 Dom 和 JQuery 来渲染和更新数据

8. 配色和样式参考了主流的音乐播放器


 
          </pre>
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
                let bgColor = $(e.currentTarget).css('background-color')
                $(e.currentTarget).addClass('active')
                    .siblings('.active').removeClass('active')
                eventHub.emit('changeTabBarColor', bgColor)
            })
            $(this.view.el).find('#shell > div').on('click', (e) => {
                let bgColor = $(e.currentTarget).css('background-color')
                $(e.currentTarget).addClass('active')
                    .siblings('.active').removeClass('active')
                
                $('.container').css('background-color', bgColor)
            })
        }
    }

    controller.init(view, model)
}