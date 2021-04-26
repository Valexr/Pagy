export function clickout(node, active) {
    function handle(e) {
        if (!node.contains(e.target)) {
            e.preventDefault()
            node.dispatchEvent(new CustomEvent('clickout'))
            console.log('clickout')
        }
    }
    return {
        update(active) {
            if (active) document.addEventListener('click', handle);
            else document.removeEventListener('click', handle)
        },
        destroy() {
            document.removeEventListener('click', handle)
        }
    };
}
