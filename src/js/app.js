const scrapper = require('./scrapper');
const fs = require('fs');

(async () => {
    await scrapper.initialize('Necrontyr');

    let results = await scrapper.getResults(10);

    fs.writeFileSync(
        require.resolve('../collectedData.json'),
        JSON.stringify(results, null, " ")
    )
}) ();
