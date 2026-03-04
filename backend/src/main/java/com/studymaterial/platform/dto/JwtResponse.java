package com.studymaterial.platform.dto;


public class JwtResponse {
    private String token;
    private Long id;
    private String collegeId;
    private String name;
    private String role;

    public JwtResponse(String token, Long id, String collegeId, String name, String role) {
        this.token = token;
        this.id = id;
        this.collegeId = collegeId;
        this.name = name;
        this.role = role;
    }

    public String getToken() { return token; }
    public Long getId() { return id; }
    public String getCollegeId() { return collegeId; }
    public String getName() { return name; }
    public String getRole() { return role; }
}
