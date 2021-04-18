fetch("http://localhost:3000/videos")
.then(resp => resp.json())
.then(data => addVideosToDom(data))



function addVideosToDom(data){
    const videos = data.data
    videos.forEach(video => {
        const li = document.createElement('li')
        li.innerHTML = `<h3 class="video_title">${video.attributes.title}</h3>
            <div class="video_embed">${video.attributes.embed}</div>
            <div class="video_notes">${video.attributes.notes}</div>`
        videoList.append(li)
        // debugger
    })
     
}


class Video {



}