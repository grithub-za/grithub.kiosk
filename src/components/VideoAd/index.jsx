import Style from "./Video.module.scss"
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import MuxPlayer from "@mux/mux-player-react";
import { useClock } from "../../custom_hooks/useClock";


const INTERVAL_MINUTES = 15
const FADE_MS = 1000

function VideoAd({ PLAYBACK_ID }){
    const [ show, setShown ] = useState(false)
    const playerRef = useRef()
    const clock = useClock({ locale: "en-GB", timeZone: "CAT" });

    // clock.raw.minutes only changes once a minute, so this fires once per :00/:15/:30/:45
    useEffect(() => {
        console.log("[VideoAd] minute tick", clock.raw.minutes, "player?", !!playerRef.current) // TEMP debug
        if( clock.raw.minutes % INTERVAL_MINUTES !== 0 || !playerRef.current ) return

        playerRef.current.currentTime = 0
        playerRef.current.play()?.catch(() => {})
        setShown(true)
        
    }, [ clock.raw.minutes ])


    // fade back to the kiosk, then rewind once it's invisible
    function handleEnded(){
        setShown(false)

        setTimeout(() => {
            if( playerRef.current ) playerRef.current.currentTime = 0

        }, FADE_MS)
    }

    return(
        <MuxPlayer
            ref={playerRef}
            muted
            preload="auto"
            streamType="on-demand"
            playbackId={PLAYBACK_ID}
            onEnded={handleEnded}
            onPlay={() => console.log("[VideoAd] player play event", new Date().toLocaleTimeString())} // TEMP debug
            onPause={() => console.log("[VideoAd] player pause event", new Date().toLocaleTimeString())} // TEMP debug
            className={clsx(Style.block, show && Style.show)}
        />
    )
}

export default VideoAd;
