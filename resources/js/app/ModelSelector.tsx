import { Avatar } from "@/components/avatar";
import { Container } from "@/components/ui/Container";
import { Flex } from "@/components/ui/Flex";

interface Props {
	user: string;
}

const ModelSelector: React.FC<Props> = ({ user }) => {
	return (
		<div className="model-selector">
			<header>
				<Flex gap="1rem">
					<Avatar url="https://i.pravatar.cc/150?u=1" />
					<div>
						<h1>{user}</h1>
						<p>Selecciona un modelo</p>
					</div>
				</Flex>
			</header>
			<section>
				<Container>
					<details>
						<summary>Modelo locales (2)</summary>
						<ul>
							<li>Qwen2.5-0.5B-Instruct</li>
							<li>Other</li>
						</ul>
					</details>
					<details>
						<summary>Open AI (5)</summary>
						<ul>
							<li>gpt-3.5-turbo</li>
							<li>gpt-4o-mini</li>
							<li>gpt-4o</li>
							<li>gpt-4o-mini</li>
							<li>gpt-4o-mini</li>
						</ul>
					</details>
					<details>
						<summary>Gemini (2)</summary>
						<ul>
							<li>gemini-1.5-flash</li>
							<li>gemini-2.0-flash</li>
						</ul>
					</details>
					<details>
						<summary>Anthropic (3)</summary>
						<ul>
							<li>claude-3-5-sonnet</li>
							<li>claude-3-5-haiku</li>
							<li>claude-3-5-sonnet</li>
						</ul>
					</details>
				</Container>
			</section>
		</div>
	);
};

export default ModelSelector;
