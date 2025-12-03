package com.ccelectrical.springjwt.controllerTests;
import com.ccelectrical.springjwt.controllers.ProjectController;
import com.ccelectrical.springjwt.models.Project;
import com.ccelectrical.springjwt.repository.ProjectRepository;
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
@WebMvcTest(ProjectController.class)
@ActiveProfiles(value = "test")
public class ProjectsConTest {
    @MockBean
    ProjectRepository projectRepositoryMock;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;
    Project project1 = new Project(1l,"TestProject1", "New House","www.house.com/1");
    Project project2 = new Project(2l,"TestProject2", "New House","www.house.com/1");
    Project project3 = new Project(3l,"TestProject3", "New House","www.house.com/1");
    @Test
    @WithMockUser(username="admin",roles={"USER","ADMIN"})
    public void getAllProjects_success() throws Exception {
        List<Project> projects = new ArrayList<>(Arrays.asList(project1,project2,project3));
        Mockito.when(projectRepositoryMock.findAll()).thenReturn(projects);
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/projects")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].name", is("TestProject1")));
    }
    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    public void newProject_success() throws Exception {
        Project project = Project.builder()
                .name("Nextdoor house")
                .description("A build next door")
                .imageUrl("www.house.com/1")
                .build();
        Mockito.when(projectRepositoryMock.save(project)).thenReturn(project);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(project))
                .with(csrf());
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.name", is("Nextdoor house")));
    }
    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    public void updateProject_success() throws Exception {
        Project updatedProject = Project.builder()
                .id(1l)
                .name("TestProject1")
                .description("Big House")
                .imageUrl("www.house.com")
                .build();
        Mockito.when(projectRepositoryMock.findById(project1.getId())).thenReturn(Optional.of(project1));
        Mockito.when(projectRepositoryMock.save(updatedProject)).thenReturn(updatedProject);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .with(csrf())
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(updatedProject));
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.name", is("TestProject1")));
    }
    @Test
    @WithMockUser(username="admin",roles={"ADMIN"})
    public void deleteProjectById_success() throws Exception {
        projectRepositoryMock.save(project1);
        Mockito.when(projectRepositoryMock.findById(project1.getId())).thenReturn(Optional.of(project1));
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/projects/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}