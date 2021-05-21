package com.sandra.controller;

import java.util.List;

import com.sandra.model.Member;
import com.sandra.repository.MemberRepository;
import com.sandra.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/")
    public List<Member> GetUsers() {
        return memberRepository.findAll();
    }

    @GetMapping("/{id}")
    public Member GetUser(@PathVariable Integer id) {
        return memberRepository.findById(id).orElse(null);
    }

    @PostMapping("/")
    public Member createMember(@RequestBody Member member) {
        if (member.getEmail() != null && member.getPassword() != null) {
            return memberRepository.save(member);
        }else{
            return null;
        }
    }
    @PutMapping("/")
    public Member updateMember(@RequestBody Member member) {
        Member memberBefore = memberRepository.findById(member.getId()).orElse(null);
        memberBefore.setEmail(member.getEmail());
        memberBefore.setMessage(member.getMessage());
        memberBefore.setPassword(member.getPassword());

        return memberRepository.save(memberBefore);
    }
    @DeleteMapping("/{id}")
    public Integer DeleteUser(@PathVariable Integer id) {
        memberRepository.deleteById(id);
        return id;
    }

    @GetMapping("/user/checkEmailAvailability")
    public IdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !memberRepository.existsByEmail(email);
        return new IdentityAvailability(isAvailable);
    }

}