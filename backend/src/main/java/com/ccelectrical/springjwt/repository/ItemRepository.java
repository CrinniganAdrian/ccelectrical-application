package com.ccelectrical.springjwt.repository;

import com.ccelectrical.springjwt.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item,Long> {
}
