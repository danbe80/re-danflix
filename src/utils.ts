export function makeImagePath(id: string, format?: string){
  // 이미지 경로
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

