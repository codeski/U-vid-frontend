class CategoryApi {

    static baseUrl = "http://localhost:3000/categories"

    static fetchCategories(){
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(data => {
            data.data.forEach(category => {
                let c = new Category(category.id, category.attributes.name)
                c.addCategoryToDom()
                c.addToDropDown()
            }) 
        })
        .then(setTimeout(function(){VideoApi.fetchVideos()}, 100))  
    }

    static deleteCategory = (target) => {
        let i = target.parentElement.parentElement.dataset.id

        fetch(this.baseUrl + `/${i}`, {
            method: 'DELETE', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
        
        document.getElementById(`${i}-category`).remove()
        target.parentElement.parentElement.remove()
        // Video.all.forEach(video => {if(video.category_id === i){VideoApi.deleteVideosOfCategory(video)}})
    }

    static saveCategory = (category) => {
        let i = category.id

        let catObj = {
            name: category.name
        }

        fetch(this.baseUrl + `/${i}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(catObj)
        })
        .then(resp => resp.json())
        .then(data => console.log("victory"))
    }
}