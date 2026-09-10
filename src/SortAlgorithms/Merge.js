export async function merge(array, setArray, stopRef) {
    const sortArray = [...array];

    async function mergeSort(arr, beg, end) {
        if (stopRef.current) return;

        if (beg < end){
            if (stopRef.current) return;
            const mid = Math.floor((beg + end) / 2);
            await mergeSort(arr, beg, mid);
            await mergeSort(arr, mid + 1, end);
            await mergeHalves(arr, beg, mid, end, setArray, stopRef);
        }
    }

    await mergeSort(sortArray, 0, sortArray.length - 1);

}

async function mergeHalves(arr, beg, mid, end, setArray, stopRef){

    let i = beg;
    let j = mid + 1;
    let Index = beg;
    const tempArray = [...arr];

    while((i <= mid) && (j <= end)){

        if(stopRef.current) return;
        
        document.querySelectorAll("#box")[i].style.backgroundColor = "orange";
        document.querySelectorAll("#box")[j].style.backgroundColor = "orange";
        
        const left = i;
        const right = j;
        
        await new Promise(resolve =>{
            setTimeout(resolve,100);
        });
        
        if(arr[i] < arr[j]){
            tempArray[Index] = arr[i];
            i++;
            Index++;
        } 
        else{
            tempArray[Index] = arr[j];
            j++;
            Index++;
        }
        
        document.querySelectorAll("#box")[left].style.backgroundColor = "steelblue";
        document.querySelectorAll("#box")[right].style.backgroundColor = "steelblue";
        
        if(stopRef.current) return;
        setArray([...tempArray]);
    }

    if(i > mid){

        while(j <= end){

            await new Promise(resolve =>{
                setTimeout(resolve,100);
            });

            tempArray[Index] = arr[j];
            j++;
            Index++;

            if(stopRef.current) return ;
            setArray([...tempArray]);
        }
    }

    else{

        while(i <= mid){

            await new Promise(resolve =>{
                setTimeout(resolve,100);
            });

            tempArray[Index] = arr[i];
            i++;
            Index++;
            if(stopRef.current) return ;
            setArray([...tempArray]);
        }
    }

    // Keep the working array in sync so the next merge receives the sorted data.
    for (let k = beg; k <= end; k++) {
        arr[k] = tempArray[k];
    }
    if(stopRef.current) return ;
    setArray([...arr]);

}





