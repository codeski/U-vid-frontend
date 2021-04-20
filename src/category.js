class Category {
    constructor(id, name) {
        this.id = parseInt(id)
        this.name = name
    }

    addCategoryToDom() {
        let div = document.createElement('div')
        div.classList.add("category")

        div.innerHTML = `
            <h2>${this.name}</h2>
            <ul id="category_${this.id}"></ul>
        `
        videoList.append(div)
    }

    addToDropDown(){
        
        const option = document.createElement('option')
        option.value  = this.id 
        option.innerText = this.name
        categoryDrop.append(option)
    }
}