import readingTimeLib from 'reading-time';

export function getReadingTime(text: string): string {
  const { minutes } = readingTimeLib(text, { wordsPerMinute: 300 });
  if (minutes < 1) return '1 分钟';
  return `${Math.ceil(minutes)} 分钟`;
}
