const LineNum=11;
const ColumnNum=12;
var strlog=new Array(LineNum);
var str=null;
var mlognum=0;

for(var i=0; i<LineNum; i++){
	strlog[i]=new Array(ColumnNum);
	for(var j=0; j<ColumnNum; j++) strlog[i][j]="";
}

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

function printLog()
{
	var i, j;

	log.innerText="";
	for(i=0; i<LineNum; i++){
		for(j=0; j<ColumnNum;j++){
			log.innerText += strlog[i][j];
			log.innerText+=" ";
		}
		log.innerText+="\n";
	}
}

function shiftLog()
{
	var i;
	var ml1,mc1,ml2,mc2;

	for(i=0; i<LineNum*ColumnNum-1; i++){
		ml1 = Math.floor(i/ColumnNum);
		mc1 = i-ml1*ColumnNum;
		ml2 = Math.floor((i+1)/ColumnNum);
		mc2 = (i+1)-ml2*ColumnNum;
		strlog[ml1][mc1]=strlog[ml2][mc2];
	}
}


function handleMIDIMessage2( event ) {
	var i;
	var ml1,mc1;

	makeMassage( event );

/*	if(str[0]=="f"){
		if(mlognum>LineNum-8){
			while(mlognum!=LineNum-8){
				shiftLog();
				mlognum--;
			}
		} else {
			while((mlognum%8)!=0){
				strlog[mlognum]="";
				mlognum++;
				if(mlognum<LineNum-1) mlognum++;
			}
		}
		strlog[mlognum]=str;
	} else {
		strlog[mlognum]=str;
	}
*/

	ml1 = Math.floor(mlognum/ColumnNum);
	mc1 = mlognum-ml1*ColumnNum;
	strlog[ml1][mc1]=str;

	printLog();

	if(mlognum<LineNum*ColumnNum-1){
		mlognum++;
	} else {
		shiftLog();
	}

}

function inputDeviceSelect2(e)
{
	inputDeviceSelect(e);
	input.onmidimessage = handleMIDIMessage2;
}
