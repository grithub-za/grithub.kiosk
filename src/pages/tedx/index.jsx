import logo from "../../assets/hero-shift.jpg"
import Style from '../../styles/App.module.scss';
import Time from "../../components/Time";
import Event from "../../components/Event";
import Weather from "../../components/Weather";
import Wifi from "../../components/Wifi";
import VideoAd from "../../components/VideoAd";

function TedX() {
	return (
		<>
			<div className={Style.block} style={{ backgroundImage: `url(${logo})`}}>
				<header className={Style.header}>
					<Event />
					<Time />
				</header>

				<footer className={Style.footer}>
					<Wifi />
					<Weather />
				</footer>
			</div>

			<VideoAd PLAYBACK_ID="IYbMwB02sc8uN01GQ9s1rZmzQoMfwm5Z2Dim4zU48qPII" />
		</>
	);
}

export default TedX;
