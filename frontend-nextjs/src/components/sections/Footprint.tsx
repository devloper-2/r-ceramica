import Image from "next/image";
import Link from "next/link";

interface FootprintProps {
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  image: string;
  imageAlt?: string;
}

export default function Footprint({
  eyebrow,
  title,
  description,
  cta,
  image,
  imageAlt = "Global Footprint",
}: FootprintProps) {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#0d0d0d]
        py-8
        sm:py-10
        md:py-12
        lg:py-16
      "
    >
      {/* =====================================================
          VERY SUBTLE BACKGROUND GLOW
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-120px]
          top-1/2
          h-[350px]
          w-[350px]
          -translate-y-1/2
          rounded-full
          bg-[#C8954D]/[0.025]
          blur-[100px]
        "
      />

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1320px]
          px-5

          sm:px-6

          md:px-8

          lg:px-10

          xl:px-12
        "
      >
        {/* ===================================================
            TOP DIVIDER
        ==================================================== */}

        <div
          className="
            mb-10
            h-px
            w-full
            bg-white/[0.07]

            sm:mb-12

            lg:mb-14
          "
        />

        {/* ===================================================
            MAIN LAYOUT
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-10

            md:gap-12

            lg:grid-cols-[0.75fr_1.25fr]
            lg:items-center
            lg:gap-16

            xl:grid-cols-[0.7fr_1.3fr]
            xl:gap-20
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div
            className="
              flex
              flex-col
              justify-center
              lg:pr-4
              xl:pr-8
            "
          >
            {/* Eyebrow */}

            <div
              className="
                mb-5
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-[#C8954D]

                  sm:w-10
                "
              />

              <span
                className="
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.45em]
                  text-[#C8954D]/75

                  sm:text-[8px]
                "
              >
                {eyebrow}
              </span>
            </div>

            {/* Title */}

            <h2
              className="
                max-w-[500px]
                whitespace-pre-line
                font-display
                text-[36px]
                font-light
                uppercase
                leading-[1.02]
                tracking-[-0.025em]
                text-white

                sm:text-[42px]

                md:text-[48px]

                lg:text-[52px]

                xl:text-[58px]
              "
            >
              {title}
            </h2>

            {/* Description */}

            <p
              className="
                mt-6
                max-w-[480px]
                text-[11px]
                font-light
                leading-[1.9]
                tracking-[0.06em]
                text-white/40

                sm:mt-7
                sm:text-[12px]

                md:text-[13px]
              "
            >
              {description}
            </p>

            {/* CTA */}

            <div className="mt-7 sm:mt-9">
              <Link
                href={cta.href}
                className="
                  group
                  inline-flex
                  items-center
                  gap-4
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.35em]
                  text-white/50

                  transition-colors
                  duration-500

                  hover:text-white
                "
              >
                <span>{cta.label}</span>

                <span
                  className="
                    relative
                    h-px
                    w-9
                    bg-[#C8954D]/70

                    transition-all
                    duration-700

                    group-hover:w-16
                    group-hover:bg-[#C8954D]
                  "
                >
                  <span
                    className="
                      absolute
                      right-0
                      top-1/2
                      h-1
                      w-1
                      -translate-y-1/2
                      rounded-full
                      bg-[#C8954D]
                    "
                  />
                </span>
              </Link>
            </div>

            {/* Small bottom detail */}

            <div
              className="
                mt-8
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-5
                  bg-white/10
                "
              />

              <span
                className="
                  text-[6px]
                  uppercase
                  tracking-[0.35em]
                  text-white/20
                "
              >
                Crafted in India · Worldwide
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT IMAGE
          ================================================== */}

          <div className="relative min-w-0">
            <div
              className="
                group
                relative
                aspect-[16/10]
                w-full
                overflow-hidden
                border
                border-white/[0.08]
                bg-[#111]

                sm:aspect-[16/9.5]

                lg:aspect-[16/10]
              "
            >
              {/* Image */}

              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="
                  (max-width: 767px) 100vw,
                  (max-width: 1023px) 90vw,
                  70vw
                "
                className="
                  object-cover
                  opacity-70
                  scale-[1.01]

                  transition-all
                  duration-[1400ms]
                  ease-out

                  group-hover:scale-105
                  group-hover:opacity-90
                "
              />

              {/* Dark cinematic overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-black/45
                  via-black/10
                  to-black/20
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/60
                  via-transparent
                  to-black/10
                "
              />

              {/* =================================================
                  TOP LABEL
              ================================================== */}

              <div
                className="
                  absolute
                  left-5
                  top-5
                  z-20
                  flex
                  items-center
                  gap-2

                  sm:left-6
                  sm:top-6
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#C8954D]
                    shadow-[0_0_8px_rgba(200,149,77,0.5)]
                  "
                />

                <span
                  className="
                    text-[7px]
                    uppercase
                    tracking-[0.3em]
                    text-white/50
                  "
                >
                  Global Presence
                </span>
              </div>

              {/* =================================================
                  SIMPLE GOLD LOCATION MARKERS
              ================================================== */}

              <div
                className="
                  absolute
                  left-[27%]
                  top-[35%]
                  z-20
                "
              >
                <span
                  className="
                    absolute
                    -inset-2
                    rounded-full
                    border
                    border-[#C8954D]/20
                    animate-ping
                  "
                />

                <span
                  className="
                    relative
                    block
                    h-2
                    w-2
                    rounded-full
                    bg-[#C8954D]
                    shadow-[0_0_10px_rgba(200,149,77,0.6)]
                  "
                />
              </div>

              <div
                className="
                  absolute
                  left-[52%]
                  top-[45%]
                  z-20
                "
              >
                <span
                  className="
                    relative
                    block
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#C8954D]
                    shadow-[0_0_8px_rgba(200,149,77,0.5)]
                    animate-pulse
                  "
                />
              </div>

              <div
                className="
                  absolute
                  left-[73%]
                  top-[37%]
                  z-20
                "
              >
                <span
                  className="
                    relative
                    block
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#C8954D]
                    shadow-[0_0_8px_rgba(200,149,77,0.5)]
                    animate-pulse
                  "
                />
              </div>

              {/* =================================================
                  BOTTOM INFORMATION
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                  z-20
                  flex
                  items-end
                  justify-between
                  gap-4

                  sm:bottom-6
                  sm:left-6
                  sm:right-6
                "
              >
                <div>
                  <span
                    className="
                      block
                      text-[6px]
                      uppercase
                      tracking-[0.3em]
                      text-white/30
                    "
                  >
                    R Ceramica
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      text-[8px]
                      uppercase
                      tracking-[0.2em]
                      text-white/65
                    "
                  >
                    Crafted in India · Worldwide
                  </span>
                </div>

                <span
                  className="
                    font-mono
                    text-[7px]
                    tracking-[0.25em]
                    text-[#C8954D]/50
                  "
                >
                  06 / GLOBAL
                </span>
              </div>

              {/* =================================================
                  ANIMATED TOP FRAME
              ================================================== */}

              <span
                className="
                  absolute
                  left-1/2
                  top-0
                  z-30
                  h-px
                  w-0
                  -translate-x-1/2
                  bg-[#C8954D]

                  transition-all
                  duration-700

                  group-hover:w-24
                "
              />

              {/* Corner */}

              <span
                className="
                  absolute
                  bottom-4
                  right-4
                  z-30
                  h-7
                  w-7
                  border-b
                  border-r
                  border-white/20

                  transition-all
                  duration-700

                  group-hover:h-10
                  group-hover:w-10
                  group-hover:border-[#C8954D]/50
                "
              />
            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM DIVIDER
        ==================================================== */}

        <div
          className="
            mt-10
            flex
            items-center
            justify-between
            border-t
            border-white/[0.06]
            pt-4

            sm:mt-12
          "
        >
          <span
            className="
              text-[6px]
              uppercase
              tracking-[0.35em]
              text-white/15

              sm:text-[7px]
            "
          >
            Vision · Legacy · Innovation
          </span>

          <span
            className="
              text-[6px]
              uppercase
              tracking-[0.35em]
              text-[#C8954D]/35

              sm:text-[7px]
            "
          >
            R Ceramica
          </span>
        </div>
      </div>
    </section>
  );
}