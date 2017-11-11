const LineNum=88;
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
}

function handleMIDIMessage2( event ) {
	var i;

	makeMassage( event );
	strlog[mlognum]=str;

	log.innerText="";

	for(i=0; i<LineNum; i++){
		if(i!=0 && i%8==0) log.innerText+="\n";
		log.innerText += strlog[i];
		log.innerText+=" ";
	}

	if(mlognum<LineNum-1) mlognum++;

	else {
		for(i=0; i<LineNum-1; i++){
			strlog[i]=strlog[i+1];
		}
	}

}
