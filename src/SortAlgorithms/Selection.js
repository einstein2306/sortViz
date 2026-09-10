export async function selection(array, setArray, stopRef){

    let sortArray = [...array];
    let pos;
    let n = sortArray.length;
    for(let i = 0; i < n; i++){
        document.querySelectorAll("#box")[i].style.backgroundColor = "yellow";
        pos = await smallest(sortArray, i, n, stopRef);
        if(stopRef.current){
            return;
        }
        [sortArray[i], sortArray[pos]] = [sortArray[pos], sortArray[i]];
        document.querySelectorAll("#box")[i].style.backgroundColor = "steelblue";
        if(pos){
            document.querySelectorAll("#box")[pos].style.backgroundColor = "steelblue";
        }
        setArray([...sortArray]);
    }
}
async function smallest(sortArray, k, n, stopRef){

    let small = sortArray[k];
    let pos = k;

    for(let j = k + 1; j < n; j++){  
        document.querySelectorAll("#box")[j].style.backgroundColor = "orange";
        
         await new Promise(resolve => {
            setTimeout(resolve, 100);
        });

        if(stopRef.current){
            return;
        }

        if(sortArray[j] < small){
            if(pos!== k){
                document.querySelectorAll("#box")[pos].style.backgroundColor = "steelblue";
            }
            small = sortArray[j];
            pos = j;  
            document.querySelectorAll("#box")[pos].style.backgroundColor = "red";
        }
        
        if(j!== pos){
            document.querySelectorAll("#box")[j].style.backgroundColor = "steelblue";
        }
        
        if(stopRef.current){
            return;
        }
    } 
    return pos;
}





