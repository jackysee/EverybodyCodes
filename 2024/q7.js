import { p1, p2, t2, p3, t3 } from './q7_input.js';

const parse = (s) => {
    return s.split(/\n/).map((l) => {
        const [name, stg] = l.split(':');
        return { name, stg: stg.split(',') };
    });
};

const race = (plan, round, track) => {
    let p = 10;
    let sum = 0;
    for (let i = 0; i < round; i++) {
        let stg = plan.stg[i % plan.stg.length];
        const t = track?.[i % track.length];
        if (t === '+' || t === '-') stg = t;
        if (stg === '+') p += 1;
        if (stg === '-') p -= 1;
        sum += p;
    }
    return sum;
};

const rankSquire = (s) => {
    const plans = parse(s);
    return plans
        .toSorted((a, b) => race(b, 10) - race(a, 10))
        .map((p) => p.name)
        .join('');
};

// console.log(rank(s));
console.log('Part1', rankSquire(p1));

// const t = `S+===
// -   +
// =+=-+`;

// const s = `A:+,-,=,=
// B:+,=,-,+
// C:=,-,+,+
// D:=,=,=,+`;

const parseTrack = (s) => {
    const lines = s.split(/\n/);
    let x = 0;
    let y = 1;
    const track = [lines[x][y]];
    const visited = new Set(['0,0', '0,1']);
    while (true) {
        const pt = [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1]
        ].find(([x, y]) => {
            const p = lines?.[x]?.[y]?.trim();
            return p && !visited.has([x, y] + '');
        });
        if (!pt) {
            break;
        }
        x = pt[0];
        y = pt[1];
        track.push(lines[x][y]);
        visited.add([x, y] + '');
    }
    track.push('S');
    return track;
};

const knightRace = (s, track) => {
    const plans = parse(s);
    const tracks = parseTrack(track);
    const round = tracks.length * 10;
    return plans
        .toSorted((a, b) => race(b, round, tracks) - race(a, round, tracks))
        .map((p) => p.name)
        .join('');
};

const planValid = (plan) =>
    plan.filter((v) => v == '+').length == 5 &&
    plan.filter((v) => v == '-').length == 3 &&
    plan.filter((v) => v == '=').length == 3;

const NUM2SIGN = ['+', '-', '='];

const countPlans = (rival, track) => {
    const rivalPlan = parse(rival)[0];
    const tracks = parseTrack(track);
    const round = tracks.length * 11;
    const score = race(rivalPlan, round, tracks);
    let count = 0;
    for (let i = 0; i < Math.pow(3, 11); i++) {
        const stg = i
            .toString(3)
            .padStart(11, '0')
            .split('')
            .map((v) => NUM2SIGN[v]);
        if (planValid(stg) && race({ stg }, round, tracks) > score) count++;
    }
    return count;
};

console.log('Part2', knightRace(p2, t2));
console.log('Part3', countPlans(p3, t3));
