import React from "react";
import {
  AbsoluteFill,
  Composition,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const colors = {
  ink: "#171515",
  paper: "#f5f2ec",
  coral: "#ff593f",
  lime: "#d6ff52",
  lavender: "#c9a9ff",
};

function Scene({
  kicker,
  headline,
  accent,
  footer,
  background,
}: {
  kicker: string;
  headline: string;
  accent: string;
  footer: string;
  background: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 18, stiffness: 110 } });
  const drift = Math.sin(frame / 24) * 18;

  return (
    <AbsoluteFill
      style={{
        background,
        color: colors.ink,
        fontFamily: "Space Grotesk Variable, Arial, Helvetica, sans-serif",
        overflow: "hidden",
        justifyContent: "space-between",
        padding: 78,
      }}
    >
      <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: 5, opacity: enter }}>
        VOHN STUDIO <span style={{ color: colors.coral }}> / </span> SOCIAL FILM
      </div>
      <div style={{ position: "relative", zIndex: 2, transform: `translateY(${(1 - enter) * 90}px)` }}>
        <div style={{ fontSize: 21, letterSpacing: 5, marginBottom: 36 }}>{kicker}</div>
        <div style={{ fontSize: 112, lineHeight: 0.91, fontWeight: 800, letterSpacing: -9, maxWidth: 920 }}>
          {headline}
          <div style={{ color: accent }}>{footer}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24, fontWeight: 600 }}>
        <span style={{ width: 70, height: 4, background: colors.coral }} />
        {footer}
      </div>
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 480,
          borderRadius: "50%",
          right: -90 + drift,
          top: 410 - drift,
          background: accent,
          opacity: 0.92,
          transform: `scale(${0.65 + enter * 0.35})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 210,
          height: 210,
          borderRadius: "50%",
          right: 60 - drift,
          top: 540 + drift,
          background: colors.lime,
          mixBlendMode: "multiply",
        }}
      />
      <div style={{ position: "absolute", left: 78, top: 255, fontSize: 180, fontWeight: 800, opacity: 0.08 }}>✳</div>
    </AbsoluteFill>
  );
}

function SocialPromo() {
  return (
    <AbsoluteFill style={{ background: colors.ink }}>
      <Sequence from={0} durationInFrames={180}>
        <Scene kicker="BIG IDEA. FIRST FRAME." headline="MAKE IT" accent={colors.coral} footer="MATTER." background={colors.paper} />
      </Sequence>
      <Sequence from={180} durationInFrames={180}>
        <Scene kicker="BUILT TO MOVE." headline="DESIGN THAT" accent={colors.lime} footer="STOPS SCROLLS." background={colors.lavender} />
      </Sequence>
      <Sequence from={360} durationInFrames={180}>
        <Scene kicker="YOUR STORY, IN MOTION." headline="MAKE YOUR" accent={colors.coral} footer="NEXT MOVE." background={colors.paper} />
      </Sequence>
    </AbsoluteFill>
  );
}

export function VideoRoot() {
  return (
    <>
      <Composition
        id="SocialPromo"
        component={SocialPromo}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
}
