
var overlay = document.getElementById("overlay");

var addPopup = document.getElementById("add_popup");
var deletePopup = document.getElementById('delete_popup');
var editPopup = document.getElementById('edit_popup');

document.getElementById("add_note").addEventListener("click", function () {
    overlay.style.display = "block";
    addPopup.style.display = "block";
});
document.getElementById("adding").addEventListener("click", function () {
    overlay.style.display = "none";
    addPopup.style.display = "none";
});

document.getElementById("remove_note").addEventListener("click", function () {
    overlay.style.display = "block";
    deletePopup.style.display = "block";
});
document.getElementById("deleting").addEventListener("click", function () {
    overlay.style.display = "none";
    deletePopup.style.display = "none";
});

document.getElementById("edit_note").addEventListener("click", function () {
    overlay.style.display = "block";
    editPopup.style.display = "block";
});
document.getElementById("editing").addEventListener("click", function () {
    overlay.style.display = "none";
    editPopup.style.display = "none";
});

document.getElementById("cancel").addEventListener("click", function () {
    overlay.style.display = "none";
    addPopup.style.display = "none";
});
document.getElementById("cancel-1").addEventListener("click", function () {
    overlay.style.display = "none";
    deletePopup.style.display = "none";
});
document.getElementById("cancel-2").addEventListener("click", function () {
    overlay.style.display = "none";
    editPopup.style.display = "none";
});

function setLocalDate() {
    // Get the current date
    const currentDate = new Date();

    // Format the date as desired (e.g., "Month Day, Year")
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Set the formatted date to the 'date' element
    document.getElementById('date').textContent = "Date: " + formattedDate;
}

// Call the function to set the local date
setLocalDate();

