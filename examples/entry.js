var Nes = require('nes');

var client = new Nes.Client('ws://localhost:3001');
client.connect(function (err) {

    var handler = function (update, flags) {

        console.log(update);
    };

    client.subscribe('/item/5', handler, function (err) { });
});
