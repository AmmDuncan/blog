import * as cheerio from 'cheerio';

export function getPostDescription(htmlString: string) {
  // Load the HTML string using cheerio
  const $ = cheerio.load(htmlString);

  // Get the text content
  return $('body').text().slice(0, 150) + '...';
}
