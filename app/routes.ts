import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("skills/:slug", "routes/skill.tsx"),
] satisfies RouteConfig;
