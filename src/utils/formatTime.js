// always renders in the hub's local time (Africa/Johannesburg / CAT),
// regardless of the device's own system timezone.
export function formatTime(date){
    if( !date ){
        return ""
    }

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Africa/Johannesburg"
    })
}
