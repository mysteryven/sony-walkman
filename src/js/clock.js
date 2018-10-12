{
    function showTime() {
       let data = new Date()
       let hour = data.getHours()
       let minute = data.getMinutes()
       let session = hour < 13 ? 'AM' : 'PM'

       minute = minute < 10 ? '0' + minute : minute
       let current = `${hour}:${minute} ${session}`
       $('#timer').html(current)
    }

    setInterval(showTime, 1000)
}