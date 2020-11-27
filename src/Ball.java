import java.awt.Graphics;

public class Ball 
{	
	private double gravity = 15;
	private double energyloss = 1;
	private double xFriction = .9;
	private double dt = .2;
	private int x = 400;
	private int y = 25;
	private double dx = 0;
	private double dy = 0;
	private double gameDy = -75;
	private int radius = 20;
	private int agility = 3;
	private int maxSpeed = 20;
	private boolean game_over = false;   
	// Properties
	public int getAgility(){return agility;}
	public void setAgility(int agility){this.agility = agility;}
	public int getMaxSpeed() {return maxSpeed;}
	public void setMaxSpeed(int maxSpeed){this.maxSpeed = maxSpeed;}
	public double getGameDy(){return gameDy;}	
	public void setGameDy(double gameDy){this.gameDy = gameDy;}	
	public int getRadius() {return radius;}	
	public int getX(){return x;}	
	public void setX(int x){this.x = x;}	
	public int getY(){return y;}	
	public void setY(int y) {this.y = y;}	
	public double getDx(){return dx;}	
	public double getDy(){return dy;}	
	public void setDx(double dx){this.dx = dx;}	
	public void setDy(double dy){this.dy = dy;}	
	public double getGravity() {return gravity;}	
	public void setGravity(double gravity) {this.gravity = gravity;}
	// Ctor
	public Ball(){}
	public Ball(int i, int j) 
	{		
		x = i;
		y = j;
	}	
	// Methods
	public void moveRight()
	{
		if(dx + agility < maxSpeed)
		{
		   dx += agility;
		}
	}	
	public void moveLeft() 
	{
		if(dx - agility > - maxSpeed)
		{
		   dx -= agility;
		}
	}
	public void exit(int status)
	{
		System.exit(0);	
	}
    public void update(StartingPoint sp)
    {
		//This if else if checks bounces off horizontal walls
		if (x + dx > sp.getWidth() - radius - 1)
		{
			x = sp.getWidth() -radius -1;
			dx = -dx;
		}
		else if( x + dx < 0 + radius)
		{
			x = 0+radius;
			dx = -dx;
		}
		else
		{
			x += dx;
		}
		
		if(y == sp.getHeight() - radius - 1)
		{
			dx *= xFriction;
			if(Math.abs(dx) < .8)
			{
				dx = 0;
			}
		}
		
		if(y - 200 > sp.getHeight() - radius - 1)
		{
			game_over = true;		
		} 
		else 
		{
			//vitesse du formula    
			dy += gravity *dt;
			//position du formula
			y += dy*dt + .5*gravity*dt*dt;
		}
	}
	
	public void paint(Graphics g)
	{
		// Output a picture 
		//g.drawImage(com.acme.thegame.Pictures.ball,x-radius, y-radius, 166, 250,null);
        g.drawImage(Pictures.ball,x-radius, y-radius, radius*2, radius*2,null);
		//g.setColor(Color.GREEN);
		//g.fillOval(x-radius, y-radius, radius*2, radius*2);		
	}
	public boolean getGameOver(){return game_over;}
	public double getEnergyloss(){return energyloss;}
	public void setEnergyloss(double energyloss) 
	{
		this.energyloss = energyloss;
	}
}

