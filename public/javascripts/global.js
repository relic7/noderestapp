/**
 * Created by JCut on 4/28/14.
 */

// Imagelist data array for filling in info box
var imageListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Imagename link click
    $('#imageList table tbody').on('click', 'td a.linkshowimage', showImageInfo);

    // Add Image button click
    $('#btnAddImage').on('click', btnAddImage);


    // Populate the image table on initial page load
    populateTable();

});

// Functions =============================================================
// Fill table with data
function populateTable() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON( '/images/imagelist', function( data ) {
        // Stick our Image data array into a Imagelist variable in the global object
        imageListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowImage" rel="' + this.colorstyle + '" title="Show Details">' + this.colorstyle + '</td>';
            tableContent += '<td>' + this.file_path + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteImage" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#imageList table tbody').html(tableContent);
    });
};


// Show image Info
function showImageInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve imagename from link rel attribute
    var thisImageName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = imageListData.map(function(arrayItem) { return arrayItem.imagename; }).indexOf(thisImageName);

    // Get our image Object
    var thisImageObject = imageListData[arrayPosition];

    //Populate Info Box
    $('#imageInfoColorstyle').text(thisImageObject.colorstyle);
    $('#imageInfoAlt').text(thisImageObject.alt);
    $('#imageInfoShotNumber').text(thisImageObject.shotnumber);
    $('#imageInfoFilepath').text(thisImageObject.filepath);

};


// Add Image
function addImage(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addImage input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all Image info into one object
        var newImage = {
            'imagename': $('#addImage fieldset input#inputImageName').val(),
            'email': $('#addImage fieldset input#inputImageEmail').val(),
            'fullname': $('#addImage fieldset input#inputImageFullname').val(),
            'age': $('#addImage fieldset input#inputImageAge').val(),
            'location': $('#addImage fieldset input#inputImageLocation').val(),
            'gender': $('#addImage fieldset input#inputImageGender').val()
        }

        // Use AJAX to post the object to our addImage service
        $.ajax({
            type: 'POST',
            data: newImage,
            url: '/images/addimage',
            dataType: 'BLOB'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addImage fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};