import axios from "axios";

import { ITEM_API_BASE_URL, FetchItems } from "../FetchItems";

jest.mock("axios");

describe("FetchItems", () => {
    describe("when API call is successful", () => {
        it("should return items list", async () => {
        // given
        const items = [
            {   
                id: 1, 
                name: "Bulb", 
                description: "Standard light for a household", 
                imageUrl: "https://www.collinsdictionary.com/images/full/lightbulb_111547856_1000.jpg"
            }
        ];
        axios.get.mockResolvedValueOnce(items);

        // when
        const result = await FetchItems();

        // then
        expect(axios.get).toHaveBeenCalledWith(`${ITEM_API_BASE_URL}/items`);
        expect(result).toEqual(items);
        });
    })
})

describe("when API call fails", () => {
    it("should return empty items list", async () => {
      // given
      const message = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(message));

      // when
      const result = await FetchItems();

      // then
      expect(axios.get).toHaveBeenCalledWith(`${ITEM_API_BASE_URL}/items`);
      expect(result).toEqual([]);
    });
})
