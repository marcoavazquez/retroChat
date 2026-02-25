//https://huggingface.co/docs/transformers.js/main/en/tutorials/react

import { pipeline, PipelineType, TextStreamer, env, ClapAudioModelWithProjection } from '@huggingface/transformers';

class ChatPipeline {
	static task: PipelineType = 'text2text-generation';
	static instance: any;
	static model: string = 'Xenova/flan-t5-small';

	static async getInstance(progressCallback: any = null): Promise<any> {

		env.allowLocalModels = false;
		env.useBrowserCache = true;

		this.instance ??= pipeline(
			this.task,
			this.model,
			{ progress_callback: progressCallback }
		);

		self.addEventListener('message', async (e) => {

			console.log('processing...', e.data)

			const message = await ChatPipeline.getInstance((v: any) => {
				self.postMessage(v)
			});

			const streamer = new TextStreamer(message.tokenizer, {
				skip_prompt: true,
				skip_special_tokens: true,
				callback_function: (text) => {
					self.postMessage({
						status: 'update',
						output: text
					})
				}
			})

			const output = await message(e.data.text, {
				streamer,
				text: e.data.text,
			})

			self.postMessage({
				status: 'done',
				output
			})
		});

		return this.instance;
	}
}

export default ChatPipeline
