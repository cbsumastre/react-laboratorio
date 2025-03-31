import { v4 as uuidv4 } from 'uuid';

export const randomId = () => {
    return uuidv4().substring(0,6).toUpperCase()
}