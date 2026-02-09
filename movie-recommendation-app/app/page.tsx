import SmallCard from "../components/ui/SmallCard";
import BigCard from "../components/ui/BigCard";

export default function Home() {
  return (
    <div>
      <div className="pt-20">
        {/* Trending Movies */}
        <section className="flex flex-col gap-8 items-center">
          <h1 className="text-4xl mb-10 font-bold">Trending Movies</h1>
          <div className="flex gap-8">
            <BigCard
              id="123"
              title="Inception"
              year="2010"
              rating={8.8}
              posterUrl="/images/inception.jpg"
              description="A thief who steals corporate secrets..."
              genres={["Action", "Sci-Fi", "Thriller"]}
            />
            <BigCard
              id="123"
              title="Inception"
              year="2010"
              rating={8.8}
              posterUrl="/images/inception.jpg"
              description="A thief who steals corporate secrets..."
              genres={["Action", "Sci-Fi", "Thriller"]}
            />
            <BigCard
              id="123"
              title="Inception"
              year="2010"
              rating={8.8}
              posterUrl="/images/inception.jpg"
              description="A thief who steals corporate secrets..."
              genres={["Action", "Sci-Fi", "Thriller"]}
            />
            <BigCard
              id="123"
              title="Inception"
              year="2010"
              rating={8.8}
              posterUrl="/images/inception.jpg"
              description="A thief who steals corporate secrets..."
              genres={["Action", "Sci-Fi", "Thriller"]}
            />
          </div>
        </section>
        {/* Recommended for you */}
        <section className="flex flex-col gap-8 items-center my-40">
          <h1 className="text-4xl mb-10 font-bold">Recommended Movies</h1>
          <div className="flex gap-8">
            <BigCard
              id="123"
              title="Inception"
              year="2010"
              rating={8.8}
              posterUrl="/images/inception.jpg"
              description="A thief who steals corporate secrets..."
              genres={["Action", "Sci-Fi", "Thriller"]}
            />
            <BigCard
              id="123"
              title="Inception"
              year="2010"
              rating={8.8}
              posterUrl="/images/inception.jpg"
              description="A thief who steals corporate secrets..."
              genres={["Action", "Sci-Fi", "Thriller"]}
            />
            <BigCard
              id="123"
              title="Inception"
              year="2010"
              rating={8.8}
              posterUrl="/images/inception.jpg"
              description="A thief who steals corporate secrets..."
              genres={["Action", "Sci-Fi", "Thriller"]}
            />
            <BigCard
              id="123"
              title="Inception"
              year="2010"
              rating={8.8}
              posterUrl="/images/inception.jpg"
              description="A thief who steals corporate secrets..."
              genres={["Action", "Sci-Fi", "Thriller"]}
            />
          </div>
        </section>
        {/* Favorite */}
        <section className="flex flex-col gap-8 items-center my-40">
          <h1 className="text-4xl mb-10 font-bold">Favorite Movies</h1>
          <div>
            <SmallCard id="" posterUrl="" year="2025" title="AMOAKO" />
          </div>
        </section>






      </div>
    </div>
  );
}
