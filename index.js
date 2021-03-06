const videoList = document.getElementById("video-collection")
const BASE_URL = "http://localhost:3000"

const videoForm = document.getElementById("add-video-form")
videoForm.addEventListener("submit", addNewVideo)
let categoryDrop = document.getElementById('category_select')

let catSearch = document.getElementById('cat-input')
let catSubmit = document.getElementById('cat-submit')
catSubmit.addEventListener('click', handleSearch)

CategoryApi.fetchCategories()

function handleSearch(){
    let search = catSearch.value
    let returned = Category.all.filter(category => {return category.name.includes(search)})

    let videos = Video.all
    
    if (returned.length > 0){
        videoList.innerHTML = ""
        returned.forEach(category => {
            category.addCategoryToDom()
            for(const video of videos){
                if (category.id === video.category_id) {
                    video.addVideoToDom()
                }
            }
        })
    } 
    catSearch.value = ""
}

function addVideos(){}

function addNewVideo(e){
    e.preventDefault()
    let title = document.getElementById("title").value
    let embed = document.getElementById("embed").value
    let notes = document.getElementById("notes").value
    let category = document.getElementById("category_input").value
    let categoryDrop = document.getElementById("category_select")

    let video
    if (categoryDrop.value === ""){
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
        .then(data => {
            c = new Category(data.data.id, data.data.attributes.name)
            c.addCategoryToDom()
            c.addToDropDown()
            video = {
                title: title,
                embed: embed,
                notes: notes,
                category_id: c.id
            }
            VideoApi.createVideo(video)
            videoForm.reset()
        })
        
    } else {
        let category_id = categoryDrop.value
        video = {
            title: title,
            embed: embed,
            notes: notes,
            category_id: parseInt(category_id)
        }
        VideoApi.createVideo(video)
        videoForm.reset()
    }
}


