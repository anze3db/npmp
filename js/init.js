$(document).ready(function() {

	$(".alert-message").alert();
	
    $('#save').click(saveModel);
    
    $('#generate').click(generate);
    
    $('#clear').click(clear);

    $('.side-field').keyup(updateName);
    
    $('#modal').modal({backdrop: true, keyboard: true});
    
    $('#input_reactions').keyup(updateReactions);
    
    $('.examples').click(loadExample);    
    
    $('#drop-zone').bind('dragover', handleDragOver)
    			   .bind('drop', handleFileSelect)
    			   .bind('dragleave', function(e){$(e.target).addClass('inactive');})
    			   .bind('dragenter', function(e){$(e.target).removeClass('inactive');});
    
    examples = {
    		
    		and_ssa:{"input_reactants":"x, y, x*, DNK, DNK*, mRNK, z","input_reactions":"x + y  -> x*\nx* -> x + y\n2(x*) + DNK -> DNK* \nDNK* -> 2(x*) + DNK\nDNK* -> mRNK + DNK*\nmRNK -> mRNK + z\nmRNK -> 0\nz -> 0","input_k1":"0.00012","input_k2":"0.4791","input_k3":"0.00012","input_k4":"0.4791","input_k5":"0.0715","input_k6":"0.043","input_k7":"0.0039","input_k8":"0.0007","input_v":"2*10^(-15)","name":"and_ssa_generiran"},
    		driver_ssa:{"input_reactants":"x, DNK, x2_DNK, mRNK, y","input_reactions":"x + x + DNK -> x2_DNK\nx2_DNK -> x + x  + DNK\nx2_DNK -> mRNK + x2_DNK\nmRNK -> mRNK + y\nmRNK -> 0\ny -> 0","input_k1":"0.00012","input_k2":"0.4791","input_k3":"0.0715","input_k4":"0.043","input_k5":"0.0039","input_k6":"0.0007","input_v":"2*10^(-15)","name":"driver_ssa_generiran"},
    		negator_ssa:{"input_reactants":"x, DNK, x2_DNK, mRNK, y","input_reactions":"x + x + DNK -> x2_DNK\nx2_DNK -> x + x  + DNK\nDNK -> mRNK + DNK\nmRNK -> mRNK + y\nmRNK -> 0\ny -> 0","input_k1":"0.00012","input_k2":"0.4791","input_k3":"0.0715","input_k4":"0.043","input_k5":"0.0039","input_k6":"0.0007","input_v":"2*10^(-15)","name":"negator_ssa_generiran"},
    		nor_ssa:{"input_reactants":"x, y, DNK, x2_DNK, y2_DNK, mRNK, z","input_reactions":"x + x + DNK -> x2_DNK\nx2_DNK -> x + x  + DNK\ny + y + DNK -> y2_DNK\ny2_DNK -> y + y  + DNK\nDNK -> mRNK + DNK\nmRNK -> mRNK + z\nmRNK -> 0\nz -> 0","input_k1":"0.00012","input_k2":"0.4791","input_k3":"0.00012","input_k4":"0.4791","input_k5":"0.0715","input_k6":"0.043","input_k7":"0.0039","input_k8":"0.0007","input_v":"2*10^(-15)","name":"nor_ssa_generiran"}
    		
    };
    
});
