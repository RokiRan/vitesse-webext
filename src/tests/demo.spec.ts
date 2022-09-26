import { describe, expect, it } from 'vitest'

describe('Demo', () => {
  it('should work', () => {
    expect(1 + 1).toBe(2)
  })
})

describe('GetIndex', () => {
  it('should work', () => {
    expect(getIndex(first, second)).toBe(61)
  })
})

describe('GetContainer', () => {
  it('should work', () => {
    expect(getContainer(first, second)).toBe('//*[@id="juejin"]/div[1]/main/div/div/div/div/div/div/div')
  })
})


const first = '//*[@id="juejin"]/div[1]/main/div/div/div/div/div/div/div/li[1]/div/div[2]/div/div[1]/a';
const second = '//*[@id="juejin"]/div[1]/main/div/div/div/div/div/div/div/li[2]/div/div[2]/div/div[1]/a';

function getIndex(first: string, second: string) {
  if (!first || !second) {
    return 0
  }
  for (let i = 0; i < Math.min(first.length, second.length); i++) {
    if (first.charAt(i) !== second.charAt(i)) {
      return i;
    }
  }
  return 0;
}

function getContainer(first: string, second: string): string{
  const index = getIndex(first, second);
  const xpath = first.slice(0, index - 1);
  return xpath.slice(0, xpath.lastIndexOf('/'));
}