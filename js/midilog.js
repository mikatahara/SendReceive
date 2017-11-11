var strlog[11]={"","","","","","","","","","",""};
var str=null;
var mlognum=0;

//add for Page 18, MIDI message monitor
function makeMassage( event ) {
	var i,k;
	str=null;

	if( event.data[0] ==0xFE ) return;

	if( event.data.length>1) {

		str = event.data[0].toString(16) + " ";
		for(i=1,k=0; i<event.data.length; i++, k++){
				if(event.data[i]<0x10) str += "0";
				str += event.data[i].toString(16);
				str += " ";
			}
		}
		str ="\n";
}

function handleMIDIMessage2( event ) {
	var i;

	makeMassage( event );
	strlog[mlognum]=str;

	for(i=0; i<11; i++){
		log.innerText += strlog[i];
	}

	if(mlognum<10) mlognum++;

	else {
		for(i=0; i<10; i++){
			strlog[i]=strlog[i+1];
		}
	}

}
