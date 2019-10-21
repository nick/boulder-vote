export default function daysToGo() {
  var electionDay = new Date(2019, 10, 5),
    today = new Date(),
    daysToGo = Math.ceil((electionDay - today) / 60 / 60 / 24 / 1000)

  return daysToGo
}
