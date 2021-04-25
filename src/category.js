let displayButtons = false

class Category {

    static all = []

    constructor(id, name) {
        this.id = parseInt(id)
        this.name = name
        this.div = document.createElement('div')
        // this.div.id = `category-${id}`
        this.div.dataset.id = id
        this.div.classList.add("category")

        Category.all.push(this)
        this.div.addEventListener("click", this.editOrDelete)
    }
    
    editOrDelete = (event) => {
        if(event.target.innerText === `${this.name}`){
            // debugger
            let buttonContainer
            buttonContainer = this.div.querySelector(".category-buttons")
            buttonContainer.innerHTML = `<button>Edit</button><button>Delete</button>`
            displayButtons = !displayButtons
            if(displayButtons){
                buttonContainer.style.display = "block"
            } else {
                buttonContainer.style.display = "none"
            }
        } else if (event.target.innerText === "Edit"){
            this.editCategory(event.target)
            event.target.innerText = "Save"
        } else if (event.target.innerText === "Delete"){
            CategoryApi.deleteCategory(event.target)
        } else if (event.target.innerText === "Save"){
            this.saveCategory(event.target)
            event.target.innerText = "Edit"
        }

    }

    saveCategory = () => {
        let newName = this.div.querySelector('.cat-edit-input').value
        this.name = newName
        this.div.querySelector('.category-buttons').style.display = "none"
        this.changeNames()
        // this.div.parentElement.parentElement.querySelector('h2').innerHTML = `${this.name}`
        CategoryApi.saveCategory(this)
    }

    changeNames = () => {
        this.div.parentElement.parentElement.querySelector('h2').innerHTML = `${this.name}`
        
        let selections = categoryDrop.querySelectorAll('option')
        debugger
    }

    editCategory = (target) => {
        let nameField = target.parentElement.parentElement.querySelector('h2')
        let name = target.parentElement.parentElement.querySelector('h2').innerText
        nameField.innerHTML = `<input class="cat-edit-input" name="cat-edit-input" value=${name}></input>`
    }

    createCategory(){
        this.div.innerHTML = `
            <h2>${this.name}</h2>
            <div class="category-buttons">

            </div>
            <ul id="category-${this.id}"></ul>
        `

        return this.div
    }
    
    addCategoryToDom() {
        videoList.append(this.createCategory())
    }

    addToDropDown(){
        const option = document.createElement('option')
        option.value  = this.id 
        option.innerText = this.name
        categoryDrop.append(option)
    }
}