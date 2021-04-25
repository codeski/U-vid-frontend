class VideoApi {
    
    static BASE_URL = "http://localhost:3000/videos"

    static increaseLikes = (target) => {
        
        let i = parseInt(target.id.split("-")[1])
        let n = target.parentElement.querySelector('.video-likes').innerText
        n = parseInt(n)
        n++
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
        .then(data => {target.parentElement.querySelector('.video-likes').innerText = n})
    }

    static deleteVideosOfCategory = (video) => {
        // debugger
        let i = video.id
        // debugger
        fetch(this.BASE_URL + `/${i}`, {
            method: 'DELETE', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
    }

    static deleteVideo = (target) => {
        target.parentElement.remove()
        let i = parseInt(target.parentElement.dataset.id)
        // debugger
        fetch(this.BASE_URL + `/${i}`, {
            method: 'DELETE', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
    }

    static saveVideo = (video) => {
        let i = video.id

        let videoObj = {
            notes: video.notes,
            title: video.title
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
        .then(data => {video.renderVideo()})

    }

    static fetchVideos = () => {
        fetch(this.BASE_URL)
        .then(resp => resp.json())
        .then(data => {
            data.data.forEach(video => {
                let vid = new Video({id: video.id, ...video.attributes})
                vid.addVideoToDom()
            })
        })
    }

    static createVideo = (video) => {
        fetch(this.BASE_URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(video)
        })
        .then(resp => resp.json())
        .then(data => {
            let vid = new Video({id: data.id, ...data.data.attributes})
            // debugger
            vid.addVideoToDom()
        })
    }

}