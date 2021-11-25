const state = [
    {
        name:'Go Shopping',
        completed:true
    },
    {
        name:'Go to the Doctor',
        completed:false
    },
    {
        name:'Get a haircut',
        completed:false
    }
]



function createToDoItem(obj){
    //Create <li>
    const todoLiEL = document.createElement('li')
    todoLiEL.setAttribute('class','todo')
    //Create div
    const todoDivCompletedCheckbox = document.createElement('div')
    todoDivCompletedCheckbox.setAttribute('class','completed-section')
    //Create checkbox to toggle completed
    const isCompletedCheckboxEl = document.createElement('input')
    isCompletedCheckboxEl.setAttribute('type','checkbox')
    isCompletedCheckboxEl.setAttribute('class','completed-checkbox')
    // if(obj.completed === true){
    //     isCompletedCheckboxEl.setAttribute('checked','')
    // }
    //Create Text section div
    const textSectionDiv = document.createElement('div')
    textSectionDiv.setAttribute('class','text-section')
    //Create paragraph that contains todo text
    const paragraphElThatContainsTodo = document.createElement('p')
    paragraphElThatContainsTodo.setAttribute('class','text')
    paragraphElThatContainsTodo.textContent= obj.name
    //Create div for buttons
    const buttonSectionDivEl = document.createElement('div')
    buttonSectionDivEl.setAttribute('class','button-section')
    //Create Edit Button
    const editButtonEl = document.createElement('button')
    editButtonEl.setAttribute('class','edit')
    editButtonEl.textContent = 'Edit'
    //Create Delete Button
    const deleteButtonEl = document.createElement('button')
    deleteButtonEl.setAttribute('class','delete')
    deleteButtonEl.textContent = 'Delete'
    //Append Stuff
    document.querySelector('ul.todo-list').append(todoLiEL)
    todoLiEL.append(todoDivCompletedCheckbox,textSectionDiv,buttonSectionDivEl)
    todoDivCompletedCheckbox.append(isCompletedCheckboxEl)
    textSectionDiv.append(paragraphElThatContainsTodo)
    buttonSectionDivEl.append(editButtonEl,deleteButtonEl)
    //Call the function that hides or shows completed list
    hideShowCompletedSection()
    //Check if task is completed or not
    // isCompletedOrNot()
    isCompletedCheckboxEl.addEventListener('click',(e)=>{
        isCompletedCheckboxEl.checked?obj.completed=true:obj.completed=false
        render()
    })

}



function hideShowCompletedSection(){
    //Find the show completed input
    const showHideCompletedInputEl = document.querySelector('input.show-completed-checkbox')
    //Find the completed todos section
    const completedSection = document.querySelector('section.completed-section')
    //Hide or show completed todos depending on if checked or not
    showHideCompletedInputEl.addEventListener('click',function(e){
        if(!showHideCompletedInputEl.checked){
            completedSection.style.display= 'none'
        }else{
            completedSection.style.display= 'block'
        }
    })
}


function createCompleted(obj){
    //Create <li>
    const todoLiEL = document.createElement('li')
    todoLiEL.setAttribute('class','todo completed')
    //Create div
    const todoDivCompletedCheckbox = document.createElement('div')
    todoDivCompletedCheckbox.setAttribute('class','completed-section')
    //Create checkbox to toggle completed
    const isCompletedCheckboxEl = document.createElement('input')
    isCompletedCheckboxEl.setAttribute('type','checkbox')
    isCompletedCheckboxEl.setAttribute('class','completed-checkbox')
    isCompletedCheckboxEl.setAttribute('checked','')
    //Create Text section div
    const textSectionDiv = document.createElement('div')
    textSectionDiv.setAttribute('class','text-section')
    //Create paragraph that contains todo text
    const paragraphElThatContainsTodo = document.createElement('p')
    paragraphElThatContainsTodo.setAttribute('class','text')
    paragraphElThatContainsTodo.textContent= obj.name
    //Create div for buttons
    const buttonSectionDivEl = document.createElement('div')
    buttonSectionDivEl.setAttribute('class','button-section')
    //Create Edit Button
    const editButtonEl = document.createElement('button')
    editButtonEl.setAttribute('class','edit')
    editButtonEl.textContent = 'Edit'
    //Create Delete Button
    const deleteButtonEl = document.createElement('button')
    deleteButtonEl.setAttribute('class','delete')
    deleteButtonEl.textContent = 'Delete'
    //Append Stuff
    document.querySelector('ul.completed-list').append(todoLiEL)
    todoLiEL.append(todoDivCompletedCheckbox,textSectionDiv,buttonSectionDivEl)
    todoDivCompletedCheckbox.append(isCompletedCheckboxEl)
    textSectionDiv.append(paragraphElThatContainsTodo)
    buttonSectionDivEl.append(editButtonEl,deleteButtonEl)
    //Check if task is completed or not
    // isCompletedOrNot()
    isCompletedCheckboxEl.addEventListener('click',(e)=>{
        isCompletedCheckboxEl.checked?obj.completed=true:obj.completed=false
        render()
    })  
}

function isCompletedOrNot(){
    isCompletedCheckboxEl.addEventListener('click',(e)=>{
        isCompletedCheckboxEl.checked?obj.completed=true:obj.completed=false
        render()
    })
}

function render(){
    document.querySelector('ul.todo-list').innerHTML=''
    document.querySelector('ul.completed-list').innerHTML=''

    for(const todo of state){
        todo.completed?createCompleted(todo):createToDoItem(todo)
    }
    
}

render()

