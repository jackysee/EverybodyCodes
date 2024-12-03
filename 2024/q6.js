import { p1, p2, p3 } from './q6_input.js';

const parse = (s) => {
    return Object.fromEntries(
        s.split('\n').map((l) => {
            const [node, branches] = l.split(':');
            return [node, branches.split(',')];
        })
    );
};

const walk = (M) => {
    const queue = [['RR']];
    const result = [];
    while (queue.length) {
        const q = queue.shift();
        const n = q.at(-1);
        if (n === '@') {
            result.push(q);
            continue;
        }
        const branches = M[n];
        branches?.forEach((b) => {
            if (b === 'ANT' || b === 'BUG') return;
            queue.push([...q, b]);
        });
    }
    return result;
};

const findFruit = (s) => {
    const result = walk(parse(s));
    return result.find(
        (r, i, arr) => !arr.some((_r, _i) => _r.length === r.length && i !== _i)
    );
};

console.log('P1', findFruit(p1).join(''));
console.log(
    'P2',
    findFruit(p2)
        .map((d) => d[0])
        .join('')
);
console.log(
    'P3',
    findFruit(p3)
        .map((d) => d[0])
        .join('')
);
