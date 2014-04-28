/**
 * Created by JCut on 4/28/14.
 */

// Imagelist data array for filling in info box
var imageListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the image table on initial page load
    populateTable();

});

// Functions =============================================================
// Fill table with data
function populateTable() {
    // Empty content string
    // Then jQuery AJAX call for JSON
    var tableContent = '';
    $.getJSON( '/images/imagelist', function( data ) {
        // Stick our image data array into a imagelist variable in the global object
        imageListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowimage" rel="' + this.colorstyle + '" title="Show Details">' + this.colorstyle + '</td>';
            tableContent += '<td>' + this.file_path + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteimage" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#imageList table tbody').html(tableContent);
    });
};


// Show image Info
function showImageInfo(event) {
    // First Prevent Link from Firing
    event.preventDefault();
    // Retrieve imagename from link rel attribute
    // Get Index of object based on id value
    // Get our image Object
    var thisImageName = $(this).attr('rel');
    var arrayPosition = imageListData.map(function(arrayItem) { return arrayItem.imagename; }).indexOf(thisImageName);
    var thisImageObject = imageListData[arrayPosition];
    //Populate Info Box
    $('#imageInfoColorstyle').text(thisImageObject.colorstyle);
    $('#imageInfoAlt').text(thisImageObject.alt);
    $('#imageInfoShotNumber').text(thisImageObject.shotnumber);
    $('#imageInfoFilepath').text(thisImageObject.filepath);
};
