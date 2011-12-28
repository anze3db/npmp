$(document).ready(function() {

    $('#save').click(function(){
    	console.log("hello");
    	var bb = new BlobBuilder;
    	bb.append("Hello, world!");
    	saveAs(bb.getBlob("text/plain;charset=utf-8"), "hello world.txt");
    });
});
