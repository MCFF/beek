export default function usePlayedTime(time) {
  let hours = ("0" + Math.floor(time / 60 / 60)).slice(-2);
  let minutes = ("0" + (Math.floor(time / 60) - hours * 60)).slice(-2);
  let seconds = ("0" + Math.trunc(time % 60)).slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}
