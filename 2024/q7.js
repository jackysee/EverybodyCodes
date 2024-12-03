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

const generatePlans = (a, b, c) => {
    const allPlans = [];
    const gen = (a, b, c, sequence = '') => {
        if (a === 0 && b === 0 && c === 0) {
            allPlans.push(sequence);
            return;
        }
        if (a > 0) gen(a - 1, b, c, sequence + '+');
        if (b > 0) gen(a, b - 1, c, sequence + '-');
        if (c > 0) gen(a, b, c - 1, sequence + '=');
    };
    gen(a, b, c);
    return allPlans;
};

const countPlans = (rival, track) => {
    const rivalPlan = parse(rival)[0];
    const tracks = parseTrack(track);
    const round = tracks.length * 11;
    const score = race(rivalPlan, round, tracks);
    return generatePlans(5, 3, 3).filter(
        (p) => race({ stg: p.split('') }, round, tracks) > score
    ).length;
};

console.log('Part1', rankSquire(p1));
console.log('Part2', knightRace(p2, t2));
console.log('Part3', countPlans(p3, t3));
