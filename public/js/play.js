let view = {
    el: '#player',
    template: `
    <div class="player-close">
    <svg class="icon player-arrow" aria-hidden="true" id="close">
      <use xlink:href="#icon-arrow-down"></use>
    </svg>
    </div>
  <div class="player-cover" style="background-image: url(./img/girl.jpeg)"> </div>
  <div class="player-information">
    <h2>Name</h2>
    <div>Singer</div>
  </div>
  <div class="player-controllers">
    <svg class="icon player-arrow" aria-hidden="true">
      <use xlink:href="#icon-right-arrow-copy"></use>
    </svg>
    <div>
      <svg class="icon player-play" aria-hidden="true" id="playButton">
        <use xlink:href="#icon-play1"></use>
      </svg>
      <svg class="icon player-play" aria-hidden="true" id="pauseButton">
        <use xlink:href="#icon-pause"></use>
      </svg>
    </div>
    <svg class="icon player-arrow" aria-hidden="true">
      <use xlink:href="#icon-icverticleright-copy"></use>
    </svg>
    <audio src="" autoplay></audio>
  </div>
    `,
    render() {
        $(this.el).html(this.template)
    }
}

let model = {

}

let controller = {
    init(view, model) {
        this.view = view
        this.model = model
        this.view.render()
        this.bindEventHub()
    },
    bindEventHub() {
       
    }
}

controller.init(view, model)