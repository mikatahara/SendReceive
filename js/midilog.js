static var LineNum=11;
var strlog=new Array(LineNum);
var str=null;
var mlognum=0;

for(var i=0; i<LineNum; i++) strlog[i]="";

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

	for(i=0; i<LineNum; i++){
		log.innerText += strlog[i];
	}

	if(mlognum<LineNum-1) mlognum++;

	else {
		for(i=0; i<LineNum-1; i++){
			strlog[i]=strlog[i+1];
		}
	}

}
