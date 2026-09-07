const DEFAULT_EVENT = {
    event_name: "GRITHub Community",
    event_type: "Type: Welcome",
    start: null,
    end: null
}


// n8n stores timestamps as naive "YYYY-MM-DDTHH:mm:ss..." strings with no
// timezone offset. The values are UTC (n8n's default when serializing
// dates), so they're parsed as UTC here and must be formatted with an
// explicit "Africa/Johannesburg" timeZone wherever they're displayed or
// compared - see formatTime() and useClock.js for the same pattern.
// Parsed manually (rather than `new Date(str)`) because the 7-digit
// fractional seconds n8n emits aren't valid ISO 8601 and some browsers
// (Safari in particular) fail to parse them.
export function parseTimestamp(value){
    const match = typeof value === "string" && value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/)

    if( !match ){
        return null
    }

    const [ , year, month, day, hour, minute, second ] = match.map(Number)

    return new Date(Date.UTC(year, month - 1, day, hour, minute, second))
}


// event_type is a raw calendar-sync blob, e.g.:
// "Type:  Hack-a-thon\r\nMain contact from school: ...\r\n\r\nDetails: ..."
// the actual event title is whatever follows "Type:" on the first line.
export function parseEventTitle(eventType){
    const firstLine = (eventType || "").split(/\r?\n/)[0]

    return firstLine.replace(/^\s*Type:\s*/i, "").trim()
}


// picks the soonest event that hasn't ended yet (including one in progress);
// if every event has already ended, keeps showing the most recent past one
// until something new is scheduled. Always returns an event so the kiosk
// never renders an empty state.
export function selectEvent(events){
    if( !Array.isArray(events) || events.length === 0 ){
        return DEFAULT_EVENT
    }

    const now = Date.now()

    const parsed = events
        .map(event => ({
            ...event,
            start: parseTimestamp(event.event_start_time),
            end: parseTimestamp(event.event_end_time)
        }))
        .filter(event => event.start && event.end)
        .sort((a, b) => a.start - b.start)

    if( parsed.length === 0 ){
        return DEFAULT_EVENT
    }

    const upcoming = parsed.find(event => event.end.getTime() >= now)

    return upcoming || parsed[parsed.length - 1]
}
