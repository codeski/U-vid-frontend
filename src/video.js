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
            VideoApi.increaseLikes(event.target)
        } else if (event.target.innerText === "Edit" ){
            this.editForm(event.target)
            event.target.innerText = "Save"
        } else if (event.target.innerText === "Delete"){
            VideoApi.deleteVideo(event.target)
        } else if (event.target.innerText === "Save"){
            this.saveVideo(event.target)
            event.target.innerText = "Edit"
        }
    }

    saveVideo = () => {
        this.notes = this.li.querySelector('#notes').value
        this.title = this.li.querySelector('#title').value
        VideoApi.saveVideo(this)
    }

    editForm = (target) => {
        // debugger
        let v = target.parentElement
        
        let title = v.querySelector('.video-title')
        let notes = v.querySelector('.video-notes') 
        let t = title.innerText
        let n = notes.innerText
        title.innerHTML = `<input id="title" type="text" name="title" value=${t}></input>`
        notes.innerHTML = `<input id="notes" type="text" name="title" value=${n}></input>`
        // debugger

    }

    renderVideo(){
        this.li.innerHTML = `
            <h3 class="video-title">${this.title}</h3>
            <div class="video-embed">${this.embed}</div>
            <div class="video-notes">${this.notes}</div>
            <div class="video-likes">${this.likes}</div>
            <button id="like-${this.id}" class="like">Like: <3</button>
            <button id="edit-${this.id}" class="edit">Edit</button>
            <button id="delete-${this.id}" class="delete">Delete</button>
        `
        
        return this.li
    }

    addVideoToDom(){
        // debugger
        let ul = document.getElementById(`category-${this.category_id}`)

        ul.append(this.renderVideo())
    }
}
