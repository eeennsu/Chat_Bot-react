const express = require('express');
const router = express.Router();
const structjson = require('./structjson');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const { projectId, dialogFlowSessionID, dialogFlowSessionLanguageCode } = require('../config/dev'); 
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.projectAgentSessionPath(projectId, dialogFlowSessionID);

router.post('/textQuery', async (req, res) => {
    const request = {
        session: sessionPath,
        text: {
            text: req.body.text,
            languageCode: dialogFlowSessionLanguageCode,
        },
    };

    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(` Query ${result.queryText}`);
    console.log(` Response: ${result.fulfillmentText}`);

    if(result.intent){
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(` No intent matched...`);
    }

    res.send(result);
});


router.post('/eventQuery', async (req, res) => {
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                name: req.body.event,
                languageCode: dialogFlowSessionLanguageCode
            }
        }
    };
    try{
        const responses = await sessionClient.detectIntent(request);
    } catch (e){
        console.log(e);
    }

    console.log('Detected intent!');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result);
});

module.exports = router;