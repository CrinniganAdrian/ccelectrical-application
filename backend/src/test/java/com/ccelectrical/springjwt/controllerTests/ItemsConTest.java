package com.ccelectrical.springjwt.controllerTests;
import com.ccelectrical.springjwt.controllers.ItemController;
import com.ccelectrical.springjwt.models.Item;
import com.ccelectrical.springjwt.repository.ItemRepository;
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
@WebMvcTest(ItemController.class)
@ActiveProfiles(value = "test")
public class ItemsConTest {
    @MockBean
    ItemRepository itemRepositoryMock;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;
    Item item1 = new Item(1l,"TestItem1", "Standard light","www.bulb.com");
    Item item2 = new Item(2l,"TestItem2", "Standard light","www.bulb.com");
    Item item3 = new Item(3l,"TestItem3", "Standard light","www.bulb.com");
    @Test
    @WithMockUser(username="admin",roles={"USER","ADMIN"})
    public void getAllItems_success() throws Exception {
        List<Item> items = new ArrayList<>(Arrays.asList(item1,item2,item3));
        Mockito.when(itemRepositoryMock.findAll()).thenReturn(items);
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/items")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].name", is("TestItem1")));
    }
    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    public void newItem_success() throws Exception {
        Item item = Item.builder()
                .name("Motion Sensor")
                .description("Turn on light with movement")
                .imageUrl("www.motion.com/1")
                .build();
        Mockito.when(itemRepositoryMock.save(item)).thenReturn(item);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/items")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(item))
                .with(csrf());
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.name", is("Motion Sensor")));
    }
    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    public void updateItem_success() throws Exception {
        Item updatedItem = Item.builder()
                .id(1l)
                .name("TestItem1")
                .description("Modern Bulb")
                .imageUrl("www.bulb.com")
                .build();
        Mockito.when(itemRepositoryMock.findById(item1.getId())).thenReturn(Optional.of(item1));
        Mockito.when(itemRepositoryMock.save(updatedItem)).thenReturn(updatedItem);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/items")
                .contentType(MediaType.APPLICATION_JSON)
                .with(csrf())
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(updatedItem));
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.name", is("TestItem1")));
    }
    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    public void deleteItemById_success() throws Exception {
        itemRepositoryMock.save(item1);
        Mockito.when(itemRepositoryMock.findById(item1.getId())).thenReturn(Optional.of(item1));
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/items/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk());
    }
}