package team.gif.friendscheduler.model;


import team.gif.friendscheduler.Globals;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "USERS")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(unique = true)
	private Long discordSnowflake;
	
	@Column(nullable = false)
	private String username;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String displayName;
	
	@Column
	private int[][] schedule;
	
	
	public User() {
		this.schedule = new int[Globals.NUM_DAYS_IN_WEEK][Globals.NUM_BLOCKS_IN_DAY];
		
		for (int i = 0; i < schedule.length; i++) {
			for (int j = 0; j < schedule[i].length; j++) {
				schedule[i][j] = 0;
			}
		}
	}
	
	public User(String username, String password, String email, String displayName) {
		this.discordSnowflake = null;
		this.username = username;
		this.password = password;
		this.email = email;
		this.displayName = displayName;
		this.schedule = new int[Globals.NUM_DAYS_IN_WEEK][Globals.NUM_BLOCKS_IN_DAY];
		
		for (int i = 0; i < schedule.length; i++) {
			for (int j = 0; j < schedule[i].length; j++) {
				schedule[i][j] = 0;
			}
		}
	}
	
	
	public Long getId() {
		return id;
	}
	
	
	public Long getDiscordSnowflake() {
		return discordSnowflake;
	}
	
	
	public String getUsername() {
		return username;
	}
	
	
	public String getPassword() {
		return password;
	}
	
	
	public String getEmail() {
		return email;
	}
	
	
	public String getDisplayName() {
		return displayName;
	}
	
	
	public int[][] getSchedule() {
		return schedule;
	}
	
	
	public void setDiscordSnowflake(Long snowflake) {
		this.discordSnowflake = snowflake;
	}
	
	
	public void updateSchedule(TimeBlock interval) {
		this.schedule[interval.getDay()][interval.getBlock()] = interval.getStatus();
	}
	
}