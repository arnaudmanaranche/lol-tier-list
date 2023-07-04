import { getShareableFacebookLink, getShareableTwitterLink } from './getShareabaleLinks'

describe('getShareableFacebookLink', () => {
  it('should return a Facebook shareable link', () => {
    expect(getShareableFacebookLink('my-ranking-id')).toEqual(
      'https://www.facebook.com/sharer/sharer.php?u=https://lol-power-ranking.app/rankings/my-ranking-id'
    )
  })
})

describe('getShareableTwitterLink', () => {
  it('should return a Twitter shareable link', () => {
    expect(getShareableTwitterLink('my-ranking-id')).toEqual(
      'https://twitter.com/intent/tweet?url=https://lol-power-ranking.app/rankings/my-ranking-id'
    )
  })
})
