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
    }

    static deleteVideo = (target) => {
        target.parentElement.style.display = "none"
        let i = parseInt(target.parentElement.dataset.id)
        // debugger
        fetch(this.BASE_URL + `/${i}`, {
            method: 'DELETE', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
    }
}