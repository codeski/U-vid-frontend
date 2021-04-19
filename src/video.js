class Video {
    constructor(id, title, embed, category_id, notes, likes){
        this.id = id
        this.title = title
        this.embed = embed
        this.category_id = category_id
        this.notes = notes
        this.likes = likes 
    }

    addVideoToDom(){
        const li = document.createElement('li')
        li.innerHTML = `
            <h3 class="video_title">${this.title}</h3>
            <div class="video_embed">${this.embed}</div>
            <div class="video_notes">${this.notes}</div>
            <div class="video_likes">${this.likes}</div>
            <button id="like_${this.id}" class="like_button"><3</button>
            `
        let ul = document.getElementById(`category_${this.category_id}`)
        // debugger
        ul.append(li)
    }

}