package com.manikanta.money;

public class LoginResponse {
    public Long id;
    public String name;
    public String email;

    public LoginResponse() {}
    public LoginResponse(Long id, String name, String email) {
        this.id = id; this.name = name; this.email = email;
    }
}
