export const SCALE_TEST_STYLE_PREFIX =
  "cinematic science visualization, deep space-black background with subtle radial glow, luminous cyan and violet palette, elegant museum exhibit design, high contrast, clean negative space for text overlay, magical but scientifically grounded, microscopic neural forms blended with cosmic scale, volumetric glow, crisp details, no labels, no readable text, no numbers, no watermark";

export const SCALE_TEST_NEGATIVE_PROMPT =
  "text, labels, captions, numbers, equations, watermark, logo, fake UI, messy infographic, medical horror, gore, skull, zombie, plastic brain, generic stock photo, oversaturated rainbow, cartoonish clip art, unreadable typography, crowded composition, low resolution, blurry, noisy";

export const SCALE_TEST_PALETTE = {
  mouse: "#7ee0ff",
  human: "#b78bff",
  background: "#04060c",
  tone: "cosmic, elegant, scientifically grounded, magical but not cartoonish",
} as const;

export type ScaleTestImageAspectRatio = "16:9" | "4:3" | "1:1" | "4:5";

export type ScaleTestImageJob = {
  id: string;
  filename: string;
  title: string;
  purpose: string;
  prompt: string;
  negativePrompt: string;
  palette: typeof SCALE_TEST_PALETTE;
  suggestedAspectRatio: ScaleTestImageAspectRatio;
  outputPath: string;
};

function withStylePrefix(prompt: string) {
  return `${SCALE_TEST_STYLE_PREFIX}. ${prompt}`;
}

function makeImageJob(
  id: string,
  filename: string,
  title: string,
  purpose: string,
  prompt: string,
  suggestedAspectRatio: ScaleTestImageAspectRatio,
): ScaleTestImageJob {
  return {
    id,
    filename,
    title,
    purpose,
    prompt: withStylePrefix(prompt),
    negativePrompt: SCALE_TEST_NEGATIVE_PROMPT,
    palette: SCALE_TEST_PALETTE,
    suggestedAspectRatio,
    outputPath: `scale-test/images/${filename}`,
  };
}

export const scaleTestImageQueue = [
  makeImageJob(
    "hero-brains-by-the-numbers",
    "hero-brains-by-the-numbers.webp",
    "Hero: Brains by the Numbers",
    "Hero image for the top of the scale-test page.",
    "cinematic science visualization of a tiny glowing mouse brain and a much larger luminous human brain floating in a dark cosmic field, the mouse brain rendered in electric cyan, the human brain in soft violet, both made of delicate branching neural filaments and faint star-like synapses, elegant museum exhibit design, vast sense of scale, clean negative space in the center-left for title text, deep black-blue radial background, volumetric glow, beautiful and awe-inspiring, no labels, no text, no numbers, no watermark",
    "16:9",
  ),
  makeImageJob(
    "neurons-cloud-comparison",
    "neurons-cloud-comparison.webp",
    "Neuron Cloud Comparison",
    "Image for neuron count comparison.",
    "a surreal but elegant visualization of neurons as glowing pearls of light, a small dense cloud of cyan neuron-points beside an enormous violet galaxy-like cloud of neuron-points, both floating in darkness, the violet cloud vastly larger but still graceful, delicate dendritic threads between points, museum-quality science art, sense of comparison without charts, cinematic lighting, dark radial background, no text, no labels, no numbers",
    "16:9",
  ),
  makeImageJob(
    "fenway-baseball-scale",
    "fenway-baseball-scale.webp",
    "Fenway Baseball Scale",
    "Image for the Fenway Park / baseballs scale metaphor.",
    "wide cinematic view of Fenway Park at night imagined as a scientific scale metaphor, the stadium gently filled with countless small glowing ivory spheres like baseballs, cyan glow rising from a smaller layer and violet glow suggesting a much larger impossible quantity, subtle neural filament patterns in the sky above the stadium, magical realism, accurate stadium-like shape but not logo-focused, dark blue night atmosphere, no text, no numbers, no labels, no watermark",
    "16:9",
  ),
  makeImageJob(
    "synapse-city-lights",
    "synapse-city-lights.webp",
    "Synapse City Lights",
    "Image for synapse count comparison.",
    "an immense field of glowing synapses stretching into the distance like city lights seen from orbit, tiny junctions connected by fine neural filaments, cyan lights in the foreground transitioning into a vast violet horizon, feeling of billions and trillions without showing numbers, cinematic macro-to-cosmic scale, dark background, shallow depth of field, elegant scientific wonder, no text, no labels, no numerals",
    "16:9",
  ),
  makeImageJob(
    "single-synapse-spark",
    "single-synapse-spark.webp",
    "Single Synapse Spark",
    "Image explaining one synapse / one connection becoming impossible scale.",
    "extreme close-up of a single synapse as two luminous neural branches almost touching, a tiny electric spark crossing the gap, surrounded by a vast faint constellation of thousands of other synapses fading into darkness, cyan and violet glow, scientifically inspired but poetic, cinematic macro photography style, clean negative space, no text, no labels, no numbers",
    "4:3",
  ),
  makeImageJob(
    "earth-wrapped-in-axon-wiring",
    "earth-wrapped-in-axon-wiring.webp",
    "Earth Wrapped in Axon Wiring",
    "Flagship image for the human brain wiring wraps Earth section.",
    "planet Earth floating in deep space, wrapped many times by impossibly fine glowing neural axon threads, the threads orbit like luminous violet and cyan ribbons around the globe, beautiful scientific visualization, elegant and not cluttered, the wires feel delicate like biology rather than cables, subtle stars, museum installation aesthetic, dramatic lighting, no text, no labels, no numbers, no watermark",
    "16:9",
  ),
  makeImageJob(
    "boston-to-miami-axon",
    "boston-to-miami-axon.webp",
    "Boston to Miami Axon",
    "Image for mouse brain wiring scale, approximately Boston to Miami.",
    "a poetic map-like landscape from Boston to Miami represented as a single glowing cyan neural axon stretching across the eastern United States, not a literal labeled map, just coastline silhouette and city-light hints, the axon meanders like a biological fiber and a road at the same time, dark midnight palette, cyan glow, subtle violet accents, cinematic science illustration, no text, no labels, no numbers",
    "16:9",
  ),
  makeImageJob(
    "moon-and-back-wiring",
    "moon-and-back-wiring.webp",
    "Moon and Back Wiring",
    "Image for human brain wiring reaching to the Moon and back.",
    "the Moon and Earth suspended in black space, connected by delicate violet neural axon filaments that loop between them more than once, the fibers glow softly like living threads, subtle cyan highlights, poetic scale metaphor, cinematic lighting, clean composition with space for overlay text, elegant museum science visualization, no text, no labels, no numbers",
    "16:9",
  ),
  makeImageJob(
    "volume-spheres-mouse-human",
    "volume-spheres-mouse-human.webp",
    "Volume Spheres Mouse Human",
    "Image for mouse versus human brain volume comparison.",
    "two luminous glass spheres floating above a faint baseline in a dark exhibit-like space, a tiny cyan sphere beside a much larger violet sphere, both filled with branching neural patterns and tiny sparkling synapse-points, clean minimal composition, precise scientific comparison aesthetic, soft glow, lots of negative space, no labels, no numbers, no text",
    "16:9",
  ),
  makeImageJob(
    "numbers-dissolve-into-nebula",
    "numbers-dissolve-into-nebula.webp",
    "Numbers Dissolve Into Nebula",
    "Transition image for the idea that numbers stop meaning anything at brain scale.",
    "abstract visualization of numbers dissolving into stars and neural branches, millions of tiny light-points transforming into a glowing brain-shaped nebula, cyan and violet palette, philosophical science museum style, awe and clarity, deep black background, elegant negative space, no readable text, no actual numerals, no labels",
    "16:9",
  ),
  makeImageJob(
    "woven-planet-brain",
    "woven-planet-brain.webp",
    "Woven Planet Brain",
    "General brain wiring image.",
    "a luminous human brain rendered as a small planet made entirely of woven axon fibers, violet and cyan strands wrapping around sulci like atmospheric currents, tiny spark-like synapses embedded throughout, deep cosmic background, beautiful cinematic science art, soft glow, highly detailed but clean, no text, no labels, no numbers",
    "16:9",
  ),
  makeImageJob(
    "scale-ladder-earth-brain-neuron-synapse",
    "scale-ladder-earth-brain-neuron-synapse.webp",
    "Scale Ladder: Earth, Brain, Neuron, Synapse",
    "Summary or footer image showing the ladder of scale.",
    "a vertical ladder of scale from planet Earth to brain to neuron to synapse, each level represented as glowing objects connected by a single continuous neural thread, cyan and violet colors, dark cosmic background, elegant educational science poster style, whimsical but not childish, clean spaces for web text overlay, no labels, no text, no numbers",
    "4:5",
  ),
] as const satisfies readonly ScaleTestImageJob[];

export type ScaleTestImageId = (typeof scaleTestImageQueue)[number]["id"];

export const scaleTestImageQueueById = Object.fromEntries(
  scaleTestImageQueue.map((job) => [job.id, job]),
) as Record<ScaleTestImageId, ScaleTestImageJob>;
