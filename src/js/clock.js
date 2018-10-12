{
    function showTime() {
       let data = new Date()
       let hour = data.getHours()
       let minute = data.getMinutes()
       let second = data.getSeconds()
       let session = hour < 13 ? 'AM' : 'PM'

       let current = `${hour}:${minute} ${session}`
       $('#timer').html(current)
    }

    setInterval(showTime, 1000)

}