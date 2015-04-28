function infixToPostfix( phrase ){
	var out = '';
	var stack = new Array();
	var len   = phrase.length;
	for( var i=0 ; i < len ; i++){
		var asciiChr = phrase.charAt(i).charCodeAt(0);
		/*
		if( asciiChr > 64 && asciiChr < 91 || asciiChr > 96 && asciiChr < 123 ){
			if( out == '' ){
				out = phrase.charAt(i);
			}else{
			    out += phrase.charAt(i);
			}
		}else */

		// when current char is oparator
		if( asciiChr > 39 && asciiChr < 46 || asciiChr == 47 || asciiChr == 94 ){
			if( stack.length >= 1 ){
				/*
				* asciiCode 40 is char "("
				* asciiCode 41 is char ")"
				*/
				if( asciiChr == 40 || asciiChr == 41 ){

					if( asciiChr == 40 ){ 
						stack.push( phrase.charAt( i ) );
					}else {

						// empty stack to out put when asciiChr == ')'
						while( !( stack[stack.length-1].charCodeAt(0) == 40 ) )
							out+= stack.pop();
						
						// pop from stack asciiChr == '('
						stack.pop();
					}
				}else{
					if( comparator( phrase.charAt( i ) , stack[ stack.length - 1 ] ) ){
						stack.push( phrase.charAt(i) );
					}else{
						if( stack[stack.length-1] == "(" ){
							stack.push(phrase.charAt(i));
						}else{
							while(!comparator(phrase.charAt(i),stack[stack.length-1])){
								out+=stack.pop();
								if(typeof(stack[stack.length-1])=="undefined"){
									break;
								}
							}
							stack.push(phrase.charAt(i));
						}
					}
				}
			}else{
				stack.push(phrase.charAt(i));
			}
		}else{
			if( out == '' ){
				out = phrase.charAt(i);
			}else{
			    out += phrase.charAt(i);
			}
		}
		while(i>=len-1&&stack.length-1>=0){
				out += stack.pop(); /***pop all object stack**/
		}
	}
	return out;
}
/**************************************/
function comparator( x , y ){
		var priority=[["-","+"],["/","*"],["^",""]];

		for( var c = 0 ; c < priority.length ; c++){
			if( priority[c].indexOf(x) >= 0){
				var x = c;
			}
			if(priority[c].indexOf(y)>=0){
				var y = c;
			}
		}
		return x>y;
}

/**************************************/
alert( infixToPostfix( prompt("Enter phrase") ) );