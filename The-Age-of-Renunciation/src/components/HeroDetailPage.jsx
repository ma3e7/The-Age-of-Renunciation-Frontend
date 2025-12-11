import '../styles/HeroDetailsPage.css';

const HeroDetailPage = () => {
  const heroName = "IME HEROJA OVDJE";

  return (
    <div className="banner">
      <div className="slider" style={{ '--quantity': '5' }}>
        {[1, 2, 3, 4, 5].map((pos) => (
          <div className="item" key={pos} style={{ '--position': pos.toString() }}>
            <img src={`/img/Kaelus-A${pos}.png`} alt={`Character ability ${pos}`} />
          </div>
        ))}
      </div>

      <div className="content">
        <h1 data-content={heroName}>{heroName}</h1>
        <div className="model-image">
          <img src="/img/Kaelus-Character-Background-Removed.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroDetailPage;
