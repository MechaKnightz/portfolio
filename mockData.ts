import { Hex } from "./types/Hex";

export const mockData: Hex[] = [
  {
    q: 0,
    r: 0,
    y: 0,
  },
  {
    q: 1,
    r: -1,
    y: 0,
  },
  {
    q: 0,
    r: -1,
    y: 0,
  },
  {
    q: -1,
    r: 0,
    y: 0,
  },
  {
    q: -1,
    r: 1,
    y: 0,
  },
];

export const generateData: (q: number) => Hex[] = (q) => {
  let data: Hex[] = [];
  for (let i = -q; i <= q; i++) {
    for (let j = -q; j <= q; j++) {
      if (i > q - j || i < -q - j) continue;
      data.push({
        q: i,
        r: j,
        y: 0,
      });
    }
  }
  return data;
};
