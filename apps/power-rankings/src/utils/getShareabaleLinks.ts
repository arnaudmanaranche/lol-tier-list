export const getShareableFacebookLink = (rankingId: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=https://lol-power-ranking.app/rankings/${rankingId}`

export const getShareableTwitterLink = (rankingId: string) =>
  `https://twitter.com/intent/tweet?url=https://lol-power-ranking.app/rankings/${rankingId}`
