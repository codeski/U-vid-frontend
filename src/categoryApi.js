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
        let i = parseInt(target.parentElement.parentElement.dataset.id)
        target.parentElement.parentElement.style.display = "none"
        Video.all.forEach(video => {if(video.category_id === i)
                                    {VideoApi.deleteVideosOfCategory(video)}
        })
        fetch(this.baseUrl + `/${i}`, {
            method: 'DELETE', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
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