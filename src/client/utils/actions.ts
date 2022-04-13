export function clickout(node, active) {
    function handle(e) {
        if (!node.contains(e.target)) {
            e.preventDefault();
            node.dispatchEvent(new CustomEvent('clickout'));
            console.log('clickout');
        }
    }
    return {
        update(active) {
            if (active) document.addEventListener('click', handle);
            else document.removeEventListener('click', handle);
        },
        destroy() {
            document.removeEventListener('click', handle);
        },
    };
}

export function longpress(node, threshold = 500) {
    // note — a complete answer would also consider touch events
    let startX;
    let startY;
    let X;
    let Y;

    const handle_longTouch = (e) => {
        // let start = Date.now();
        const event = e.touches ? e.touches[0] : e;
        X = startX = event.clientX;
        Y = startY = event.clientY;
        // console.log(startX,startY)

        const timeout = setTimeout(() => {
            node.dispatchEvent(
                new CustomEvent('longpress', {
                    detail: { X, Y },
                })
            );
        }, threshold);

        const cancel = () => {
            clearTimeout(timeout);
            node.removeEventListener('touchmove', cancel);
            node.removeEventListener('touchstart', cancel);
        };

        node.addEventListener('touchmove', cancel);
        node.addEventListener('touchstart', cancel);
    };

    node.addEventListener('touchstart', handle_longTouch);

    return {
        destroy() {
            node.removeEventListener('touchend', handle_longTouch);
        },
    };
}
