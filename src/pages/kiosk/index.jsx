import logo from "../../assets/desktop-logo.png"
import Style from '../../styles/App.module.scss';
import Time from "../../components/Time";
import Event from "../../components/Event";
import Weather from "../../components/Weather";
import Wifi from "../../components/Wifi";

function Kiosk() {
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
		</>
	);
}

export default Kiosk;
