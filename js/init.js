$(document).ready(function() {

    $('#save').click(function(){
    	
    	var bb = new BlobBuilder;
    	bb.append("Hello, world!");
    	saveAs(bb.getBlob("text/plain;charset=utf-8"), "hello world.txt");
    });
    
    $('#drop_zone').bind('dragover', handleDragOver)
    			   .bind('drop', handleFileSelect)
    			   .bind('dragleave', function(e){$(e.target).addClass('inactive');console.log("leave");console.log(e);})
    			   .bind('dragenter', function(e){$(e.target).removeClass('inactive');console.log("enter");console.log(e);});
});


function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    if(typeof evt.dataTransfer == "undefined")
    	return;
    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    $(evt.target).addClass('inactive');
  }

  function handleDragOver(evt) {
	
    evt.stopPropagation();
    evt.preventDefault();
    if(typeof evt.dataTransfer == "undefined")
    	return;
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
