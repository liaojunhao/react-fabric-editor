if (window.Worker) {

    const first = document.getElementById('first')!;
    const second = document.getElementById('second')!;

    console.log('import.meta.url',import.meta.url)
    const myTask = new Worker(new URL('/worker.js', import.meta.url));
    console.log('myTask', myTask)

    first.addEventListener('click', () => {
        
        myTask.postMessage('first');
    });

    second.addEventListener('click', () => {
        myTask.postMessage('second');
    });

    myTask.onmessage = (e) => {
        alert(e.data);
    };
}