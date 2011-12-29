function handleFileSelect(e) {
	e.stopPropagation();
	e.preventDefault();

	var files = e.originalEvent.dataTransfer.files; // FileList object.

	// files is a FileList of File objects. List some properties.
	for ( var i = 0, f; f = files[i]; i++) {

		var reader = new FileReader();
		// If we use onloadend, we need to check the readyState.
		reader.onloadend = function(evt) {
			if (evt.target.readyState == FileReader.DONE) { // DONE == 2
				try {
					var data = JSON.parse(evt.target.result);
					updateForm(data);
				} catch (e) {
					$(".alert-message").find('p').html(e.toString());
					$(".alert-message").show();
					clearForm();
				}
			}
		};
		reader.onerror = function(evt) {
			$(".alert-message").find('p').html("<strong>Napaka</strong> pri branju datoteke (index.html mora biti odprt preko http:// in ne file://)");
			$(".alert-message").show();
		};
		var name = f.name.substring(0, f.name.lastIndexOf('.'));
		$('#name').text(name);
		$('.side-field').not(this).val(name);
		reader.readAsText(f);
	}
	$(e.target).addClass('inactive');
}

function handleDragOver(e) {

	e.stopPropagation();
	e.preventDefault();
	e.originalEvent.dataTransfer.dropEffect = 'copy'; // Explicitly show this
														// is a copy.
}

function saveModel(e) {
	data = {};
	$("#form").find(':input').each(function(i, e) {

		data[e.name] = e.value;
	});
	data['name'] = $("#output-model").val();
	console.log(data);
	var str = JSON.stringify(data);
	var bb = new BlobBuilder;
	bb.append(str);
	saveAs(bb.getBlob("text/plain;charset=utf-8"), $('#output-model').val() + '.json');
}

function generate() {
	// TODO: Write a real file
	var bb = new BlobBuilder;
	bb.append("Hello, world!");
	saveAs(bb.getBlob("text/plain;charset=utf-8"), $('#output-source').val() + '.m');
}

function updateName(e) {
	$('#name').text(this.value);
	$('.side-field').not(this).val(this.value);
}

function clear() {

	showModal('Opozorilo', 'S tem boste izbrisali neshranjene podatke.', clearForm);
}

function clearForm() {
	$('#form').each(function() {
		this.reset();
	});
	$('#name').text("");
	$('.side-field').not(this).val("");
}

function showModal(title, body, primary_callback) {

	$($('#modal').find('.modal-header').find('h3')[0]).text(title);
	$($('#modal').find('.modal-body').find('p')[0]).text(body);
	$($('#modal').find('.modal-footer').children()[0]).unbind().click(function() {
		$('#modal').modal('hide');
		primary_callback();
	});
	$($('#modal').find('.modal-footer').children()[1]).unbind().click(function() {
		$('#modal').modal('hide');
	});
	$('#modal').modal('show');
}
function updateForm(data) {
	$('#form').find(':input').each(function(i, e) {

		e.value = data[e.name];
	});

	$('#name').text(data['name']);
	$('.side-field').val(data['name']);
}