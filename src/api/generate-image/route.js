async function handler({ descriptions }) {
  if (!descriptions || !Array.isArray(descriptions)) {
    return { error: "Descriptions array is required" };
  }

  try {
    const generateImage = async (description) => {
      const prompt = `Generate a modern, professional image of ${description}. Style: Clean, technical, with a focus on renewable energy and green technology. Color scheme: blues and greens.`;

      const response = await fetch(
        "https://api.replicate.com/v1/models/google/imagen-3/predictions",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: {
              prompt: prompt,
              negative_prompt: "blurry, ugly, duplicate, poorly drawn",
              num_outputs: 1,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to initiate image generation");
      }

      const prediction = await response.json();

      let attempts = 0;
      const maxAttempts = 30;
      const pollInterval = 2000;

      while (attempts < maxAttempts) {
        const statusResponse = await fetch(
          `https://api.replicate.com/v1/predictions/${prediction.id}`,
          {
            headers: {
              Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
            },
          }
        );

        if (!statusResponse.ok) {
          throw new Error("Failed to check generation status");
        }

        const result = await statusResponse.json();

        if (result.status === "succeeded") {
          return { url: result.output[0], description };
        }

        if (result.status === "failed") {
          throw new Error("Image generation failed");
        }

        await new Promise((resolve) => setTimeout(resolve, pollInterval));
        attempts++;
      }

      throw new Error("Generation timed out");
    };

    const results = await Promise.allSettled(descriptions.map(generateImage));

    const images = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    const errors = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason.message);

    return {
      images,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    return {
      error: error.message || "Failed to generate images",
    };
  }
}