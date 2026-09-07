import axios from 'axios'
import { n8n_events_webhook_url } from '../lib/constants';

export async function getEvents(){
    return await axios({
        method: "GET",
        url: n8n_events_webhook_url,
        headers: {
            "X-GRIT-KIOSK": process.env.REACT_APP_GRIT_KIOSK_EVENTS_KEY
        }
    })
    .then(res => res.data)
    .catch(err => {
        console.log(err)
    })
}
