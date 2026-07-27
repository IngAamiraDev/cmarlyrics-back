export class Hymn {

  constructor(
    public readonly id: string | null,
    public number: number,
    public title: string,
    public author: string | null,
    public lyrics: string,
    public page: number | null,
    public favorite: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  markAsFavorite(): void {
    this.favorite = true;
  }

  removeFavorite(): void {
    this.favorite = false;
  }

  updateLyrics(lyrics: string): void {
    this.lyrics = lyrics;
    this.updatedAt = new Date();
  }

}