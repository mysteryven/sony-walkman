{
    $('#currentSong').on('click', () => {
        beActive('#player')
    })

    $('#close').on('click', () => {
        disActive('#player')
    })

    $('#switchTab > li').on('click', (e) => {
        beActive(e.currentTarget)
    })

    $('#controlSongList').on('click', (e) => {
       toggleActive(e.currentTarget)
       let $ul = $(e.currentTarget).parent().next() 
       $ul.toggleClass('active')
    })

    $('#playButton').on('click', (e) => {
        $('#player').addClass('playing')
    })
    $('#pauseButton').on('click', (e) => {
        $('#player').removeClass('playing')
    })


    function toggleActive(e) {
        console.log(e.currentTarget)
        $(e).toggleClass('active');
    }

    function beActive(e) {
        $(e).addClass('active').siblings('.active').removeClass('active')
    }
    function disActive(e) {
        $(e).removeClass('active')
    }
}