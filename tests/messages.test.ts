import { describe, expect, it } from 'vitest';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';

type Tree = { [key: string]: string | Tree };

function leaves(tree: Tree, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(tree)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out[key] = v;
    else Object.assign(out, leaves(v, key));
  }
  return out;
}

describe('UI translations', () => {
  const enLeaves = leaves(en as Tree);
  const frLeaves = leaves(fr as Tree);

  it('have the same keys in English and French', () => {
    expect(Object.keys(frLeaves).sort()).toEqual(Object.keys(enLeaves).sort());
  });

  it('have no empty strings', () => {
    for (const [k, v] of Object.entries({ ...enLeaves, ...frLeaves })) expect(v.trim(), k).not.toBe('');
  });

  it('use the same ICU placeholders in both languages', () => {
    const vars = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort();
    for (const key of Object.keys(enLeaves)) expect(vars(frLeaves[key]), key).toEqual(vars(enLeaves[key]));
  });
});
