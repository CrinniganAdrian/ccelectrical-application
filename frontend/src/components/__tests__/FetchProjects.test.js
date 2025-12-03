import axios from "axios";

import { PROJECT_API_BASE_URL, FetchProjects } from "../FetchProjects";

jest.mock("axios");

describe("FetchProjects", () => {
    describe("when API call is successful", () => {
        it("should return projects list", async () => {
        // given
        const projects = [
            {   
                id: 1, 
                name: "Local House", 
                description: "Recent neighbours House.", 
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi6q5AohpoKtz-Aq1Eipm8dSqp6v3Ys7n07g&usqp=CAU"
            }
        ];
        axios.get.mockResolvedValueOnce(projects);

        // when
        const result = await FetchProjects();

        // then
        expect(axios.get).toHaveBeenCalledWith(`${PROJECT_API_BASE_URL}/projects`);
        expect(result).toEqual(projects);
        });
    })
})

describe("when API call fails", () => {
    it("should return empty projects list", async () => {
      // given
      const message = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(message));

      // when
      const result = await FetchProjects();

      // then
      expect(axios.get).toHaveBeenCalledWith(`${PROJECT_API_BASE_URL}/projects`);
      expect(result).toEqual([]);
    });
})
