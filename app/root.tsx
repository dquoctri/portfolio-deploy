import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import "./app.css";
import { AppFrame } from "../src/app/App";
import { portfolioData } from "../src/data/portfolioData";

const siteDescription =
	"A cinematic React Router portfolio for Tri Doan, focused on resilient delivery, backend depth, and architecture-ready storytelling.";

export function meta() {
	return [
		{ title: `${portfolioData.site.name} | ${portfolioData.site.role}` },
		{ name: "description", content: siteDescription },
	];
}

export function links() {
	return [
		{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
		{ rel: "alternate icon", href: "/favicon.svg" },
	];
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<AppFrame>{children}</AppFrame>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main
			id="content"
			className="relative z-10 px-6 pb-16 pt-[calc(var(--header-height)+2rem)] sm:px-8 lg:px-10"
		>
			<div className="mx-auto max-w-4xl">
				<section className="neu-extruded rounded-[2.6rem] p-8 sm:p-10">
					<p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
						Route error
					</p>
					<h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.06em] text-[var(--text-primary)] sm:text-6xl">
						{message}
					</h1>
					<p className="mt-5 text-base leading-8 text-[var(--text-muted)] sm:text-lg">
						{details}
					</p>
					{stack && (
						<pre className="code-surface neu-inset scrollbar-soft mt-8 overflow-x-auto rounded-[1.9rem] p-5 text-sm leading-7 text-[var(--text-muted)]">
							<code>{stack}</code>
						</pre>
					)}
				</section>
			</div>
		</main>
	);
}
