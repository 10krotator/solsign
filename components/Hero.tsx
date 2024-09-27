export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold leading-tight tracking-tighter">
        welcome to{" "}
        <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-transparent bg-clip-text">
          solana sign
        </span>
      </h1>
      <h2 className="text-xl leading-tight tracking-tighter text-muted-foreground mb-8">
        sign and verify documents using your solana wallet
      </h2>
    </div>
  );
};
