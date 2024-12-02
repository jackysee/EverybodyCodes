import { p1, p2, p3 } from './q2_input.js';

const parse = (s) => {
    const d = s.split(/\n\n/);
    return {
        words: d[0].substring(6).split(','),
        sentences: d.slice(1)
    };
};

const countWord = (s, w) => {
    return [...s.matchAll(new RegExp(w, 'g'))];
};

const sum = (arr, cb) => arr.reduce((a, c) => a + cb(c), 0);

const count1 = (s) => {
    const { words, sentences } = parse(s);
    return sum(words, (w) => sum(sentences, (s) => countWord(s, w).length));
};

console.log('P1', count1(p1));

const symbolIndexes = (s, w) => {
    const re = new RegExp(w, 'g');
    let m;
    const indexes = [];
    while ((m = re.exec(s))) {
        indexes.push(...[...Array(m[0].length).keys()].map((i) => m.index + i));
        re.lastIndex = m.index + 1;
    }
    return [...new Set(indexes)];
};

const reverse = (s) => s.split('').reverse().join('');

const count2 = (s) => {
    let { words, sentences } = parse(s);
    words = words.map((w) => [w, reverse(w)]).flat();
    return sum(sentences, (s) => {
        return new Set(words.map((w) => symbolIndexes(s, w)).flat()).size;
    });
};

console.log('P2', count2(p2));

const count3 = (s) => {
    let { words, sentences } = parse(s);
    words = words.map((w) => [w, reverse(w)]).flat();
    const M = {};
    const rows = sentences[0].split('\n');
    const cols = rows[0]
        .split('')
        .map((_, i) => rows.map((r) => r[i]).join(''));
    rows.forEach((r, ri) => {
        words.forEach((w) => {
            const _r = r + r.substring(0, w.length - 1);
            symbolIndexes(_r, w)
                .map((i) => i % r.length)
                .forEach((ci) => {
                    M[[ri, ci]] = true;
                });
        });
    });
    cols.forEach((c, ci) => {
        words.forEach((w) => {
            symbolIndexes(c, w).forEach((ri) => {
                M[[ri, ci]] = true;
            });
        });
    });
    return Object.keys(M).length;
};

console.log('P3', count3(p3));
