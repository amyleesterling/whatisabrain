import {
  scaleTestImageQueue,
  scaleTestImageQueueById,
  type ScaleTestImageId,
} from "../data/scaleTestImageQueue";

export type ScaleTestImageAsset = (typeof scaleTestImageQueue)[number] & {
  alt: string;
  src: string;
};

const SCALE_TEST_IMAGE_ALT: Record<ScaleTestImageId, string> = {
  "hero-brains-by-the-numbers": "A tiny cyan mouse brain and a much larger violet human brain floating in dark space.",
  "neurons-cloud-comparison": "A small cyan cloud of neurons beside a much larger violet galaxy of glowing cells.",
  "fenway-baseball-scale": "A night stadium filled with glowing ball-like lights to suggest a vast count.",
  "synapse-city-lights": "An endless field of synaptic lights stretching like a city seen from orbit.",
  "single-synapse-spark": "A close-up spark leaping across a single synapse with many more fading behind it.",
  "earth-wrapped-in-axon-wiring": "The Earth wrapped in delicate glowing neural threads like biological orbit lines.",
  "boston-to-miami-axon": "A glowing cyan axon tracing a long coastline journey across the eastern United States.",
  "moon-and-back-wiring": "Earth and Moon connected by looping violet neural threads in deep space.",
  "volume-spheres-mouse-human": "A tiny cyan sphere beside a much larger violet sphere, both filled with neural texture.",
  "numbers-dissolve-into-nebula": "Abstract points of light dissolving into a brain-like nebula in cyan and violet.",
  "woven-planet-brain": "A brain shaped like a woven glowing planet made of axon strands.",
  "scale-ladder-earth-brain-neuron-synapse": "A vertical scale journey from Earth to brain to neuron to synapse linked by a single thread.",
};

function withBaseUrl(relativePath: string) {
  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${baseUrl}${relativePath}`.replace(/(?<!:)\/{2,}/g, "/");
}

export const scaleTestImageAssets = Object.fromEntries(
  scaleTestImageQueue.map((job) => [
    job.id,
    {
      ...job,
      alt: SCALE_TEST_IMAGE_ALT[job.id],
      src: withBaseUrl(job.outputPath),
    },
  ]),
) as Record<ScaleTestImageId, ScaleTestImageAsset>;

export function getScaleTestImageAsset(imageId: ScaleTestImageId) {
  const job = scaleTestImageQueueById[imageId];
  return scaleTestImageAssets[job.id];
}
