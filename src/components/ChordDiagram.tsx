import React from 'react';
import { ChordData } from '../types';
import { playPluck } from '../utils/audio';
import { Volume2 } from 'lucide-react';

interface ChordDiagramProps {
  chord: ChordData;
  size?: 'sm' | 'md' | 'lg';
  showStringLabels?: boolean;
  interactiveStrings?: boolean;
}

export const ChordDiagram: React.FC<ChordDiagramProps> = ({
  chord,
  size = 'md',
  showStringLabels = true,
  interactiveStrings = true,
}) => {
  // Determine fret span (usually frets 1 to 4 or 5)
  const maxFretInChord = Math.max(...chord.frets);
  const totalFrets = Math.max(4, Math.min(5, maxFretInChord));

  // Strings: index 0 = 4ª (Ré), 1 = 3ª (Sol), 2 = 2ª (Si), 3 = 1ª (Ré)
  const stringNames = ['4ª Ré', '3ª Sol', '2ª Si', '1ª Ré'];

  // Dimensions
  const dimensions = {
    sm: { width: 140, height: 160, nutHeight: 6, fretSpacing: 28, stringSpacing: 26, dotRadius: 9, fontSize: 10 },
    md: { width: 200, height: 230, nutHeight: 8, fretSpacing: 38, stringSpacing: 38, dotRadius: 13, fontSize: 12 },
    lg: { width: 260, height: 300, nutHeight: 10, fretSpacing: 48, stringSpacing: 50, dotRadius: 16, fontSize: 14 },
  }[size];

  const { width, height, nutHeight, fretSpacing, stringSpacing, dotRadius, fontSize } = dimensions;

  // Margin offsets inside SVG
  const marginLeft = (width - stringSpacing * 3) / 2;
  const marginTop = size === 'sm' ? 24 : 34;

  const handleStringClick = (stringIndex: number) => {
    if (!interactiveStrings) return;
    const freq = chord.frequencies[stringIndex];
    playPluck(freq, 2.0, 0.9);
  };

  return (
    <div className="flex flex-col items-center select-none">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        role="img"
        aria-label={`Diagrama do acorde ${chord.fullName}`}
      >
        {/* Nut (Pestana do instrumento no topo) */}
        <rect
          x={marginLeft - 4}
          y={marginTop - nutHeight}
          width={stringSpacing * 3 + 8}
          height={nutHeight}
          fill="#D4AF37"
          rx={2}
          opacity={0.9}
        />

        {/* Frets horizontal lines */}
        {Array.from({ length: totalFrets + 1 }).map((_, fretIdx) => {
          const y = marginTop + fretIdx * fretSpacing;
          return (
            <g key={`fret-${fretIdx}`}>
              <line
                x1={marginLeft}
                y1={y}
                x2={marginLeft + stringSpacing * 3}
                y2={y}
                stroke={fretIdx === 0 ? 'transparent' : '#3A4252'}
                strokeWidth={fretIdx === 0 ? 0 : 2}
              />
              {/* Fret number on right side */}
              {fretIdx > 0 && (
                <text
                  x={marginLeft + stringSpacing * 3 + 12}
                  y={y - fretSpacing / 2 + 4}
                  fill="#717D96"
                  fontSize={fontSize - 2}
                  fontFamily="Inter, sans-serif"
                  textAnchor="middle"
                >
                  {fretIdx}ª
                </text>
              )}
            </g>
          );
        })}

        {/* Strings vertical lines */}
        {Array.from({ length: 4 }).map((_, strIdx) => {
          const x = marginLeft + strIdx * stringSpacing;
          const fretVal = chord.frets[strIdx];
          const fingerVal = chord.fingers[strIdx];
          const isFretted = fretVal > 0;
          const isOpen = fretVal === 0;

          // String thickness (4ª thicker than 1ª)
          const strokeWidth = [2.5, 2.0, 1.6, 1.4][strIdx];

          return (
            <g
              key={`string-${strIdx}`}
              className={interactiveStrings ? 'cursor-pointer group' : ''}
              onClick={() => handleStringClick(strIdx)}
            >
              {/* Invisible wide hit area for easy tapping on touch */}
              <rect
                x={x - 12}
                y={marginTop - 20}
                width={24}
                height={totalFrets * fretSpacing + 35}
                fill="transparent"
              />

              {/* Physical string line */}
              <line
                x1={x}
                y1={marginTop}
                x2={x}
                y2={marginTop + totalFrets * fretSpacing}
                stroke="#6B7280"
                strokeWidth={strokeWidth}
                className="group-hover:stroke-[#10D97E] transition-colors"
              />

              {/* Open string indicator (circle above nut) */}
              {isOpen && (
                <g>
                  <circle
                    cx={x}
                    cy={marginTop - nutHeight - 10}
                    r={dotRadius - 2}
                    fill="#08090B"
                    stroke="#10D97E"
                    strokeWidth={2}
                    className="group-hover:fill-[#10D97E]/20 transition-all"
                  />
                  <text
                    x={x}
                    y={marginTop - nutHeight - 6}
                    fill="#10D97E"
                    fontSize={fontSize - 2}
                    fontFamily="Inter, sans-serif"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    O
                  </text>
                </g>
              )}

              {/* Fretted note circle */}
              {isFretted && (
                <g>
                  {/* Subtle glow */}
                  <circle
                    cx={x}
                    cy={marginTop + (fretVal - 0.5) * fretSpacing}
                    r={dotRadius + 2}
                    fill="#10D97E"
                    opacity={0.25}
                  />
                  {/* Main finger dot */}
                  <circle
                    cx={x}
                    cy={marginTop + (fretVal - 0.5) * fretSpacing}
                    r={dotRadius}
                    fill="#10D97E"
                    className="group-hover:brightness-110 transition-all"
                  />
                  {/* Finger number */}
                  <text
                    x={x}
                    y={marginTop + (fretVal - 0.5) * fretSpacing + (fontSize / 3)}
                    fill="#08090B"
                    fontSize={fontSize}
                    fontWeight="800"
                    fontFamily="Inter, sans-serif"
                    textAnchor="middle"
                  >
                    {fingerVal > 0 ? fingerVal : ''}
                  </text>
                </g>
              )}

              {/* Note Name underneath the string */}
              <text
                x={x}
                y={marginTop + totalFrets * fretSpacing + 16}
                fill="#94A3B8"
                fontSize={fontSize}
                fontFamily="Inter, sans-serif"
                fontWeight="600"
                textAnchor="middle"
                className="group-hover:fill-[#10D97E] transition-colors"
              >
                {chord.notes[strIdx]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* String labels and notes breakdown */}
      {showStringLabels && (
        <div className="w-full mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 px-2">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Volume2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">Toque nas cordas para ouvir</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {chord.notes.join(' • ')}
          </span>
        </div>
      )}
    </div>
  );
};
