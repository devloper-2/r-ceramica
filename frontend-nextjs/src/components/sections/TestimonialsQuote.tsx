import Image from "next/image";

interface ChairmanQuoteSectionProps {
  backgroundText?: string;
  heading?: string;
  quote: string;
  name: string;
  designation: string;
  image: string;
  imageAlt?: string;
}

export default function ChairmanQuoteSection({
  heading = "Chairman's Perspective",
  quote,
  name,
  designation,
  image,
  imageAlt = "Chairman",
}: ChairmanQuoteSectionProps) {
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
        xl:py-20
      "
    >
      {/* =====================================================
          SUBTLE AMBIENT LIGHT
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[12%]
          top-1/2
          h-[320px]
          w-[320px]
          -translate-y-1/2
          rounded-full
          bg-[#C8954D]/[0.018]
          blur-[110px]
        "
      />

      <div
        className="
          relative
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
            SECTION HEADER
        ==================================================== */}

        <div
          className="
            mb-6
            flex
            items-center
            gap-4
            sm:mb-7
            md:mb-9
          "
        >
          <span
            className="
              h-px
              w-8
              bg-[#C8954D]/70

              sm:w-12
            "
          />

          <span
            className="
              text-[7px]
              font-medium
              uppercase
              tracking-[0.4em]
              text-[#C8954D]/75

              sm:text-[8px]
            "
          >
            {heading}
          </span>

          <span
            className="
              h-px
              flex-1
              max-w-[100px]
              bg-white/[0.08]
            "
          />
        </div>

        {/* ===================================================
            MAIN EDITORIAL LAYOUT
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-9

            sm:gap-10

            md:gap-12

            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-16

            xl:grid-cols-[0.82fr_1.18fr]
            xl:gap-24
          "
        >
          {/* =================================================
              IMAGE
          ================================================== */}

          <div
            className="
              group
              relative
              mx-auto
              w-full
              max-w-[520px]

              lg:mx-0
              lg:max-w-none
            "
          >
            <div
              className="
                relative
                aspect-[4/4.5]
                w-full
                overflow-hidden
                border
                border-white/[0.08]
                bg-[#111]

                sm:aspect-[4/4.2]

                md:aspect-[4/3.8]

                lg:aspect-[4/4.6]

                xl:aspect-[4/4.4]
              "
            >
              {/* Image */}

              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="
                  (max-width: 767px) 100vw,
                  (max-width: 1023px) 70vw,
                  38vw
                "
                className="
                  object-cover
                  object-center
                  opacity-80
                  scale-[1.01]

                  transition-all
                  duration-[1400ms]
                  ease-out

                  group-hover:scale-105
                  group-hover:opacity-95
                "
              />

              {/* Image gradient */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/65
                  via-black/10
                  to-black/10
                "
              />

              {/* Warm hover overlay */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[#C8954D]/[0.025]
                  opacity-0

                  transition-opacity
                  duration-700

                  group-hover:opacity-100
                "
              />

              {/* Top gold line */}

              <span
                className="
                  absolute
                  left-1/2
                  top-0
                  z-20
                  h-px
                  w-0
                  -translate-x-1/2
                  bg-[#C8954D]

                  transition-all
                  duration-700

                  group-hover:w-24
                "
              />

              {/* Image label */}

              <div
                className="
                  absolute
                  left-5
                  top-5
                  z-20
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#C8954D]
                    shadow-[0_0_8px_rgba(200,149,77,0.4)]
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
                  Leadership
                </span>
              </div>

              {/* Image index */}

              <span
                className="
                  absolute
                  bottom-5
                  left-5
                  z-20
                  font-mono
                  text-[7px]
                  tracking-[0.25em]
                  text-white/35
                "
              >
                01
              </span>

              {/* Corner frame */}

              <span
                className="
                  absolute
                  bottom-4
                  right-4
                  z-20
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

            {/* Image caption */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-between
                px-1
              "
            >
              <span
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.28em]
                  text-white/20
                "
              >
                R Ceramica
              </span>

              <span
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.28em]
                  text-[#C8954D]/35
                "
              >
                Leadership
              </span>
            </div>
          </div>

          {/* =================================================
              QUOTE CONTENT
          ================================================== */}

          <div
            className="
              min-w-0
              lg:pb-4
            "
          >
            {/* Quote mark */}

            <div
              aria-hidden="true"
              className="
                mb-3
                font-serif
                text-[42px]
                leading-none
                text-[#C8954D]/45

                sm:text-[48px]

                md:text-[54px]
              "
            >
              “
            </div>

            {/* Quote */}

            <blockquote
              className="
                max-w-[760px]
                font-display
                text-[24px]
                font-light
                italic
                leading-[1.45]
                tracking-[-0.015em]
                text-white/85

                sm:text-[28px]

                md:text-[32px]

                lg:text-[36px]

                xl:text-[42px]
              "
            >
              {quote}
            </blockquote>

            {/* Gold divider */}

            <div
              className="
                mt-7
                flex
                items-center
                gap-3

                sm:mt-8

                md:mt-10
              "
            >
              <span
                className="
                  h-px
                  w-9
                  bg-[#C8954D]

                  transition-all
                  duration-700

                  hover:w-16
                "
              />

              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#C8954D]
                "
              />

              <span
                className="
                  h-px
                  w-16
                  bg-white/[0.08]
                "
              />
            </div>

            {/* Author */}

            <div className="mt-6 sm:mt-7">
              <div
                className="
                  font-display
                  text-[12px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-white

                  sm:text-[13px]
                "
              >
                {name}
              </div>

              <div
                className="
                  mt-2
                  text-[7px]
                  uppercase
                  tracking-[0.35em]
                  text-white/30

                  sm:text-[8px]
                "
              >
                {designation}
              </div>
            </div>

            {/* Small philosophy statement */}

            <div
              className="
                mt-8
                max-w-[480px]
                border-l
                border-[#C8954D]/30
                pl-4

                sm:mt-10
                sm:pl-5
              "
            >
              <p
                className="
                  text-[9px]
                  uppercase
                  leading-[1.8]
                  tracking-[0.16em]
                  text-white/25

                  sm:text-[10px]
                "
              >
                Building surfaces that combine precision,
                technology and enduring architectural vision.
              </p>
            </div>
          </div>
        </div>

          {/* ===================================================
              BOTTOM LINE
          =================================================== */}
          
          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              border-t
              border-white/[0.06]
              pt-3
              sm:mt-7
              sm:pt-3
              md:mt-8
            "
          >
            <span
              className="
                text-[7px]
                uppercase
                tracking-[0.3em]
                text-white/15
              "
            >
              Vision · Legacy · Innovation
            </span>
          
            <span
              className="
                text-[7px]
                uppercase
                tracking-[0.3em]
                text-[#C8954D]/35
              "
            >
              R Ceramica
            </span>
          </div>
      </div>
    </section>
  );
}