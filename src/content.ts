const head = document.head
const metaTags = Array.from(head.querySelectorAll('meta')).map(meta => ( {
  name: meta.getAttribute('name'),
  content: meta.getAttribute('content'),
} ))

const listingMlsMeta = metaTags.find(meta => meta.name === 'fb4s-listing-mls')
const listingIdMeta = metaTags.find(meta => meta.name === 'fb4s-listing-id')

const listingMls: string | null = listingMlsMeta ? listingMlsMeta.content : null
const listingId: string | null = listingIdMeta ? listingIdMeta.content : null

void chrome.runtime.sendMessage({ listingMls, listingId })