const videoList = document.getElementById("video-collection")
const BASE_URL = "http://localhost:3000"

const videoForm = document.getElementById("add-video-form")
videoForm.addEventListener("submit", addNewVideo)
let categoryDrop = document.getElementById('category_select')



fetchCategories()
setTimeout(fetchVideos, 400)

function fetchCategories(){
    fetch(`${BASE_URL}/categories`)
    .then(resp => resp.json())
    .then(data => {
        data.data.forEach(category => {
            let c = new Category(category.id, category.attributes.name)
            c.addCategoryToDom()
            c.addToDropDown()
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
    // let selection = categoryDrop.options[categoryDrop.selectedIndex].text  
    let category_id
    let video

    if (categoryDrop.value === ""){
        let cat = {
            name: category
        }
        // debugger
        fetch(`${BASE_URL}/categories`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cat)
        })
        .then(resp => resp.json())
        .then(data => {
            c = new Category(data.data.id, data.data.attributes.name)
            c.addCategoryToDom()
            c.addToDropDown()
            // debugger
            video = {
                title: title,
                embed: embed,
                notes: notes,
                category_id: c.id
            }
            createVideo(video)
        })
        
    } else {
        category_id = categoryDrop.value
        video = {
            title: title,
            embed: embed,
            notes: notes,
            category_id: parseInt(category_id)
        }
        createVideo(video)
    }
}

function createVideo(video){
    fetch(`${BASE_URL}/videos`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(video)
    })
    .then(resp => resp.json())
    .then(data => {
        let v = data.data.attributes
        let vid = new Video(data.data.id, v.title, v.embed, v.category_id, v.notes, v.likes)
        vid.addVideoToDom()
    })
}

// function deleteVideo(){
//     let videoId = parseInt(event.target.dataset.id.split("_")[1])

//     fetch(`${BASE_URL}/videos/${videoId}`, {
//         method: 'DELETE'
//     })
// }

// function deleteCategory(){
//     let categoryId = parseInt(event.target.dataset.id.split("_")[1])

//     fetch(`${BASE_URL}/videos/${categoryId}`, {
//         method: 'DELETE'
//     })

//     this.location.reload()
// }


