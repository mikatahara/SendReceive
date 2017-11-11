var ex_id0=null;
var ex_id1=null;
var ex_id2=null;

window.onload = function()
{
	runTest2();

	// Dialogs for defining output data
	ex_id0 = document.getElementById("doc_ment0");
	ex_id1 = document.getElementById("doc_ment1");
	ex_id2 = document.getElementById("doc_ment2");

	var hoge = setInterval(function() {
	    //wait webmidi start
		if (inputs != null) {
			setInputMenuID(document.input_device_select.ids);
			setOutputMenuID(document.output_device_select.ids);
			if(input_menu_id!=null){ setInputDeviceSelect();
				input.onmidimessage = handleMIDIMessage2;
			}
			if(output_menu_id!=null) setOutputDeviceSelect();
			clearInterval(hoge);

		}
	}, 200);

};

function sendmidi(){
	var midievent=document.getElementById("doc_ment").value;
	var len=document.getElementById("doc_ment").textLength;
	var str;
	if(len==0) return;
	var sysex=Array(100);
	var j=0;
	for(var i=0; i<len; i++){
		str="0x";
		str+=midievent.substr(i,2);
		sysex[j]=parseInt(str);
		i+=2;
		j++;
	}
	sysex.length=j;
	output.send(sysex);
}

function sendmidi_id(id){
	var midievent=id.value;
	var len=id.textLength;
	var str;
	if(len==0) return;
	var sysex=Array(100);
	var j=0;
	for(var i=0; i<len; i++){
		str="0x";
		str+=midievent.substr(i,2);
		sysex[j]=parseInt(str);
		i+=2;
		j++;
	}
	sysex.length=j;
	output.send(sysex);
}



