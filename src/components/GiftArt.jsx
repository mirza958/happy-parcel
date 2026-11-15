export default function GiftArt({ item, className = "" }) {
  const { art, colour = "#f5bd4b", name = "A little surprise" } = item;
  return (
    <svg
      className={`gift-art ${className}`}
      viewBox="0 0 180 160"
      role="img"
      aria-label={name}
    >
      <ellipse cx="90" cy="139" rx="49" ry="8" fill="#333" opacity=".08" />
      <g stroke="#40372f" strokeWidth="2.5" strokeLinejoin="round">
        {art === "mug" && (
          <>
            <path
              d="M120 62h15c27 0 25 48-6 48h-9"
              fill="none"
              stroke={colour}
              strokeWidth="13"
            />
            <path d="M45 46h80v66q-1 25-40 25t-40-25z" fill={colour} />
            <ellipse cx="85" cy="46" rx="40" ry="10" fill="#fff0d2" />
            <path
              d="M66 88q4-6 8 0m22 0q4-6 8 0m-24 12q8 10 16 0"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}
        {art === "candle" && (
          <>
            <path d="M53 62h76v67q-38 17-76 0z" fill={colour} />
            <ellipse cx="91" cy="62" rx="38" ry="10" fill="#fff0d2" />
            <path d="M90 59v-9m0-3q-17-14 0-29 15 19 0 29" fill="#f7c24d" />
            <rect
              x="62"
              y="82"
              width="58"
              height="34"
              rx="3"
              fill="#fff9e9"
              stroke="none"
            />
            <text
              x="91"
              y="96"
              fontSize="10"
              textAnchor="middle"
              stroke="none"
              fill="#483c32"
            >
              PEACH
            </text>
            <text
              x="91"
              y="109"
              fontSize="10"
              textAnchor="middle"
              stroke="none"
              fill="#483c32"
            >
              PLEASE
            </text>
          </>
        )}
        {art === "socks" && (
          <>
            <path
              d="M49 32h38v68l-22 30q-15 17-30 4t2-30l12-13z"
              fill={colour}
            />
            <path
              d="M99 42h35v67l-22 24q-16 17-29 3t4-28l12-12z"
              fill="#bcc8eb"
            />
            <path
              d="M48 45h39m12 10h35"
              fill="none"
              strokeWidth="7"
              stroke="#fdf7e7"
            />
            <path
              d="M55 72q4-13 12-3 15-4 12 8H53zM105 82q4-13 12-3 15-4 12 8h-26z"
              fill="#fff"
              stroke="none"
            />
          </>
        )}
        {art === "chocolate" && (
          <g transform="rotate(-10 90 80)">
            <rect x="53" y="20" width="75" height="120" rx="3" fill="#6d4537" />
            <path d="M78 22v60m25-60v60M54 43h73M54 64h73" stroke="#b47e60" />
            <path d="M47 78l88-8-6 72H53z" fill={colour} />
            <text
              x="91"
              y="101"
              fontSize="11"
              stroke="none"
              fill="#44302b"
              textAnchor="middle"
            >
              OH,
            </text>
            <text
              x="91"
              y="117"
              fontSize="11"
              stroke="none"
              fill="#44302b"
              textAnchor="middle"
            >
              SWEET!
            </text>
          </g>
        )}
        {art === "tea" && (
          <>
            <rect x="44" y="34" width="91" height="105" rx="6" fill={colour} />
            <path d="M45 46h89" />
            <rect
              x="55"
              y="68"
              width="69"
              height="46"
              rx="2"
              fill="#fff7e6"
              stroke="none"
            />
            <path
              d="M85 105V82m0 9q-16-1-13-13 14-1 13 13m0 8q16-1 15-14-14 0-15 14"
              fill={colour}
              stroke={colour}
            />
            <text
              x="90"
              y="126"
              fontSize="9"
              textAnchor="middle"
              stroke="none"
              fill="#34452c"
            >
              TAKE A BREATHER
            </text>
          </>
        )}
        {art === "notebook" && (
          <g transform="rotate(-8 90 80)">
            <rect x="48" y="22" width="87" height="118" rx="6" fill={colour} />
            <path d="M62 23v117m59-116v116" stroke="#777bb1" />
            <rect
              x="74"
              y="53"
              width="38"
              height="46"
              fill="#fff7e6"
              stroke="none"
            />
            <text
              x="93"
              y="72"
              fontSize="10"
              textAnchor="middle"
              stroke="none"
              fill="#493d36"
            >
              BIG
            </text>
            <text
              x="93"
              y="86"
              fontSize="9"
              textAnchor="middle"
              stroke="none"
              fill="#493d36"
            >
              IDEAS
            </text>
          </g>
        )}
        {art === "scrunchie" && (
          <>
            <path
              d="M90 33q19-15 26 6 25-4 21 20 23 9 8 29 15 21-8 31 2 25-23 20-9 23-29 8-21 14-30-9-25 4-22-21-23-10-8-30-14-21 9-29-3-24 22-20 11-22 34-5z"
              fill={colour}
            />
            <circle cx="89" cy="87" r="26" fill="#fff7ec" />
            <path
              d="M61 57l10 12m39-16-9 15m29 31-15-5m-49 25 11-12"
              stroke="#b96c80"
            />
          </>
        )}
        {art === "cookies" && (
          <>
            <path d="M43 38h94l-5 102H48z" fill="#c99969" />
            <path d="M44 51h92" />
            <circle cx="90" cy="94" r="33" fill="#f2ca8b" />
            <path
              d="M72 79l7 3m22-7 5 5m-21 17 7 4m-22 6 4 5m33-12 6-3m-17 23 6-3"
              stroke="#6b4230"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </>
        )}
        {art === "soap" && (
          <g transform="rotate(-12 90 80)">
            <rect x="35" y="53" width="112" height="70" rx="16" fill={colour} />
            <rect
              x="70"
              y="53"
              width="41"
              height="70"
              fill="#fff4df"
              stroke="none"
            />
            <path
              d="M88 102V73m-1 8-8-6m9 14 8-7m-8 16-8-6"
              fill="none"
              stroke="#7f8e6e"
            />
            <circle cx="128" cy="37" r="8" fill="#e7e0ef" stroke="none" />
            <circle cx="111" cy="22" r="5" fill="#e7e0ef" stroke="none" />
          </g>
        )}
        {art === "pens" && (
          <g transform="rotate(14 90 80)">
            {["#efad93", "#a8b5de", "#e9bd57"].map((c, i) => (
              <g key={c}>
                <rect
                  x={56 + i * 23}
                  y={30 - i * 4}
                  width="12"
                  height="95"
                  rx="5"
                  fill={c}
                />
                <path
                  d={`M${56 + i * 23} ${118 - i * 4}l6 18 6-18`}
                  fill="#f7ecd9"
                />
              </g>
            ))}
          </g>
        )}
        {art === "keyring" && (
          <>
            <circle
              cx="90"
              cy="37"
              r="20"
              fill="none"
              stroke="#a49e90"
              strokeWidth="5"
            />
            <path d="M90 56v22" stroke="#a49e90" strokeWidth="5" />
            <path
              d="m90 67 9 13 16-4 1 16 15 8-10 12 4 16-17 2-10 13-12-11-16 4-3-16-14-8 10-13-3-16 17-2z"
              fill={colour}
            />
            <path
              d="M80 104h2m19 0h2m-20 12q9 8 17-1"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}
        {art === "flower" && (
          <>
            <path
              d="M90 45c35-45 59 4 31 24 54 0 44 53 8 46 25 45-26 67-40 31-26 39-65 6-42-25-46 7-47-46-10-51-25-34 15-62 38-33z"
              transform="translate(4 -8) scale(.95)"
              fill={colour}
            />
            <circle cx="90" cy="87" r="23" fill="#f7cd67" />
          </>
        )}
        {![
          "mug",
          "candle",
          "socks",
          "chocolate",
          "tea",
          "notebook",
          "scrunchie",
          "cookies",
          "soap",
          "pens",
          "keyring",
          "flower",
        ].includes(art) && (
          <>
            <rect x="45" y="50" width="90" height="85" rx="7" fill={colour} />
            <path d="M90 50v85M45 77h90" stroke="#fff8e9" strokeWidth="13" />
          </>
        )}
      </g>
    </svg>
  );
}
