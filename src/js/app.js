const scrapper = require('./scrapper');
const fs = require('fs');
const chalk = require('chalk')
const cliProgress = require('cli-progress')

let config = require('../config/config.json')

let Queue = require('queue-promise')

async function processing () {


    let data = []


    const queue = new Queue({
        concurrent: 1,
        interval: 5
    });


    const progressBar = new cliProgress.SingleBar({
        format: '{bar} {percentage}% | {value}/{total} | elapsed: {duration_formatted} | estimated: {eta_formatted} Current Source: ' + chalk.blue('{source}'),
        hideCursor: true
    })


    progressBar.start(config.length, 0)


    queue.on("resolve", () => {
        progressBar.update(data.length, {source: channel.source})
    })


    queue.on('end', () => {
        progressBar.stop()

        fs.writeFileSync(
            'src/config/collectedData.json',
            JSON.stringify(data, null, " ")
        )

        console.log("Finished")
    })


    config.forEach(channel => {
        queue.enqueue(() => scrapper.initialize(channel["source"], 1).then( res => {
            data.push({"Source": channel["source"], "Response": res})
            progressBar.update(data.length, {source: channel.source})
            return res
        }))
    })


    queue.start()

}

processing()
