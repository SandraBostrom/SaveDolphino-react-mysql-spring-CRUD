package com.sandra.repository;

import com.sandra.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member,Integer> {

    @Override
    @Query("from Member ORDER BY email")
    List<Member> findAll();

    Boolean existsByEmail(String email);



}