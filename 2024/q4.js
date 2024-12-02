import { p1, p2, p3 } from './q4_input.js';

const parse = (s) => s.split(/\n/).map(Number);

const level = (ns, s) => {
    return ns.reduce((a, n) => a + Math.abs(n - s), 0);
};

const strike = (s) => {
    const ns = parse(s);
    return level(ns, Math.min(...ns));
};

console.log('P1', strike(p1));
console.log('P2', strike(p2));

const minStrike = (s) => {
    const ns = parse(s);
    return Math.min(...ns.map((n) => level(ns, n)));
};

console.log('P3', minStrike(p3));
