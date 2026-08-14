import Image from "next/image";

interface Item {
  title: string;
  description: string;
  image: string;
  accent: string;
}

interface Props {
  title: string;
  eyebrow?: string;
  items: Item[];
}

export default function ManufacturingSection({
  title,
  eyebrow = "Industrial Innovation",
  items,
}: Props) {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#0d0d0d]
        py-10
        sm:py-12
        md:py-14
        lg:py-16
        xl:py-20
      "
    >
      {/* =====================================================
          BACKGROUND DETAIL
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[25%]
          h-[400px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-[#C8954D]/[0.018]
          blur-[120px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1440px]
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
            mb-7
            flex
            flex-col
            items-start
            sm:mb-8
            md:mb-10
            lg:mb-12
          "
        >
          {/* Eyebrow */}

          <div className="mb-4 flex items-center gap-3">
            <span
              className="
                h-px
                w-7
                bg-[#C8954D]

                sm:w-9
              "
            />

            <span
              className="
                text-[7px]
                font-medium
                uppercase
                tracking-[0.38em]
                text-[#C8954D]/70

                sm:text-[8px]
              "
            >
              {eyebrow}
            </span>
          </div>

          {/* Heading */}

          <div className="flex w-full items-end justify-between gap-6">
            <h2
              className="
                max-w-[800px]
                font-display
                text-[30px]
                font-light
                uppercase
                leading-[1.05]
                tracking-[-0.025em]
                text-white

                sm:text-[36px]

                md:text-[44px]

                lg:text-[52px]

                xl:text-[58px]
              "
            >
              {title}
            </h2>

            {/* Desktop section number */}

            <span
              className="
                hidden
                select-none
                font-mono
                text-[8px]
                tracking-[0.3em]
                text-white/15

                md:block
              "
            >
              03 / PROCESS
            </span>
          </div>

          {/* Divider */}

          <div
            className="
              mt-6
              h-px
              w-full
              bg-gradient-to-r
              from-[#C8954D]/40
              via-white/[0.08]
              to-transparent
            "
          />
        </div>

        {/* ===================================================
            CARDS
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4

            sm:gap-5

            md:grid-cols-2
            md:gap-5

            lg:grid-cols-3
            lg:gap-6
          "
        >
          {items.slice(0, 6).map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="
                group
                relative
                min-w-0
                overflow-hidden
                border
                border-white/[0.08]
                bg-[#111]

                transition-all
                duration-700
                ease-out

                hover:-translate-y-1
                hover:border-[#C8954D]/25
              "
            >
              {/* =================================================
                  IMAGE
              ================================================== */}

              <div
                className="
                  relative
                  aspect-[4/4.5]
                  overflow-hidden
                  bg-[#151515]

                  sm:aspect-[4/4.3]

                  lg:aspect-[4/4.7]
                "
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="
                    (max-width: 639px) 100vw,
                    (max-width: 1023px) 50vw,
                    33vw
                  "
                  className="
                    object-cover
                    opacity-65
                    scale-[1.01]

                    transition-all
                    duration-[1200ms]
                    ease-out

                    group-hover:scale-105
                    group-hover:opacity-90
                  "
                />

                {/* Image overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#0d0d0d]
                    via-[#0d0d0d]/35
                    to-transparent
                  "
                />

                {/* Hover warm glow */}

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

                {/* =================================================
                    CARD NUMBER
                ================================================== */}

                <div
                  className="
                    absolute
                    left-5
                    top-5
                    z-10

                    sm:left-6
                    sm:top-6
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[8px]
                      tracking-[0.25em]
                      text-white/35

                      transition-colors
                      duration-500

                      group-hover:text-[#C8954D]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Top gold indicator */}

                <span
                  aria-hidden="true"
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

                    group-hover:w-20
                  "
                />

                {/* =================================================
                    CONTENT
                ================================================== */}

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    z-10
                    p-5

                    sm:p-6

                    md:p-7
                  "
                >
                  {/* Small category */}

                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className="
                        h-1
                        w-1
                        rounded-full
                        bg-[#C8954D]

                        transition-all
                        duration-500

                        group-hover:shadow-[0_0_8px_rgba(200,149,77,0.6)]
                      "
                    />

                    <span
                      className="
                        text-[7px]
                        uppercase
                        tracking-[0.3em]
                        text-white/30
                      "
                    >
                      Manufacturing
                    </span>
                  </div>

                  {/* Title */}

                  <h3
                    className="
                      font-display
                      text-[18px]
                      font-light
                      uppercase
                      leading-tight
                      tracking-[0.01em]
                      text-white

                      transition-transform
                      duration-700

                      group-hover:-translate-y-1

                      sm:text-[20px]

                      md:text-[21px]
                    "
                  >
                    {item.title}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      mt-3
                      max-w-[390px]
                      text-[9px]
                      uppercase
                      leading-[1.75]
                      tracking-[0.12em]
                      text-white/35

                      transition-colors
                      duration-500

                      group-hover:text-white/55

                      sm:text-[10px]
                    "
                  >
                    {item.description}
                  </p>

                  {/* Bottom line */}

                  <div
                    className="
                      mt-5
                      h-px
                      w-8
                      bg-[#C8954D]/60

                      transition-all
                      duration-700

                      group-hover:w-16
                      group-hover:bg-[#C8954D]
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  OUTER CORNER
              ================================================== */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  right-0
                  h-5
                  w-5
                  border-b
                  border-r
                  border-[#C8954D]/0

                  transition-all
                  duration-700

                  group-hover:h-8
                  group-hover:w-8
                  group-hover:border-[#C8954D]/30
                "
              />
            </article>
          ))}
        </div>

        {/* ===================================================
            BOTTOM LABEL
        ==================================================== */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-white/[0.06]
            pt-4
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
            Precision · Technology · Craftsmanship
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