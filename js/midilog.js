

//add for Page 18, MIDI message monitor
function handleMIDIMessage1( event ) {
	var str=null;
	var i,k;

	if( event.data[0] ==0xFE ) return;

	if( event.data.length>1) {

		str = "A" + event.data[0].toString(16) + " ";
		log.innerText += str;
		for(i=1,k=0; i<event.data.length; i++, k++){
				if(event.data[i]<0x10) str = "0";
				else str="";
				str += event.data[i].toString(16);
				str += " ";
				log.innerText += str;
			}
		}
		str ="\n"; log.innerText += str;
	}
