onmessage = function (event) {
    console.log('event ===> ', event)
    const result = `当前按下的是按钮${event.data}`;
    postMessage(result);
    // console.log(document)
    console.log('x====')
    const ary = [1,2,3,4,5]
    for (let index = 0; index < ary.length; index++) {
        const element = ary[index];
        console.log('element ===> ', element)
        
    }
};

