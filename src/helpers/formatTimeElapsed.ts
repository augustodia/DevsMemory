export const formatTimeElapsed = (seconds: number) => {
  let minutes = Math.floor(seconds / 60);
  seconds -= (minutes * 60);

  let secString = seconds.toString().padStart(2, '0');
  let minString = minutes.toString().padStart(2, '0');

  return `${minString}:${secString}`
}