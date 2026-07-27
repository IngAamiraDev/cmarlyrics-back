export class HymnResponseDto {

  id!: string;
  number!: number;
  title!: string;
  author!: string | null;
  lyrics!: string;
  page!: number | null;
  favorite!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

}