package es.unex.piuex.utils;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class IpInfo {

	private String ip;
	
	@JsonProperty("country_code")
	private String countryCode;
	
	@JsonProperty("country_name")
	private String countryName;
	
	private String city;
	
	private float latitude;
	
	private float longitude;

	
	public IpInfo(String ip, String countryCode, String countryName,
			String city, float latitude, float longitude) {
		super();
		this.ip = ip;
		this.countryCode = countryCode;
		this.countryName = countryName;
		this.city = city;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	public IpInfo() {
		
	}

	
	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}
}