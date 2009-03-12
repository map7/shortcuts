/*
Author: Michael Pope
Desc:   Allows Highlighting of rows & execution of links on that row by ID

Requirements:

Must have a stylesheet loaded in your template which includes:
  .highlight { background: yellow } 

At the end of your template have:
  <script>setup('listing');</script>

Your table with rows must have a name which corresponds with what you put in your setup.  In this example it would be:
  <table id=listing>

Handy to have the following in your application.js
function hide_all(){
    clear();
    $('ajaxForm').hide();
}

This allows you to hide a div called ajaxForm and clear all the highlighted rows.



Examples:

<%= shortcut_function '0', "highlight(0);" %>
<%= shortcut_function '1', "highlight(1);" %>
<%= shortcut_function '2', "highlight(2);" %>
<%= shortcut_function '3', "highlight(3);" %>
<%= shortcut_function '4', "highlight(4);" %>
<%= shortcut_function '5', "highlight(5);" %>
<%= shortcut_function '6', "highlight(6);" %>
<%= shortcut_function '7', "highlight(7);" %>
<%= shortcut_function '8', "highlight(8);" %>
<%= shortcut_function '9', "highlight(9);" %>

<%= shortcut_function 's', "runSelected(0);" %>
<%= shortcut_function 'e', "runSelected(1);" %>
<%= shortcut_function 'd', "runSelected(2);" %>


 */

var rows;
var selRow;

var jumps = [];  // Array of fields which you can bind a jump key.  Jump will allow you to quickly jump to common fields, unlike tab which will go through each.

var focusedElement = null;
var form = null;

// Setup variables to be used to hightlight and run row commands
function setup(listTable){
    // Detect if div exists and then fill out the variables
    if(document.getElementsByTagName && document.getElementById(listTable))
	rows = $(listTable).getElementsByTagName("tr"); 

}

// Highlight row
function highlight(row){
    selRow = row

    clear();

    for(i = 1; i < rows.length; i++){          
	if (row == i)
	    rows[row].className = "highlight";	
    }

}

// Clear all highlighting from a table.
function clear(){
    for(i = 1; i < rows.length; i++){          
	rows[i].className = "";
    }
}

// Run action on row
function runSelected(id){
    links = rows[selRow].getElementsByTagName("a");  // Get the links
    document.location = links[id];  // Go to the address.
}

// Run action on row (AJAX)
function runSelectedAjax(id){
    links = rows[selRow].getElementsByTagName("a");  // Get the links
    $(links[id]).onclick(); //For Ajax
}



// Setup the jump fields.
function setupJumps(theForm, jumpFields){
    // Setup the global variable 'jump'
    form = theForm;

    for (i = 0; i < jumpFields.length; i++){
	jumps.push($(jumpFields[i]));  // Add the field objects to an array
    }

    // Setup an observer on all fields to detect which is focused.
    setupObserve();

    // Select the first field
    $(jumps[0].id).focus();
    $(jumps[0].id).select();
}

// Setup a focus observer on all fields to detect which field is focused.
function setupObserve(){

    $$('input, select, textarea').each(function(e){
	    e.observe('focus',function(e){
		    return function() { focusedElement = e; }
                }(e));
	    e.observe('blur',function(e){
		    return function() {
			if (focusedElement==e)
			    focusedElement = null;
		    }
                }(e));
        });
}

// Jump to the next field.  Bind this to a shortcut key.
function jumpNext(){
    jumpDone = false;


    // Get the current focused element.
    currentField = focusedElement;

    // Get all fields for the form.
    fields = $(form).getElements();

    // Workout what number field the currently focused one is from the top. 'focusedElement'
    position = fields.indexOf(currentField);

    // Work out which field in the jump array would be next
    for (i = 0; i < jumps.length; i++){
	jump = fields.indexOf(jumps[i]);
	
	// select that field
	if (jump > position){
	    $(jumps[i]).focus();  // Jump to the next fiel
	    $(jumps[i]).select();
	    jumpDone = true;

	    break;        // Break out of the for loop
	}
    }
    
    // Jump to the first entry if no jump has been done.
    if (!jumpDone){
	$(jumps[0].id).focus();
	$(jumps[0].id).select();
    }

}