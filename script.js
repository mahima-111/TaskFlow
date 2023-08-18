window.addEventListener('load',()=>{
    todos=JSON.parse(localStorage.getItem('todos'))||[];

    //implementing add button functionality
    const add=document.querySelector(".add");
    add.addEventListener('click',()=>{
        const inputVal=document.querySelector(".input-value");
        let myObj={
            value: inputVal.value,
            completed : false
        };
        todos.push(myObj);
        console.log(todos);
        localStorage.setItem('todos',JSON.stringify(todos));
        createItem();
        inputVal.value='';
    });
    createItem();   
});

function createItem(){

    const listItems=document.querySelector(".list-items");
    listItems.innerHTML='';

    todos.forEach((elem)=>{
        let li=document.createElement("li");
        li.classList.add("li");
        listItems.appendChild(li);

        let check=document.createElement("input");
        check.type="checkbox";
        check.classList.add("check");
        li.appendChild(check);

        let input=document.createElement("input");
        input.type="text";
        input.readOnly=true;
        input.value=elem.value;
        input.classList.add("input");
        li.appendChild(input);

        let edit=document.createElement("span");
        edit.classList.add("edit");
        edit.innerHTML='<i class="fa-solid fa-pen-to-square"></i>';
        li.appendChild(edit);

        deleteElem=document.createElement("span");
        deleteElem.classList.add("delete");
        deleteElem.innerHTML='<i class="fa-solid fa-x"></i>';
        li.appendChild(deleteElem);

        if(elem.completed){
            input.classList.add("line");
            check.checked=true;
        }
        deleteElem.addEventListener('click',()=>{
            let index=todos.indexOf(elem);
            console.log(index);
            todos.splice(index,1);
            localStorage.setItem('todos',JSON.stringify(todos));
            listItems.removeChild(li);
        });

        check.addEventListener('click',()=>{
            elem.completed=check.checked;
            localStorage.setItem('todos',JSON.stringify(todos));
            if(elem.completed){
                input.classList.add("line");
            }   
            else{
                input.classList.remove("line"); 
            }               
            // createItem();
        });

        edit.addEventListener('click',()=>{
            input.readOnly=false;
            input.focus();
            console.log('jknqkjd');
            input.addEventListener('blur',()=>{
                input.readOnly=true;
                elem.value=input.value;
                console.log(elem.value);
                localStorage.setItem('todos',JSON.stringify(todos));
                // createItem();
            })
        });       
    });
}

