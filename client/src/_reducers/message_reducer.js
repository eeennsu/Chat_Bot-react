import { SAVE_MESSAGE, SAVE_REPLY } from "../_actions/types";

const initialState = {
    messages: [],
    replys: [],
};

const message_reducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_MESSAGE: 
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            };

        // case SAVE_REPLY: 
        //     return {
        //         ...state,
        //         replys: state.replys.concat(action.payload)
        //     };

        default: 
            return state;
    }
};

export default message_reducer;