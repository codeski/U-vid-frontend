let displayButtons = false

class Category {

    static all = []

    constructor(id, name) {
        this.id = parseInt(id)
        this.name = name
        this.div = document.createElement('div')
        this.div.dataset.id = id
        this.div.classList.add("category")

        Category.all.push(this)
        this.div.addEventListener("click", this.editOrDelete)
    }
    
    editOrDelete = (event) => {
        if(event.target.innerText === `${this.name}`){
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
        // debugger
        this.div.querySelector('.category-buttons').style.display = "none"

        this.changeNames()

        CategoryApi.saveCategory(this)
    }

    changeNames = () => {
        this.div.querySelector('h2').innerHTML = this.name
        // debugger
        let id = this.id + '-category'
        let selections = document.getElementById(id)
        selections.innerText = this.name
    }

    editCategory = (target) => {
        let name = target.parentElement.parentElement.firstElementChild.innerText
        let nameField = target.parentElement.parentElement.firstElementChild
       
        // debugger
        nameField.innerHTML = `<input class="cat-edit-input" name="cat-edit-input" value="${name}"></input>`
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
        option.id = `${this.id}-category`
        option.value  = this.id 
        option.innerText = this.name
        categoryDrop.append(option)
    }
}