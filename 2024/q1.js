import { p1, p2, p3 } from './q1_input.js';

const P = { A: 0, B: 1, C: 3, D: 5 };

const group = (s, num = 1) => {
    const result = [];
    for (let i = 0; i < s.length; i += num) {
        result.push(s.substring(i, i + num));
    }
    return result;
};

const potion = (s) => {
    const _s = s.replaceAll('x', '');
    const extra = _s.length - 1;
    return _s.split('').reduce((a, c) => a + P[c] + extra, 0);
};

const totalPotion = (s, num) =>
    group(s, num).reduce((a, g) => a + potion(g), 0);

console.log('Part 1', totalPotion(p1, 1));
console.log('Part 2', totalPotion(p2, 2));
console.log('Part 3', totalPotion(p3, 3));
