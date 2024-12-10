

- Node.js (v18 or higher)
- npm
- convex

## Installation

1. Clone the repository

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```
Edit `.env` with your configuration values.

```
CONVEX_DEPLOYMENT=dev:your-convex-deployment

NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud

NEXT_PUBLIC_CONVEX_API_URL=https://your-convex-api-url.convex.site

NEXT_PUBLIC_ADMIN_PUBKEY=your-admin-pubkey

JWT_SECRET=your-secret-key

NEXT_PUBLIC_RPC_URL=https://api.mainnet-beta.solana.com

NEXT_PUBLIC_RPC_URL_DEVNET=https://api.devnet.solana.com

NEXT_PUBLIC_IRYS_NODE_URL=https://node1.irys.xyz

DIALECT_SDK_CREDENTIALS=dialect-sdk-credential
```

## Running Locally

```bash
npm run dev

npx convex dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
project-name/
├── app/           # Source files
├── components/    # UI components
├── convex/        # Convex database
├── public/        # Static assets
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure everything works
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Coding Standards

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the [LICENSE NAME] - see the [LICENSE.md](LICENSE.md) file for details

## Contact

solana sign - [@_solanasign](https://twitter.com/_solanasign)
Project Link: [https://github.com/10krotator/solsign](https://github.com/10krotator/solsign)