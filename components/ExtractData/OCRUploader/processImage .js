import { createWorker } from "tesseract.js";

export const processImage = async (imageFile, progressCallback) => {
  const worker = await createWorker("eng", 1, {
    logger: (m) => progressCallback(m.progress),
  });

  const {
    data: { text },
  } = await worker.recognize(imageFile[0]);

  await worker.terminate();

  return text;
};
