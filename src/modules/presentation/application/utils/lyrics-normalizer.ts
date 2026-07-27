export class LyricsNormalizer {

  static normalize(text: string): string {

    return text

      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

  }

}