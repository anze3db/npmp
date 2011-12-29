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
	var data = getFormData();

	var str = JSON.stringify(data);
	var bb = new BlobBuilder;
	bb.append(str);
	saveAs(bb.getBlob("text/plain;charset=utf-8"), $('#output-model').val() + '.json');
}

function getFormData() {
	var data = {};
	$("#form").find(':input').each(function(i, e) {
		data[e.name] = e.value;
	});
	console.log(data);
	data['name'] = $("#output-model").val();
	return data;
}

function generate() {
	var data = getFormData();
	// Transform the data as needed in the .m file:
	var gData = {};
	gData.input_v = data.input_v;

	gData.k = [];
	var cnt = 1;
	for ( var i in data) {
		if (i.indexOf('input_k') == 0) { // index starts with input_k
			gData.k.push({
				id : cnt++,
				value : data[i]
			});
		} else if (i == 'input_reactions') {
			gData.reactions = parseReactions(data[i]);
		}
	}

	var source = $("#m_source").render(gData);
	var bb = new BlobBuilder;
	bb.append(source);
	saveAs(bb.getBlob("text/plain;charset=utf-8"), $('#output-source').val() + '.m');
}

function parseReactions(reactions) {

	var res = [];
	var reactants = $('#input_reactants').val().replace(/, /g, ' ').replace(/,/g, ' ').split(' ');

	var line = reactions.split('\n');
	for ( var i in line) {
		var e = line[i].replace(/ /g, '');
		e = e.split('->');
		var r = e[0];
		var p = e[1];
		var l = $('<div/>').html(line[i]).text();
		res.push({
			id : parseInt(i) + 1,
			r : parseReactionsLine(r, reactants),
			p : parseReactionsLine(p, reactants),
			line : l
		});
	}
	return res;
}

function parseReactionsLine(r, reactants) {
	// reset the counters:
	var counters = {};
	for ( var j in reactants) {
		counters[reactants[j]] = 0;
	}

	r = r.split('+');
	// Count the number of occurrences:
	for ( var j in r) {
		// TODO: Handle x(y)
		counters[r[j]]++;
	}

	var str = "[";
	for ( var j in reactants) {
		str += counters[reactants[j]] + ",";
	}
	str += "]";
	return str;
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

	for ( var i in data) {
		var e = data[i];
		$('#form').find("#" + i).val(e);
		if (i == 'input_reactions')
			updateReactions();
	}

	$('#name').text(data['name']);
	$('.side-field').val(data['name']);
}

function updateReactions() {

	var reactions = [];
	var val = $('#input_reactions').val();
	var r = val.split('\n');
	if (val == "")
		r = [];
	// TODO: k fields tend to get mixed up when removing a middle reaction, fix
	// it.
	for ( var i in r) {
		console.log("#input_k" + parseInt(i) + 1);
		var value = $("#input_k" + (parseInt(i) + 1)).val() || "";
		reactions.push({
			id : parseInt(i) + 1,
			description : r[i],
			value : value
		});
	}
	var html = $("#k_fields_source").render({
		reactions : reactions
	});
	$("#k_fields").html(html);

}