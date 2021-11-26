const state = {
    todos:[
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
    }],
    showCompleted : true
}

const formEl = document.querySelector('form')

function createToDoItem(obj){
    //Create <li>
    const todoLiEL = document.createElement('li')
    obj.completed?todoLiEL.setAttribute('class','todo completed'):todoLiEL.setAttribute('class','todo')
    //Create div
    const todoDivCompletedCheckbox = document.createElement('div')
    todoDivCompletedCheckbox.setAttribute('class','completed-section')
    //Create checkbox to toggle completed
    const isCompletedCheckboxEl = document.createElement('input')
    isCompletedCheckboxEl.setAttribute('type','checkbox')
    isCompletedCheckboxEl.setAttribute('class','completed-checkbox')
    //If todo is completed, make the checkbox checked
    if(obj.completed)isCompletedCheckboxEl.checked=true
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
    if(!obj.completed){
        document.querySelector('ul.todo-list').append(todoLiEL)
        
    }else{
        document.querySelector('ul.completed-list').append(todoLiEL)
    }
    todoLiEL.append(todoDivCompletedCheckbox,textSectionDiv,buttonSectionDivEl)
        todoDivCompletedCheckbox.append(isCompletedCheckboxEl)
        textSectionDiv.append(paragraphElThatContainsTodo)
        buttonSectionDivEl.append(editButtonEl,deleteButtonEl)

    //Toggle task complete or incomplete
    function toggleCompleteOrIncomplete(){
        isCompletedCheckboxEl.addEventListener('click',(e)=>{
            obj.completed=!obj.completed
            render()
        })
    }
    toggleCompleteOrIncomplete()

   //Edit Todo
    function editTodoName(){
    //Create Input Button for Edit
    const editInputEl = document.createElement('input')
    //Displays input box instead of text when click on edit button
    editButtonEl.addEventListener('click',(e)=>{
        // obj.name = paragraphElThatContainsTodo.textContent = prompt('Enter new title for todo')
        //  obj.name=paragraphElThatContainsTodo.textContent
        //render()
        editInputEl.value = obj.name
        paragraphElThatContainsTodo.textContent = ''
        paragraphElThatContainsTodo.append(editInputEl)
        editInputEl.focus()
    })
    //Displays text with the value contained in the input box instead of input box as soon as 'Enter' is pressed.
        editInputEl.addEventListener('keydown', (e)=>{
            if(e.key==='Enter'){
                obj.name = editInputEl.value
                paragraphElThatContainsTodo.textContent = obj.name
            }
        })
    }
    editTodoName()
    
    deleteButtonEl.addEventListener('click',(e)=>{
       deleteItem(obj.name,todoLiEL)
})

}
function deleteItem(text,item){
    state.todos = state.todos.filter((todo)=>{
        return todo.name !== text
    })
    item.remove()
}

function hideShowCompletedSection(){
    //Find the show completed input
    const showHideCompletedInputEl = document.querySelector('input.show-completed-checkbox')
    //Find the completed todos section
    const completedSection = document.querySelector('section.completed-section')
    //Hide or show completed todos depending on if checked or not
    showHideCompletedInputEl.addEventListener('click',function(e){
        if(state.showCompleted){
            completedSection.style.display= 'none'
            state.showCompleted = false
            showHideCompletedInputEl.checked=false
            // render()
        }else{
            state.showCompleted = true
            completedSection.style.display= 'block'
            showHideCompletedInputEl.checked=true
            // render()
        }
    })
}



function addNewTask(){
    formEl.addEventListener('submit',(e)=>{
        e.preventDefault();
        state.todos.push({
            name:document.querySelector('input[type="text"]').value,
            completed:false
                    }
            )
            formEl.reset()
            render()
        }
    )
}



function render(){
    document.querySelector('ul.todo-list').innerHTML=''
    document.querySelector('ul.completed-list').innerHTML=''

    for(const todo of state.todos){
        createToDoItem(todo)
    }
    
}
render()
addNewTask()
hideShowCompletedSection()