{
    selectTab()

    $('#switchTab > li > a').on('click', (e) => {
        e.preventDefault()

        let href = e.currentTarget.getAttribute('href')
        location.hash = href.substring(2, href.length)

        selectTab()
    })    

    function selectTab() {
    }
}