export default function daysToGo() {
  var electionDay = new Date(2017, 10, 7),
      today = new Date(),
      daysToGo = Math.ceil((electionDay - today) / 60 / 60 / 24 / 1000);

  return daysToGo;
}
