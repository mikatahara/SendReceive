const LineNum=11;
const ColumnNum=12;
var strlog=new Array(LineNum);
var str=null;
var mlognum=0;
var sysexbuf="";

//add for Page 18, MIDI message monitor
function makeMassage( event ) {
	var i,k;
	str=null;

	if(stoplog.value==0) return;

	if( event.data[0] ==0xFE ) return;

	if( event.data[0] ==0xF0 ) savesysex(event.data);

	if( event.data.length>1) {

		str = event.data[0].toString(16) + " ";
		for(i=1,k=0; i<event.data.length; i++, k++){
				if(event.data[i]<0x10) str += "0";
				str += event.data[i].toString(16);
				str += " ";
				if(k>=40){
					str+="\n";
					k=0;
				}
			}
		}
}

function handleMIDIMessage2( event ) {
	var i,j;

	makeMassage( event );

	if(str[0]=='f' || str[0]=='F' ){
		console.log(log.scrollTop);
		log.scrollTop=500;
		if(mlognum!=0){
//			log.innerText+="\n";
//			log.innerText+=str;
//			log.innerText+="\n";
			log.innerHTML+="\n";
			log.innerHTML+=str;
			log.innerHTML+="\n";
			mlognum=0;
		} else {
			log.innerHTML+=str;
			log.innerHTML+="\n";
		}

	} else {
		log.innerHTML+=str;
		log.innerHTML+=" ";
		mlognum++;
		if(mlognum>=ColumnNum){
			log.innerHTML+="\n";
			mlognum=0;
		}
	}

    log.scrollTop = log.scrollHeight;
}

function inputDeviceSelect2(e)
{
	inputDeviceSelect(e);
	if(input!=null) input.onmidimessage = handleMIDIMessage2;
}

function savesysex(data){

	sysexbuf +="[";
	for(var i=0; i<data.length; i++){
		sysexbuf +="0x";
		if(data[i]<0x10) sysexbuf += "0";
		sysexbuf += data[i].toString(16);
		if(i!=data.length-1) sysexbuf += ",";
	}
	sysexbuf += "]\n";
	console.log(sysexbuf);
}

