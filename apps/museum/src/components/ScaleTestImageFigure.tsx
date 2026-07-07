import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getScaleTestImageAsset,
  type ScaleTestImageAsset,
} from "../lib/scaleTestImages";
import type { ScaleTestImageId } from "../data/scaleTestImageQueue";

const ASPECT_RATIO_CLASS: Record<ScaleTestImageAsset["suggestedAspectRatio"], string> = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
};

function FallbackArtwork({ asset }: { asset: ScaleTestImageAsset }) {
  return (
    <div
      role="img"
      aria-label={asset.alt}
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(circle at 24% 28%, ${asset.palette.mouse}33 0%, transparent 28%), radial-gradient(circle at 74% 24%, ${asset.palette.human}30 0%, transparent 30%), linear-gradient(180deg, rgba(4,6,12,0.82), rgba(4,6,12,0.98))`,
      }}
    >
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div
        className="absolute left-[15%] top-[18%] h-[32%] w-[32%] rounded-full border"
        style={{ borderColor: `${asset.palette.mouse}55`, boxShadow: `0 0 40px -12px ${asset.palette.mouse}` }}
      />
      <div
        className="absolute right-[11%] top-[12%] h-[56%] w-[56%] rounded-full border"
        style={{ borderColor: `${asset.palette.human}4f`, boxShadow: `0 0 60px -20px ${asset.palette.human}` }}
      />
      <div
        className="absolute inset-x-[12%] bottom-[20%] h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${asset.palette.mouse}88, ${asset.palette.human}88, transparent)` }}
      />
      <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/55 backdrop-blur-sm">
        Image pending
      </div>
    </div>
  );
}

type ScaleTestImageFigureProps = {
  imageId: ScaleTestImageId;
  caption: string;
  eyebrow?: string;
  className?: string;
  imageClassName?: string;
};

export default function ScaleTestImageFigure({
  imageId,
  caption,
  eyebrow,
  className = "",
  imageClassName = "",
}: ScaleTestImageFigureProps) {
  const asset = getScaleTestImageAsset(imageId);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setMissing(false);
  }, [asset.src]);

  return (
    <figure className={className}>
      <motion.div
        className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] shadow-[0_28px_80px_rgba(0,0,0,0.28)] ${ASPECT_RATIO_CLASS[asset.suggestedAspectRatio]}`}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {!missing ? (
          <img
            src={asset.src}
            alt={asset.alt}
            loading="lazy"
            onError={() => setMissing(true)}
            className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.015] ${imageClassName}`}
          />
        ) : (
          <FallbackArtwork asset={asset} />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,12,0.06),rgba(4,6,12,0.16)_45%,rgba(4,6,12,0.78))]" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          {eyebrow ? (
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/50">{eyebrow}</p>
          ) : null}
          <p className="font-display text-xl font-light text-white">{asset.title}</p>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/68">{caption}</p>
        </div>
      </motion.div>
    </figure>
  );
}
