import java.awt.Image;
import java.net.URL;
import java.applet.AudioClip;

public class Pictures {
	static Image platform;
	static Image ball;
	static Image gameover;
	static Image ofek;
	static Image iaf;
	URL urlJohnWellcome = this.getClass().getResource("/Music/John Ottman - Welcome To Aqualantic.au");
	URL urlBounce = this.getClass().getResource("/Music/bounce.au");
	URL urlWind = this.getClass().getResource("/Music/wind.au");
	URL urlImage2 = this.getClass().getResource("/images/2.png");
	URL urlBall = this.getClass().getResource("/images/ball.jpg");
	URL urlMe = this.getClass().getResource("/images/ball.jpg");

	static StartingPoint sp;
	static AudioClip music, wind, bounce;
	static int level = 1;

	public Pictures(StartingPoint sp) {

		// Sounds
		music = sp.getAudioClip(urlJohnWellcome);
		bounce = sp.getAudioClip(urlBounce);
		wind = sp.getAudioClip(urlWind);
		// com.acme.thegame.Pictures
		platform = sp.getImage(urlImage2);
		ball = sp.getImage(urlBall);
		gameover = sp.getImage(urlMe);
		Pictures.sp = sp;
	}
}
