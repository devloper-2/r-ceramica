import React from "react";

interface StatItem {
  number: string;
  label: string;
  accent?: "amber" | "blue" | "emerald" | "purple";
}

interface StatsGridProps {
  items: StatItem[];
  ariaLabel?: string;
}

export default function StatsGrid({
  items,
  ariaLabel = "Statistics",
}: StatsGridProps) {
  return (
    <section
      className="
        w-full
        max-w-full
        overflow-x-clip
        bg-[#0d0d0d]
        py-6
        sm:py-8
        md:py-10
        lg:py-12
      "
      aria-label={ariaLabel}
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-4
          sm:px-6
          lg:px-8
          xl:px-10
        "
      >
        {/* ================================================
            MAIN STATS CONTAINER
        ================================================= */}

        <div
          className="
            relative
            w-full
            overflow-hidden
            rounded-[4px]
            border
            border-white/[0.10]
            bg-[#0f0f0f]
          "
        >
          {/* ================================================
              GRID

              Phone  : 1 column
              Tablet : 2 columns
              Desktop: 4 columns
          ================================================= */}

          <div
            className="
              grid
              w-full
              min-w-0
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {items.slice(0, 4).map((item, index) => (
              <article
                key={`${item.label}-${index}`}
                className={`
                  group
                  relative
                  flex
                  min-w-0
                  min-h-[155px]
                  flex-col
                  items-center
                  justify-center
                  overflow-hidden
                  px-5
                  py-8
                  text-center

                  transition-colors
                  duration-700
                  ease-out

                  hover:bg-white/[0.018]

                  /* ==========================================
                     MOBILE
                     Horizontal divider between every item
                  =========================================== */

                  ${
                    index !== 0
                      ? "border-t border-white/[0.08]"
                      : ""
                  }

                  /* ==========================================
                     TABLET
                     2 × 2 layout
                  =========================================== */

                  sm:min-h-[150px]
                  sm:px-6
                  sm:py-9

                  sm:border-t-0

                  ${
                    index >= 2
                      ? "sm:border-t sm:border-white/[0.08]"
                      : ""
                  }

                  ${
                    index % 2 === 1
                      ? "sm:border-l sm:border-white/[0.08]"
                      : ""
                  }

                  /* ==========================================
                     DESKTOP
                     4 × 1 layout
                  =========================================== */

                  lg:min-h-[170px]
                  lg:px-8
                  lg:py-10

                  lg:border-t-0

                  ${
                    index > 0
                      ? "lg:border-l lg:border-white/[0.08]"
                      : ""
                  }
                `}
              >
                {/* ==========================================
                    TOP GOLD ACCENT
                =========================================== */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    top-0
                    left-1/2
                    h-px
                    w-0
                    -translate-x-1/2
                    bg-[#C8954D]

                    transition-all
                    duration-700
                    ease-out

                    group-hover:w-20
                    sm:group-hover:w-24
                  "
                />

                {/* ==========================================
                    CONTENT
                =========================================== */}

                <div
                  className="
                    flex
                    min-w-0
                    max-w-full
                    flex-col
                    items-center
                  "
                >
                  {/* NUMBER */}

                  <span
                    className="
                      max-w-full
                      font-display
                      text-[36px]
                      font-light
                      leading-none
                      tracking-[-0.025em]
                      text-[#f1eee8]

                      transition-all
                      duration-700
                      ease-out

                      group-hover:-translate-y-1

                      sm:text-[40px]
                      lg:text-[42px]
                    "
                  >
                    {item.number}
                  </span>

                  {/* GOLD LINE */}

                  <span
                    className="
                      mt-5
                      h-px
                      w-6
                      shrink-0
                      bg-[#C8954D]/70

                      transition-all
                      duration-700
                      ease-out

                      group-hover:w-10
                      group-hover:bg-[#C8954D]
                    "
                  />

                  {/* LABEL */}

                  <p
                    className="
                      mt-3
                      max-w-[240px]
                      px-2
                      text-center
                      text-[8px]
                      font-medium
                      uppercase
                      leading-[1.6]
                      tracking-[0.3em]
                      text-white/35

                      transition-colors
                      duration-500

                      group-hover:text-white/65

                      sm:text-[9px]
                      sm:tracking-[0.35em]
                    "
                  >
                    {item.label}
                  </p>
                </div>

                {/* ==========================================
                    BACKGROUND INDEX
                =========================================== */}

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    bottom-3
                    right-4
                    select-none
                    text-[7px]
                    tracking-[0.3em]
                    text-white/[0.045]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>

          {/* ================================================
              INNER BORDER
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[4px]
              ring-1
              ring-inset
              ring-white/[0.025]
            "
          />
        </div>
      </div>
    </section>
  );
}