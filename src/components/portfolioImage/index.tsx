const imageUrl = "/linkedin-image.jpg";

const BlobPortfolio = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <style>
        {`
          @keyframes blob-morph {
            0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
            50% { border-radius: 40% 60% 60% 40% / 70% 30% 60% 40%; }
            75% { border-radius: 70% 30% 40% 60% / 40% 70% 60% 30%; }
          }
        `}
      </style>

      <div 
        className="relative block overflow-hidden w-full aspect-square"
        style={{
          background: '#d8a013',
          animation: 'blob-morph 8s ease-in-out infinite'
        }}
      >
        <div
          className="absolute inset-1 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
            borderRadius: 'inherit',
            animation: 'blob-morph 8s ease-in-out infinite'
          }}
        />
      </div>
    </div>
  );
};

export default BlobPortfolio;