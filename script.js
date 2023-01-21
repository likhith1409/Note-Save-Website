const addButton = document.querySelector('#add');

const updateLSData = () =>{
    const textArea = document.querySelectorAll('textarea');
    const notes = [] ;
    textArea.forEach((note)=>{
        return notes.push(note.value);
    });
    localStorage.setItem('notes' , JSON.stringify(notes));
}

const addNewNote = (text ='') => {
    const note = document.createElement('div');
    note.classList.add('note');
    const htmlData = `
    <div class="operation">
            <button class="edit"> <i class="fas fa-edit"></i> </button>
            <button class="delete"> <i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class=" ${text ? "hidden" : ""} "></textarea>
    ` ;
    
    note.insertAdjacentHTML('afterbegin' , htmlData);



    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click' , ()=> {
        mainDiv.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    textArea.addEventListener('change', (event)=>{
        const text = event.target.value;
        mainDiv.innerHTML = text;
        updateLSData();
    });


    delButton.addEventListener('click' , ()=> {
        note.remove();
        updateLSData();
    });

    document.body.appendChild(note);
    
}
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach((note)=> addNewNote(note));
}
addButton.addEventListener('click' , () => addNewNote())