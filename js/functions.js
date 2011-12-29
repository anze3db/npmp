function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.originalEvent.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');
      
      var reader = new FileReader();
      // If we use onloadend, we need to check the readyState.
      reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
			try {
				data = JSON.parse(evt.target.result);


			} catch (e) {
				$(".alert-message").find('p').html(e.toString());
				$(".alert-message").show();
			}

        }
      };
      reader.onerror = function(evt) {
    	  $(".alert-message").find('p').html("<strong>Napaka</strong> pri branju datoteke (index.html mora biti odprt preko http:// in ne file://)");
    	  $(".alert-message").show();
      };
		var name = f.name.substring(0,f.name.lastIndexOf('.'));
		$('#name').text(name);
		$('.side-field').not(this).val(name);
      reader.readAsText(f);
      
      
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    $(e.target).addClass('inactive');
  }

function handleDragOver(e) {
	
    e.stopPropagation();
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function saveModel(e){
	// TODO: replace placeHolder with actual data
	var placeHolder = {neki:"aaa", bla:[1,2,3], mu:{neki2:"aa", ff:[444,4443]}};
	var str = JSON.stringify(placeHolder);
	var bb = new BlobBuilder;
	bb.append(str);
	saveAs(bb.getBlob("text/plain;charset=utf-8"), $('#output-model').val() + '.json');
}

function generate(){
	
	var bb = new BlobBuilder;
	bb.append("Hello, world!");
	saveAs(bb.getBlob("text/plain;charset=utf-8"), $('#output-source').val() + '.m');
}


function updateName(e){
	$('#name').text(this.value);
	$('.side-field').not(this).val(this.value);
}

function clear(){
	
	showModal('Opozorilo', 'S tem boste izbrisali neshranjene podatke.', clearForm);
}

function clearForm(){
	$('#form').each (function() { this.reset(); });
	$('#name').text("");
	$('.side-field').not(this).val("");	
}

function showModal(title, body, primary_callback){
	
	$($('#modal').find('.modal-header').find('h3')[0]).text(title);
	$($('#modal').find('.modal-body').find('p')[0]).text(body);
	$($('#modal').find('.modal-footer').children()[0]).unbind().click(function(){
		$('#modal').modal('hide');
		primary_callback();
	});
	$($('#modal').find('.modal-footer').children()[1]).unbind().click(function(){
		$('#modal').modal('hide');
	});

	$('#modal').modal('toggle');
}