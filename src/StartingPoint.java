import java.applet.Applet;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.net.URL;
import java.util.Random;

public class StartingPoint extends Applet implements Runnable, KeyListener, MouseMotionListener, MouseListener {
	private static final long serialVersionUID = 1L;
	private Image i;
	private Graphics doubleG;
	Ball b;
	Platform p[] = new Platform[10];
	Item item[] = new Item[3];
	private int score;
	double cityX = 0;
	double cityDx = 2;
	URL url;
	Image city;
	int levelcheck = 0;
	boolean gameOver = false;
	boolean mouseIn = false;

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	@Override
	public void init() {
		setSize(1356, 756);
		addKeyListener(this);
		addMouseListener(this);
		addMouseMotionListener(this);
		url = getCodeBase();
		System.out.println();

		url = this.getClass().getResource("/images/1.png");
		city = getImage(url);

		new Pictures(this);
		Pictures.wind.play();
		Pictures.music.loop();

	}

	@Override
	public void start() {
		b = new Ball();
		score = 0;
		for (int i = 0; i < p.length; i++) {
			p[i] = new Platform(i * 120, 400);
		}

		for (int i = 0; i < item.length; i++) {
			Random r = new Random();
			switch (r.nextInt(5)) {
			case 0:
				item[i] = new GravUp(getWidth() + 2000 * i);
				break;
			case 1:
				item[i] = new GravDown(getWidth() + 2000 * i);
				break;
			case 2:
				item[i] = new AgilUp(getWidth() + 2000 * i);
				break;
			case 3:
				item[i] = new AgilDown(getWidth() + 2000 * i);
				break;
			case 4:
				item[i] = new ScorePlus(getWidth() + 2000 * i, this);
				break;
			}
		}
		Thread thread = new Thread(this);
		thread.start();
	}

	@Override
	public void run() {
		// thread information
		while (true) {
			for (int i = 0; i < p.length; i++) {
				int testx = p[i].getX();
				if (testx < 0 - p[i].getWidth()) {
					Random r = new Random();
					int fakei = i;
					if (i == 0) {
						fakei = p.length;
					}
					p[i].setX(p[fakei - 1].getX() + p[i].getWidth() + Pictures.level * +r.nextInt(25));
				}
			}
			gameOver = b.getGameOver();

			// pour faire pivoter l'image a gauche
			if (levelcheck > 1000) {
				Pictures.level++;
				levelcheck = 0;
			}
			levelcheck++;

			if (cityX > getWidth() * -1) {
				cityX -= cityDx;
			} else {
				cityX = 0;
			}

			if (!gameOver) {
				score++;
			}

			Random r = new Random();

			for (int i = 0; i < item.length; i++) {
				if (item[i].isCreateNew()) {
					item[i] = null;
					switch (r.nextInt(5)) {
					case 0:
						item[i] = new GravUp(getWidth() + 10 * r.nextInt(500));
						break;
					case 1:
						item[i] = new GravDown(getWidth() + 10 * r.nextInt(500));
						break;
					case 2:
						item[i] = new AgilUp(getWidth() + 10 * r.nextInt(500));
						break;
					case 3:
						item[i] = new AgilDown(getWidth() + 10 * r.nextInt(500));
						break;
					case 4:
						item[i] = new ScorePlus(getWidth() + 10 * r.nextInt(500), this);
						break;
					}
					item[i].setCreateNew(false);
				}
			}

			b.update(this);

			for (int i = 0; i < p.length; i++) {
				p[i].update(this, b);
			}

			for (int i = 0; i < item.length; i++) {
				item[i].update(this, b);
			}

			repaint();
			try {
				Thread.sleep(17);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public void update(Graphics g) {
		if (i == null) {
			i = createImage(this.getSize().width, this.getSize().height);
			doubleG = i.getGraphics();
		}

		doubleG.setColor(getBackground());
		doubleG.fillRect(0, 0, this.getSize().width, this.getSize().height);
		doubleG.setColor(getForeground());
		paint(doubleG);
		g.drawImage(i, 0, 0, this);
	}

	@Override
	public void paint(Graphics g) {
		g.setColor(new Color(15, 77, 147));
		g.fillRect(0, 0, getWidth(), getHeight());
		g.drawImage(city, (int) cityX, 0, this);
		g.drawImage(city, (int) cityX + getWidth(), 0, this);

		for (int i = 0; i < p.length; i++) {
			p[i].paint(g);
		}
		for (int i = 0; i < item.length; i++) {
			item[i].paint(g);
		}
		b.paint(g);

		String s = Integer.toString(score);
		Font font = new Font("Serif", Font.BOLD, 32);
		g.setFont(font);
		g.setColor(Color.BLACK);
		g.drawString(s, getWidth() - 150 + 2, 50 + 2);
		g.setColor(new Color(198, 226, 255));
		g.drawString(s, getWidth() - 150, 50);
		g.drawImage(Pictures.ofek, 0, 0, null);

		if (gameOver) {

			g.setColor(Color.BLACK);
			g.drawString("great game applet", 10, 600);
			g.drawString("j", 225, 265);
			g.drawString("a", 218, 290);
			g.drawString("c", 205, 315);
			g.drawString("o", 195, 340);
			// g.drawString(" ",250 ,232);
			g.drawString("", 205, 370);
			g.drawString("b", 210, 390);
			// g.drawString(" ",210 ,243);
			g.drawString(" ", 260, 420);
			g.drawString("n‘", 280, 425);
			g.drawString("a", 300, 430);
			g.drawString("t", 320, 435);
			g.drawString("h", 210, 373);
			g.drawString("a", 370, 440);
			g.drawString("n", 393, 437);
			// g.drawString(" ",265 ,435);
			g.drawString("a", 435, 430);
			g.drawString("b", 465, 417);
			g.drawString("c", 485, 390);
			// g.drawString(" ",520 ,470);
			g.drawString("e", 515, 320);
			g.drawString("f", 495, 290);
			g.drawString("g", 476, 246);
			g.drawString("h", 430, 223);
			g.drawString("i", 400, 217);
			g.drawString("k", 345, 217);
			g.drawString("l", 315, 220);
			g.drawString("m", 285, 223);
			g.drawString("n", 255, 233);
			g.drawString("yaacovisraelnathan@gmail.com", 10, 600);
			g.setColor(Color.GREEN);
			g.drawString("Nathan jacob Product", 500, 50);
			g.setColor(Color.black);
			g.drawString("Yaacovisraelnathan@gmail.com", 490, 90);
			g.setColor(Color.BLUE);
			
			g.drawRect(270, 310, 180, 40);
			g.drawRect(269, 311, 180, 40);
			g.drawRect(268, 312, 180, 40);
			g.drawRect(267, 313, 180, 40);
			g.drawRect(266, 314, 180, 40);
			g.drawRect(265, 315, 180, 40);
			g.drawImage(Pictures.gameover, 800, 250, null);
			g.drawImage(Pictures.iaf, 0, 600, null);

			if (mouseIn) {
				g.setColor(Color.RED);
				g.drawString("Play again?", 280, 340);
			} else {
				g.setColor(Color.ORANGE);
				g.drawString("Play again?", 280, 340);
			}
		}
	}

	@Override
	public void keyPressed(KeyEvent e) {
		switch (e.getKeyCode()) {
		case KeyEvent.VK_LEFT:
			b.moveLeft();
			break;
		case KeyEvent.VK_RIGHT:
			b.moveRight();
			break;
		case KeyEvent.VK_E:
			b.exit(score);
			break;
		}
	}

	@Override // Region bulshit
	public void keyReleased(KeyEvent e) {
	}

	public void keyTyped(KeyEvent e) {
	}

	public void mouseDragged(MouseEvent e) {
	}

	public void mouseMoved(MouseEvent e) {
		if (gameOver) {
			if (e.getX() > 270 && e.getX() < 460) {
				if (e.getY() > 320 && e.getY() < 360) {
					mouseIn = true;
				}
			}
			if (e.getX() < 270 || e.getX() > 460) {
				mouseIn = false;
			}
			if (e.getY() < 310 || e.getY() > 360) {
				mouseIn = false;
			}
		}
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		// start new game
		if (mouseIn) {
			b = null;
			b = new Ball();
			score = 0;
			Pictures.level = 1;
			for (int i = 0; i < p.length; i++) {
				p[i] = new Platform(i * 120, 400);
			}

			for (int i = 0; i < item.length; i++) {
				Random r = new Random();
				switch (r.nextInt(5)) {
				case 0:
					item[i] = new GravUp(getWidth() + 2000 * i);
					break;
				case 1:
					item[i] = new GravDown(getWidth() + 2000 * i);
					break;
				case 2:
					item[i] = new AgilUp(getWidth() + 2000 * i);
					break;
				case 3:
					item[i] = new AgilDown(getWidth() + 2000 * i);
					break;
				case 4:
					item[i] = new ScorePlus(getWidth() + 2000 * i, this);
					break;
				}
			}
			mouseIn = false;
		}
	}

	@Override // Region bulshit
	public void mouseEntered(MouseEvent e) {
	}

	public void mouseExited(MouseEvent e) {
	}

	public void mousePressed(MouseEvent e) {
	}

	public void mouseReleased(MouseEvent e) {
	}

}
