import { p1, p2, p3 } from './q5_input.js';

const parse = (s) => {
    const lines = s.split(/\n/).map((l) => l.split(' ').map(Number));
    return lines[0].map((_, c) => {
        return lines.map((l) => l[c]);
    });
};

const dance = (qs, round) => {
    const clapper = qs[(round - 1) % qs.length].shift();
    const q = qs[round % qs.length];
    const side = q.length >= clapper ? 1 : Math.ceil(clapper / q.length);
    const idx = clapper % q.length;
    if (side % 2 === 1) {
        q.splice(idx - 1, 0, clapper);
    } else {
        q.splice(q.length - (idx == 0 ? q.length : idx) + 1, 0, clapper);
    }
};

const shout = (qs) => qs.map((q) => q[0]).join('');

// const s = `2 3 4 5
// 3 4 5 2
// 4 5 2 3
// 5 2 3 4`;
//

const part1 = (s) => {
    const qs = parse(s);
    for (let i = 1; i <= 10; i++) {
        dance(qs, i);
    }
    return shout(qs);
};

console.log('P1', part1(p1));

const part2 = (s) => {
    const qs = parse(s);
    let round = 1;
    const D = {};
    while (true) {
        dance(qs, round);
        const num = shout(qs);
        D[num] = D[num] ? D[num] + 1 : 1;
        if (D[num] === 2024) {
            return +num * round;
        }
        round++;
    }
};

// const s2 = `2 3 4 5\n6 7 8 9`;
// console.log('P2', part2(s2));
console.log('P2', part2(p2));

const snapshot = (qs) => qs.map((q) => q.join(',')).join('|');

const part3 = (s) => {
    const qs = parse(s);
    const state = {};
    state[snapshot(qs)] = true;

    let max = '0';
    let round = 1;
    while (true) {
        dance(qs, round);
        const num = shout(qs);
        if (BigInt(num) > BigInt(max)) max = num;
        const s = snapshot(qs);
        if (state[s]) break;
        state[s] = true;
        round++;
    }
    return max;
};

console.log('P3', part3(p3));
