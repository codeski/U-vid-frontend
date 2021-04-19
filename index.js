const videoList = document.getElementById("video-collection")
const BASE_URL = "http://localhost:3000"

const videoForm = document.getElementById("add-video-form")
videoForm.addEventListener("submit", addNewVideo)

fetchCategories()
setTimeout(fetchVideos, 300)

function fetchCategories(){
    fetch(`${BASE_URL}/categories`)
    .then(resp => resp.json())
    .then(data => {
        data.data.forEach(category => {
            let c = new Category(category.id, category.attributes.name)
            c.addCategoryToDom()
        }) 
    })  
}

function fetchVideos(){
    fetch(`${BASE_URL}/videos`)
    .then(resp => resp.json())
    .then(data => {
        data.data.forEach(video => {
            let v = video.attributes
            let vid = new Video(video.id, v.title, v.embed, v.category_id, v.notes, v.likes)
            vid.addVideoToDom()
        })
    })
}

function addNewVideo(e){
    e.preventDefault()
    let title = document.getElementById("title").value
    let embed = document.getElementById("embed").value
    let notes = document.getElementById("notes").value
    let category = document.getElementById("category_input").value
    let categoryDrop = document.getElementById("category_select")
    let selection = categoryDrop.options[categoryDrop.selectedIndex].text

    let c
    if (selection !== Select){
        c = categoryDrop.value
    } else {
        let cat = {
            name: category
        }

        fetch(`${BASE_URL}/categories`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cat)
        })
        .then(resp => resp.json())
        .then(category => {
            c = new Category(category.id, category.attributes.name)
            c.addCategoryToDom()
            console.log(c)
        })
    }

    let video = {
        title: title,
        embed: embed,
        notes: notes,
        category_id: c
    }

    setTimeout(getCreatedVideo(video), 300)
    // console.log(title, embed, notes, category, selection)
}

function getCreatedVideo(video){
    fetch(`${BASE_URL}/videos`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(video)
    })
    .then(resp => resp.json())
    .then(video => {
        let v = video.attributes
        let vid = new Video(video.id, v.title, v.embed, v.category_id, v.notes, v.likes)
        vid.addVideoToDom()
    })
}




