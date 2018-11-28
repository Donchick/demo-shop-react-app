import { PROCESS_WAS_FAILED } from '../constants/error';

const error = (state = null, action) => {
    switch (action.type) {
        case PROCESS_WAS_FAILED:
            return action.message || 'Process was failed.';

        default:
            return state;
    }
};

export default error;