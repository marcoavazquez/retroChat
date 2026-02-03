import { Avatar } from "@/components/avatar";
import { Container } from "@/components/ui/Container";
import { Flex } from "@/components/ui/Flex";
import { useContext } from "react";
import ChatContext from "@/contexts/ChatContext";

const ModelSelector: React.FC = () => {

	const { user, setModel } = useContext(ChatContext);

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
						<summary>Local ( 2 )</summary>
						<ul>
							<li><button onClick={() => setModel('no-model')}>No model (for testing)</button></li>
							<li><button onClick={() => setModel('qwen2.5-0.5b-instruct')}>Qwen2.5-0.5B-Instruct</button></li>
						</ul>
					</details>
					<details>
						<summary>Open AI (0)</summary>
						<ul></ul>
					</details>
					<details>
						<summary>Gemini (0)</summary>
						<ul></ul>
					</details>
					<details>
						<summary>Anthropic (0)</summary>
						<ul></ul>
					</details>
				</Container>
			</section>
		</div>
	);
};

export default ModelSelector;
