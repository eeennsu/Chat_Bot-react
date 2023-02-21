import { SAVE_MESSAGE, SAVE_REPLY } from "./types";

export function saveMessage(message){
    return {
        type: SAVE_MESSAGE,
        payload: message,
    };
}

export function saveReply(reply){
    return{
        type: SAVE_REPLY,
        payload: reply
    }
}