import { useNavigate } from "react-router-dom";
import styles from "./CTABanner.module.css";

export default function CTABanner() {
	const navigate = useNavigate();
	return (
		<section className={styles.section}>
			<div className={styles.banner}>
				<h2 className={styles.title}>Begin Your Journey Today</h2>
				<p className={styles.sub}>
					Join 2,847 students already learning on Jannah Academy
				</p>
				<button className={styles.btn} onClick={() => navigate("/register")}>
					Register Now — It's Free →
				</button>
			</div>
		</section>
	);
}
