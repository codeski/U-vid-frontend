class Category {

    static all = []

    constructor(id, name) {
        this.id = parseInt(id)
        this.name = name
        this.div = document.createElement('div')
        this.div.classList.add("category")
        
        Category.all.push(this)
    }

    addCategoryToDom() {
        this.div.innerHTML = `
            <h2>${this.name}</h2>
            <ul id="category-${this.id}"></ul>
        `
        videoList.append(this.div)
    }

    addToDropDown(){
        const option = document.createElement('option')
        option.value  = this.id 
        option.innerText = this.name
        categoryDrop.append(option)
    }
}