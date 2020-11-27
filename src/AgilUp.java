import java.awt.Color;
import java.awt.Graphics;

public class AgilUp extends Item
{
	public AgilUp(int x){super(x);}
	
	public void performAction(Ball b)
	{
	    if (b.getAgility() < 8)
	    {
	    	b.setAgility(b.getAgility() + 1);
	    }
	}

	@Override
	public void paint(Graphics g) 
	{		
		g.setColor(Color.GREEN);
		super.paint(g);
	}

}
