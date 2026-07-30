const WindParticles = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1.5 h-5 bg-[#d8a013] rounded-full opacity-100"
                    style={{
                        left: `${(i * 7) % 100}%`,
                        bottom: `-${(i * 11) % 30}px`,
                        // Longhand only: the `animation` shorthand would reset the delay to 0.
                        animationName: "windUp",
                        animationDuration: `${3 + ((i * 0.3) % 2)}s`,
                        animationTimingFunction: "linear",
                        animationIterationCount: "infinite",
                        animationDelay: `${(i * 0.4) % 3}s`
                    }}
                />
            ))}
        </div>
    );
};

export default WindParticles;
