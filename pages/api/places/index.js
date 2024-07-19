import dbConnect from "@/db/connect";
import Place from "@/db/models/Places";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Database connection error: " + error.message });
  }

  if (request.method === "GET") {
    try {
      const places = await Place.find();

      return response.status(200).json(places);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error retrieving jokes: " + error.message });
    }
  }
}
