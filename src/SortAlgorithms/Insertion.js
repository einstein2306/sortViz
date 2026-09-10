export async function insertion(array, setArray, stopRef) {
    if (stopRef.current || !Array.isArray(array) || array.length < 2) {
        return;
    }

    const sortArray = [...array];
    const boxes = () => document.querySelectorAll("#box");
    const n = sortArray.length;

    for (let i = 1; i < n; i++) {
        const key = sortArray[i];
        let j = i - 1;

        boxes()[i]?.style && (boxes()[i].style.backgroundColor = "red");
        await new Promise(resolve => setTimeout(resolve, 100));

        if (stopRef.current) {
            return;
        }

        while (j >= 0 && sortArray[j] > key) {
            boxes()[j]?.style && (boxes()[j].style.backgroundColor = "orange");
            sortArray[j + 1] = sortArray[j];
            setArray([...sortArray]);
            await new Promise(resolve => setTimeout(resolve, 100));

            if (stopRef.current) {
                return;
            }

            boxes()[j]?.style && (boxes()[j].style.backgroundColor = "steelblue");
            j--;
        }

        sortArray[j + 1] = key;
        setArray([...sortArray]);

        boxes()[j + 1]?.style && (boxes()[j + 1].style.backgroundColor = "steelblue");
        boxes()[i]?.style && (boxes()[i].style.backgroundColor = "steelblue");
    }
}

