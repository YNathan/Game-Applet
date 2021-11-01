import java.awt.Color;
import java.awt.Graphics;
import java.util.Random;


public class ScorePlus extends Item
{
	
    private StartingPoint appletInfo;
	public ScorePlus(int x, StartingPoint appletInfo) 
	{
		super(x);		
		this.appletInfo = appletInfo;
	}
	
	@Override
	public void performAction(Ball b) 
	{		
		Random r = new Random();
		appletInfo.setScore(appletInfo.getScore() + 500 + r.nextInt(2000));
	}
	
	@Override
	public void paint(Graphics g) 
	{		
		g.setColor(Color.BLUE);
		super.paint(g);
	}

}
