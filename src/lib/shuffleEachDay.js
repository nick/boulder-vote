import seedrandom from 'seedrandom'
import shuffle from 'shuffle-array'

export default function shuffleEachDay(items) {
    var today = new Date().toISOString().substr(0,10);
    return shuffle(items, {
        'copy': true,
        'rng': seedrandom(today)
    });
}
