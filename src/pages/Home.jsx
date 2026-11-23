import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";

export default function Home() {
  return (
    <section className="home">
      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to My Shop</h1>
          <p>
            Browse our collection of clothing, jewellery, and electronics. Pick
            what you like, add it to your cart, and adjust quantities any time.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Start shopping
          </Link>
        </div>
        <img src={heroImage} alt="Our featured products" />
      </div>

      <h2>Why shop with us?</h2>
      <ul className="features">
        <li>Wide range of products</li>
        <li>Easy cart management</li>
        <li>Simple, clean shopping experience</li>
      </ul>
    </section>
  );
}
