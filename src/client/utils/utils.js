function arrayDiff(a, b) {
    if (a.length && b.length) {
        const d = b.map((i) => i);
        a = a.filter((i) => !d.includes(i));
        return a
    } else {
        return a
    }
}