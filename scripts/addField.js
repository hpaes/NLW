// Search button
document.querySelector("#add-time")
    // on button click
    .addEventListener('click', cloneField);

// Execute action
function cloneField() {

    // Clone fields. Which fields?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

    // Clean fields. Which fields?
    const fields = newFieldContainer.querySelectorAll('input');

    // For each field, clean
    fields.forEach(function(field) {
        // take using field and clean it
        field.value = '';
    })

    // Put on web page. Where?
    document.querySelector('#schedule-items').appendChild(newFieldContainer);
}
