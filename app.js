const addBtn = document.getElementById('btn');
const notes = document.getElementById('notes');


getNotes().forEach(note => {
  const noteEl = createNoteEl(note.id, note.content);
  notes.insertBefore(noteEl, addBtn);
  let ar = /[\u0600-\u06FF]/;
    if (ar.test(noteEl.value)) {
      noteEl.dir = "rtl";
    } else {
      noteEl.dir = "ltl";
    }
});


addBtn.addEventListener('click', addNote);


function addNote() {
  const theNotes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  notes.insertBefore(noteEl, addBtn);

  theNotes.push(noteObj);

  saveNote(theNotes)

}

function createNoteEl(id, content) {
  const element = document.createElement('textarea');
  element.className = 'note';
  element.placeholder = "Empty Note";
  element.value = content;

  element.addEventListener('input', () => {
    let ar = /[\u0600-\u06FF]/;
    if (ar.test(element.value)) {
      element.dir = "rtl";
    } else {
      element.dir = "ltl";
    }
    updateNote(id, element.value);
  });

  element.addEventListener('contextmenu', (e) => {
    console.log("hi");
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to get it back!",
      icon: 'warning',
      iconColor: '#d33',
      // background: "rgb(248 238 174 / 61%)",
      showCancelButton: true,
      confirmButtonColor: 'rgba(0, 0, 0, .55)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(id, element);
      }
    })
    // const warning = confirm("Do you Want to delete this note?");
    // if (warning) {
    //   deleteNote(id, element);
    // }
  })

  return element;
}

function deleteNote(id, el) {
  const theNotes = getNotes().filter((note) => note.id != id);
  saveNote(theNotes);

  el.remove();
}

function updateNote(id, content) {
  const theNotes = getNotes();
  const target = theNotes.filter((note) => note.id == id)[0];


  target.content = content;

  saveNote(theNotes);
}

function saveNote(theNote) {
  localStorage.setItem("note-app", JSON.stringify(theNote));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}
