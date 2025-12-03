package com.ccelectrical.springjwt.controllerTests;

import com.ccelectrical.springjwt.SpringBootSecurityJwtApplication;
import com.ccelectrical.springjwt.controllers.ItemController;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
//@SpringBootTest
@WebMvcTest(ItemController.class)
@ContextConfiguration(classes= SpringBootSecurityJwtApplication.class)
public class AuthContTest {

}
