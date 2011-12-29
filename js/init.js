$(document).ready(function() {

	$(".alert-message").alert();
	
    $('#save').click(saveModel);
    
    $('#generate').click(generate);
    
    $('#clear').click(clear);

    $('.side-field').keyup(updateName);
    
    $('#modal').modal({backdrop: true, keyboard: true});
    
    
    $('#drop-zone').bind('dragover', handleDragOver)
    			   .bind('drop', handleFileSelect)
    			   .bind('dragleave', function(e){$(e.target).addClass('inactive');})
    			   .bind('dragenter', function(e){$(e.target).removeClass('inactive');});
});
