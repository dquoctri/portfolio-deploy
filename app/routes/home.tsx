import { PortfolioPage } from "../../src/features/portfolio/PortfolioPage";

export function meta() {
	return [
		{ title: "TRI DOAN | Senior Software Engineer" },
		{
			name: "description",
			content:
				"Explore Tri Doan's React Router portfolio covering backend depth, full-stack delivery, and future-facing solution architecture work.",
		},
	];
}

export default function Home() {
	return <PortfolioPage />;
}
