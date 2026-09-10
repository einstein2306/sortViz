
export async function bubble(array,setArray, stopRef){

    let sortArray = [...array];
    let box1;
    let box2;
    let isSwapped;
  
    for(let i=0; i < sortArray.length-1; i++){
        for(let j=0; j < sortArray.length-i-1; j++){
            box1 = document.querySelectorAll("#box")[j];
            box2 = document.querySelectorAll("#box")[j + 1];
            box1.style.backgroundColor = "red";
            box2.style.backgroundColor = "red";

             await new Promise(resolve => {
                setTimeout(resolve, 100);
            });

            if(stopRef.current){
                return;
            }
            
            if(sortArray[j] > sortArray[j+1]){
                isSwapped = true;
                [sortArray[j],sortArray[j+1]] = [sortArray[j+1],sortArray[j]];
                setArray([...sortArray]);
            }
           
            box1.style.backgroundColor = "steelblue";
            box2.style.backgroundColor = "steelblue";
        }

        if(!isSwapped){
            break;
        }
       
    }   

}