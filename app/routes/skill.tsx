import { useParams } from "react-router";
import { SkillPlaceholderPage } from "../../src/features/skills/SkillPlaceholderPage";
import { portfolioData } from "../../src/data/portfolioData";

function findSkillRoute(slug?: string) {
	return portfolioData.skillRoutes.find((item) => item.slug === slug);
}

function toDescriptionText(value: unknown) {
	if (typeof value === "string") {
		return value;
	}

	if (Array.isArray(value)) {
		return value
			.map((item) =>
				typeof item === "string"
					? item
					: typeof item === "object" && item && "text" in item
						? String(item.text)
						: "",
			)
			.filter(Boolean)
			.join(" ");
	}

	return "Future-facing portfolio notes and technology placeholders for Tri Doan.";
}

export function meta({ params }: { params: { slug?: string } }) {
	const skill = findSkillRoute(params.slug);

	return [
		{
			title: skill
				? `${skill.label} | ${portfolioData.site.name}`
				: `Skill Page | ${portfolioData.site.name}`,
		},
		{
			name: "description",
			content: toDescriptionText(skill?.placeholderSummary),
		},
	];
}

export default function SkillRoute() {
	const { slug } = useParams();

	return <SkillPlaceholderPage skill={findSkillRoute(slug)} />;
}
