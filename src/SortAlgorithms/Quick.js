export async function quick(array, setArray, stopRef) {
    const sortArray = [...array];

    async function quickSort(arr, low, high) {
        if (stopRef.current) return;

        if (low >= high) {
            if (low >= 0 && low < arr.length) {
                const boxes = document.querySelectorAll("#box");
                if (boxes[low]) boxes[low].style.backgroundColor = "steelblue";
            }
            return;
        }

        const pivotIndex = await partition(arr, low, high);
        if (stopRef.current || pivotIndex === -1) return;

        await quickSort(arr, low, pivotIndex - 1);
        if (stopRef.current) return;

        await quickSort(arr, pivotIndex + 1, high);
    }

    async function partition(arr, low, high) {
        
        if (stopRef.current) return -1;

        const boxes = document.querySelectorAll("#box");
        const pivot = arr[high];
        if (boxes[high]) boxes[high].style.backgroundColor = "red";

        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (stopRef.current) return -1;
            if (boxes[j]) boxes[j].style.backgroundColor = "orange";
            await new Promise(resolve => setTimeout(resolve, 100));

            if (stopRef.current) return -1;

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
            }

            if (boxes[j]) boxes[j].style.backgroundColor = "steelblue";
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setArray([...arr]);

        if (boxes[i + 1]) boxes[i + 1].style.backgroundColor = "steelblue";
        if (boxes[high]) boxes[high].style.backgroundColor = "steelblue";

        return i + 1;
    }

    await quickSort(sortArray, 0, sortArray.length - 1);
    if (!stopRef.current) {
        setArray([...sortArray]);
    }
}