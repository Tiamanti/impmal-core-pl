function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function sortByValue(obj) {
    var sortedValues = Object.values(obj).sort();
    var sortedKeys = [];
    for(var i = 0; i < sortedValues.length; i++) {
        sortedKeys.push(getKeyByValue(obj, sortedValues[i]));
    }
    return Object.assign({}, ...sortedKeys.map((key) => ({ [key]: obj[key] })));
}

Hooks.once('init', () => {
    if(typeof Babele !== 'undefined') {

        console.log('***********************');
        console.log('*** Babele ImpMal PL ***');
        console.log('***********************');

        game.babele.register({
            module: 'impmal-core-pl',
            lang: 'pl',
            dir: 'compendium'
        });
    }
});

Hooks.once('setup', () => {
    game.impmal.config.skills = sortByValue(game.impmal.config.skills);

    // This is to sort Skills in Character sheets alphabetically.
    game.actors.forEach(actor => {
        if (actor.system.skills !== undefined) {
            var actorCopy = actor;
            var sortedKeys = Object.keys(game.impmal.config.skills);
            var oldSkills = Object.assign(Object.create(Object.getPrototypeOf(actor.system.skills)), actor.system.skills);
            sortedKeys.map(key => {
                delete oldSkills[key];
            })
            actorCopy.system.skills = Object.assign(oldSkills, ...sortedKeys.map((key) => ({[key]: actor.system.skills[key]})));
        }
    });
});
