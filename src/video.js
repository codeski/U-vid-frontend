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
        this.li.dataset.id = id

        Video.all.push(this)
    }

    addVideoToDom(){
        this.li.innerHTML = `
            <h3 class="video_title">${this.title}</h3>
            <div class="video_embed">${this.embed}</div>
            <div class="video_notes">${this.notes}</div>
            <div class="video_likes">${this.likes}</div>
            <button id="like_${this.id}" class="like_button"><3</button>
        `
        let ul = document.getElementById(`category-${this.category_id}`)
        ul.append(this.li)
    }
}
