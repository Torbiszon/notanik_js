function saveNote() {
    const title = document.getElementById("title").value;
    const contents = document.getElementById("contents").value;
    const color = document.getElementById("color").value;
    const pin = document.getElementById("pin").checked;
    const date = new Date().toLocaleString();

    const note = {
        title,
        contents,
        color,
        pin,
        date,
    };

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    if (pin) {
        notes.unshift(note);
    } else {
        notes.push(note);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    document.getElementById("noteForm").reset();
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}

function renderNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.classList.add("note");
        li.style.backgroundColor = note.color;

        if (note.pin) {
            li.classList.add("pin");
        }

        li.innerHTML = `
            <strong>${note.title}</strong>
            <p>${note.contents}</p>
            <small>${note.date}</small>
            <button type="button" onclick="deleteNote(${index})">Delete</button>
        `;

        noteList.appendChild(li);
    });
}

renderNotes();