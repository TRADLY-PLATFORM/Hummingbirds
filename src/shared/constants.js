export const priceOptions = [
  { value: '0_20', label: '0 to 20' },
  { value: '20_50', label: '20 to 50' },
  { value: '50_100', label: '50 to 100' },
  { value: '100_1000', label: '100 to 1000' },
  { value: '1000_+', label: '1000+' },
];

export const sortByOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price_low_to_high', label: 'Price low to high' },
  { value: 'price_high_to_low', label: 'Price high to low' },
  { value: 'newest_first', label: 'Newest first' },
];

export const totalCountOfProducts = 20;

export const MapKey = 'AIzaSyBAV63gkOE0d0eSV_3rIagJfzMwDcbzPnM';
export const dsn = 'https://ab22fdcc8ad24c7babc4d07ae7d20642@o396771.ingest.sentry.io/5284098';
export const StripePublishKey =
  'pk_live_51HPL2tIRWtZLg0gEweEutqoNl644fPiGpnu0oKo5Vd3xHI3PT7MAJ3fkOKzWI8nh3IEhyTveQItawczNH22zK9OH00rcfT0fBU';

 export function getThumbnailImage(file) {
    let filename = file.split('/').pop();
    let fileURl = file.replace(filename, 'thumb_' + filename);
    return fileURl;
}
  
export function parseMarkdown(markdownText) {
  const htmlText = markdownText
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/\n$/gim, '<br />');

  return htmlText.trim();
}