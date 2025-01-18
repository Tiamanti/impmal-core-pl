import {Converters} from "../babele/script/converters.js";

Hooks.once('init', () => {
    if(typeof Babele !== 'undefined') {

        console.log('***********************');
        console.log('*** Babele ImpMal PL ***');
        console.log('***********************');

        Babele.get().register({
            module: 'impmal-core-pl',
            lang: 'pl',
            dir: 'compendium'
        });

        Babele.get().registerConverters({
            'impMalPages': (pages, translations) => {
                pages = Converters._pages(pages, translations);

                return pages.map(data => {
                    if (!translations) {
                        return data;
                    }

                    const translation = translations[data._id] || translations[data.name];

                    if (!translation) {
                        return data;
                    }
                    return foundry.utils.mergeObject(data, {
                        system: {
                            tooltip: translation.tooltip ?? data.system.tooltip
                        }
                    });
                });
            }
        });
    }
});