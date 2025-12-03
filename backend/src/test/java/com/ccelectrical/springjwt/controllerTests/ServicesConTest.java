package com.ccelectrical.springjwt.controllerTests;
import com.ccelectrical.springjwt.controllers.ServiceController;
import com.ccelectrical.springjwt.models.Service;
import com.ccelectrical.springjwt.repository.ServiceRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.*;
@WebMvcTest(ServiceController.class)
@ActiveProfiles(value = "test")
public class ServicesConTest {
    @MockBean
    ServiceRepository serviceRepositoryMock;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;
    Service service1 = new Service(1l,"TestService1", "Rewire a house","www.service.com/1");
    Service service2 = new Service(2l,"TestService2", "Rewire a house","www.service.com/1");
    Service service3 = new Service(3l,"TestService3", "Rewire a house","www.service.com/1");
    @Test
    @WithMockUser(username="admin",roles={"USER","ADMIN"})
    public void getAllServices_success() throws Exception {
        List<Service> services = new ArrayList<>(Arrays.asList(service1,service2,service3));
        Mockito.when(serviceRepositoryMock.findAll()).thenReturn(services);
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/ccservices")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].name", is("TestService1")));
    }
    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    public void newService_success() throws Exception {
        Service service = Service.builder()
                .name("Rewire")
                .description("Dreaded Service")
                .imageUrl("www.service.com/1")
                .build();
        Mockito.when(serviceRepositoryMock.save(service)).thenReturn(service);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/ccservices")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(service))
                .with(csrf());
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.name", is("Rewire")));
    }
    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    public void updateProject_success() throws Exception {
        Service updatedService = Service.builder()
                .id(1l)
                .name("TestService1")
                .description("Rewire a hospital")
                .imageUrl("www.service.com/2")
                .build();
        Mockito.when(serviceRepositoryMock.findById(service1.getId())).thenReturn(Optional.of(service1));
        Mockito.when(serviceRepositoryMock.save(updatedService)).thenReturn(updatedService);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/ccservices")
                .contentType(MediaType.APPLICATION_JSON)
                .with(csrf())
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(updatedService));
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.name", is("TestService1")));
    }
    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    public void deleteServiceById_success() throws Exception {
        serviceRepositoryMock.save(service1);
        Mockito.when(serviceRepositoryMock.findById(service1.getId())).thenReturn(Optional.of(service1));
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/ccservices/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}