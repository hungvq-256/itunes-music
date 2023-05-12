export function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(Number(millis) / 60000);
  var seconds = ((Number(millis) % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export function formatDate(date) {
  let objectDate = new Date(date);
  let day = objectDate.getDate();
  let month = objectDate.getMonth();
  let year = objectDate.getFullYear();
  let format = day + "/" + month + "/" + year;
  return format;
}
