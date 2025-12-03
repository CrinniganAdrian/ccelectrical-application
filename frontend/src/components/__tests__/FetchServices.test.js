import axios from "axios";

import { SERVICE_API_BASE_URL, FetchServices } from "../FetchServices";

jest.mock("axios");

describe("FetchServices", () => {
    describe("when API call is successful", () => {
        it("should return services list", async () => {
        // given
        const services = [
            {   
                id: 1, 
                name: "Rewire", 
                description: "Unpopular service for contrators.", 
                imageUrl: "https://i.ytimg.com/vi/hMZGB6j_AUI/maxresdefault.jpg"
            }
        ];
        axios.get.mockResolvedValueOnce(services);

        // when
        const result = await FetchServices();

        // then
        expect(axios.get).toHaveBeenCalledWith(`${SERVICE_API_BASE_URL}/ccservices`);
        expect(result).toEqual(services);
        });
    })
})

describe("when API call fails", () => {
    it("should return empty services list", async () => {
      // given
      const message = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(message));

      // when
      const result = await FetchServices();

      // then
      expect(axios.get).toHaveBeenCalledWith(`${SERVICE_API_BASE_URL}/ccservices`);
      expect(result).toEqual([]);
    });
})
