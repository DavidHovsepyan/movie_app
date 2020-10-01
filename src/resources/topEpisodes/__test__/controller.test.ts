import { getTopEpisodes } from "../controller";
import redisService from "../../../services/redis";
import episodesService from "../../../services/episodes";

test("getTopEpisodes should return expected response", async () => {
  const views = {
    "12": 0,
  };
  const req: any = {
    params: {
      seriesId: "12",
    },
  };

  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValueOnce(mockJson)
  const res: any = {
    json: mockJson,
    status: mockStatus,
  };

  const next = jest.fn();

  jest
    .spyOn(redisService, "incrementViews")
    .mockImplementationOnce(async () => {
      views[12] = 1;
    });

  jest
    .spyOn(episodesService, "getTvSeries")
    .mockImplementationOnce(async () => {
      return {
        data: {
          seasons: [
            {
              season_number: "1",
              name: "some_name1",
            },
            {
              season_number: "1",
              name: "some_name1",
            },
            {
              season_number: "1",
              name: "some_name1",
            },
            {
              season_number: "1",
              name: "some_name1",
            },
            {
              season_number: "1",
              name: "some_name1",
            },
            {
              season_number: "1",
              name: "some_name1",
            },
          ],
        },
      };
    });

  const mockResponse = [
    {
      vote_average: 10,
      name: "someName",
    },
  ];

  jest
    .spyOn(episodesService, "getSortedTopEpisodes")
    .mockImplementationOnce(async () => {
      return mockResponse;
    });

  await getTopEpisodes(req, res, next);

  expect(res.status).toHaveBeenCalledWith(200);
});
