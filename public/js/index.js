{
    $('#currentSong').on('click', () => {
        beActive('#player')
        location.hash = location.hash.replace('-n', '-y')
    })

    
    $('#controlSongList').on('click', (e) => {
       toggleActive(e.currentTarget)
       let $ul = $(e.currentTarget).parent().next() 
       $ul.toggleClass('active')
    })

   
    
    

    $('#createSongList li').on('click', () => {
        $('#songList').css({
            'transform': 'translateX(0px)',
        })
    })
    $('#back').on('click', () => {
        $('#songList').css({
            'transform': 'translateX(375px)',
        })
    })

    function toggleActive(e) {
        $(e).toggleClass('active');
    }

    function beActive(e) {
        $(e).addClass('active')
            .siblings('.active').removeClass('active')
    }
    function disActive(e) {
        $(e).removeClass('active')
    }
}