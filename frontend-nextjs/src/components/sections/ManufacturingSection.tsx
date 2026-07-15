interface Item {
  title: string;
  description: string;
  image: string;
  accent: string;
}

interface Props {
  title: string;
  items: Item[];
}

export default function ManufacturingSection({
  title,
  items,
}: Props) {
  return (
    <section className="py-12 md:py-18">
      <div className="max-w-[1440px] mx-auto px-6">

        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/30">
            Industrial Innovation
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-light text-white uppercase mt-6">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              className="group relative aspect-square overflow-hidden bg-[#1a1a1a]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

              <div className="absolute bottom-0 p-8">
                <h3 className="text-xl text-white uppercase mb-4">
                  {item.title}
                </h3>

                <p className="text-white/40 text-[11px] uppercase tracking-wider">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}