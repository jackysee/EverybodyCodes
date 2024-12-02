import { p1, p2, p3 } from './q3_input.js';

const parse = (s) => {
    const M = {};
    const lines = s.split('\n');
    lines.forEach((r, ri) => {
        r.split('').forEach((c, ci) => {
            if (c === '#') {
                M[[ri, ci]] = 0;
            }
        });
    });
    return M;
};

const toRC = (k) => k.split(',').map(Number);

const canDig = (M, r, c, diagonal = false) => {
    const adj = [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1]
    ];
    const dia = [
        [r - 1, c - 1],
        [r + 1, c + 1],
        [r + 1, c - 1],
        [r - 1, c + 1]
    ];
    return [...adj, ...(diagonal ? dia : [])].every(([_r, _c]) => {
        const val = M[[_r, _c]] ?? 0;
        return M[[r, c]] + 1 - val <= 1;
    });
};

const dig = (M, diagonal = false) => {
    let count = 0;
    Object.keys(M).forEach((k) => {
        if (canDig(M, ...toRC(k), diagonal)) {
            M[k] += 1;
            count++;
        }
    });
    return count;
};

const countDig = (s, diagonal = false) => {
    const M = parse(s);
    let sum = 0;
    while (true) {
        const c = dig(M, diagonal);
        if (c === 0) break;
        sum += c;
    }
    return sum;
};

console.log('P1', countDig(p1));
console.log('P2', countDig(p2));
console.log('P3', countDig(p3, true));
