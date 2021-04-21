class Video {

    static all = []

    constructor({id, title, embed, category_id, notes, likes}){
        // debugger
        this.id = parseInt(id)
        this.title = title
        this.embed = embed
        this.category_id = category_id
        this.notes = notes
        this.likes = likes 

        this.li = document.createElement('li')
        this.li.id = `video-${id}`
        this.li.dataset.id = id

        this.li.addEventListener('click', this.videoClick)

        Video.all.push(this)
    }

    videoClick = (event) => {
        if (event.target.innerText === "Like: <3"){
            increaseVideoLikes(event)
        } else if (event.target.innerText === "Edit" ){
            putEditForm(event.target)
            event.target.innerText = "Save"
        } else if (event.target.innerText === "Delete"){
            deleteVideo(event)
        } else if (event.target.innerText === "Save"){
            saveVideo(event.target)
        }
    }

    createVideo(){
        this.li.innerHTML = `
            <h3 class="video_title">${this.title}</h3>
            <div class="video_embed">${this.embed}</div>
            <div class="video_notes">${this.notes}</div>
            <div class="video_likes">${this.likes}</div>
            <button id="like-${this.id}" class="like">Like: <3</button>
            <button id="edit-${this.id}" class="edit">Edit</button>
            <button id="delete-${this.id}" class="delete">Delete</button>
        `
        
        return this.li
    }

    addVideoToDom(){
        let ul = document.getElementById(`category-${this.category_id}`)
        ul.append(this.createVideo())
    }
}
