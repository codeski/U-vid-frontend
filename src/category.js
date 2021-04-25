let displayButtons = false

class Category {

    static all = []

    constructor(id, name) {
        this.id = parseInt(id)
        this.name = name
        this.div = document.createElement('div')
        this.div.classList.add("category")
        
        Category.all.push(this)
        this.div.addEventListener("click", this.editOrDelete)
    }

    // const addBtn = document.querySelector("#new-toy-btn");
    // const toyFormContainer = document.querySelector(".container");
    // addBtn.addEventListener("click", () => {
    //   // hide & seek with the form
    //   addToy = !addToy;
    //   if (addToy) {
    //     toyFormContainer.style.display = "block";
    //   } else {
    //     toyFormContainer.style.display = "none";
    //   }
    
    editOrDelete = (event) => {
        // let buttonContainer = document.querySelector(".category-buttons")
        
        
        // buttonContainer.append(buttons)

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
            debugger
        } else if (event.target.innerText === "Delete"){
            debugger
        }

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