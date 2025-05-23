import { Mixedbread } from "@mixedbread/sdk";

const mxbai = new Mixedbread({
  apiKey: process.env.MIXEDBREAD_API_KEY,
});

export default mxbai;
