/**
 * Created by JCut on 4/28/14.
 */

// Imagelist data array for filling in info box
var imageListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Imagename link click
    $('#imageList table tbody').on('click', 'td a.linkshowimage', showImageInfo);

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
        // Stick our user data array into a userlist variable in the global object
        imageListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.colorstyle + '" title="Show Details">' + this.colorstyle + '</td>';
            tableContent += '<td>' + this.file_path + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
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
