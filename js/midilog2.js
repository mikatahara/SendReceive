const LineNum=11;
const ColumnNum=12;
var strlog=new Array(LineNum);
var str=null;
var mlognum=0;

//add for Page 18, MIDI message monitor
function makeMassage( event ) {
	var i,k;
	str=null;

	if( event.data[0] ==0xFE ) return;

	if( event.data.length>1) {

		str = event.data[0].toString(16) + " ";
		for(i=1,k=0; i<Math.min(event.data.length,3); i++, k++){
				if(event.data[i]<0x10) str += "0";
				str += event.data[i].toString(16);
				str += " ";
			}
		}
}

function handleMIDIMessage2( event ) {
	var i,j;

	makeMassage( event );

	log.innerText+=str;
	log.innerText+=" ";
	mlognum++;
	if(mlognum>=ColumnNum){
		log.innerText+="\n";
		mlognum=0;
		var targetY = $('#log').offset().top;
		var target2Y = $(log).offset().top;
		var target3Y = $('#log').height();
		var target4Y = $(log).height();
	}


}

function inputDeviceSelect2(e)
{
	inputDeviceSelect(e);
	input.onmidimessage = handleMIDIMessage2;
}
