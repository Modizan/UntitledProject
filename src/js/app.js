// const http = require('http');
// const fs = require('fs');
//
// const hostname = "localhost";
// const port = 8080;
//
// const server = http.createServer((req, res) => {
//     fs.readFile('./src/html/index.html', function (err, data){
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(data);
//         return res.end();
//     });
// })
//
// server.listen(port, hostname, () => {
//     console.log(`Server is running at http://${hostname}:${port}/`);
// });
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
