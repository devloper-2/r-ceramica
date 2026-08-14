import Image from "next/image";

interface PhilosophySectionProps {
  title: string;
  highlight: string;
  intro: string;
  description: string;
  image: string;
  imageAlt?: string;
  badgeTitle?: string;
  badgeText?: string;
}

export default function PhilosophySection({
  title,
  highlight,
  intro,
  description,
  image,
  imageAlt = "Philosophy",
  badgeTitle = "Technical Analysis",
  badgeText = "0.05% Water Absorption Certified",
}: PhilosophySectionProps) {
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
  "
>
  {/* Very subtle background glow */}
  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      left-[35%]
      top-1/2
      h-[300px]
      w-[300px]
      -translate-y-1/2
      rounded-full
      bg-[#C8954D]/[0.018]
      blur-[100px]
    "
  />

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
    <div
      className="
        grid
        grid-cols-1
        items-center
        gap-10

        md:gap-12

        lg:grid-cols-[0.95fr_1.05fr]
        lg:gap-14

        xl:gap-16
      "
    >
      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="min-w-0">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-7 bg-[#C8954D]/80" />

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.35em]
              text-[#C8954D]/70
            "
          >
            Our Philosophy
          </span>
        </div>

        {/* Heading */}
        <h2
          className="
            max-w-[620px]
            font-display
            text-[29px]
            font-light
            uppercase
            leading-[1.08]
            tracking-[-0.02em]
            text-white

            sm:text-[32px]
            md:text-[36px]
            lg:text-[40px]
            xl:text-[44px]
          "
        >
          {title}

          <span
            className="
              ml-1
              italic
              text-white/35
            "
          >
            {highlight}
          </span>
        </h2>

        {/* Small gold line */}
        <div className="mt-5 flex items-center gap-2">
          <span className="h-px w-8 bg-[#C8954D]" />
          <span className="h-1 w-1 rounded-full bg-[#C8954D]" />
          <span className="h-px w-10 bg-white/[0.08]" />
        </div>

        {/* Text */}
        <div
          className="
            mt-6
            max-w-[570px]
            space-y-4
            font-light
            leading-[1.8]
          "
        >
          <p
            className="
              text-[13px]
              text-white/55

              sm:text-[14px]
              md:text-[15px]
            "
          >
            {intro}
          </p>

          <p
            className="
              text-[12px]
              text-white/32

              sm:text-[13px]
              md:text-[14px]
            "
          >
            {description}
          </p>
        </div>

        {/* Small detail */}
        <div className="mt-6 flex items-center gap-3">
          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-[#C8954D]/20
              bg-[#C8954D]/[0.03]
            "
          >
            <span className="h-1 w-1 rounded-full bg-[#C8954D]" />
          </span>

          <div>
            <span
              className="
                block
                text-[7px]
                uppercase
                tracking-[0.3em]
                text-white/20
              "
            >
              Crafted for
            </span>

            <span
              className="
                mt-0.5
                block
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-white/50
              "
            >
              Architectural Excellence
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div className="relative min-w-0">
        <div
          className="
            group
            relative
            aspect-[16/11]
            w-full
            overflow-hidden
            rounded-[2px]
            border
            border-white/[0.08]
            bg-[#111]

            sm:aspect-[16/10]
            lg:aspect-[16/11]
          "
        >
          {/* Inner frame */}
          <div
            className="
              pointer-events-none
              absolute
              inset-3
              z-20
              border
              border-white/[0.07]

              transition-all
              duration-700

              group-hover:inset-4
              group-hover:border-[#C8954D]/25
            "
          />

          {/* Image */}
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="
              (max-width: 767px) 100vw,
              (max-width: 1023px) 90vw,
              55vw
            "
            className="
              object-cover
              opacity-80
              scale-[1.01]

              transition-all
              duration-1000
              ease-out

              group-hover:scale-105
              group-hover:opacity-100
            "
          />

          {/* Overlay */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-10
              bg-gradient-to-t
              from-black/60
              via-black/5
              to-transparent
            "
          />

          {/* Top label */}
          <div
            className="
              absolute
              left-5
              top-5
              z-30
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
                shadow-[0_0_8px_rgba(200,149,77,0.5)]
              "
            />

            <span
              className="
                text-[7px]
                uppercase
                tracking-[0.3em]
                text-white/55
              "
            >
              R Ceramica
            </span>
          </div>

          {/* Technical card */}
          <div
            className="
              absolute
              bottom-4
              right-4
              z-30
              w-[175px]
              border
              border-[#C8954D]/20
              bg-[#0b0b0b]/90
              p-4
              backdrop-blur-xl

              transition-all
              duration-700

              group-hover:-translate-y-1
              group-hover:border-[#C8954D]/35

              sm:bottom-5
              sm:right-5
              sm:w-[190px]
            "
          >
            <div className="flex items-center justify-between">
              <span
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.3em]
                  text-[#C8954D]
                "
              >
                {badgeTitle}
              </span>

              <span className="text-[7px] text-white/20">
                01
              </span>
            </div>

            <div className="my-3 h-px bg-white/[0.07]">
              <div
                className="
                  h-px
                  w-7
                  bg-[#C8954D]
                  transition-all
                  duration-700
                  group-hover:w-12
                "
              />
            </div>

            <p
              className="
                text-[8px]
                uppercase
                leading-[1.7]
                tracking-[0.12em]
                text-white/55
              "
            >
              {badgeText}
            </p>
          </div>
        </div>

        {/* Image metadata */}
        <div className="mt-3 flex items-center justify-between px-1">
          <span
            className="
              text-[7px]
              uppercase
              tracking-[0.3em]
              text-white/15
            "
          >
            Architectural Surface
          </span>

          <span
            className="
              text-[7px]
              uppercase
              tracking-[0.3em]
              text-[#C8954D]/40
            "
          >
            01 / 01
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}