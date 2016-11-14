#!/usr/bin/env node

var ncp = require('ncp').ncp;
var fs = require('fs');
var path = require('path');
var transfers = [
  {
    'source': './resources/android/icon-notification.png',
    'destination': './platforms/android/res/drawable/notification_small_icon.png'
  }
];

ncp.limit = 16;

transfers.forEach(function(transfer) {
    fs.stat(path.dirname(transfer.destination), function(err, stats) {
        if (err) {
            fs.mkdirSync(path.dirname(transfer.destination));
        }
        ncp(transfer.source, transfer.destination, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('Icon copied from ' + transfer.source + ' to ' + transfer.destination);
        });
    });
});