import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"
import path from "path"
import url from "rollup-plugin-url"

export default ({ mode }) => {
	const isProduction = mode === "production"
	const base = isProduction ? "" : "/albert"

	return defineConfig({
		plugins: [react(), tailwindcss(), url()],
		build: {
			outDir: "dist",
			cssCodeSplit: false,
			assetsInclude: ["artwork/**"],
		},
		resolve: {
			alias: {
				"@artwork": path.resolve(__dirname, "./artwork"),
			},
		},
		server: {
			watch: {
				usePolling: true,
			},
			host: true,
			strictPort: true,
			port: 4173,
		},
		base: base,
	})
}
