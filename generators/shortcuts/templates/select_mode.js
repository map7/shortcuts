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

// Setup variables to be used to hightlight and run row commands
function setup(listDiv){
    // Detect if div exists and then fill out the variables
    if(document.getElementsByTagName && document.getElementById(listDiv))
	rows = $(listDiv).getElementsByTagName("tr"); 

}

// Highlight row
function highlight(row){
    selRow = row

    for(i = 1; i < rows.length; i++){          
	if (row == i)
	    rows[row].className = "highlight";	
	else
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