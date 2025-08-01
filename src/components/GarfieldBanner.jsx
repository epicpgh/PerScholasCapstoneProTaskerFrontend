



function GarfieldBanner() {
  return (
    <div style={{
      backgroundColor: '#ff6f00',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem 2rem',
      fontFamily: '"Comic Sans MS", cursive',
      fontSize: '1.5rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
    }}>
      <img
        src="https://i5.walmartimages.com/asr/5abc7ddd-b489-4cb7-93b2-40de203fda7a.627a96839f27020672d2f51f60858162.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
        alt="Garfield"
        style={{ height: '150px' }}
      />
      <span>Garfield's PRO Task Tracker — His ENTIRE brand is hating on Mondays and eating lasagna</span>
    </div>
  );
}

export default GarfieldBanner;