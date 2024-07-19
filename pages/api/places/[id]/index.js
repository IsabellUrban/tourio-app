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

  const { id } = request.query;

  if (!id) {
    return response.status(404).json({ status: "Not Found" });
  }

  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);
      if (!place) {
        return response.status(404).json({ status: "Not found" });
      }
      response.status(200).json(place);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error retrieving joke: " + error.message });
    }
  }
}
