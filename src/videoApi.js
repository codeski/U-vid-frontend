class VideoApi {
    static videoObj
    
    static BASE_URL = "http://localhost:3000/videos"

    static increaseLikes = (event) => {
        
        let i = parseInt(event.target.id.split("-")[1])
        let n = event.target.parentElement.querySelector('.video-likes').innerText
        n = parseInt(n)
        n++
        // debugger
        let videoObj = {
            likes: n
        }
        
        fetch(this.BASE_URL + `/${i}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(videoObj)
        })
        .then(resp => resp.json())
        .then(data => {event.target.parentElement.querySelector('.video-likes').innerText = n})
        // debugger
    }
}